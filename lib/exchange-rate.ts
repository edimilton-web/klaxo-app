// Frankfurter API — free, no API key needed, powered by European Central Bank
const BASE_URL = "https://api.frankfurter.app"

let ratesCache: { rates: Record<string, number>; fetchedAt: number } | null = null
const CACHE_TTL = 3600 * 1000 // 1 hora

async function getRates(): Promise<Record<string, number>> {
  const now = Date.now()
  if (ratesCache && now - ratesCache.fetchedAt < CACHE_TTL) {
    return ratesCache.rates
  }
  try {
    const res = await fetch(`${BASE_URL}/latest?from=EUR`, { next: { revalidate: 3600 } })
    const data = await res.json()
    const rates = data.rates as Record<string, number>
    ratesCache = { rates, fetchedAt: now }
    return rates
  } catch {
    // Fallback rates if API is unavailable
    return { GBP: 0.86, USD: 1.08, CHF: 0.96, SEK: 11.5, NOK: 11.8, DKK: 7.46, PLN: 4.25 }
  }
}

export async function convertToEur(amount: number, currency: string): Promise<number> {
  if (currency === "EUR") return amount
  const rates = await getRates()
  const rate = rates[currency]
  if (!rate) return amount
  return parseFloat((amount / rate).toFixed(2))
}

export function toMonthlyEur(amountEur: number, billingCycle: string): number {
  switch (billingCycle) {
    case "WEEKLY":
      return amountEur * 4.33
    case "MONTHLY":
      return amountEur
    case "YEARLY":
      return amountEur / 12
    default:
      return amountEur
  }
}
