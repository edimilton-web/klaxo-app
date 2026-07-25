import { NextResponse } from "next/server"
import { getStripe } from "@/lib/stripe"
import { prisma } from "@/lib/prisma"
import { sendProSetupEmail } from "@/lib/resend"
import crypto from "crypto"

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const sessionId = searchParams.get("session_id")

  if (!sessionId) {
    return NextResponse.json({ error: "Missing session_id" }, { status: 400 })
  }

  let stripeSession
  try {
    stripeSession = await getStripe().checkout.sessions.retrieve(sessionId, {
      expand: ["customer", "subscription"],
    })
  } catch {
    return NextResponse.json({ error: "Invalid session" }, { status: 400 })
  }

  if (stripeSession.payment_status !== "paid") {
    return NextResponse.json({ error: "Payment not confirmed" }, { status: 402 })
  }

  const email = stripeSession.customer_details?.email
  if (!email) {
    return NextResponse.json({ error: "No email on session" }, { status: 400 })
  }

  const stripeCustomerId = typeof stripeSession.customer === "string"
    ? stripeSession.customer
    : stripeSession.customer?.id ?? null

  const stripeSubId = typeof stripeSession.subscription === "string"
    ? stripeSession.subscription
    : stripeSession.subscription?.id ?? null

  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "https://app.klaxo.app"
  const existing = await prisma.user.findUnique({ where: { email } })

  if (existing) {
    await prisma.user.update({
      where: { email },
      data: {
        plan: "PRO",
        ...(stripeCustomerId && { stripeCustomerId }),
        ...(stripeSubId && { stripeSubId }),
      },
    })

    // Already has a password — can log in normally
    if (existing.password) {
      return NextResponse.json({ email, needsPasswordSetup: false })
    }

    // Has account but no password — reissue/reuse token and resend email
    const tokenExpired = existing.setupTokenExpiry && existing.setupTokenExpiry < new Date()
    let setupToken = existing.setupToken
    if (!setupToken || tokenExpired) {
      setupToken = crypto.randomBytes(32).toString("hex")
      await prisma.user.update({
        where: { email },
        data: {
          setupToken,
          setupTokenExpiry: new Date(Date.now() + 24 * 60 * 60 * 1000),
        },
      })
    }
    const setupUrl = `${appUrl}/setup-password?token=${setupToken}`
    await sendProSetupEmail({ to: email, setupUrl })
    return NextResponse.json({ email, needsPasswordSetup: true })
  }

  // New user — create with PRO plan and send setup email
  const setupToken = crypto.randomBytes(32).toString("hex")
  await prisma.user.create({
    data: {
      email,
      plan: "PRO",
      stripeCustomerId: stripeCustomerId ?? undefined,
      stripeSubId: stripeSubId ?? undefined,
      setupToken,
      setupTokenExpiry: new Date(Date.now() + 24 * 60 * 60 * 1000),
    },
  })

  const setupUrl = `${appUrl}/setup-password?token=${setupToken}`
  await sendProSetupEmail({ to: email, setupUrl })

  return NextResponse.json({ email, needsPasswordSetup: true })
}

export const dynamic = "force-dynamic"
