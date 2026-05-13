import {
  Body, Container, Head, Heading, Html, Link, Preview, Section, Text, Hr,
} from "@react-email/components"

interface ProSetupEmailProps {
  setupUrl: string
}

export function ProSetupEmail({ setupUrl }: ProSetupEmailProps) {
  return (
    <Html lang="en">
      <Head />
      <Preview>Set up your password to access Klaxo Pro</Preview>
      <Body style={{ backgroundColor: "#f8fafc", fontFamily: "Inter, -apple-system, sans-serif", margin: 0, padding: "40px 0" }}>
        <Container style={{ maxWidth: "560px", margin: "0 auto" }}>
          <Section style={{ backgroundColor: "#ffffff", borderRadius: "16px", padding: "40px", border: "1px solid #e2e8f0" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "32px" }}>
              <div style={{ backgroundColor: "#6C47FF", borderRadius: "10px", width: "36px", height: "36px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span style={{ color: "white", fontWeight: "800", fontSize: "18px" }}>K</span>
              </div>
              <span style={{ fontSize: "20px", fontWeight: "700", color: "#0f172a" }}>Klaxo</span>
            </div>

            <div style={{ backgroundColor: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: "10px", padding: "12px 16px", marginBottom: "24px" }}>
              <Text style={{ color: "#15803d", fontSize: "14px", fontWeight: "600", margin: 0 }}>
                ✓ Payment confirmed — Welcome to Klaxo Pro!
              </Text>
            </div>

            <Heading style={{ fontSize: "22px", fontWeight: "700", color: "#0f172a", margin: "0 0 8px 0" }}>
              Set up your Klaxo Pro account
            </Heading>
            <Text style={{ color: "#64748b", fontSize: "15px", margin: "0 0 24px 0" }}>
              Your payment was successful. Click the button below to set up your password and start tracking your subscriptions.
            </Text>

            <Link
              href={setupUrl}
              style={{ backgroundColor: "#6C47FF", color: "white", padding: "14px 28px", borderRadius: "10px", textDecoration: "none", fontWeight: "600", fontSize: "15px", display: "inline-block" }}
            >
              Set up my password →
            </Link>

            <Text style={{ color: "#94a3b8", fontSize: "13px", marginTop: "24px" }}>
              This link expires in 24 hours. If you didn&apos;t purchase Klaxo Pro, please contact us at{" "}
              <Link href="mailto:hello@klaxo.app" style={{ color: "#6C47FF" }}>hello@klaxo.app</Link>.
            </Text>

            <Hr style={{ borderColor: "#e2e8f0", margin: "24px 0" }} />

            <Text style={{ color: "#94a3b8", fontSize: "12px" }}>
              Or copy this link into your browser:<br />
              <Link href={setupUrl} style={{ color: "#6C47FF", wordBreak: "break-all" }}>{setupUrl}</Link>
            </Text>
          </Section>

          <Text style={{ color: "#94a3b8", fontSize: "12px", textAlign: "center", marginTop: "24px" }}>
            Klaxo · Personal subscription manager
          </Text>
        </Container>
      </Body>
    </Html>
  )
}

export default ProSetupEmail
