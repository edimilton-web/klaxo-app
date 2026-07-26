import {
  Body, Container, Head, Heading, Html, Img, Link, Preview, Section, Text, Hr,
} from "@react-email/components"

const DEFAULT_LOGO_URL = `${process.env.NEXT_PUBLIC_APP_URL ?? "https://app.klaxo.app"}/email/logo.png`

interface VerifyEmailProps {
  userName: string
  verifyUrl: string
  logoUrl?: string
}

export function VerifyEmail({ userName, verifyUrl, logoUrl = DEFAULT_LOGO_URL }: VerifyEmailProps) {
  return (
    <Html lang="en">
      <Head />
      <Preview>Verify your email to activate your Klaxo account</Preview>
      <Body style={{ backgroundColor: "#f8fafc", fontFamily: "Inter, -apple-system, sans-serif", margin: 0, padding: "40px 0" }}>
        <Container style={{ maxWidth: "560px", margin: "0 auto" }}>
          <Section style={{ backgroundColor: "#ffffff", borderRadius: "16px", padding: "40px", border: "1px solid #e2e8f0" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "32px" }}>
              <Img src={logoUrl} width="36" height="36" alt="Klaxo" style={{ borderRadius: "10px", display: "block" }} />
              <span style={{ fontSize: "20px", fontWeight: "700", color: "#0f172a" }}>Klaxo</span>
            </div>

            <Heading style={{ fontSize: "22px", fontWeight: "700", color: "#0f172a", margin: "0 0 8px 0" }}>
              Verify your email
            </Heading>
            <Text style={{ color: "#64748b", fontSize: "15px", margin: "0 0 24px 0" }}>
              Hi {userName},<br /><br />
              Thanks for signing up for Klaxo. Click the button below to verify your email and activate your account.
            </Text>

            <Link
              href={verifyUrl}
              style={{ backgroundColor: "#6C47FF", color: "white", padding: "14px 28px", borderRadius: "10px", textDecoration: "none", fontWeight: "600", fontSize: "15px", display: "inline-block" }}
            >
              Verify email
            </Link>

            <Text style={{ color: "#94a3b8", fontSize: "13px", marginTop: "24px" }}>
              This link expires in 24 hours. If you didn&apos;t create a Klaxo account, you can safely ignore this email.
            </Text>

            <Hr style={{ borderColor: "#e2e8f0", margin: "24px 0" }} />

            <Text style={{ color: "#94a3b8", fontSize: "12px" }}>
              Or copy this link into your browser:<br />
              <Link href={verifyUrl} style={{ color: "#6C47FF", wordBreak: "break-all" }}>{verifyUrl}</Link>
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

export default VerifyEmail
