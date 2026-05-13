"use client"
import { useState, useEffect } from "react"

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>
}

type Platform = "ready" | "ios" | "desktop" | "installed" | "unsupported"

export function PwaInstallButton() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null)
  const [platform, setPlatform] = useState<Platform>("unsupported")
  const [hint, setHint] = useState(false)

  useEffect(() => {
    if (window.matchMedia("(display-mode: standalone)").matches) {
      setPlatform("installed")
      return
    }

    const ua = navigator.userAgent
    const isIos = /iphone|ipad|ipod/i.test(ua) && !(window as any).MSStream
    if (isIos) {
      const isSafari = /^((?!chrome|android).)*safari/i.test(ua)
      setPlatform(isSafari ? "ios" : "unsupported")
      return
    }

    const handler = (e: Event) => {
      e.preventDefault()
      setDeferredPrompt(e as BeforeInstallPromptEvent)
      setPlatform("ready")
    }
    window.addEventListener("beforeinstallprompt", handler)

    // Fallback: if event didn't fire after 1.5s, show desktop instructions
    const timer = setTimeout(() => {
      setPlatform((prev) => (prev === "unsupported" ? "desktop" : prev))
    }, 1500)

    return () => {
      window.removeEventListener("beforeinstallprompt", handler)
      clearTimeout(timer)
    }
  }, [])

  async function handleClick() {
    if (platform === "ready" && deferredPrompt) {
      await deferredPrompt.prompt()
      const { outcome } = await deferredPrompt.userChoice
      if (outcome === "accepted") setPlatform("installed")
      setDeferredPrompt(null)
      return
    }
    setHint((h) => !h)
  }

  if (platform === "installed" || platform === "unsupported") return null

  return (
    <div className="mt-2">
      <button
        onClick={handleClick}
        className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-sm text-violet-400 hover:bg-violet-600/10 transition-colors"
      >
        <svg className="h-4 w-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
        </svg>
        Install app
      </button>

      {hint && platform === "ios" && (
        <div className="mt-2 mx-3 rounded-xl bg-white/[0.04] border border-white/[0.06] p-3 text-xs text-white/50 leading-relaxed space-y-1">
          <p>1. Toca em <strong className="text-white/70">Partilhar</strong> <span className="text-white/30">(ícone no fundo do Safari)</span></p>
          <p>2. Escolhe <strong className="text-white/70">Adicionar ao ecrã inicial</strong></p>
          <p>3. Confirma com <strong className="text-white/70">Adicionar</strong></p>
        </div>
      )}

      {hint && platform === "desktop" && (
        <div className="mt-2 mx-3 rounded-xl bg-white/[0.04] border border-white/[0.06] p-3 text-xs text-white/50 leading-relaxed space-y-1">
          <p>Clica no ícone <strong className="text-white/70">Instalar</strong> na barra de endereços do browser.</p>
          <p className="text-white/30">Ou: menu do browser → Instalar Klaxo</p>
        </div>
      )}
    </div>
  )
}
