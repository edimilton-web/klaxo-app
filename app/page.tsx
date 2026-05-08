import Link from "next/link"
import { Button } from "@/components/ui/button"

const FEATURES = [
  { icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2", title: "Simple manual tracking", desc: "Add any subscription in seconds with autocomplete for 50+ popular services." },
  { icon: "M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9", title: "Email alerts", desc: "Get notified before each renewal so you're never surprised by an unexpected charge." },
  { icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z", title: "Consolidated view", desc: "Dashboard showing total monthly and annual cost in EUR, by category chart, and upcoming renewals." },
  { icon: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z", title: "Automatic EUR conversion", desc: "Subscriptions in USD, GBP, CHF and other currencies converted to EUR automatically." },
  { icon: "M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4", title: "CSV export (Pro)", desc: "Download all your subscriptions as a CSV file for use in Excel or Google Sheets." },
  { icon: "M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z", title: "Privacy first", desc: "No Google Analytics, no tracking cookies. Only Plausible — ethical, GDPR-compliant analytics." },
]

const TESTIMONIALS = [
  { name: "Ana S.", role: "Freelance Designer", text: "I finally know how much I spend on subscriptions. I cancelled 3 services I hadn't used in months!" },
  { name: "João M.", role: "Software Engineer", text: "Clean interface, alerts working perfectly. Exactly what I needed without the complexity." },
  { name: "Katrin R.", role: "Teacher", text: "The 5-day alert has already saved me from two unexpected renewals. Worth every cent." },
]

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      <nav className="sticky top-0 z-50 border-b border-slate-100 bg-white/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-violet-600">
              <span className="text-sm font-black text-white">K</span>
            </div>
            <span className="text-lg font-bold text-slate-900">Klaxo</span>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/login"><Button variant="ghost" size="sm">Sign in</Button></Link>
            <Link href="/register"><Button size="sm">Get started free</Button></Link>
          </div>
        </div>
      </nav>

      <section className="relative overflow-hidden px-6 py-20 text-center">
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-violet-50 via-white to-white" />
        <div className="absolute -top-40 left-1/2 -z-10 h-80 w-80 -translate-x-1/2 rounded-full bg-violet-200 opacity-30 blur-3xl" />
        <div className="mx-auto max-w-3xl">
          <div className="mb-4 inline-flex items-center rounded-full border border-violet-200 bg-violet-50 px-3 py-1 text-xs font-medium text-violet-700">
            🇪🇺 Built for the European market · GDPR compliant
          </div>
          <h1 className="text-5xl font-extrabold tracking-tight text-slate-900 sm:text-6xl">
            Stop paying for
            <span className="bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent"> subscriptions</span>
            <br />you forgot about
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-lg text-slate-600">
            Klaxo consolidates all your subscriptions in one dashboard, shows your total cost in EUR, and sends email alerts before each renewal.
          </p>
          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Link href="/register"><Button size="lg" className="shadow-lg shadow-violet-200">Get started free — no credit card</Button></Link>
            <Link href="/login"><Button variant="outline" size="lg">Sign in</Button></Link>
          </div>
          <p className="mt-4 text-sm text-slate-400">Free plan · Up to 5 subscriptions · Forever free</p>
        </div>
      </section>

      <section className="px-6 py-16">
        <div className="mx-auto max-w-5xl">
          <h2 className="mb-12 text-center text-3xl font-bold text-slate-900">Everything you need</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map((f) => (
              <div key={f.title} className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm hover:border-violet-200 hover:shadow-md transition-all">
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-violet-50">
                  <svg className="h-5 w-5 text-violet-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d={f.icon} /></svg>
                </div>
                <h3 className="font-semibold text-slate-900">{f.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-slate-500">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-50 px-6 py-16">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="mb-12 text-3xl font-bold text-slate-900">Simple pricing</h2>
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="rounded-2xl border border-slate-200 bg-white p-7 text-left shadow-sm">
              <p className="font-semibold text-slate-900">Free</p>
              <div className="mt-2 flex items-end gap-1">
                <span className="text-4xl font-bold text-slate-900">€0</span>
                <span className="mb-1 text-slate-500">/forever</span>
              </div>
              <ul className="mt-4 space-y-2 text-sm text-slate-600">
                {["Up to 5 subscriptions", "Renewal alerts", "Consolidated dashboard"].map((f) => (
                  <li key={f} className="flex items-center gap-2"><svg className="h-4 w-4 text-emerald-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>{f}</li>
                ))}
              </ul>
              <Link href="/register" className="mt-6 block"><Button variant="outline" className="w-full">Get started free</Button></Link>
            </div>
            <div className="relative rounded-2xl border-2 border-violet-500 bg-gradient-to-b from-violet-600 to-indigo-600 p-7 text-left shadow-lg">
              <div className="absolute -top-3 left-5 rounded-full bg-amber-400 px-3 py-0.5 text-xs font-bold text-amber-900">Most popular</div>
              <p className="font-semibold text-violet-100">Pro</p>
              <div className="mt-2 flex items-end gap-1">
                <span className="text-4xl font-bold text-white">€3.99</span>
                <span className="mb-1 text-violet-200">/month</span>
              </div>
              <p className="text-sm text-violet-200">or €29/year (save €18.88)</p>
              <ul className="mt-4 space-y-2 text-sm text-violet-100">
                {["Unlimited subscriptions", "Custom alerts", "Monthly email digest", "Export CSV"].map((f) => (
                  <li key={f} className="flex items-center gap-2"><svg className="h-4 w-4 text-violet-200 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>{f}</li>
                ))}
              </ul>
              <Link href="/register" className="mt-6 block"><Button className="w-full bg-white text-violet-700 hover:bg-violet-50">Start Pro</Button></Link>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-16">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-10 text-center text-3xl font-bold text-slate-900">What users say</h2>
          <div className="grid gap-5 sm:grid-cols-3">
            {TESTIMONIALS.map((t) => (
              <div key={t.name} className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
                <p className="text-sm leading-relaxed text-slate-600">&ldquo;{t.text}&rdquo;</p>
                <div className="mt-4">
                  <p className="font-semibold text-slate-900">{t.name}</p>
                  <p className="text-xs text-slate-400">{t.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-r from-violet-600 to-indigo-600 px-6 py-16 text-center">
        <h2 className="text-3xl font-bold text-white">Start today, for free</h2>
        <p className="mt-3 text-violet-200">No credit card. No commitment.</p>
        <Link href="/register" className="mt-6 inline-block">
          <Button className="bg-white text-violet-700 hover:bg-violet-50 shadow-xl" size="lg">Create free account</Button>
        </Link>
      </section>

      <footer className="border-t border-slate-100 px-6 py-10">
        <div className="mx-auto max-w-5xl flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
          <p className="text-sm text-slate-400">© {new Date().getFullYear()} Klaxo · Personal subscription manager</p>
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-slate-400">
            <a href="mailto:support@klaxo.app" className="hover:text-violet-600 transition-colors">support@klaxo.app</a>
            <Link href="/privacy" className="hover:text-violet-600 transition-colors">Privacy &amp; GDPR</Link>
            <a href="https://www.klaxo.app" target="_blank" rel="noopener noreferrer" className="hover:text-violet-600 transition-colors">klaxo.app</a>
          </div>
        </div>
      </footer>
    </div>
  )
}
