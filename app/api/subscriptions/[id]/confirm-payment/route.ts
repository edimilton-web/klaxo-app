import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { verifyPaymentToken } from "@/lib/payment-token"
import { advanceUntilFuture } from "@/lib/billing"

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const { searchParams } = new URL(req.url)
  const token = searchParams.get("token")
  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "https://app.klaxo.app"

  if (!token) {
    return NextResponse.redirect(`${appUrl}/subscriptions?error=invalid_token`)
  }

  const sub = await prisma.subscription.findUnique({ where: { id } })

  if (!sub || sub.status !== "ACTIVE") {
    return NextResponse.redirect(`${appUrl}/subscriptions?error=not_found`)
  }

  if (!verifyPaymentToken(sub.id, sub.userId, token)) {
    return NextResponse.redirect(`${appUrl}/subscriptions?error=invalid_token`)
  }

  const today = new Date()
  today.setUTCHours(0, 0, 0, 0)
  // The daily cron already auto-advances overdue subscriptions, so this is
  // idempotent: only advances if the date is somehow still in the past.
  const { date: nextBillingDate } = advanceUntilFuture(sub.nextBillingDate, sub.billingCycle, today, 0)

  await prisma.subscription.update({
    where: { id },
    data: {
      lastPaidAt: new Date(),
      nextBillingDate,
      paymentReminderSent: false,
      snoozedUntil: null,
    },
  })

  return NextResponse.redirect(`${appUrl}/subscriptions?paid=${encodeURIComponent(sub.name)}`)
}
