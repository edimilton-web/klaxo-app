import Link from "next/link"
import { Button } from "@/components/ui/button"
import { KlaxoLogo } from "@/components/klaxo-logo"
import { CookieSettingsLink } from "@/components/cookie-settings-link"
import { Hero } from "@/components/home/hero"
import { StatStrip } from "@/components/home/stat-strip"
import { Problem } from "@/components/home/problem"
import { HowItWorks } from "@/components/home/how-it-works"
import { Features } from "@/components/home/features"
import { ProductShowcase } from "@/components/home/product-showcase"
import { AnchorFeature } from "@/components/home/anchor-feature"
import { Privacy } from "@/components/home/privacy"

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://klaxo.app/#org",
      name: "Klaxo",
      url: "https://klaxo.app",
      logo: "https://klaxo.app/icon",
      contactPoint: { "@type": "ContactPoint", email: "support@klaxo.app", contactType: "customer support" },
    },
    {
      "@type": "SoftwareApplication",
      "@id": "https://klaxo.app/#app",
      name: "Klaxo",
      applicationCategory: "FinanceApplication",
      operatingSystem: "Web, iOS, Android",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "EUR",
        description: "Free plan available. Pro plan for unlimited subscriptions.",
      },
      description: "Track all your subscriptions in one place. Get email alerts before renewals. Built for the European market.",
      url: "https://klaxo.app",
      publisher: { "@id": "https://klaxo.app/#org" },
    },
    {
      "@type": "WebSite",
      "@id": "https://klaxo.app/#website",
      url: "https://klaxo.app",
      name: "Klaxo",
      publisher: { "@id": "https://klaxo.app/#org" },
    },
  ],
}

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#0A0A0F] text-white overflow-x-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* Nav */}
      <nav className="sticky top-0 z-50 border-b border-white/[0.05] bg-[#0A0A0F]/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4 md:px-6">
          <div className="flex items-center gap-2.5">
            <KlaxoLogo size="sm" />
            <span className="text-lg font-semibold text-white">Klaxo</span>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/blog">
              <Button variant="ghost" size="sm" className="hidden sm:inline-flex">Blog</Button>
            </Link>
            <Link href="/login">
              <Button variant="ghost" size="sm" className="hidden sm:inline-flex">Sign in</Button>
            </Link>
            <Link href="/register">
              <Button size="sm">Get started free</Button>
            </Link>
          </div>
        </div>
      </nav>

      <Hero />
      <StatStrip />
      <Problem />
      <HowItWorks />

      <Features />
      <ProductShowcase />
      <AnchorFeature />
      <Privacy />

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
            <Link href="/blog" className="hover:text-white/60 transition-colors">Blog</Link>
            <Link href="/privacy" className="hover:text-white/60 transition-colors">Privacy &amp; GDPR</Link>
            <Link href="/terms" className="hover:text-white/60 transition-colors">Terms of Service</Link>
            <CookieSettingsLink className="hover:text-white/60 transition-colors" />
            <a href="https://www.klaxo.app" target="_blank" rel="noopener noreferrer" className="hover:text-white/60 transition-colors">klaxo.app</a>
          </div>
        </div>
      </footer>
    </div>
  )
}
