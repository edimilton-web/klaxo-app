"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { formatDate } from "@/lib/utils"

interface OverdueBannerProps {
  subscriptionId: string
  subscriptionName: string
  nextBillingDate: string
}

export function OverdueBanner({ subscriptionId, subscriptionName, nextBillingDate }: OverdueBannerProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  async function handleMarkPaid() {
    setLoading(true)
    const res = await fetch(`/api/subscriptions/${subscriptionId}/mark-paid`, { method: "POST" })
    setLoading(false)
    if (!res.ok) { toast.error("Failed to mark as paid"); return }
    toast.success("Marked as paid — renewal date updated")
    router.push("/subscriptions")
    router.refresh()
  }

  async function handleSnooze() {
    const res = await fetch(`/api/subscriptions/${subscriptionId}/snooze`, { method: "POST" })
    if (!res.ok) { toast.error("Failed to snooze"); return }
    toast.success("We'll remind you again tomorrow")
    router.back()
  }

  return (
    <div className="mb-6 rounded-xl border border-orange-500/25 bg-orange-500/10 p-4">
      <div className="flex items-start gap-3">
        <div className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-orange-500/20">
          <svg className="h-3 w-3 text-orange-400" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
        </div>
        <div className="flex-1">
          <p className="text-sm font-medium text-orange-200">
            This subscription was due on {formatDate(nextBillingDate)}. Have you paid?
          </p>
          <p className="mt-0.5 text-xs text-orange-300/60">{subscriptionName}</p>
          <div className="mt-3 flex gap-2">
            <Button
              size="sm"
              onClick={handleMarkPaid}
              loading={loading}
              className="bg-violet-600 hover:bg-violet-500 text-white"
            >
              Mark as paid
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleSnooze}
              className="text-white/50 hover:text-white/80"
            >
              Remind me tomorrow
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
