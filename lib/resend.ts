import { Resend } from "resend"
import { RenewalAlertEmail } from "@/emails/renewal-alert"
import { MonthlySummaryEmail } from "@/emails/monthly-summary"
import { VerifyEmail } from "@/emails/verify-email"
import { ProSetupEmail } from "@/emails/pro-setup"
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
