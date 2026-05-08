import {
  Body, Container, Head, Heading, Html, Link, Preview, Section, Text, Hr,
} from "@react-email/components"

interface VerifyEmailProps {
  userName: string
  verifyUrl: string
}

export function VerifyEmail({ userName, verifyUrl }: VerifyEmailProps) {
  return (
    <Html lang="en">
      <Head />
      <Preview>Confirma o teu email para ativar a tua conta Klaxo</Preview>
      <Body style={{ backgroundColor: "#f8fafc", fontFamily: "Inter, -apple-system, sans-serif", margin: 0, padding: "40px 0" }}>
        <Container style={{ maxWidth: "560px", margin: "0 auto" }}>
          <Section style={{ backgroundColor: "#ffffff", borderRadius: "16px", padding: "40px", border: "1px solid #e2e8f0" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "32px" }}>
              <div style={{ backgroundColor: "#6C47FF", borderRadius: "10px", width: "36px", height: "36px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span style={{ color: "white", fontWeight: "800", fontSize: "18px" }}>K</span>
              </div>
              <span style={{ fontSize: "20px", fontWeight: "700", color: "#0f172a" }}>Klaxo</span>
            </div>

            <Heading style={{ fontSize: "22px", fontWeight: "700", color: "#0f172a", margin: "0 0 8px 0" }}>
              Confirma o teu email
            </Heading>
            <Text style={{ color: "#64748b", fontSize: "15px", margin: "0 0 24px 0" }}>
              Olá {userName},<br /><br />
              Obrigado por criares uma conta no Klaxo. Clica no botão abaixo para verificar o teu email e ativar a tua conta.
            </Text>

            <Link
              href={verifyUrl}
              style={{ backgroundColor: "#6C47FF", color: "white", padding: "14px 28px", borderRadius: "10px", textDecoration: "none", fontWeight: "600", fontSize: "15px", display: "inline-block" }}
            >
              Verificar email
            </Link>

            <Text style={{ color: "#94a3b8", fontSize: "13px", marginTop: "24px" }}>
              Este link expira em 24 horas. Se não criaste uma conta no Klaxo, podes ignorar este email.
            </Text>

            <Hr style={{ borderColor: "#e2e8f0", margin: "24px 0" }} />

            <Text style={{ color: "#94a3b8", fontSize: "12px" }}>
              Ou copia este link para o teu browser:<br />
              <Link href={verifyUrl} style={{ color: "#6C47FF", wordBreak: "break-all" }}>{verifyUrl}</Link>
            </Text>
          </Section>

          <Text style={{ color: "#94a3b8", fontSize: "12px", textAlign: "center", marginTop: "24px" }}>
            Klaxo · Gestor de subscrições pessoal
          </Text>
        </Container>
      </Body>
    </Html>
  )
}

export default VerifyEmail
