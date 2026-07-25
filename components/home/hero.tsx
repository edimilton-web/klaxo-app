import Link from "next/link"
import { Button } from "@/components/ui/button"

const SUBS = [
  { name: "Netflix", amount: "€15.99", cycle: "Monthly", daysUntil: 3, color: "#E50914" },
  { name: "Spotify", amount: "€9.99", cycle: "Monthly", daysUntil: 12, color: "#1DB954" },
  { name: "Adobe CC", amount: "€54.99", cycle: "Monthly", daysUntil: 21, color: "#FF0000" },
  { name: "GitHub", amount: "€3.67", cycle: "Monthly", daysUntil: 28, color: "#6e40c9" },
]

function MiniDashboard() {
  return (
    <div className="relative mx-auto mt-14 max-w-2xl">
      <div className="pointer-events-none absolute -inset-8 rounded-3xl bg-violet-600/10 blur-3xl" />

      <div className="relative overflow-hidden rounded-2xl border border-white/[0.08] bg-[#0D0D14] shadow-2xl shadow-black/60">
        <div className="flex items-center gap-2 border-b border-white/[0.06] px-4 py-3">
          <div className="flex gap-1.5">
            <div className="h-2.5 w-2.5 rounded-full bg-white/10" />
            <div className="h-2.5 w-2.5 rounded-full bg-white/10" />
            <div className="h-2.5 w-2.5 rounded-full bg-white/10" />
          </div>
          <div className="mx-auto flex h-6 w-48 items-center justify-center rounded-md bg-white/5 text-xs text-white/20">
            app.klaxo.app/dashboard
          </div>
        </div>

        <div className="p-5">
          <div className="mb-5 grid grid-cols-3 gap-3">
            <div className="rounded-xl border border-white/[0.07] bg-gradient-to-br from-violet-600 to-indigo-600 p-3">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-violet-200/70">Monthly</p>
              <p className="mt-1 text-lg font-bold text-white">€84.64</p>
            </div>
            <div className="rounded-xl border border-white/[0.12] bg-[#16161F] p-3">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-white/40">Yearly</p>
              <p className="mt-1 text-lg font-bold text-white">€1,015.68</p>
            </div>
            <div className="rounded-xl border border-white/[0.12] bg-[#16161F] p-3">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-white/40">Active</p>
              <p className="mt-1 text-lg font-bold text-white">4</p>
            </div>
          </div>

          <div className="space-y-2">
            {SUBS.map((sub) => (
              <div key={sub.name} className="flex items-center gap-3 rounded-xl border border-white/[0.12] bg-[#16161F] px-3 py-2.5">
                <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg" style={{ background: sub.color + "22" }}>
                  <span className="text-xs font-bold" style={{ color: sub.color }}>{sub.name[0]}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-white">{sub.name}</p>
                  <p className="text-xs text-white/35">{sub.cycle} · renews in {sub.daysUntil}d</p>
                </div>
                <span className="text-sm font-semibold text-white">{sub.amount}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export function Hero() {
  return (
    <section className="relative px-4 pt-20 pb-10 text-center md:px-6 md:pt-28">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(124,92,252,0.12)_0%,_transparent_60%)]" />

      <div className="relative mx-auto max-w-3xl">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-violet-500/20 bg-violet-500/8 px-3 py-1 text-xs font-medium text-violet-300">
          🇪🇺 Built for the European market · GDPR compliant
        </div>

        <h1 className="text-4xl font-extrabold tracking-tight text-white md:text-6xl" style={{ letterSpacing: "-0.03em" }}>
          You&apos;re paying for things
          <br />
          <span className="bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent">
            you forgot exist.
          </span>
        </h1>

        <p className="mx-auto mt-5 max-w-lg text-base text-white/45 md:text-lg">
          The average person underestimates their subscription spend by <span className="font-semibold text-white/80">$200+</span> per month. Klaxo shows you the real number — and warns you before every renewal.
        </p>

        <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <Link href="/register">
            <Button size="lg" className="w-full sm:w-auto shadow-lg shadow-violet-900/40">
              Create free account
            </Button>
          </Link>
          <Link href="/login">
            <Button variant="outline" size="lg" className="w-full sm:w-auto">
              Already have an account →
            </Button>
          </Link>
        </div>

        <p className="mt-4 text-sm text-white/25">Free plan · Up to 5 subscriptions · Forever free</p>
      </div>

      <MiniDashboard />
    </section>
  )
}
