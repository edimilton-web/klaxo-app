import { NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import { z } from "zod"
import { randomBytes } from "crypto"
import { prisma } from "@/lib/prisma"
import { sendVerificationEmail, sendNewUserAlert } from "@/lib/resend"
import { addSubscriberToMailerLite } from "@/lib/mailerlite"

const schema = z.object({
  name: z.string().min(1).max(100),
  email: z.string().email(),
  password: z.string().min(8).max(100),
})

export async function POST(req: Request) {
  const body = await req.json()
  const parsed = schema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid data", code: "VALIDATION_ERROR" }, { status: 400 })
  }
  const { name, email, password } = parsed.data
  const existing = await prisma.user.findUnique({ where: { email } })
  if (existing) {
    return NextResponse.json({ error: "Email already registered", code: "EMAIL_EXISTS" }, { status: 409 })
  }
  const hashed = await bcrypt.hash(password, 12)
  await prisma.user.create({ data: { name, email, password: hashed } })

  // Add to MailerLite — fire and forget
  addSubscriberToMailerLite({ email, name }).catch((err) => {
    console.error("[MailerLite] Failed to add subscriber:", err)
  })
  sendNewUserAlert({ email, name, authMethod: "Email" }).catch((err) => {
    console.error("[NewUserAlert] Failed to send alert:", err)
  })

  const token = randomBytes(32).toString("hex")
  const expires = new Date(Date.now() + 24 * 60 * 60 * 1000)
  await prisma.verificationToken.create({
    data: { identifier: email, token, expires },
  })

  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "https://app.klaxo.app"
  const verifyUrl = `${appUrl}/api/auth/verify-email?token=${token}&email=${encodeURIComponent(email)}`
  await sendVerificationEmail({ to: email, userName: name, verifyUrl })

  return NextResponse.json({ ok: true }, { status: 201 })
}
