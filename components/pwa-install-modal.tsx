"use client"
import { useState, useEffect } from "react"
import { KlaxoLogo } from "@/components/klaxo-logo"

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>
}

type Platform = "android" | "ios" | "desktop" | "other"

function detectPlatform(): Platform {
  const ua = navigator.userAgent
  if (/iphone|ipad|ipod/i.test(ua) && !(window as any).MSStream) return "ios"
  if (/android/i.test(ua)) return "android"
  if (/macintosh|windows|linux/i.test(ua)) return "desktop"
  return "other"
}

interface PwaInstallModalProps {
  open: boolean
  onClose: () => void
}

export function PwaInstallModal({ open, onClose }: PwaInstallModalProps) {
  const [prompt, setPrompt] = useState<BeforeInstallPromptEvent | null>(null)
  const [platform, setPlatform] = useState<Platform>("other")
  const [isStandalone, setIsStandalone] = useState(false)
  const [installing, setInstalling] = useState(false)

  useEffect(() => {
    setPlatform(detectPlatform())
    setIsStandalone(window.matchMedia("(display-mode: standalone)").matches)

    const early = (window as any).__pwaPrompt as BeforeInstallPromptEvent | null
    if (early) { setPrompt(early); return }

    const handler = (e: Event) => {
      e.preventDefault()
      setPrompt(e as BeforeInstallPromptEvent)
    }
    window.addEventListener("beforeinstallprompt", handler)
    return () => window.removeEventListener("beforeinstallprompt", handler)
  }, [])

  async function handleInstall() {
    if (!prompt) return
    setInstalling(true)
    await prompt.prompt()
    const { outcome } = await prompt.userChoice
    setInstalling(false)
    if (outcome === "accepted") onClose()
  }

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center p-4 sm:items-center"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

      <div className="relative w-full max-w-sm rounded-2xl border border-white/[0.08] bg-[#111118] p-6 shadow-2xl shadow-black/60">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-white/25 hover:text-white/60 transition-colors"
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="flex flex-col items-center text-center">
          <KlaxoLogo size="md" animated />
          <h2 className="mt-4 text-lg font-semibold text-white">Install Klaxo</h2>
          <p className="mt-1.5 text-sm text-white/45">
            Add Klaxo to your home screen for instant access — no browser needed.
          </p>
        </div>

        <div className="mt-6 space-y-3">
          {isStandalone ? (
            <div className="rounded-xl bg-violet-600/10 px-4 py-3 text-center text-sm text-violet-400">
              Klaxo is already installed on this device.
            </div>
          ) : platform === "ios" ? (
            <>
              <p className="text-xs font-medium uppercase tracking-wider text-white/30">How to install on iPhone / iPad</p>
              <ol className="space-y-3">
                {[
                  { step: "1", text: "Tap the Share button at the bottom of Safari" },
                  { step: "2", text: 'Scroll down and tap "Add to Home Screen"' },
                  { step: "3", text: 'Tap "Add" in the top-right corner' },
                ].map(({ step, text }) => (
                  <li key={step} className="flex items-start gap-3">
                    <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-violet-600/20 text-xs font-semibold text-violet-400">
                      {step}
                    </span>
                    <span className="text-sm text-white/60">{text}</span>
                  </li>
                ))}
              </ol>
              <p className="text-xs text-white/25 pt-1">Only available in Safari. Not Chrome or Firefox on iOS.</p>
            </>
          ) : prompt ? (
            <button
              onClick={handleInstall}
              disabled={installing}
              className="w-full rounded-xl bg-violet-600 py-3 text-sm font-semibold text-white transition-colors hover:bg-violet-500 disabled:opacity-60"
            >
              {installing ? "Installing…" : "Install now"}
            </button>
          ) : (
            <>
              <p className="text-xs font-medium uppercase tracking-wider text-white/30">Option A — address bar</p>
              <ol className="space-y-2">
                {[
                  { step: "1", text: "Look for the install icon (⊕) at the right end of the address bar" },
                  { step: "2", text: 'Click it, then click "Install"' },
                ].map(({ step, text }) => (
                  <li key={step} className="flex items-start gap-3">
                    <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-violet-600/20 text-xs font-semibold text-violet-400">
                      {step}
                    </span>
                    <span className="text-sm text-white/60">{text}</span>
                  </li>
                ))}
              </ol>

              <p className="text-xs font-medium uppercase tracking-wider text-white/30 pt-2">Option B — Chrome menu</p>
              <ol className="space-y-2">
                {[
                  { step: "1", text: 'Click the ⋮ menu (top-right of Chrome)' },
                  { step: "2", text: 'Click "Save and share" → "Install page as app…"' },
                  { step: "3", text: 'Click "Install" in the dialog' },
                ].map(({ step, text }) => (
                  <li key={step} className="flex items-start gap-3">
                    <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-violet-600/20 text-xs font-semibold text-violet-400">
                      {step}
                    </span>
                    <span className="text-sm text-white/60">{text}</span>
                  </li>
                ))}
              </ol>
              <p className="text-xs text-white/25 pt-1">Works in Chrome, Edge, and Brave. Not supported in Firefox or Safari on desktop.</p>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
