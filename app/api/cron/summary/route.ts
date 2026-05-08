import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { sendMonthlySummary } from "@/lib/resend"
import { toMonthlyEur } from "@/lib/exchange-rate"

export async function POST(req: Request) {
  const auth = req.headers.get("Authorization")
  if (auth !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized", code: "UNAUTHORIZED" }, { status: 401 })
  }

  const today = new Date()
  if (today.getDate() !== 1) {
    return NextResponse.json({ ok: true, message: "Not the 1st of the month" })
  }

  const prevMonth = new Date(today.getFullYear(), today.getMonth() - 1, 1)
  const monthLabel = prevMonth.toLocaleString("en-GB", { month: "long", year: "numeric" })

  const users = await prisma.user.findMany({
    where: { subscriptions: { some: { status: "ACTIVE" } } },
    include: { subscriptions: { where: { status: "ACTIVE" } } },
  })

  let sent = 0
  for (const user of users) {
    let totalMonthlyEur = 0
    const subs = []

    for (const sub of user.subscriptions) {
      const eur = Number(sub.amountEur ?? sub.amount)
      const monthly = toMonthlyEur(eur, sub.billingCycle)
      totalMonthlyEur += monthly
      subs.push({ name: sub.name, amountEur: eur, billingCycle: sub.billingCycle })
    }

    const alertRecord = await prisma.alert.create({
      data: {
        userId: user.id,
        subscriptionId: user.subscriptions[0].id,
        alertType: "SUMMARY",
        scheduledFor: today,
        status: "PENDING",
      },
    })

    try {
      await sendMonthlySummary({
        to: user.email,
        userName: user.name ?? "user",
        totalMonthlyEur: parseFloat(totalMonthlyEur.toFixed(2)),
        totalAnnualEur: parseFloat((totalMonthlyEur * 12).toFixed(2)),
        subscriptions: subs,
        month: monthLabel,
      })
      await prisma.alert.update({ where: { id: alertRecord.id }, data: { status: "SENT", sentAt: new Date() } })
      sent++
    } catch {
      await prisma.alert.update({ where: { id: alertRecord.id }, data: { status: "FAILED" } })
    }
  }

  return NextResponse.json({ ok: true, sent })
}
