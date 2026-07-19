import { NextResponse } from "next/server"
import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import { advanceUntilFuture } from "@/lib/billing"

export async function POST(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth()
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const { id } = await params
  const sub = await prisma.subscription.findUnique({ where: { id } })
  if (!sub || sub.userId !== session.user.id) {
    return NextResponse.json({ error: "Not found" }, { status: 404 })
  }

  const today = new Date()
  today.setUTCHours(0, 0, 0, 0)
  const { date: nextBillingDate } = advanceUntilFuture(sub.nextBillingDate, sub.billingCycle, today, 1)

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
