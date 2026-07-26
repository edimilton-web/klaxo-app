import {
  Body, Container, Head, Heading, Html, Img, Link, Preview, Section, Text, Hr,
} from "@react-email/components"

const DEFAULT_LOGO_URL = `${process.env.NEXT_PUBLIC_APP_URL ?? "https://app.klaxo.app"}/email/logo.png`

interface RenewalAlertEmailProps {
  userName: string
  subscriptionName: string
  amount: number
  currency: string
  daysUntil: number
  nextBillingDate: string
  logoUrl?: string
}

export function RenewalAlertEmail({
  userName,
  subscriptionName,
  amount,
  currency,
  daysUntil,
  nextBillingDate,
  logoUrl = DEFAULT_LOGO_URL,
}: RenewalAlertEmailProps) {
  const formatted = new Intl.NumberFormat("en-GB", { style: "currency", currency }).format(amount)
  const dateFormatted = new Intl.DateTimeFormat("en-GB", { day: "2-digit", month: "long", year: "numeric" }).format(new Date(nextBillingDate))
  const preview = `${subscriptionName} renews ${daysUntil === 0 ? "today" : `in ${daysUntil} days`} — ${formatted}`

  return (
    <Html lang="en">
      <Head />
      <Preview>{preview}</Preview>
      <Body style={{ backgroundColor: "#f8fafc", fontFamily: "Inter, -apple-system, sans-serif", margin: 0, padding: "40px 0" }}>
        <Container style={{ maxWidth: "560px", margin: "0 auto" }}>
          <Section style={{ backgroundColor: "#ffffff", borderRadius: "16px", padding: "40px", border: "1px solid #e2e8f0" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "32px" }}>
              <Img src={logoUrl} width="36" height="36" alt="Klaxo" style={{ borderRadius: "10px", display: "block" }} />
              <span style={{ fontSize: "20px", fontWeight: "700", color: "#0f172a" }}>Klaxo</span>
            </div>

            <Heading style={{ fontSize: "22px", fontWeight: "700", color: "#0f172a", margin: "0 0 8px 0" }}>
              Renewal reminder
            </Heading>
            <Text style={{ color: "#64748b", fontSize: "15px", margin: "0 0 24px 0" }}>
              Hi {userName},
            </Text>

            <Section style={{ backgroundColor: "#f8f4ff", borderRadius: "12px", padding: "20px", border: "1px solid #e9d5ff", marginBottom: "24px" }}>
              <Text style={{ margin: 0, fontSize: "14px", color: "#7c3aed", fontWeight: "600" }}>SUBSCRIPTION</Text>
              <Text style={{ margin: "4px 0 0 0", fontSize: "22px", fontWeight: "700", color: "#0f172a" }}>{subscriptionName}</Text>
              <Text style={{ margin: "8px 0 0 0", fontSize: "24px", fontWeight: "800", color: "#6C47FF" }}>{formatted}</Text>
              <Text style={{ margin: "4px 0 0 0", fontSize: "14px", color: "#64748b" }}>
                {daysUntil === 0 ? "Renews today" : `Renews in ${daysUntil} days`} · {dateFormatted}
              </Text>
            </Section>

            <Text style={{ color: "#64748b", fontSize: "14px", lineHeight: "1.6" }}>
              Make sure your payment method is active to avoid any interruptions to your service.
            </Text>

            <Hr style={{ borderColor: "#e2e8f0", margin: "24px 0" }} />

            <Link href={`${process.env.NEXT_PUBLIC_APP_URL}/subscriptions`} style={{ backgroundColor: "#6C47FF", color: "white", padding: "12px 24px", borderRadius: "10px", textDecoration: "none", fontWeight: "600", fontSize: "14px", display: "inline-block" }}>
              View in Klaxo
            </Link>
          </Section>

          <Text style={{ color: "#94a3b8", fontSize: "12px", textAlign: "center", marginTop: "24px" }}>
            Klaxo · Personal subscription manager ·{" "}
            <Link href={`${process.env.NEXT_PUBLIC_APP_URL}/settings`} style={{ color: "#94a3b8" }}>
              Manage alerts
            </Link>
          </Text>
        </Container>
      </Body>
    </Html>
  )
}

export default RenewalAlertEmail
