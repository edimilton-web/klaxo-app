import { Resend } from "resend"
import { RenewalAlertEmail } from "@/emails/renewal-alert"
import { MonthlySummaryEmail } from "@/emails/monthly-summary"
import { VerifyEmail } from "@/emails/verify-email"
import { ProSetupEmail } from "@/emails/pro-setup"
import { PaymentConfirmationEmail } from "@/emails/payment-confirmation"
import { createElement } from "react"
import { prisma } from "@/lib/prisma"

export const resend = new Resend(process.env.RESEND_API_KEY)

const FROM = process.env.RESEND_FROM_EMAIL ?? "noreply@klaxo.app"

type EmailPayload = Parameters<typeof resend.emails.send>[0]

/**
 * Every email addressed to a user goes through here, so an address that hard
 * bounced or filed a spam complaint is never written to again — whatever the
 * email is. A dead address rejects a receipt exactly as it rejects a
 * reminder, and each attempt costs sender reputation.
 *
 * Admin mail (sendNewUserAlert, sendAdminDailySummary) calls resend directly:
 * it goes to us, and a user's dead address says nothing about ours.
 *
 * The crons already filter suppressed users out of their queries; this is the
 * backstop for the send sites that are not driven by those queries.
 */
async function sendToUser(payload: EmailPayload) {
  const to = Array.isArray(payload.to) ? payload.to[0] : payload.to

  const user = await prisma.user.findFirst({
    where: { email: { equals: to, mode: "insensitive" } },
    select: { emailSuppressedAt: true, emailSuppressReason: true },
  })

  if (user?.emailSuppressedAt) {
    console.log(`[resend] skipped ${to}: suppressed (${user.emailSuppressReason})`)
    return { data: null, error: null }
  }

  return resend.emails.send(payload)
}

export async function sendRenewalAlert({
  to,
  userName,
  subscriptionName,
  amount,
  currency,
  daysUntil,
  nextBillingDate,
}: {
  to: string
  userName: string
  subscriptionName: string
  amount: number
  currency: string
  daysUntil: number
  nextBillingDate: string
}) {
  return sendToUser({
    from: FROM,
    to,
    subject: `Renovação em ${daysUntil} dias: ${subscriptionName}`,
    react: createElement(RenewalAlertEmail, {
      userName,
      subscriptionName,
      amount,
      currency,
      daysUntil,
      nextBillingDate,
    }),
  })
}

export async function sendVerificationEmail({
  to,
  userName,
  verifyUrl,
}: {
  to: string
  userName: string
  verifyUrl: string
}) {
  return sendToUser({
    from: FROM,
    to,
    subject: "Confirma o teu email — Klaxo",
    react: createElement(VerifyEmail, { userName, verifyUrl }),
  })
}

export async function sendProSetupEmail({
  to,
  setupUrl,
}: {
  to: string
  setupUrl: string
}) {
  return sendToUser({
    from: FROM,
    to,
    subject: "Set up your Klaxo Pro account",
    react: createElement(ProSetupEmail, { setupUrl }),
  })
}

export async function sendNewUserAlert({
  email,
  name,
  authMethod,
}: {
  email: string
  name: string
  authMethod: "Google" | "Email"
}) {
  const now = new Date().toISOString().replace("T", " ").slice(0, 19) + " UTC"
  return resend.emails.send({
    from: FROM,
    to: "hello@klaxo.app",
    subject: `🎉 New Klaxo user — ${email}`,
    text: [
      "New user registered on Klaxo.",
      "",
      `Email: ${email}`,
      `Name: ${name}`,
      `Plan: Free`,
      `Date: ${now}`,
      `Auth method: ${authMethod}`,
      "",
      "→ View in dashboard: app.klaxo.app/dashboard",
    ].join("\n"),
  })
}

export async function sendPaymentConfirmationEmail({
  to,
  userName,
  subscriptionName,
  amount,
  currency,
  dueDate,
  confirmUrl,
}: {
  to: string
  userName: string
  subscriptionName: string
  amount: number
  currency: string
  dueDate: string
  confirmUrl: string
}) {
  return sendToUser({
    from: FROM,
    to,
    subject: `${subscriptionName} renewed yesterday — did you pay?`,
    react: createElement(PaymentConfirmationEmail, {
      userName,
      subscriptionName,
      amount,
      currency,
      dueDate,
      confirmUrl,
    }),
  })
}

const ADMIN_EMAIL = process.env.ADMIN_EMAIL ?? "eddie.varjao.reis@gmail.com"

export async function sendAdminDailySummary({
  remindersSent,
  failures,
  advanced,
  newUsers,
  totalUsers,
  totalActiveSubscriptions,
}: {
  remindersSent: Array<{ daysUntil: number; subscriptionName: string; userEmail: string }>
  failures: Array<{ context: string; subscriptionName: string; userEmail: string; error: string }>
  advanced: Array<{ subscriptionName: string; userEmail: string; oldDate: string; newDate: string }>
  newUsers: Array<{ email: string; createdAt: string }>
  totalUsers: number
  totalActiveSubscriptions: number
}) {
  const subject = `Klaxo daily — ${remindersSent.length} lembretes, ${newUsers.length} novos users`

  const lines = [
    `Klaxo — resumo diário`,
    ``,
    `Lembretes enviados hoje: ${remindersSent.length}`,
    ...remindersSent.map((r) => `  - [${r.daysUntil}d] ${r.subscriptionName} (${r.userEmail})`),
    ``,
    `Falhas: ${failures.length}`,
    ...failures.map((f) => `  - [${f.context}] ${f.subscriptionName} (${f.userEmail}): ${f.error}`),
    ``,
    `Subscrições avançadas automaticamente: ${advanced.length}`,
    ...advanced.map((a) => `  - ${a.subscriptionName} (${a.userEmail}): ${a.oldDate} -> ${a.newDate}`),
    ``,
    `Novos utilizadores (24h): ${newUsers.length}`,
    ...newUsers.map((u) => `  - ${u.email} (${u.createdAt})`),
    ``,
    `Total de utilizadores: ${totalUsers}`,
    `Total de subscrições ativas: ${totalActiveSubscriptions}`,
    ``,
    remindersSent.length === 0 && failures.length === 0 && advanced.length === 0 && newUsers.length === 0
      ? "Tudo ok, nada a reportar."
      : "",
  ]

  return resend.emails.send({
    from: FROM,
    to: ADMIN_EMAIL,
    subject,
    text: lines.join("\n"),
  })
}

/**
 * System health email. Sent only when something needs attention — see
 * lib/system-health.ts. Goes to the admin, so it does not pass through
 * sendToUser.
 *
 * From alerts@klaxo.app: the klaxo.app domain is verified in Resend, so this
 * inherits SPF/DKIM. Outbound only, no mailbox behind it.
 */
export async function sendSystemHealthEmail({
  indicators,
  warnCount,
}: {
  indicators: Array<{ label: string; status: "ok" | "warn"; detail: string; message?: string }>
  warnCount: number
}) {
  const lines = [
    `Klaxo — saúde do sistema`,
    `${new Date().toISOString().replace("T", " ").slice(0, 19)} UTC`,
    ``,
    // An indicator may carry a full sentence, for lines that read badly as
    // "label: detail" — see the Stripe access failure.
    ...indicators.map((i) => `${i.status === "warn" ? "⚠" : "✓"} ${i.message ?? `${i.label}: ${i.detail}`}`),
    ``,
    `Só recebes este email quando há avisos. Silêncio significa tudo ✓.`,
  ]

  return resend.emails.send({
    from: "alerts@klaxo.app",
    to: ADMIN_EMAIL,
    subject: `⚠ Klaxo saúde: ${warnCount} aviso(s)`,
    text: lines.join("\n"),
  })
}

export async function sendMonthlySummary({
  to,
  userName,
  totalMonthlyEur,
  totalAnnualEur,
  subscriptions,
  month,
}: {
  to: string
  userName: string
  totalMonthlyEur: number
  totalAnnualEur: number
  subscriptions: Array<{ name: string; amountEur: number; billingCycle: string }>
  month: string
}) {
  return sendToUser({
    from: FROM,
    to,
    subject: `O teu resumo Klaxo de ${month}`,
    react: createElement(MonthlySummaryEmail, {
      userName,
      totalMonthlyEur,
      totalAnnualEur,
      subscriptions,
      month,
    }),
  })
}
