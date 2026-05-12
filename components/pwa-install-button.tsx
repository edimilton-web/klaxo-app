"use client"
import { useState, useEffect } from "react"

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>
}

export function PwaInstallButton() {
  const [prompt, setPrompt] = useState<BeforeInstallPromptEvent | null>(null)
  const [isIos, setIsIos] = useState(false)
  const [show, setShow] = useState(false)
  const [installed, setInstalled] = useState(false)
  const [iosHint, setIosHint] = useState(false)

  useEffect(() => {
    if (window.matchMedia("(display-mode: standalone)").matches) {
      setInstalled(true)
      return
    }

    const ios = /iphone|ipad|ipod/i.test(navigator.userAgent) && !(window as any).MSStream
    setIsIos(ios)

    if (ios) {
      const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent)
      if (isSafari) setShow(true)
      return
    }

    const handler = (e: Event) => {
      e.preventDefault()
      setPrompt(e as BeforeInstallPromptEvent)
      setShow(true)
    }
    window.addEventListener("beforeinstallprompt", handler)
    return () => window.removeEventListener("beforeinstallprompt", handler)
  }, [])

  async function handleInstall() {
    if (isIos) {
      setIosHint((h) => !h)
      return
    }
    if (!prompt) return
    await prompt.prompt()
    const { outcome } = await prompt.userChoice
    if (outcome === "accepted") setInstalled(true)
  }

  if (installed || !show) return null

  return (
    <div className="mt-2">
      <button
        onClick={handleInstall}
        className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-sm text-violet-400 hover:bg-violet-600/10 transition-colors"
      >
        <svg className="h-4 w-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
        </svg>
        Install app
      </button>

      {iosHint && (
        <p className="mt-1.5 px-3 text-xs text-white/40 leading-relaxed">
          Tap <strong className="text-white/60">Share</strong> → <strong className="text-white/60">Add to Home Screen</strong>
        </p>
      )}
    </div>
  )
}
