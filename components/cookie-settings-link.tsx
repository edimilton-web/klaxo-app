"use client"
import { resetConsent } from "@/lib/consent"

export function CookieSettingsLink({ className }: { className?: string }) {
  return (
    <button onClick={resetConsent} className={className}>
      Cookie settings
    </button>
  )
}
