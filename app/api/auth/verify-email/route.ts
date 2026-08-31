import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { addSubscriberToMailerLite } from "@/lib/mailerlite"

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const token = searchParams.get("token")
  const email = searchParams.get("email")
  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "https://app.klaxo.app"

  if (!token || !email) {
    return NextResponse.redirect(`${appUrl}/login?error=invalid_token`)
  }

  const record = await prisma.verificationToken.findUnique({
    where: { token },
  })

  if (!record || record.identifier !== email || record.expires < new Date()) {
    return NextResponse.redirect(`${appUrl}/login?error=expired_token`)
  }

  const user = await prisma.user.update({
    where: { email },
    data: { emailVerified: new Date() },
  })

  await prisma.verificationToken.delete({ where: { token } })

  // Only now — email proven real — does the subscriber join the marketing
  // list. Unverified/bot signups never reach MailerLite, so they never cost
  // a subscriber slot or hurt deliverability.
  addSubscriberToMailerLite({ email: user.email, name: user.name ?? "" }).catch((err) => {
    console.error("[MailerLite] Failed to add subscriber:", err)
  })

  return NextResponse.redirect(`${appUrl}/login?verified=1`)
}
