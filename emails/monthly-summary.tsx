import {
  Body, Container, Head, Heading, Html, Img, Link, Preview, Section, Text, Hr, Row, Column,
} from "@react-email/components"

const DEFAULT_LOGO_URL = `${process.env.NEXT_PUBLIC_APP_URL ?? "https://app.klaxo.app"}/email/logo.png`

interface MonthlySummaryEmailProps {
  userName: string
  totalMonthlyEur: number
  totalAnnualEur: number
  subscriptions: Array<{ name: string; amountEur: number; billingCycle: string }>
  month: string
  logoUrl?: string
}

const CYCLE_LABELS: Record<string, string> = { WEEKLY: "Weekly", MONTHLY: "Monthly", YEARLY: "Yearly" }

export function MonthlySummaryEmail({
  userName,
  totalMonthlyEur,
  totalAnnualEur,
  subscriptions,
  month,
  logoUrl = DEFAULT_LOGO_URL,
}: MonthlySummaryEmailProps) {
  const fmt = (v: number) => new Intl.NumberFormat("en-GB", { style: "currency", currency: "EUR" }).format(v)

  return (
    <Html lang="en">
      <Head />
      <Preview>Your Klaxo summary for {month} — {fmt(totalMonthlyEur)}/month in subscriptions</Preview>
      <Body style={{ backgroundColor: "#f8fafc", fontFamily: "Inter, -apple-system, sans-serif", margin: 0, padding: "40px 0" }}>
        <Container style={{ maxWidth: "560px", margin: "0 auto" }}>
          <Section style={{ backgroundColor: "#6C47FF", borderRadius: "16px 16px 0 0", padding: "32px 40px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "20px" }}>
              <Img src={logoUrl} width="36" height="36" alt="Klaxo" style={{ borderRadius: "10px", display: "block" }} />
              <span style={{ fontSize: "20px", fontWeight: "700", color: "white" }}>Klaxo</span>
            </div>
            <Heading style={{ fontSize: "24px", fontWeight: "700", color: "white", margin: "0 0 4px 0" }}>
              {month} summary
            </Heading>
            <Text style={{ color: "rgba(255,255,255,0.8)", margin: 0, fontSize: "14px" }}>Hi {userName}, here&apos;s your monthly overview</Text>
          </Section>

          <Section style={{ backgroundColor: "#ffffff", padding: "32px 40px", border: "1px solid #e2e8f0", borderTop: "none" }}>
            <Row style={{ marginBottom: "24px" }}>
              <Column style={{ textAlign: "center", padding: "16px", backgroundColor: "#f8f4ff", borderRadius: "12px" }}>
                <Text style={{ margin: 0, fontSize: "12px", color: "#7c3aed", fontWeight: "600", textTransform: "uppercase" }}>Monthly</Text>
                <Text style={{ margin: "4px 0 0 0", fontSize: "28px", fontWeight: "800", color: "#6C47FF" }}>{fmt(totalMonthlyEur)}</Text>
              </Column>
              <Column style={{ width: "16px" }} />
              <Column style={{ textAlign: "center", padding: "16px", backgroundColor: "#f1f5f9", borderRadius: "12px" }}>
                <Text style={{ margin: 0, fontSize: "12px", color: "#475569", fontWeight: "600", textTransform: "uppercase" }}>Yearly</Text>
                <Text style={{ margin: "4px 0 0 0", fontSize: "28px", fontWeight: "800", color: "#0f172a" }}>{fmt(totalAnnualEur)}</Text>
              </Column>
            </Row>

            <Text style={{ fontSize: "14px", fontWeight: "600", color: "#0f172a", marginBottom: "12px" }}>
              {subscriptions.length} active subscription{subscriptions.length !== 1 ? "s" : ""}
            </Text>

            {subscriptions.map((sub, i) => (
              <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0", borderBottom: "1px solid #f1f5f9" }}>
                <div>
                  <Text style={{ margin: 0, fontSize: "14px", fontWeight: "500", color: "#0f172a" }}>{sub.name}</Text>
                  <Text style={{ margin: 0, fontSize: "12px", color: "#94a3b8" }}>{CYCLE_LABELS[sub.billingCycle] ?? sub.billingCycle}</Text>
                </div>
                <Text style={{ margin: 0, fontSize: "14px", fontWeight: "600", color: "#0f172a" }}>{fmt(sub.amountEur)}</Text>
              </div>
            ))}

            <Hr style={{ borderColor: "#e2e8f0", margin: "24px 0" }} />

            <Link href={`${process.env.NEXT_PUBLIC_APP_URL}/dashboard`} style={{ backgroundColor: "#6C47FF", color: "white", padding: "12px 24px", borderRadius: "10px", textDecoration: "none", fontWeight: "600", fontSize: "14px", display: "inline-block" }}>
              View full dashboard
            </Link>
          </Section>

          <Section style={{ backgroundColor: "#ffffff", borderRadius: "0 0 16px 16px", padding: "16px 40px", border: "1px solid #e2e8f0", borderTopWidth: 0 }}>
            <Text style={{ color: "#94a3b8", fontSize: "12px", textAlign: "center", margin: 0 }}>
              Klaxo · Personal subscription manager ·{" "}
              <Link href={`${process.env.NEXT_PUBLIC_APP_URL}/settings`} style={{ color: "#94a3b8" }}>Unsubscribe</Link>
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  )
}

export default MonthlySummaryEmail
