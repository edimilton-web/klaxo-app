"use client"

import { useState } from "react"

const TABS = ["Dashboard", "Subscriptions", "Alerts"] as const

export function ProductShowcase() {
  const [active, setActive] = useState<(typeof TABS)[number]>("Dashboard")

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
                  ? "rounded-full bg-violet-600 px-4 py-2 text-sm font-semibold text-white"
                  : "rounded-full bg-white/5 px-4 py-2 text-sm font-medium text-white/50 hover:bg-white/10 hover:text-white/80"
              }
            >
              {tab}
            </button>
          ))}
        </div>

        {/* [SCREENSHOT] Product screenshot for the "{active}" tab goes here — real product screenshot to replace this placeholder */}
        <div className="mx-auto mt-8 aspect-video max-w-3xl overflow-hidden rounded-2xl border border-white/[0.08] bg-[#0D0D14] shadow-2xl shadow-black/60">
          <div className="flex h-full items-center justify-center">
            <p className="text-sm text-white/25">{active} screenshot</p>
          </div>
        </div>
      </div>
    </section>
  )
}
