"use client"
import { useState } from "react"
import Link from "next/link"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { formatCurrency, formatDate, getDaysUntil, BILLING_CYCLE_LABELS } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Modal } from "@/components/ui/modal"

interface Subscription {
  id: string
  name: string
  amount: number
  currency: string
  amountEur?: number | null
  billingCycle: string
  nextBillingDate: string
  category?: string | null
  status: string
  notes?: string | null
  logoUrl?: string | null
}

export function SubscriptionItem({ sub }: { sub: Subscription }) {
  const router = useRouter()
  const [confirmOpen, setConfirmOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const days = getDaysUntil(sub.nextBillingDate)

  async function handleCancel() {
    setLoading(true)
    const res = await fetch(`/api/subscriptions/${sub.id}`, { method: "DELETE" })
    setLoading(false)
    setConfirmOpen(false)
    if (!res.ok) { toast.error("Failed to cancel subscription"); return }
    toast.success("Subscription cancelled")
    router.refresh()
  }

  async function togglePause() {
    const newStatus = sub.status === "PAUSED" ? "ACTIVE" : "PAUSED"
    const res = await fetch(`/api/subscriptions/${sub.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: newStatus }),
    })
    if (!res.ok) { toast.error("Failed to update subscription"); return }
    toast.success(newStatus === "PAUSED" ? "Subscription paused" : "Subscription resumed")
    router.refresh()
  }

  return (
    <>
      <div className="flex items-center gap-4 rounded-xl border border-slate-100 bg-white p-4 shadow-sm hover:border-violet-200 transition-colors">
        <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-slate-100 text-base font-bold text-slate-600 overflow-hidden">
          {sub.logoUrl ? <img src={sub.logoUrl} alt={sub.name} className="h-full w-full object-contain p-1.5" /> : sub.name[0].toUpperCase()}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-900">{sub.name}</span>
            {sub.status === "PAUSED" && <Badge variant="warning">Paused</Badge>}
            {sub.category && <Badge>{sub.category}</Badge>}
          </div>
          <p className="mt-0.5 text-sm text-slate-500">
            {BILLING_CYCLE_LABELS[sub.billingCycle] ?? sub.billingCycle} · Renews {days === 0 ? "today" : `in ${days}d`} · {formatDate(sub.nextBillingDate)}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right">
            <p className="font-semibold text-slate-900">{formatCurrency(Number(sub.amount), sub.currency)}</p>
            {sub.currency !== "EUR" && sub.amountEur && (
              <p className="text-xs text-slate-400">≈ {formatCurrency(Number(sub.amountEur))}</p>
            )}
          </div>

          <div className="flex gap-1">
            <Link href={`/subscriptions/${sub.id}`}>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
              </Button>
            </Link>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={togglePause}>
              {sub.status === "PAUSED"
                ? <svg className="h-4 w-4 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                : <svg className="h-4 w-4 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              }
            </Button>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={() => setConfirmOpen(true)}>
              <svg className="h-4 w-4 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            </Button>
          </div>
        </div>
      </div>

      <Modal open={confirmOpen} onClose={() => setConfirmOpen(false)} title="Cancel subscription">
        <p className="text-sm text-slate-600">Are you sure you want to cancel <strong>{sub.name}</strong>? The subscription will be marked as cancelled.</p>
        <div className="mt-5 flex gap-3">
          <Button variant="outline" onClick={() => setConfirmOpen(false)} className="flex-1">Keep it</Button>
          <Button variant="danger" onClick={handleCancel} loading={loading} className="flex-1">Cancel subscription</Button>
        </div>
      </Modal>
    </>
  )
}
