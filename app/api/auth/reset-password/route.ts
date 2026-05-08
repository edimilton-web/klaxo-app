import { NextResponse } from "next/server"
import { z } from "zod"
import { prisma } from "@/lib/prisma"
import { resend } from "@/lib/resend"
import crypto from "crypto"

const schema = z.object({ email: z.string().email() })

export async function POST(req: Request) {
  const body = await req.json()
  const parsed = schema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid email", code: "VALIDATION_ERROR" }, { status: 400 })
  }
  const { email } = parsed.data
  const user = await prisma.user.findUnique({ where: { email } })
  // Always return 200 to avoid exposing whether an email exists
  if (!user) return NextResponse.json({ ok: true })

  const token = crypto.randomBytes(32).toString("hex")
  const expires = new Date(Date.now() + 3600 * 1000)

  await prisma.verificationToken.upsert({
    where: { identifier_token: { identifier: email, token } },
    create: { identifier: email, token, expires },
    update: { token, expires },
  })

  const resetUrl = `${process.env.NEXT_PUBLIC_APP_URL}/reset-password/confirm?token=${token}&email=${encodeURIComponent(email)}`

  await resend.emails.send({
    from: process.env.RESEND_FROM_EMAIL ?? "noreply@klaxo.app",
    to: email,
    subject: "Reset your Klaxo password",
    html: `<p>Hi ${user.name ?? ""},</p><p>Click the link below to reset your password (valid for 1 hour):</p><p><a href="${resetUrl}">${resetUrl}</a></p>`,
  })

  return NextResponse.json({ ok: true })
}
