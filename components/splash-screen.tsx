"use client"
import { useEffect, useState } from "react"
import { KlaxoLogo } from "@/components/klaxo-logo"

export function SplashScreen() {
  const [phase, setPhase] = useState<"show" | "fade" | "done">("show")

  useEffect(() => {
    if (sessionStorage.getItem("klaxo-splash")) {
      setPhase("done")
      return
    }
    sessionStorage.setItem("klaxo-splash", "1")
    const t1 = setTimeout(() => setPhase("fade"), 3200)
    const t2 = setTimeout(() => setPhase("done"), 3800)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [])

  if (phase === "done") return null

  return (
    <div
      className="fixed inset-0 z-[200] flex flex-col items-center justify-center gap-5 bg-[#0A0A0F]"
      style={{
        transition: "opacity 550ms ease",
        opacity: phase === "fade" ? 0 : 1,
      }}
    >
      <KlaxoLogo size="xl" animated />
      <span
        className="text-xs tracking-[0.35em] text-white/25 uppercase"
        style={{ letterSpacing: "0.35em" }}
      >
        Klaxo
      </span>
    </div>
  )
}
