import Link from "next/link"
import { Button } from "@/components/ui/button"

const FEATURES = [
  {
    icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z",
    title: "Real cost in EUR",
    desc: "See exactly how much you spend monthly across all currencies, automatically converted to EUR.",
  },
  {
    icon: "M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9",
    title: "Email alerts",
    desc: "Get notified 5 days before each renewal — no more surprise charges on your statement.",
  },
  {
    icon: "M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z",
    title: "Privacy first",
    desc: "No Google Analytics, no tracking cookies. Plausible analytics only — fully GDPR compliant.",
  },
]

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

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#0A0A0F] text-white overflow-x-hidden">
      {/* Nav */}
      <nav className="sticky top-0 z-50 border-b border-white/[0.05] bg-[#0A0A0F]/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4 md:px-6">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-violet-600">
              <span className="text-sm font-black text-white">K</span>
            </div>
            <span className="text-lg font-bold text-white">Klaxo</span>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/login">
              <Button variant="ghost" size="sm" className="hidden sm:inline-flex">Sign in</Button>
            </Link>
            <Link href="/register">
              <Button size="sm">Get started free</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
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
            The average European spends <span className="font-semibold text-white/80">€180/month</span> on subscriptions. Most can&apos;t name half of them.
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

      {/* Features */}
      <section className="px-4 py-20 md:px-6">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-10 text-center text-2xl font-bold text-white md:text-3xl">Everything you need</h2>
          <div className="grid gap-4 sm:grid-cols-3">
            {FEATURES.map((f) => (
              <div key={f.title} className="rounded-2xl border border-white/[0.12] bg-[#16161F] p-5 hover:border-violet-500/25 transition-colors">
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-violet-600/15">
                  <svg className="h-5 w-5 text-violet-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d={f.icon} />
                  </svg>
                </div>
                <h3 className="font-semibold text-white">{f.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-white/40">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="px-4 py-16 md:px-6">
        <div className="mx-auto max-w-2xl">
          <h2 className="mb-10 text-center text-2xl font-bold text-white md:text-3xl">Simple pricing</h2>
          <div className="grid gap-5 sm:grid-cols-2">
            {/* Free */}
            <div className="rounded-2xl border border-white/[0.12] bg-[#16161F] p-6">
              <p className="font-semibold text-white">Free</p>
              <div className="mt-2 flex items-end gap-1">
                <span className="text-4xl font-bold text-white">€0</span>
                <span className="mb-1 text-white/40">/forever</span>
              </div>
              <ul className="mt-4 space-y-2 text-sm text-white/50">
                {["Up to 5 subscriptions", "Renewal alerts", "Consolidated dashboard"].map((f) => (
                  <li key={f} className="flex items-center gap-2">
                    <svg className="h-4 w-4 flex-shrink-0 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {f}
                  </li>
                ))}
              </ul>
              <Link href="/register" className="mt-6 block">
                <Button variant="outline" className="w-full">Get started free</Button>
              </Link>
            </div>

            {/* Pro */}
            <div className="relative rounded-2xl border border-violet-500/40 bg-gradient-to-b from-violet-600/20 to-indigo-600/10 p-6 shadow-lg shadow-violet-900/20">
              <div className="absolute -top-3 left-5 rounded-full bg-amber-400 px-3 py-0.5 text-xs font-bold text-amber-900">Most popular</div>
              <p className="font-semibold text-white">Pro</p>
              <div className="mt-2 flex items-end gap-1">
                <span className="text-4xl font-bold text-white">€3.99</span>
                <span className="mb-1 text-violet-300">/month</span>
              </div>
              <p className="text-sm text-white/40">or €29/year (save €18.88)</p>
              <ul className="mt-4 space-y-2 text-sm text-violet-200/70">
                {["Unlimited subscriptions", "Custom alerts", "Monthly email digest", "CSV export"].map((f) => (
                  <li key={f} className="flex items-center gap-2">
                    <svg className="h-4 w-4 flex-shrink-0 text-violet-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {f}
                  </li>
                ))}
              </ul>
              <Link href="/register" className="mt-6 block">
                <Button className="w-full">Start Pro</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 py-16 text-center md:px-6">
        <div className="mx-auto max-w-2xl rounded-3xl border border-violet-500/20 bg-gradient-to-br from-violet-600/15 to-indigo-600/10 p-10 shadow-xl shadow-violet-900/20">
          <h2 className="text-2xl font-bold text-white md:text-3xl">Start today, for free</h2>
          <p className="mt-3 text-white/40">No credit card required. No commitment.</p>
          <Link href="/register" className="mt-6 inline-block">
            <Button size="lg" className="shadow-lg shadow-violet-900/40">Create free account</Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/[0.05] px-4 py-8 md:px-6">
        <div className="mx-auto max-w-5xl flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
          <p className="text-sm text-white/25">© {new Date().getFullYear()} Klaxo · Personal subscription manager</p>
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-white/25">
            <a href="mailto:support@klaxo.app" className="hover:text-white/60 transition-colors">support@klaxo.app</a>
            <Link href="/privacy" className="hover:text-white/60 transition-colors">Privacy &amp; GDPR</Link>
            <a href="https://www.klaxo.app" target="_blank" rel="noopener noreferrer" className="hover:text-white/60 transition-colors">klaxo.app</a>
          </div>
        </div>
      </footer>
    </div>
  )
}
