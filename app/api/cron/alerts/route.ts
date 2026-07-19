import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { sendRenewalAlert, sendPaymentConfirmationEmail } from "@/lib/resend"
import { generatePaymentToken } from "@/lib/payment-token"
import { advanceUntilFuture } from "@/lib/billing"

const FIXED_REMINDER_DAYS = 2

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

export async function GET(req: Request) {
  const auth = req.headers.get("Authorization")
  if (auth !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized", code: "UNAUTHORIZED" }, { status: 401 })
  }

  const today = new Date()
  today.setUTCHours(0, 0, 0, 0)

  let sent = 0
  let failed = 0
  let advanced = 0

  // Step 1: auto-advance any active subscription whose billing date fell into
  // the past, so a user who never opens the app doesn't get stuck forever.
  const overdueSubscriptions = await prisma.subscription.findMany({
    where: { status: "ACTIVE", nextBillingDate: { lt: today } },
    include: { user: true },
  })

  const justRenewed: typeof overdueSubscriptions = []

  for (const sub of overdueSubscriptions) {
    const { date: nextBillingDate } = advanceUntilFuture(sub.nextBillingDate, sub.billingCycle, today)
    await prisma.subscription.update({
      where: { id: sub.id },
      data: { nextBillingDate, paymentReminderSent: false },
    })
    advanced++
    justRenewed.push({ ...sub, nextBillingDate })
  }

  // Step 2: informative renewal email — the date has already advanced above,
  // this is no longer required for the advance to happen.
  for (const sub of justRenewed) {
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

  // Step 3: renewal reminders — the user's configurable alertDaysBefore
  // (default 5) plus a fixed 2-day reminder. Each is deduped independently
  // by its own scheduledFor date, so one can't block the other.
  const users = await prisma.user.findMany({
    where: { subscriptions: { some: { status: "ACTIVE" } } },
    include: { subscriptions: { where: { status: "ACTIVE" } } },
  })

  for (const user of users) {
    const reminderOffsets = Array.from(new Set([user.alertDaysBefore, FIXED_REMINDER_DAYS]))

    for (const offsetDays of reminderOffsets) {
      const alertDate = new Date(today)
      alertDate.setUTCDate(alertDate.getUTCDate() + offsetDays)

      const dueSubscriptions = user.subscriptions.filter((sub) => {
        const billing = new Date(sub.nextBillingDate)
        billing.setUTCHours(0, 0, 0, 0)
        return billing.getTime() === alertDate.getTime()
      })

      for (const sub of dueSubscriptions) {
        const alreadySent = await prisma.alert.findFirst({
          where: {
            subscriptionId: sub.id,
            alertType: "RENEWAL",
            status: "SENT",
            scheduledFor: alertDate,
          },
        })
        if (alreadySent) continue

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
            daysUntil: offsetDays,
            nextBillingDate: sub.nextBillingDate.toISOString(),
          })

          if (user.oneSignalPlayerId) {
            await sendPushNotification({
              playerId: user.oneSignalPlayerId,
              subscriptionName: sub.name,
              daysUntil: offsetDays,
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
  }

  return NextResponse.json({ ok: true, sent, failed, advanced })
}
