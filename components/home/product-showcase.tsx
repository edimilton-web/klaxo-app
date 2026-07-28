"use client"

import { useState } from "react"
import Image from "next/image"

const TABS = ["Dashboard", "Subscriptions", "Alerts"] as const

const SCREENSHOTS: Record<(typeof TABS)[number], { src: string; width: number; height: number; alt: string }> = {
  Dashboard: {
    src: "/screenshots/dashboard.png",
    width: 1023,
    height: 569,
    alt: "Klaxo dashboard mostrando o resumo de subscrições e o gráfico de gastos mensais",
  },
  Subscriptions: {
    src: "/screenshots/subscriptions.png",
    width: 1003,
    height: 499,
    alt: "Lista de subscrições do Klaxo com logos, preços e datas de renovação",
  },
  Alerts: {
    src: "/screenshots/alerts.png",
    width: 921,
    height: 2048,
    alt: "Notificação de alerta do Klaxo a avisar de uma renovação de subscrição próxima",
  },
}

export function ProductShowcase() {
  const [active, setActive] = useState<(typeof TABS)[number]>("Dashboard")
  const shot = SCREENSHOTS[active]

  return (
    <section className="px-4 py-20 md:px-6">
      <div className="mx-auto max-w-4xl">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-violet-400">The app</p>
          <h2 className="mt-3 text-2xl font-bold text-white md:text-3xl">Designed to be glanced at, not managed.</h2>
        </div>

        <div className="mt-8 flex justify-center gap-2">
          {TABS.map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActive(tab)}
              className={
                active === tab
                  ? "flex min-h-11 items-center rounded-full bg-violet-600 px-4 text-sm font-semibold text-white"
                  : "flex min-h-11 items-center rounded-full bg-white/5 px-4 text-sm font-medium text-white/50 hover:bg-white/10 hover:text-white/80"
              }
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="mx-auto mt-8 flex max-h-[32rem] max-w-3xl justify-center overflow-hidden rounded-2xl border border-white/[0.08] bg-[#0D0D14] shadow-2xl shadow-black/60">
          <Image
            key={shot.src}
            src={shot.src}
            width={shot.width}
            height={shot.height}
            alt={shot.alt}
            className="h-auto max-h-[32rem] w-auto object-contain"
            priority={active === "Dashboard"}
          />
        </div>
      </div>
    </section>
  )
}
