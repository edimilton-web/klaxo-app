"use client"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>
}

function AndroidSteps({ onInstall }: { onInstall: () => void }) {
  return (
    <div className="space-y-4">
      <div className="flex items-start gap-4">
        <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-violet-600 text-sm font-bold text-white">1</div>
        <div>
          <p className="font-medium text-white">Clica em "Instalar"</p>
          <p className="mt-0.5 text-sm text-white/45">O botão aparece em baixo desta página</p>
        </div>
      </div>
      <div className="flex items-start gap-4">
        <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-violet-600 text-sm font-bold text-white">2</div>
        <div>
          <p className="font-medium text-white">Confirma a instalação</p>
          <p className="mt-0.5 text-sm text-white/45">O teu telemóvel vai perguntar — aceita</p>
        </div>
      </div>
      <div className="flex items-start gap-4">
        <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-violet-600 text-sm font-bold text-white">3</div>
        <div>
          <p className="font-medium text-white">Abre o Klaxo como app</p>
          <p className="mt-0.5 text-sm text-white/45">Fica no ecrã inicial como uma app nativa</p>
        </div>
      </div>
      <button
        onClick={onInstall}
        className="mt-2 w-full rounded-xl bg-violet-600 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-violet-500 active:bg-violet-700"
      >
        Instalar agora
      </button>
    </div>
  )
}

function IosSteps() {
  return (
    <div className="space-y-4">
      <div className="flex items-start gap-4">
        <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-violet-600 text-sm font-bold text-white">1</div>
        <div>
          <p className="font-medium text-white">Toca no botão Partilhar</p>
          <p className="mt-1 flex items-center gap-1.5 text-sm text-white/45">
            Botão
            <span className="inline-flex items-center justify-center rounded-md border border-white/20 bg-white/10 px-1.5 py-0.5">
              <svg className="h-4 w-4 text-white/70" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
              </svg>
            </span>
            no fundo do Safari
          </p>
        </div>
      </div>
      <div className="flex items-start gap-4">
        <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-violet-600 text-sm font-bold text-white">2</div>
        <div>
          <p className="font-medium text-white">Seleciona "Adicionar ao ecrã"</p>
          <p className="mt-0.5 text-sm text-white/45">Aparece na lista de opções do menu</p>
        </div>
      </div>
      <div className="flex items-start gap-4">
        <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-violet-600 text-sm font-bold text-white">3</div>
        <div>
          <p className="font-medium text-white">Confirma em "Adicionar"</p>
          <p className="mt-0.5 text-sm text-white/45">O Klaxo fica no teu ecrã inicial</p>
        </div>
      </div>
      <div className="mt-2 rounded-xl border border-amber-500/20 bg-amber-500/8 p-3">
        <p className="text-xs text-amber-300/80">⚠️ Só funciona no <strong className="text-amber-300">Safari</strong>. Se estiveres no Chrome ou outro browser, abre este link no Safari primeiro.</p>
      </div>
    </div>
  )
}

function DesktopMessage() {
  return (
    <div className="rounded-2xl border border-white/[0.12] bg-[#16161F] p-6 text-center">
      <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-600/15">
        <svg className="h-6 w-6 text-violet-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 9h3" />
        </svg>
      </div>
      <p className="font-medium text-white">Instala no teu telemóvel</p>
      <p className="mt-1 text-sm text-white/40">Abre <strong className="text-white/60">app.klaxo.app</strong> no teu telemóvel para instalar o Klaxo como app nativa.</p>
    </div>
  )
}

export default function WelcomePage() {
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

    setIsIos(ios)
    setIsMobile(mobile)
    setIsStandalone(standalone)
    if (ios) setTab("ios")

    const handler = (e: Event) => {
      e.preventDefault()
      setInstallPrompt(e as BeforeInstallPromptEvent)
    }
    window.addEventListener("beforeinstallprompt", handler)
    return () => window.removeEventListener("beforeinstallprompt", handler)
  }, [])

  async function handleInstall() {
    if (!installPrompt) return
    await installPrompt.prompt()
    const { outcome } = await installPrompt.userChoice
    if (outcome === "accepted") setInstalled(true)
  }

  function goToDashboard() {
    router.push("/dashboard")
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#0A0A0F] px-4 py-12">
      {/* Logo */}
      <div className="mb-8 flex flex-col items-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-600 shadow-lg shadow-violet-900/40">
          <span className="text-2xl font-black text-white">K</span>
        </div>
        <p className="mt-3 text-sm font-medium text-white/40">Bem-vindo ao Klaxo</p>
      </div>

      <div className="w-full max-w-sm">
        {isStandalone || installed ? (
          /* Already installed */
          <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/8 p-6 text-center">
            <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500/15">
              <svg className="h-6 w-6 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <p className="font-semibold text-white">Klaxo instalado!</p>
            <p className="mt-1 text-sm text-white/40">Já podes abrir o Klaxo diretamente do teu ecrã inicial.</p>
          </div>
        ) : (
          <div className="rounded-2xl border border-white/[0.12] bg-[#16161F] p-6">
            <h1 className="mb-1 text-xl font-bold text-white">Instala o Klaxo</h1>
            <p className="mb-5 text-sm text-white/45">Acesso rápido sem abrir o browser — como uma app nativa.</p>

            {!isMobile ? (
              <DesktopMessage />
            ) : (
              <>
                {/* Tab switcher — only show if not iOS (iOS only has one option) */}
                {!isIos && (
                  <div className="mb-5 flex rounded-xl bg-white/5 p-1">
                    <button
                      onClick={() => setTab("android")}
                      className={`flex-1 rounded-lg py-2 text-sm font-medium transition-colors ${tab === "android" ? "bg-white/10 text-white" : "text-white/40 hover:text-white/60"}`}
                    >
                      Android
                    </button>
                    <button
                      onClick={() => setTab("ios")}
                      className={`flex-1 rounded-lg py-2 text-sm font-medium transition-colors ${tab === "ios" ? "bg-white/10 text-white" : "text-white/40 hover:text-white/60"}`}
                    >
                      iPhone / iPad
                    </button>
                  </div>
                )}

                {tab === "android" ? (
                  <AndroidSteps onInstall={handleInstall} />
                ) : (
                  <IosSteps />
                )}
              </>
            )}
          </div>
        )}

        <button
          onClick={goToDashboard}
          className="mt-4 w-full py-3 text-sm text-white/35 transition-colors hover:text-white/60"
        >
          {isStandalone || installed ? "Ir para o dashboard →" : "Saltar por agora →"}
        </button>
      </div>
    </div>
  )
}
