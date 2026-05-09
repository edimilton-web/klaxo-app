"use client"
import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Modal } from "@/components/ui/modal"
import { toast } from "sonner"
import Link from "next/link"

const PLANS = [
  {
    id: "monthly",
    label: "Monthly",
    price: "€3.99",
    period: "/month",
    savings: null,
  },
  {
    id: "yearly",
    label: "Yearly",
    price: "€29",
    period: "/year",
    savings: "Save €18.88",
  },
]

const FEATURES = ["Unlimited subscriptions", "Custom alerts", "Monthly email digest", "CSV export"]

export default function BillingPage() {
  const params = useSearchParams()
  const [loading, setLoading] = useState<string | null>(null)
  const [cancelModal, setCancelModal] = useState(false)
  const [plan, setPlan] = useState<string | null>(null)

  useEffect(() => {
    if (params.get("success")) toast.success("Successfully upgraded to Pro!")
    if (params.get("canceled")) toast.info("Checkout canceled")
    fetch("/api/auth/session").then(r => r.json()).then(s => setPlan(s?.user?.plan ?? "FREE"))
  }, [params])

  async function handleCheckout(priceType: string) {
    setLoading(priceType)
    const res = await fetch("/api/stripe/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ priceType }),
    })
    const data = await res.json()
    setLoading(null)
    if (data.url) window.location.href = data.url
    else toast.error(data.error ?? "Failed to start checkout")
  }

  async function handlePortal() {
    setLoading("portal")
    const res = await fetch("/api/stripe/portal", { method: "POST" })
    const data = await res.json()
    setLoading(null)
    if (data.url) window.location.href = data.url
    else toast.error(data.error ?? "Failed to open billing portal")
  }

  const isPro = plan === "PRO"

  return (
    <div className="mx-auto max-w-2xl">
      <div className="mb-5">
        <h1 className="text-2xl font-bold text-white tracking-tight">Billing</h1>
        <p className="mt-0.5 text-sm text-white/40">Manage your plan and payments</p>
      </div>

      {/* Current plan */}
      <div className="mb-4 flex items-center justify-between rounded-2xl border border-white/[0.12] bg-[#16161F] px-5 py-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-white/40">Current plan</p>
          <div className="mt-1 flex items-center gap-2">
            <span className="text-lg font-bold text-white">{isPro ? "Pro" : "Free"}</span>
            <Badge variant={isPro ? "pro" : "free"}>{isPro ? "Pro" : "Free"}</Badge>
          </div>
        </div>
        {isPro && (
          <Button variant="outline" size="sm" onClick={handlePortal} loading={loading === "portal"}>
            Manage
          </Button>
        )}
      </div>

      {/* Pro upgrade */}
      {!isPro && (
        <div>
          <p className="mb-3 text-sm font-semibold text-white/50">Upgrade to Pro</p>

          {/* Features list — compact */}
          <div className="mb-4 grid grid-cols-2 gap-2">
            {FEATURES.map((f) => (
              <div key={f} className="flex items-center gap-2 text-sm text-white/50">
                <svg className="h-3.5 w-3.5 flex-shrink-0 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
                {f}
              </div>
            ))}
          </div>

          {/* Plan cards — side by side */}
          <div className="grid grid-cols-2 gap-3">
            {PLANS.map((p) => (
              <div
                key={p.id}
                className={`relative rounded-2xl border p-4 ${
                  p.id === "yearly"
                    ? "border-violet-500/40 bg-gradient-to-b from-violet-600/15 to-transparent"
                    : "border-white/[0.12] bg-[#16161F]"
                }`}
              >
                {p.savings && (
                  <div className="absolute -top-2.5 left-3 rounded-full bg-violet-600 px-2.5 py-0.5 text-[10px] font-semibold text-white">
                    {p.savings}
                  </div>
                )}
                <p className="text-sm font-semibold text-white">Pro {p.label}</p>
                <div className="mt-1 flex items-end gap-0.5">
                  <span className="text-2xl font-bold text-white">{p.price}</span>
                  <span className="mb-0.5 text-xs text-white/40">{p.period}</span>
                </div>
                <Button
                  className="mt-3 w-full"
                  size="sm"
                  onClick={() => handleCheckout(p.id)}
                  loading={loading === p.id}
                >
                  Choose
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Pro — manage / cancel */}
      {isPro && (
        <div className="rounded-2xl border border-red-500/20 bg-red-500/8 p-4">
          <h3 className="font-semibold text-red-400">Cancel Pro subscription</h3>
          <p className="mt-1 text-sm text-red-300/70">
            You&apos;ll lose access to Pro features at the end of your billing period.
          </p>
          <Button variant="danger" size="sm" className="mt-3" onClick={() => setCancelModal(true)}>
            Cancel Pro plan
          </Button>
        </div>
      )}

      <Modal open={cancelModal} onClose={() => setCancelModal(false)} title="Cancel Pro plan">
        <p className="text-sm text-white/60">
          Are you sure? You&apos;ll be downgraded to Free at the end of your current period and lose access to Pro features.
        </p>
        <div className="mt-5 flex gap-3">
          <Button variant="outline" onClick={() => setCancelModal(false)} className="flex-1">Keep Pro</Button>
          <Button variant="danger" onClick={() => { setCancelModal(false); handlePortal() }} className="flex-1">Continue to cancel</Button>
        </div>
      </Modal>
    </div>
  )
}
