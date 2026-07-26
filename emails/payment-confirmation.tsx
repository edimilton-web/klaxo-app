import {
  Body, Container, Head, Heading, Html, Img, Link, Preview, Section, Text, Hr,
} from "@react-email/components"

const DEFAULT_LOGO_URL = `${process.env.NEXT_PUBLIC_APP_URL ?? "https://app.klaxo.app"}/email/logo.png`

interface PaymentConfirmationEmailProps {
  userName: string
  subscriptionName: string
  amount: number
  currency: string
  dueDate: string
  confirmUrl: string
  logoUrl?: string
}

export function PaymentConfirmationEmail({
  userName,
  subscriptionName,
  amount,
  currency,
  dueDate,
  confirmUrl,
  logoUrl = DEFAULT_LOGO_URL,
}: PaymentConfirmationEmailProps) {
  const formatted = new Intl.NumberFormat("en-GB", { style: "currency", currency }).format(amount)
  const dateFormatted = new Intl.DateTimeFormat("en-GB", { day: "2-digit", month: "long", year: "numeric" }).format(new Date(dueDate))

  return (
    <Html lang="en">
      <Head />
      <Preview>{subscriptionName} renewed yesterday — did you pay?</Preview>
      <Body style={{ backgroundColor: "#f8fafc", fontFamily: "Inter, -apple-system, sans-serif", margin: 0, padding: "40px 0" }}>
        <Container style={{ maxWidth: "560px", margin: "0 auto" }}>
          <Section style={{ backgroundColor: "#ffffff", borderRadius: "16px", padding: "40px", border: "1px solid #e2e8f0" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "32px" }}>
              <Img src={logoUrl} width="36" height="36" alt="Klaxo" style={{ borderRadius: "10px", display: "block" }} />
              <span style={{ fontSize: "20px", fontWeight: "700", color: "#0f172a" }}>Klaxo</span>
            </div>

            <Heading style={{ fontSize: "22px", fontWeight: "700", color: "#0f172a", margin: "0 0 8px 0" }}>
              {subscriptionName} renewed yesterday — did you pay?
            </Heading>
            <Text style={{ color: "#64748b", fontSize: "15px", margin: "0 0 24px 0" }}>
              Hi {userName},
            </Text>

            <Section style={{ backgroundColor: "#fff7ed", borderRadius: "12px", padding: "20px", border: "1px solid #fed7aa", marginBottom: "24px" }}>
              <Text style={{ margin: 0, fontSize: "13px", color: "#ea580c", fontWeight: "600", textTransform: "uppercase", letterSpacing: "0.05em" }}>Renewal due yesterday</Text>
              <Text style={{ margin: "4px 0 0 0", fontSize: "22px", fontWeight: "700", color: "#0f172a" }}>{subscriptionName}</Text>
              <Text style={{ margin: "8px 0 0 0", fontSize: "28px", fontWeight: "800", color: "#ea580c" }}>{formatted}</Text>
              <Text style={{ margin: "4px 0 0 0", fontSize: "14px", color: "#64748b" }}>Was due on {dateFormatted}</Text>
            </Section>

            <Text style={{ color: "#475569", fontSize: "15px", lineHeight: "1.6", marginBottom: "28px" }}>
              Your {subscriptionName} subscription was due yesterday ({formatted}).
              If you&apos;ve already paid, mark it as confirmed so Klaxo can update your next renewal date.
            </Text>

            <Link
              href={confirmUrl}
              style={{ backgroundColor: "#6C47FF", color: "white", padding: "14px 28px", borderRadius: "10px", textDecoration: "none", fontWeight: "600", fontSize: "15px", display: "inline-block" }}
            >
              Mark as paid →
            </Link>

            <Hr style={{ borderColor: "#e2e8f0", margin: "32px 0 20px 0" }} />

            <Text style={{ color: "#94a3b8", fontSize: "13px", lineHeight: "1.6" }}>
              If you haven&apos;t paid yet, ignore this email. The subscription will remain marked as overdue in Klaxo until you confirm payment.
            </Text>
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

export default PaymentConfirmationEmail
