"use client"
import { useState, useEffect, Suspense } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { KlaxoLogo } from "@/components/klaxo-logo"

// ─── PWA install helpers ─────────────────────────────────────────────────────

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>
}

function AndroidSteps({ onInstall }: { onInstall: () => void }) {
  return (
    <div className="space-y-4">
      {[
        { n: "1", title: "Tap \"Install\"", sub: "The button appears at the bottom of this page" },
        { n: "2", title: "Confirm the installation", sub: "Your phone will ask for confirmation — tap Add" },
        { n: "3", title: "Open Klaxo as an app", sub: "It lives on your home screen just like a native app" },
      ].map(({ n, title, sub }) => (
        <div key={n} className="flex items-start gap-4">
          <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-violet-600 text-sm font-bold text-white">{n}</div>
          <div>
            <p className="font-medium text-white">{title}</p>
            <p className="mt-0.5 text-sm text-white/45">{sub}</p>
          </div>
        </div>
      ))}
      <button
        onClick={onInstall}
        className="mt-2 w-full rounded-xl bg-violet-600 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-violet-500 active:bg-violet-700"
      >
        Install now
      </button>
    </div>
  )
}

function IosSteps() {
  return (
    <div className="space-y-4">
      {[
        { n: "1", title: "Tap the Share button", sub: "Tap the share icon at the bottom of Safari" },
        { n: "2", title: "Select \"Add to Home Screen\"", sub: "Scroll down in the share menu to find it" },
        { n: "3", title: "Tap \"Add\" to confirm", sub: "Klaxo will appear on your home screen" },
      ].map(({ n, title, sub }) => (
        <div key={n} className="flex items-start gap-4">
          <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-violet-600 text-sm font-bold text-white">{n}</div>
          <div>
            <p className="font-medium text-white">{title}</p>
            <p className="mt-0.5 text-sm text-white/45">{sub}</p>
          </div>
        </div>
      ))}
      <div className="mt-2 rounded-xl border border-amber-500/20 bg-amber-500/8 p-3">
        <p className="text-xs text-amber-300/80">⚠️ Only works in <strong className="text-amber-300">Safari</strong>. If you&apos;re using Chrome, open this page in Safari first.</p>
      </div>
    </div>
  )
}

// ─── Payment confirmation screen ─────────────────────────────────────────────

function PaymentConfirmedScreen({ sessionId }: { sessionId: string }) {
  const [state, setState] = useState<"loading" | "done" | "exists" | "error">("loading")
  const [email, setEmail] = useState("")
  const router = useRouter()

  useEffect(() => {
    fetch(`/api/stripe/session-info?session_id=${sessionId}`)
      .then((r) => r.json())
      .then((data) => {
        if (data.error) { setState("error"); return }
        setEmail(data.email)
        if (!data.needsPasswordSetup) {
          setState("exists")
        } else {
          setState("done")
        }
      })
      .catch(() => setState("error"))
  }, [sessionId])

  if (state === "loading") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#0A0F1E]">
        <p className="text-sm text-white/40">Confirming payment…</p>
      </div>
    )
  }

  if (state === "error") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#0A0F1E] px-4">
        <div className="w-full max-w-sm rounded-2xl border border-red-500/20 bg-[#111827] p-6 text-center">
          <p className="font-semibold text-white">Something went wrong</p>
          <p className="mt-1 text-sm text-white/40">Please contact us at{" "}
            <a href="mailto:hello@klaxo.app" className="text-violet-400">hello@klaxo.app</a>
          </p>
        </div>
      </div>
    )
  }

  if (state === "exists") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#0A0F1E] px-4 py-12">
        <div className="w-full max-w-sm">
          <div className="mb-8 flex justify-center"><KlaxoLogo size="md" animated /></div>
          <div className="rounded-2xl border border-emerald-500/20 bg-[#111827] p-6 text-center">
            <p className="text-2xl">✓</p>
            <p className="mt-2 font-semibold text-white">Payment confirmed!</p>
            <p className="mt-1 text-sm text-white/40">Your plan has been upgraded to Pro. Sign in to access your dashboard.</p>
            <button
              onClick={() => router.push("/login")}
              className="mt-5 w-full rounded-xl bg-violet-600 py-3 text-sm font-semibold text-white hover:bg-violet-500"
            >
              Sign in →
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#0A0F1E] px-4 py-12">
      <div className="w-full max-w-sm">
        <div className="mb-8 flex justify-center"><KlaxoLogo size="md" animated /></div>

        <div className="rounded-2xl border border-emerald-500/20 bg-[#111827] p-6">
          <div className="mb-4 flex items-center gap-3">
            <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-400 text-lg">✓</div>
            <div>
              <p className="font-semibold text-white">Payment confirmed</p>
              <p className="text-xs text-white/40">Welcome to Klaxo Pro</p>
            </div>
          </div>

          <div className="h-px bg-white/[0.06] mb-4" />

          <p className="text-sm text-white/70 leading-relaxed">
            Check your email at <strong className="text-white">{email}</strong> to set up your password and access Klaxo Pro.
          </p>

          <div className="mt-4 rounded-xl bg-violet-500/8 border border-violet-500/20 p-3">
            <p className="text-xs text-violet-300">The setup link expires in 24 hours.</p>
          </div>
        </div>

        <p className="mt-4 text-center text-xs text-white/30">
          Didn&apos;t receive the email?{" "}
          <a href="mailto:hello@klaxo.app" className="text-violet-400 hover:text-violet-300">
            Contact support
          </a>
        </p>
      </div>
    </div>
  )
}

// ─── PWA install (standard register flow) ────────────────────────────────────

function PwaInstallPage() {
  const router = useRouter()
  const [installPrompt, setInstallPrompt] = useState<BeforeInstallPromptEvent | null>(null)
  const [installed, setInstalled] = useState(false)
  const [tab, setTab] = useState<"android" | "ios">("android")
  const [isMobile, setIsMobile] = useState(false)
  const [isIos, setIsIos] = useState(false)
  const [isStandalone, setIsStandalone] = useState(false)

  useEffect(() => {
    const ios = /iphone|ipad|ipod/i.test(navigator.userAgent)
    const mobile = ios || /android/i.test(navigator.userAgent)
    const standalone = window.matchMedia("(display-mode: standalone)").matches
    setIsIos(ios); setIsMobile(mobile); setIsStandalone(standalone)
    if (ios) setTab("ios")
    const handler = (e: Event) => { e.preventDefault(); setInstallPrompt(e as BeforeInstallPromptEvent) }
    window.addEventListener("beforeinstallprompt", handler)
    return () => window.removeEventListener("beforeinstallprompt", handler)
  }, [])

  async function handleInstall() {
    if (!installPrompt) return
    await installPrompt.prompt()
    const { outcome } = await installPrompt.userChoice
    if (outcome === "accepted") setInstalled(true)
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#0A0F1E] px-4 py-12">
      <div className="mb-8 flex flex-col items-center">
        <KlaxoLogo size="lg" animated />
        <p className="mt-3 text-sm font-medium text-white/40">Welcome to Klaxo</p>
      </div>
      <div className="w-full max-w-sm">
        {isStandalone || installed ? (
          <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/8 p-6 text-center">
            <p className="font-semibold text-white">Klaxo installed!</p>
            <p className="mt-1 text-sm text-white/40">You can now open Klaxo directly from your home screen.</p>
          </div>
        ) : (
          <div className="rounded-2xl border border-white/[0.12] bg-[#111827] p-6">
            <h1 className="mb-1 text-xl font-bold text-white">Install Klaxo</h1>
            <p className="mb-5 text-sm text-white/45">Quick access without opening a browser.</p>
            {!isMobile ? (
              <div className="rounded-2xl border border-white/[0.12] bg-[#16161F] p-6 text-center">
                <p className="font-medium text-white">Install on your phone</p>
                <p className="mt-1 text-sm text-white/40">Open <strong className="text-white/60">app.klaxo.app</strong> on mobile to install.</p>
              </div>
            ) : (
              <>
                {!isIos && (
                  <div className="mb-5 flex rounded-xl bg-white/5 p-1">
                    {(["android", "ios"] as const).map((t) => (
                      <button key={t} onClick={() => setTab(t)}
                        className={`flex-1 rounded-lg py-2 text-sm font-medium transition-colors ${tab === t ? "bg-white/10 text-white" : "text-white/40 hover:text-white/60"}`}>
                        {t === "android" ? "Android" : "iPhone / iPad"}
                      </button>
                    ))}
                  </div>
                )}
                {tab === "android" ? <AndroidSteps onInstall={handleInstall} /> : <IosSteps />}
              </>
            )}
          </div>
        )}
        <button onClick={() => router.push("/dashboard")}
          className="mt-4 w-full py-3 text-sm text-white/35 transition-colors hover:text-white/60">
          {isStandalone || installed ? "Go to dashboard →" : "Skip for now →"}
        </button>
      </div>
    </div>
  )
}

// ─── Entry point ──────────────────────────────────────────────────────────────

function WelcomeContent() {
  const searchParams = useSearchParams()
  const sessionId = searchParams.get("session_id")
  if (sessionId) return <PaymentConfirmedScreen sessionId={sessionId} />
  return <PwaInstallPage />
}

export default function WelcomePage() {
  return (
    <Suspense fallback={null}>
      <WelcomeContent />
    </Suspense>
  )
}
