import { NextResponse } from "next/server"
import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"

function advanceBillingDate(date: Date, billingCycle: string): Date {
  const next = new Date(date)
  switch (billingCycle) {
    case "MONTHLY": next.setMonth(next.getMonth() + 1); break
    case "YEARLY": next.setFullYear(next.getFullYear() + 1); break
    case "WEEKLY": next.setDate(next.getDate() + 7); break
  }
  return next
}

export async function POST(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth()
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const { id } = await params
  const sub = await prisma.subscription.findUnique({ where: { id } })
  if (!sub || sub.userId !== session.user.id) {
    return NextResponse.json({ error: "Not found" }, { status: 404 })
  }

  const today = new Date()
  today.setHours(0, 0, 0, 0)
  let nextBillingDate = advanceBillingDate(sub.nextBillingDate, sub.billingCycle)
  while (nextBillingDate < today) {
    nextBillingDate = advanceBillingDate(nextBillingDate, sub.billingCycle)
  }

  const updated = await prisma.subscription.update({
    where: { id },
    data: {
      lastPaidAt: new Date(),
      nextBillingDate,
      paymentReminderSent: false,
      snoozedUntil: null,
    },
  })

  return NextResponse.json(updated)
}
