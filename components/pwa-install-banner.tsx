"use client"
import { useState, useEffect } from "react"
import { KlaxoLogo } from "@/components/klaxo-logo"

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>
}

export function PwaInstallBanner() {
  const [prompt, setPrompt] = useState<BeforeInstallPromptEvent | null>(null)
  const [isIos, setIsIos] = useState(false)
  const [isInstalled, setIsInstalled] = useState(false)
  const [dismissed, setDismissed] = useState(false)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    // Already installed (standalone mode)
    if (window.matchMedia("(display-mode: standalone)").matches) {
      setIsInstalled(true)
      return
    }
    // Dismissed before
    if (sessionStorage.getItem("pwa-banner-dismissed")) return

    const ios = /iphone|ipad|ipod/i.test(navigator.userAgent) && !(window as any).MSStream
    setIsIos(ios)

    if (ios) {
      // Only show on Safari (no Chrome on iOS)
      const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent)
      if (isSafari) setTimeout(() => setVisible(true), 2000)
      return
    }

    const handler = (e: Event) => {
      e.preventDefault()
      setPrompt(e as BeforeInstallPromptEvent)
      setTimeout(() => setVisible(true), 2000)
    }
    window.addEventListener("beforeinstallprompt", handler)
    return () => window.removeEventListener("beforeinstallprompt", handler)
  }, [])

  function dismiss() {
    sessionStorage.setItem("pwa-banner-dismissed", "1")
    setDismissed(true)
    setVisible(false)
  }

  async function install() {
    if (!prompt) return
    await prompt.prompt()
    const { outcome } = await prompt.userChoice
    if (outcome === "accepted") setIsInstalled(true)
    dismiss()
  }

  if (isInstalled || dismissed || !visible) return null

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 mx-auto max-w-sm rounded-2xl border border-white/[0.08] bg-[#111118] p-4 shadow-2xl shadow-black/60 md:left-auto md:right-6 md:max-w-xs">
      <div className="flex items-start gap-3">
        <KlaxoLogo size="xs" />
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-white">Install Klaxo</p>
          {isIos ? (
            <p className="mt-0.5 text-xs text-white/45">
              Tap{" "}
              <svg className="inline h-3.5 w-3.5 align-middle" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
              </svg>
              {" "}then <strong className="text-white/70">Add to Home Screen</strong>
            </p>
          ) : (
            <p className="mt-0.5 text-xs text-white/45">Quick access without opening a browser</p>
          )}
        </div>
        <button onClick={dismiss} className="flex-shrink-0 text-white/25 hover:text-white/60 transition-colors">
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {!isIos && (
        <button
          onClick={install}
          className="mt-3 w-full rounded-xl bg-violet-600 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-violet-500"
        >
          Install
        </button>
      )}
    </div>
  )
}
