import { createHmac } from "crypto"

const SECRET = process.env.CRON_SECRET ?? "dev-secret"

export function generatePaymentToken(subscriptionId: string, userId: string): string {
  return createHmac("sha256", SECRET).update(`${subscriptionId}:${userId}`).digest("hex")
}

export function verifyPaymentToken(subscriptionId: string, userId: string, token: string): boolean {
  const expected = generatePaymentToken(subscriptionId, userId)
  if (expected.length !== token.length) return false
  let diff = 0
  for (let i = 0; i < expected.length; i++) {
    diff |= expected.charCodeAt(i) ^ token.charCodeAt(i)
  }
  return diff === 0
}
