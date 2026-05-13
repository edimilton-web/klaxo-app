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
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (window.matchMedia("(display-mode: standalone)").matches) return
    if (sessionStorage.getItem("pwa-banner-dismissed")) return

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
  }, [])

  function dismiss() {
    sessionStorage.setItem("pwa-banner-dismissed", "1")
    setVisible(false)
  }

  async function install() {
    if (!prompt) return
    await prompt.prompt()
    const { outcome } = await prompt.userChoice
    if (outcome === "accepted") setVisible(false)
    else dismiss()
  }

  if (!visible) return null

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 mx-auto max-w-sm rounded-2xl border border-white/[0.08] bg-[#111118] p-4 shadow-2xl shadow-black/60 md:left-auto md:right-6 md:max-w-xs">
      <div className="flex items-start gap-3">
        <KlaxoLogo size="xs" />
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-white">Instala o Klaxo</p>
          {isIos ? (
            <p className="mt-0.5 text-xs text-white/45">
              Toca em <strong className="text-white/70">Partilhar</strong> → <strong className="text-white/70">Adicionar ao ecrã inicial</strong>
            </p>
          ) : (
            <p className="mt-0.5 text-xs text-white/45">Acesso rápido sem abrir o browser</p>
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
          Instalar
        </button>
      )}
    </div>
  )
}
