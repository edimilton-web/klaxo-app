"use client"
import { useState, useEffect } from "react"

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>
}

export function PwaInstallButton() {
  const [prompt, setPrompt] = useState<BeforeInstallPromptEvent | null>(null)
  const [show, setShow] = useState(false)

  useEffect(() => {
    if (window.matchMedia("(display-mode: standalone)").matches) return

    const early = (window as any).__pwaPrompt as BeforeInstallPromptEvent | null
    if (early) { setPrompt(early); setShow(true); return }

    const handler = (e: Event) => {
      e.preventDefault()
      setPrompt(e as BeforeInstallPromptEvent)
      setShow(true)
    }
    window.addEventListener("beforeinstallprompt", handler)
    return () => window.removeEventListener("beforeinstallprompt", handler)
  }, [])

  async function handleInstall() {
    if (!prompt) return
    await prompt.prompt()
    const { outcome } = await prompt.userChoice
    if (outcome === "accepted") setShow(false)
  }

  if (!show) return null

  return (
    <button
      onClick={handleInstall}
      className="mt-2 flex w-full items-center gap-2 rounded-xl px-3 py-2 text-sm text-violet-400 hover:bg-violet-600/10 transition-colors"
    >
      <svg className="h-4 w-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
      </svg>
      Install app
    </button>
  )
}

export function PwaInstallMobileButton() {
  const [prompt, setPrompt] = useState<BeforeInstallPromptEvent | null>(null)
  const [show, setShow] = useState(false)

  useEffect(() => {
    if (window.matchMedia("(display-mode: standalone)").matches) return

    const early = (window as any).__pwaPrompt as BeforeInstallPromptEvent | null
    if (early) { setPrompt(early); setShow(true); return }

    const handler = (e: Event) => {
      e.preventDefault()
      setPrompt(e as BeforeInstallPromptEvent)
      setShow(true)
    }
    window.addEventListener("beforeinstallprompt", handler)
    return () => window.removeEventListener("beforeinstallprompt", handler)
  }, [])

  async function handleInstall() {
    if (!prompt) return
    await prompt.prompt()
    const { outcome } = await prompt.userChoice
    if (outcome === "accepted") setShow(false)
  }

  if (!show) return null

  return (
    <button
      onClick={handleInstall}
      className="flex flex-col items-center gap-1 rounded-xl px-3 py-1.5 text-xs font-medium text-white/35 transition-colors"
    >
      <svg className="h-5 w-5 text-white/30" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
      </svg>
      <span>Install</span>
    </button>
  )
}
