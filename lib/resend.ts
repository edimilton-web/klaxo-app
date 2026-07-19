import { Resend } from "resend"
import { RenewalAlertEmail } from "@/emails/renewal-alert"
import { MonthlySummaryEmail } from "@/emails/monthly-summary"
import { VerifyEmail } from "@/emails/verify-email"
import { ProSetupEmail } from "@/emails/pro-setup"
import { PaymentConfirmationEmail } from "@/emails/payment-confirmation"
import { createElement } from "react"

export const resend = new Resend(process.env.RESEND_API_KEY)

const FROM = process.env.RESEND_FROM_EMAIL ?? "noreply@klaxo.app"

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
  return resend.emails.send({
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
  return resend.emails.send({
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
  return resend.emails.send({
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
  return resend.emails.send({
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
  return resend.emails.send({
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
