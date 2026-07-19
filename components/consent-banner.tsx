"use client"
import { useState, useEffect } from "react"
import { getStoredConsent, saveConsent, applyConsent, type ConsentChoice } from "@/lib/consent"

export function ConsentBanner() {
  const [visible, setVisible] = useState(false)
  const [customizing, setCustomizing] = useState(false)
  const [analytics, setAnalytics] = useState(true)
  const [marketing, setMarketing] = useState(true)

  useEffect(() => {
    const stored = getStoredConsent()
    if (stored) {
      applyConsent(stored)
    } else {
      setVisible(true)
    }
  }, [])

  function accept(consent: ConsentChoice) {
    saveConsent(consent)
    applyConsent(consent)
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 mx-auto max-w-md rounded-2xl border border-white/[0.08] bg-[#111118] p-4 shadow-2xl shadow-black/60 md:left-6">
      <p className="text-sm font-semibold text-white">We use cookies</p>
      <p className="mt-1 text-xs leading-relaxed text-white/45">
        We use analytics and marketing cookies to understand usage and measure ad performance. You can accept, reject, or customize your choice.
      </p>

      {customizing && (
        <div className="mt-3 space-y-2 rounded-xl border border-white/[0.08] bg-white/[0.02] p-3">
          <label className="flex items-center justify-between gap-3 text-xs text-white/70">
            Analytics (GA4)
            <input type="checkbox" checked={analytics} onChange={(e) => setAnalytics(e.target.checked)} />
          </label>
          <label className="flex items-center justify-between gap-3 text-xs text-white/70">
            Marketing (Meta/Google Ads)
            <input type="checkbox" checked={marketing} onChange={(e) => setMarketing(e.target.checked)} />
          </label>
        </div>
      )}

      <div className="mt-3 flex flex-wrap gap-2">
        <button
          onClick={() => accept({ analytics: true, marketing: true })}
          className="flex-1 rounded-xl bg-violet-600 py-2 text-xs font-semibold text-white transition-colors hover:bg-violet-500"
        >
          Accept all
        </button>
        <button
          onClick={() => accept({ analytics: false, marketing: false })}
          className="flex-1 rounded-xl border border-white/[0.12] py-2 text-xs font-semibold text-white/70 transition-colors hover:text-white"
        >
          Reject
        </button>
        {customizing ? (
          <button
            onClick={() => accept({ analytics, marketing })}
            className="w-full rounded-xl border border-violet-500/30 py-2 text-xs font-semibold text-violet-300 transition-colors hover:text-violet-200"
          >
            Save preferences
          </button>
        ) : (
          <button
            onClick={() => setCustomizing(true)}
            className="w-full py-1 text-xs text-white/35 transition-colors hover:text-white/60"
          >
            Customize
          </button>
        )}
      </div>
    </div>
  )
}
