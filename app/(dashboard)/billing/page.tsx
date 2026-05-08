"use client"
import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Modal } from "@/components/ui/modal"
import { toast } from "sonner"

const PLANS = [
  { id: "monthly", label: "Pro Monthly", price: "€3.99", period: "/month", savings: null },
  { id: "yearly", label: "Pro Yearly", price: "€29", period: "/year", savings: "Save €18.88" },
]

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
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900">Billing</h1>
        <p className="mt-0.5 text-sm text-slate-500">Manage your plan and payments</p>
      </div>

      <div className="mb-6 flex items-center gap-3 rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
        <div>
          <p className="text-sm text-slate-500">Current plan</p>
          <div className="mt-1 flex items-center gap-2">
            <span className="text-lg font-bold text-slate-900">{isPro ? "Pro" : "Free"}</span>
            <Badge variant={isPro ? "pro" : "free"}>{isPro ? "Pro" : "Free"}</Badge>
          </div>
        </div>
        {isPro && (
          <div className="ml-auto">
            <Button variant="outline" size="sm" onClick={handlePortal} loading={loading === "portal"}>
              Manage subscription
            </Button>
          </div>
        )}
      </div>

      {!isPro && (
        <div>
          <h2 className="mb-4 text-base font-semibold text-slate-900">Upgrade to Pro</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {PLANS.map((p) => (
              <div key={p.id} className={`relative rounded-2xl border p-5 ${p.id === "yearly" ? "border-violet-300 bg-gradient-to-b from-violet-50 to-white" : "border-slate-200 bg-white"}`}>
                {p.savings && (
                  <div className="absolute -top-2.5 left-4 rounded-full bg-violet-600 px-3 py-0.5 text-xs font-semibold text-white">{p.savings}</div>
                )}
                <p className="font-semibold text-slate-900">{p.label}</p>
                <div className="mt-2 flex items-end gap-1">
                  <span className="text-3xl font-bold text-slate-900">{p.price}</span>
                  <span className="mb-0.5 text-sm text-slate-500">{p.period}</span>
                </div>
                <ul className="mt-3 space-y-1.5 text-sm text-slate-600">
                  {["Unlimited subscriptions", "Export CSV", "Custom alerts", "Monthly email digest"].map(f => (
                    <li key={f} className="flex items-center gap-2">
                      <svg className="h-4 w-4 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                      {f}
                    </li>
                  ))}
                </ul>
                <Button className="mt-4 w-full" onClick={() => handleCheckout(p.id)} loading={loading === p.id}>
                  Choose {p.label}
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}

      {isPro && (
        <div className="rounded-2xl border border-red-100 bg-red-50 p-5">
          <h3 className="font-semibold text-red-900">Cancel Pro subscription</h3>
          <p className="mt-1 text-sm text-red-700">You&apos;ll lose access to Pro features at the end of your current billing period.</p>
          <Button variant="danger" size="sm" className="mt-3" onClick={() => setCancelModal(true)}>
            Cancel Pro plan
          </Button>
        </div>
      )}

      <Modal open={cancelModal} onClose={() => setCancelModal(false)} title="Cancel Pro plan">
        <p className="text-sm text-slate-600">Are you sure? You&apos;ll be downgraded to Free at the end of your current period and lose access to Pro features.</p>
        <div className="mt-5 flex gap-3">
          <Button variant="outline" onClick={() => setCancelModal(false)} className="flex-1">Keep Pro</Button>
          <Button variant="danger" onClick={() => { setCancelModal(false); handlePortal() }} className="flex-1">Continue to cancel</Button>
        </div>
      </Modal>
    </div>
  )
}
