export type ConsentChoice = {
  analytics: boolean
  marketing: boolean
}

const STORAGE_KEY = "klaxo_consent"

declare global {
  interface Window {
    dataLayer?: unknown[]
    gtag?: (...args: unknown[]) => void
    fbq?: (...args: unknown[]) => void
  }
}

export function getStoredConsent(): ConsentChoice | null {
  if (typeof window === "undefined") return null
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    return JSON.parse(raw) as ConsentChoice
  } catch {
    return null
  }
}

export function saveConsent(consent: ConsentChoice) {
  if (typeof window === "undefined") return
  localStorage.setItem(STORAGE_KEY, JSON.stringify(consent))
}

export function resetConsent() {
  if (typeof window === "undefined") return
  localStorage.removeItem(STORAGE_KEY)
  window.location.reload()
}

export function applyConsent(consent: ConsentChoice) {
  if (typeof window === "undefined") return

  window.gtag?.("consent", "update", {
    analytics_storage: consent.analytics ? "granted" : "denied",
    ad_storage: consent.marketing ? "granted" : "denied",
    ad_user_data: consent.marketing ? "granted" : "denied",
    ad_personalization: consent.marketing ? "granted" : "denied",
  })

  if (consent.marketing) {
    window.fbq?.("consent", "grant")
    window.fbq?.("track", "PageView")
  } else {
    window.fbq?.("consent", "revoke")
  }
}
