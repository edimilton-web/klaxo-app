import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import { SubscriptionItem } from "@/components/subscriptions/subscription-item"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { formatCurrency } from "@/lib/utils"
import { toMonthlyEur } from "@/lib/exchange-rate"

export default async function SubscriptionsPage() {
  const session = await auth()
  const userId = session!.user.id

  const [subscriptions, user] = await Promise.all([
    prisma.subscription.findMany({
      where: { userId, status: { not: "CANCELLED" } },
      orderBy: { nextBillingDate: "asc" },
    }),
    prisma.user.findUnique({ where: { id: userId }, select: { plan: true } }),
  ])

  const active = subscriptions.filter((s) => s.status === "ACTIVE")
  const paused = subscriptions.filter((s) => s.status === "PAUSED")
  const isProUser = user?.plan === "PRO"
  const atLimit = !isProUser && active.length >= 5

  let totalMonthlyEur = 0
  for (const sub of active) {
    const eur = Number(sub.amountEur ?? sub.amount)
    totalMonthlyEur += toMonthlyEur(eur, sub.billingCycle)
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Subscriptions</h1>
          <p className="mt-0.5 text-sm text-white/40">
            {active.length} active · {formatCurrency(totalMonthlyEur)}/month
          </p>
        </div>
        <div className="flex items-center gap-2">
          {isProUser && (
            <a href="/api/export/csv" download="klaxo-subscriptions.csv">
              <Button variant="outline" size="sm">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                Export CSV
              </Button>
            </a>
          )}
          <Link href="/subscriptions/new">
            <Button size="sm" disabled={atLimit}>
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
              Add
            </Button>
          </Link>
        </div>
      </div>

      {atLimit && (
        <div className="mb-4 flex items-center gap-3 rounded-xl border border-amber-500/20 bg-amber-500/8 p-4">
          <svg className="h-5 w-5 flex-shrink-0 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
          <p className="text-sm text-amber-300/80">You&apos;ve reached the Free plan limit (5 subscriptions). <Link href="/billing" className="font-semibold text-amber-300 underline">Upgrade to Pro</Link> for unlimited subscriptions.</p>
        </div>
      )}

      {subscriptions.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-white/20 bg-[#16161F] p-12 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-600/15">
            <svg className="h-7 w-7 text-violet-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>
          </div>
          <h3 className="font-semibold text-white">No subscriptions yet</h3>
          <p className="mt-1 text-sm text-white/40">Add your first subscription to start tracking your spending.</p>
          <Link href="/subscriptions/new" className="mt-4 inline-block">
            <Button>Add subscription</Button>
          </Link>
        </div>
      ) : (
        <div className="space-y-3">
          {active.length > 0 && (
            <div>
              <div className="mb-2 flex items-center gap-2">
                <h2 className="text-sm font-semibold text-white/50">Active</h2>
                <Badge variant="success">{active.length}</Badge>
              </div>
              <div className="space-y-2">
                {active.map((sub) => (
                  <SubscriptionItem key={sub.id} sub={{ ...sub, amount: Number(sub.amount), amountEur: sub.amountEur ? Number(sub.amountEur) : null, nextBillingDate: sub.nextBillingDate.toISOString() }} />
                ))}
              </div>
            </div>
          )}
          {paused.length > 0 && (
            <div className="mt-4">
              <div className="mb-2 flex items-center gap-2">
                <h2 className="text-sm font-semibold text-white/50">Paused</h2>
                <Badge variant="warning">{paused.length}</Badge>
              </div>
              <div className="space-y-2">
                {paused.map((sub) => (
                  <SubscriptionItem key={sub.id} sub={{ ...sub, amount: Number(sub.amount), amountEur: sub.amountEur ? Number(sub.amountEur) : null, nextBillingDate: sub.nextBillingDate.toISOString() }} />
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
