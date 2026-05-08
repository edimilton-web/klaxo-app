import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { sendRenewalAlert } from "@/lib/resend"

export async function POST(req: Request) {
  const auth = req.headers.get("Authorization")
  if (auth !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized", code: "UNAUTHORIZED" }, { status: 401 })
  }

  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const users = await prisma.user.findMany({
    where: { subscriptions: { some: { status: "ACTIVE" } } },
    include: {
      subscriptions: {
        where: { status: "ACTIVE" },
      },
    },
  })

  let sent = 0
  let failed = 0

  for (const user of users) {
    const alertDays = user.alertDaysBefore
    const alertDate = new Date(today)
    alertDate.setDate(alertDate.getDate() + alertDays)

    const dueSubscriptions = user.subscriptions.filter((sub) => {
      const billing = new Date(sub.nextBillingDate)
      billing.setHours(0, 0, 0, 0)
      return billing.getTime() === alertDate.getTime()
    })

    for (const sub of dueSubscriptions) {
      // Skip if already sent in the last 24h
      const recentAlert = await prisma.alert.findFirst({
        where: {
          subscriptionId: sub.id,
          alertType: "RENEWAL",
          status: "SENT",
          sentAt: { gte: new Date(Date.now() - 24 * 3600 * 1000) },
        },
      })
      if (recentAlert) continue

      const alertRecord = await prisma.alert.create({
        data: {
          userId: user.id,
          subscriptionId: sub.id,
          alertType: "RENEWAL",
          scheduledFor: alertDate,
          status: "PENDING",
        },
      })

      try {
        await sendRenewalAlert({
          to: user.email,
          userName: user.name ?? "user",
          subscriptionName: sub.name,
          amount: Number(sub.amount),
          currency: sub.currency,
          daysUntil: alertDays,
          nextBillingDate: sub.nextBillingDate.toISOString(),
        })
        await prisma.alert.update({ where: { id: alertRecord.id }, data: { status: "SENT", sentAt: new Date() } })
        sent++
      } catch {
        await prisma.alert.update({ where: { id: alertRecord.id }, data: { status: "FAILED" } })
        failed++
      }
    }
  }

  return NextResponse.json({ ok: true, sent, failed })
}
