import { NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import { z } from "zod"
import { randomBytes } from "crypto"
import { prisma } from "@/lib/prisma"
import { sendVerificationEmail, sendNewUserAlert } from "@/lib/resend"

const schema = z.object({
  name: z.string().min(1).max(100),
  email: z.string().email(),
  password: z.string().min(8).max(100),
  // Honeypot: a hidden field real users never see or fill in. Bots that
  // auto-fill every input on the form end up sending a value here.
  company: z.string().max(200).optional(),
})

export async function POST(req: Request) {
  const body = await req.json()
  const parsed = schema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid data", code: "VALIDATION_ERROR" }, { status: 400 })
  }
  const { name, email, password, company } = parsed.data

  if (company) {
    // Honeypot tripped. Pretend success so the bot doesn't learn to skip this
    // field — but never touch the database, send email, or add a subscriber.
    return NextResponse.json({ ok: true }, { status: 201 })
  }

  const existing = await prisma.user.findUnique({ where: { email } })
  if (existing) {
    return NextResponse.json({ error: "Email already registered", code: "EMAIL_EXISTS" }, { status: 409 })
  }
  const hashed = await bcrypt.hash(password, 12)
  await prisma.user.create({ data: { name, email, password: hashed } })

  // MailerLite subscription happens after email verification (see
  // verify-email/route.ts) — not here — so unverified/bot signups never
  // become paid subscribers on the marketing list.
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
  sendVerificationEmail({ to: email, userName: name, verifyUrl }).catch((err) => {
    console.error("[VerificationEmail] Failed to send:", err)
  })

  return NextResponse.json({ ok: true }, { status: 201 })
}
