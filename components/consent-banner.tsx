"use client"
import { useState, useEffect } from "react"
import Script from "next/script"
import { getStoredConsent, saveConsent, applyConsent, type ConsentChoice } from "@/lib/consent"

export function ConsentBanner() {
  const [visible, setVisible] = useState(false)
  const [customizing, setCustomizing] = useState(false)
  const [analytics, setAnalytics] = useState(true)
  const [marketing, setMarketing] = useState(true)
  const [consent, setConsent] = useState<ConsentChoice | null>(null)

  useEffect(() => {
    const stored = getStoredConsent()
    if (stored) {
      applyConsent(stored)
      setConsent(stored)
    } else {
      setVisible(true)
    }
  }, [])

  function accept(next: ConsentChoice) {
    saveConsent(next)
    applyConsent(next)
    setConsent(next)
    setVisible(false)
  }

  return (
    <>
      {(consent?.analytics || consent?.marketing) && (
        <>
          <Script
            src="https://www.googletagmanager.com/gtag/js?id=G-2T6K61JYF9"
            strategy="afterInteractive"
          />
          <Script id="google-tag-config" strategy="afterInteractive">
            {`
              gtag('js', new Date());
              ${consent?.analytics ? `
              gtag('config', 'G-2T6K61JYF9', {
                linker: { domains: ['klaxo.app', 'www.klaxo.app', 'app.klaxo.app'] }
              });` : ""}
              ${consent?.marketing ? `
              gtag('config', 'AW-18335473780');` : ""}
            `}
          </Script>
        </>
      )}
      {consent?.marketing && (
        <Script id="meta-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '968536769219649');
            fbq('track', 'PageView');
          `}
        </Script>
      )}

      {visible && (
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
      )}
    </>
  )
}
