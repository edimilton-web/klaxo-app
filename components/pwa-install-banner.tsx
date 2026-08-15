"use client"
import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import { KlaxoLogo } from "@/components/klaxo-logo"

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>
}

const DISMISSED_KEY = "pwa-install-dismissed-v1"

export function PwaInstallBanner() {
  const [prompt, setPrompt] = useState<BeforeInstallPromptEvent | null>(null)
  const [isIos, setIsIos] = useState(false)
  const [visible, setVisible] = useState(false)

  // Paid landing pages carry a single call to action; a second prompt in the
  // corner competes with it.
  const pathname = usePathname()
  const onLandingPage = pathname?.startsWith("/lp/") ?? false

  useEffect(() => {
    if (onLandingPage) return
    if (window.matchMedia("(display-mode: standalone)").matches) return
    if (localStorage.getItem(DISMISSED_KEY)) return

    const ua = navigator.userAgent
    const ios = /iphone|ipad|ipod/i.test(ua) && !(window as any).MSStream

    if (ios) {
      const isSafari = /^((?!chrome|android).)*safari/i.test(ua)
      if (isSafari) { setIsIos(true); setTimeout(() => setVisible(true), 2000) }
      return
    }

    const early = (window as any).__pwaPrompt as BeforeInstallPromptEvent | null
    if (early) {
      setPrompt(early)
      setTimeout(() => setVisible(true), 2000)
      return
    }

    const handler = (e: Event) => {
      e.preventDefault()
      setPrompt(e as BeforeInstallPromptEvent)
      setTimeout(() => setVisible(true), 2000)
    }
    window.addEventListener("beforeinstallprompt", handler)
    return () => window.removeEventListener("beforeinstallprompt", handler)
  }, [onLandingPage])

  function dismiss() {
    localStorage.setItem(DISMISSED_KEY, "1")
    setVisible(false)
  }

  async function install() {
    if (!prompt) return
    await prompt.prompt()
    const { outcome } = await prompt.userChoice
    if (outcome === "accepted") {
      setVisible(false)
    } else {
      dismiss()
    }
  }

  if (onLandingPage || !visible) return null

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 mx-auto max-w-sm rounded-2xl border border-white/[0.08] bg-[#111118] p-4 shadow-2xl shadow-black/60 md:left-auto md:right-6 md:max-w-xs">
      <div className="flex items-start gap-3">
        <KlaxoLogo size="xs" />
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-white">Install Klaxo</p>
          {isIos ? (
            <p className="mt-0.5 text-xs text-white/45">
              Tap <strong className="text-white/70">Share</strong> → <strong className="text-white/70">Add to Home Screen</strong>
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
