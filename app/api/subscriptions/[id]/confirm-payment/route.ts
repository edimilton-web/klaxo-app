import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { verifyPaymentToken } from "@/lib/payment-token"

function advanceBillingDate(date: Date, billingCycle: string): Date {
  const next = new Date(date)
  switch (billingCycle) {
    case "MONTHLY": next.setMonth(next.getMonth() + 1); break
    case "YEARLY": next.setFullYear(next.getFullYear() + 1); break
    case "WEEKLY": next.setDate(next.getDate() + 7); break
  }
  return next
}

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
  today.setHours(0, 0, 0, 0)
  let nextBillingDate = advanceBillingDate(sub.nextBillingDate, sub.billingCycle)
  while (nextBillingDate < today) {
    nextBillingDate = advanceBillingDate(nextBillingDate, sub.billingCycle)
  }

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
