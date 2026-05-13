"use client"
import { useState, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { KlaxoLogo } from "@/components/klaxo-logo"

const PLANS = {
  "pro-monthly": {
    label: "Klaxo Pro — €3,99/month",
    price: "€3,99",
    period: "/ month",
    note: "Cancel anytime",
    benefits: [
      "Unlimited subscriptions",
      "Renewal alerts 5 days before charge",
      "Categories & tags",
      "CSV export",
      "Bank connection (coming soon)",
    ],
  },
  "pro-yearly": {
    label: "Klaxo Pro — €29/year (save 39%)",
    price: "€29",
    period: "/ year",
    note: "€2,42/month · Cancel anytime",
    benefits: [
      "Unlimited subscriptions",
      "Renewal alerts 5 days before charge",
      "Categories & tags",
      "CSV export",
      "Bank connection (coming soon)",
    ],
  },
} as const

type Plan = keyof typeof PLANS

function CheckoutContent() {
  const searchParams = useSearchParams()
  const rawPlan = searchParams.get("plan") ?? "pro-monthly"
  const plan: Plan = rawPlan in PLANS ? (rawPlan as Plan) : "pro-monthly"
  const config = PLANS[plan]

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  async function handleContinue() {
    setLoading(true)
    setError("")
    try {
      const res = await fetch("/api/stripe/checkout-guest", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan }),
      })
      const data = await res.json()
      if (!res.ok || !data.url) {
        setError("Something went wrong. Please try again.")
        setLoading(false)
        return
      }
      window.location.href = data.url
    } catch {
      setError("Something went wrong. Please try again.")
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#0A0F1E] px-4 py-12">
      <div className="w-full max-w-sm">
        <div className="mb-8 flex flex-col items-center">
          <KlaxoLogo size="md" animated />
          <p className="mt-3 text-sm font-medium text-white/40">Upgrade to Pro</p>
        </div>

        <div className="rounded-2xl border border-white/[0.10] bg-[#111827] p-6">
          {/* Plan header */}
          <div className="mb-5 flex items-end justify-between">
            <div>
              <div className="text-xs font-semibold uppercase tracking-widest text-violet-400">Klaxo Pro</div>
              <div className="mt-1 flex items-baseline gap-1">
                <span className="text-4xl font-bold text-white">{config.price}</span>
                <span className="text-sm text-white/40">{config.period}</span>
              </div>
            </div>
            <div className="rounded-full border border-violet-500/30 bg-violet-500/10 px-3 py-1 text-xs font-medium text-violet-300">
              {plan === "pro-yearly" ? "Save 39%" : "Most popular"}
            </div>
          </div>

          <p className="mb-5 text-xs text-white/35">{config.note}</p>

          <div className="mb-5 h-px bg-white/[0.06]" />

          {/* Benefits */}
          <ul className="mb-6 space-y-3">
            {config.benefits.map((b) => (
              <li key={b} className="flex items-start gap-2.5 text-sm text-white/75">
                <span className="mt-0.5 flex-shrink-0 text-violet-400">✓</span>
                {b}
              </li>
            ))}
          </ul>

          {error && (
            <p className="mb-3 rounded-xl bg-red-500/10 px-3 py-2 text-xs text-red-400">{error}</p>
          )}

          <button
            onClick={handleContinue}
            disabled={loading}
            className="w-full rounded-xl bg-violet-600 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-violet-500 active:bg-violet-700 disabled:opacity-60"
          >
            {loading ? "Redirecting to Stripe…" : "Continue to payment →"}
          </button>

          <p className="mt-3 text-center text-xs text-white/30">
            Secure payment via Stripe · Cancel anytime
          </p>
        </div>

        <p className="mt-4 text-center text-sm text-white/40">
          Just want the free plan?{" "}
          <a href="/register" className="font-medium text-violet-400 hover:text-violet-300">
            Create free account
          </a>
        </p>
      </div>
    </div>
  )
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={null}>
      <CheckoutContent />
    </Suspense>
  )
}
