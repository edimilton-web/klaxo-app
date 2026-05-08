import { Resend } from "resend"
import { RenewalAlertEmail } from "@/emails/renewal-alert"
import { MonthlySummaryEmail } from "@/emails/monthly-summary"
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
