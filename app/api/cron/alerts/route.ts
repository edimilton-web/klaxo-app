import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { sendRenewalAlert, sendPaymentConfirmationEmail } from "@/lib/resend"
import { generatePaymentToken } from "@/lib/payment-token"

async function sendPushNotification({
  playerId,
  subscriptionName,
  daysUntil,
  amount,
  currency,
}: {
  playerId: string
  subscriptionName: string
  daysUntil: number
  amount: number
  currency: string
}) {
  const appId = process.env.NEXT_PUBLIC_ONESIGNAL_APP_ID
  const apiKey = process.env.ONESIGNAL_REST_API_KEY
  if (!appId || !apiKey) return

  const body =
    daysUntil === 0
      ? `${subscriptionName} renews today — ${currency} ${amount.toFixed(2)}`
      : `${subscriptionName} renews in ${daysUntil} day${daysUntil > 1 ? "s" : ""} — ${currency} ${amount.toFixed(2)}`

  await fetch("https://onesignal.com/api/v1/notifications", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Basic ${apiKey}`,
    },
    body: JSON.stringify({
      app_id: appId,
      include_subscription_ids: [playerId],
      headings: { en: "Renewal reminder" },
      contents: { en: body },
      url: "https://app.klaxo.app/subscriptions",
    }),
  })
}

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

        if (user.oneSignalPlayerId) {
          await sendPushNotification({
            playerId: user.oneSignalPlayerId,
            subscriptionName: sub.name,
            daysUntil: alertDays,
            amount: Number(sub.amount),
            currency: sub.currency,
          })
        }

        await prisma.alert.update({ where: { id: alertRecord.id }, data: { status: "SENT", sentAt: new Date() } })
        sent++
      } catch {
        await prisma.alert.update({ where: { id: alertRecord.id }, data: { status: "FAILED" } })
        failed++
      }
    }
  }

  // Payment confirmation emails — subscriptions that became overdue yesterday
  const yesterday = new Date(today)
  yesterday.setDate(yesterday.getDate() - 1)

  const overdueSubscriptions = await prisma.subscription.findMany({
    where: {
      status: "ACTIVE",
      nextBillingDate: { gte: yesterday, lt: today },
      paymentReminderSent: false,
    },
    include: { user: true },
  })

  for (const sub of overdueSubscriptions) {
    try {
      const token = generatePaymentToken(sub.id, sub.userId)
      const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "https://app.klaxo.app"
      const confirmUrl = `${appUrl}/api/subscriptions/${sub.id}/confirm-payment?token=${token}`

      await sendPaymentConfirmationEmail({
        to: sub.user.email,
        userName: sub.user.name ?? "user",
        subscriptionName: sub.name,
        amount: Number(sub.amount),
        currency: sub.currency,
        dueDate: sub.nextBillingDate.toISOString(),
        confirmUrl,
      })

      await prisma.subscription.update({
        where: { id: sub.id },
        data: { paymentReminderSent: true },
      })
      sent++
    } catch {
      failed++
    }
  }

  return NextResponse.json({ ok: true, sent, failed })
}
