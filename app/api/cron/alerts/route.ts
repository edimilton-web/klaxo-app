import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { sendRenewalAlert, sendPaymentConfirmationEmail, sendAdminDailySummary, sendSystemHealthEmail } from "@/lib/resend"
import { collectHealthIndicators } from "@/lib/system-health"
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

async function pingHealthcheck(suffix: "" | "/fail"): Promise<string> {
  const url = process.env.HEALTHCHECK_PING_URL
  if (!url) return "skipped: HEALTHCHECK_PING_URL not set"
  try {
    const res = await fetch(`${url}${suffix}`, { signal: AbortSignal.timeout(5000) })
    return `ok: ${res.status}`
  } catch (err) {
    // A falha do ping nunca pode partir o cron.
    return `error: ${err instanceof Error ? err.message : String(err)}`
  }
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
  // Reminders that were due and not already sent — the denominator for the
  // "expected vs delivered" health indicator.
  let eligible = 0

  const remindersSent: Array<{ daysUntil: number; subscriptionName: string; userEmail: string }> = []
  const failures: Array<{ context: string; subscriptionName: string; userEmail: string; error: string }> = []
  const advancedList: Array<{ subscriptionName: string; userEmail: string; oldDate: string; newDate: string }> = []

  try {
    // Step 1: auto-advance any active subscription whose billing date fell into
    // the past, so a user who never opens the app doesn't get stuck forever.
    const overdueSubscriptions = await prisma.subscription.findMany({
      where: { status: "ACTIVE", nextBillingDate: { lt: today } },
      include: { user: true },
    })

    const justRenewed: typeof overdueSubscriptions = []

    for (const sub of overdueSubscriptions) {
      const oldDate = sub.nextBillingDate.toISOString().slice(0, 10)
      const { date: nextBillingDate } = advanceUntilFuture(sub.nextBillingDate, sub.billingCycle, today)
      await prisma.subscription.update({
        where: { id: sub.id },
        data: { nextBillingDate, paymentReminderSent: false },
      })
      advanced++
      advancedList.push({
        subscriptionName: sub.name,
        userEmail: sub.user.email,
        oldDate,
        newDate: nextBillingDate.toISOString().slice(0, 10),
      })
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
      } catch (err) {
        failed++
        failures.push({
          context: "renewal-email",
          subscriptionName: sub.name,
          userEmail: sub.user.email,
          error: err instanceof Error ? err.message : String(err),
        })
      }
    }

    // Step 3: renewal reminders — the user's configurable alertDaysBefore
    // (default 5) plus a fixed 2-day reminder. Each is deduped independently
    // by its own scheduledFor date, so one can't block the other.
    const users = await prisma.user.findMany({
      where: { subscriptions: { some: { status: "ACTIVE" } }, emailSuppressedAt: null },
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

          eligible++

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

            // Nota: se um utilizador for suprimido pelo webhook entre esta query e
            // o envio, a guarda sendToUser salta o email mas devolve sucesso, pelo
            // que o Alert fica marcado SENT apesar de nada ter saído. Janela de
            // segundos, impacto só no registo de auditoria (não em envio real nem
            // no indicador de saúde). Aceite conscientemente — não corrigir sem
            // motivo que justifique alterar o contrato de sendToUser.
            await prisma.alert.update({ where: { id: alertRecord.id }, data: { status: "SENT", sentAt: new Date() } })
            sent++
            remindersSent.push({ daysUntil: offsetDays, subscriptionName: sub.name, userEmail: user.email })
          } catch (err) {
            await prisma.alert.update({ where: { id: alertRecord.id }, data: { status: "FAILED" } })
            failed++
            failures.push({
              context: `reminder-${offsetDays}d`,
              subscriptionName: sub.name,
              userEmail: user.email,
              error: err instanceof Error ? err.message : String(err),
            })
          }
        }
      }
    }

    // Step 4: the dead man's switch. Fired here, after the work and before
    // any decision about email, so that a quiet day or a failing mailer can
    // never be mistaken for a cron that did not run.
    const healthcheckPing = await pingHealthcheck("")

    // Step 5: admin daily summary — always sent, even on a zero-activity day.
    const yesterday = new Date(Date.now() - 24 * 3600 * 1000)
    const [newUsers, totalUsers, totalActiveSubscriptions] = await Promise.all([
      prisma.user.findMany({
        where: { createdAt: { gte: yesterday } },
        select: { email: true, createdAt: true },
      }),
      prisma.user.count(),
      prisma.subscription.count({ where: { status: "ACTIVE" } }),
    ])

    // Everything from here is email. It runs in its own try so a mailer
    // problem is reported in the response but never reaches the outer catch,
    // which would ping /fail and raise a false alarm about the cron itself.
    let healthEmail = "not sent: all clear"
    let emailError: string | null = null

    try {
      await sendAdminDailySummary({
        remindersSent,
        failures,
        advanced: advancedList,
        newUsers: newUsers.map((u) => ({ email: u.email, createdAt: u.createdAt.toISOString() })),
        totalUsers,
        totalActiveSubscriptions,
      })

      // Step 6: system health — sent only when there is something to say. A
      // check that throws is reported as a warning by collectHealthIndicators,
      // so a broken query cannot buy silence.
      const indicators = await collectHealthIndicators({ eligible, sent })
      const warnCount = indicators.filter((i) => i.status === "warn").length

      if (warnCount > 0) {
        await sendSystemHealthEmail({ indicators, warnCount })
        healthEmail = `sent: ${warnCount} warning(s)`
      }
    } catch (err) {
      emailError = err instanceof Error ? err.message : String(err)
      console.error("[cron/alerts] email step failed:", emailError)
    }

    return NextResponse.json({ ok: true, sent, failed, advanced, eligible, healthcheckPing, healthEmail, emailError })
  } catch (err) {
    await pingHealthcheck("/fail")
    throw err
  }
}
