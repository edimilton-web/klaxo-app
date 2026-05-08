import { NextResponse } from "next/server"
import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import { toMonthlyEur } from "@/lib/exchange-rate"

export async function GET() {
  const session = await auth()
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized", code: "UNAUTHORIZED" }, { status: 401 })

  const subscriptions = await prisma.subscription.findMany({
    where: { userId: session.user.id, status: "ACTIVE" },
  })

  let totalMonthlyEur = 0
  const categoryMap: Record<string, number> = {}

  for (const sub of subscriptions) {
    const eur = Number(sub.amountEur ?? sub.amount)
    const monthly = toMonthlyEur(eur, sub.billingCycle)
    totalMonthlyEur += monthly
    const cat = sub.category ?? "Other"
    categoryMap[cat] = (categoryMap[cat] ?? 0) + monthly
  }

  const totalAnnualEur = totalMonthlyEur * 12

  const next = subscriptions
    .filter((s) => s.nextBillingDate)
    .sort((a, b) => new Date(a.nextBillingDate).getTime() - new Date(b.nextBillingDate).getTime())[0]

  const now = new Date()
  now.setHours(0, 0, 0, 0)
  const nextRenewal = next
    ? {
        name: next.name,
        daysUntil: Math.max(0, Math.round((new Date(next.nextBillingDate).getTime() - now.getTime()) / 86400000)),
        amount: Number(next.amount),
        currency: next.currency,
      }
    : null

  const byCategory = Object.entries(categoryMap)
    .map(([category, totalEur]) => ({ category, totalEur: parseFloat(totalEur.toFixed(2)) }))
    .sort((a, b) => b.totalEur - a.totalEur)

  return NextResponse.json({
    totalMonthlyEur: parseFloat(totalMonthlyEur.toFixed(2)),
    totalAnnualEur: parseFloat(totalAnnualEur.toFixed(2)),
    activeCount: subscriptions.length,
    nextRenewal,
    byCategory,
  })
}
