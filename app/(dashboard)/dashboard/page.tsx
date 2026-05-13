import { Suspense } from "react"
import { auth } from "@/auth"
import { StatCard } from "@/components/dashboard/stat-card"
import { CategoryChart } from "@/components/dashboard/category-chart"
import { UpcomingRenewals } from "@/components/dashboard/upcoming-renewals"
import { StatCardSkeleton } from "@/components/ui/skeleton"
import { formatCurrency, getDaysUntil } from "@/lib/utils"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { prisma } from "@/lib/prisma"
import { toMonthlyEur } from "@/lib/exchange-rate"

async function getDashboardData(userId: string) {
  const [subscriptions, upcoming] = await Promise.all([
    prisma.subscription.findMany({ where: { userId, status: "ACTIVE" } }),
    (async () => {
      const today = new Date(); today.setHours(0,0,0,0)
      const in7 = new Date(today); in7.setDate(in7.getDate() + 7)
      return prisma.subscription.findMany({ where: { userId, status: "ACTIVE", nextBillingDate: { lte: in7 } }, orderBy: { nextBillingDate: "asc" } })
    })(),
  ])

  let totalMonthlyEur = 0
  const bySubscription: Array<{ name: string; totalEur: number }> = []

  for (const sub of subscriptions) {
    const eur = Number(sub.amountEur ?? sub.amount)
    const monthly = toMonthlyEur(eur, sub.billingCycle)
    totalMonthlyEur += monthly
    bySubscription.push({ name: sub.name, totalEur: parseFloat(monthly.toFixed(2)) })
  }

  bySubscription.sort((a, b) => b.totalEur - a.totalEur)

  const next = subscriptions.sort((a, b) => new Date(a.nextBillingDate).getTime() - new Date(b.nextBillingDate).getTime())[0]

  return {
    totalMonthlyEur,
    totalAnnualEur: totalMonthlyEur * 12,
    activeCount: subscriptions.length,
    bySubscription,
    upcoming,
    nextRenewal: next ? { name: next.name, daysUntil: getDaysUntil(next.nextBillingDate), amount: Number(next.amount), currency: next.currency } : null,
  }
}

export default async function DashboardPage() {
  const session = await auth()
  const data = await getDashboardData(session!.user.id)
  const isProUser = session?.user?.plan === "PRO"

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Dashboard</h1>
          <p className="mt-0.5 text-sm text-white/40">Your subscriptions at a glance</p>
        </div>
        <Link href="/subscriptions/new">
          <Button size="sm">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
            Add
          </Button>
        </Link>
      </div>

      <Suspense fallback={<div className="grid grid-cols-2 gap-4 md:grid-cols-4"><StatCardSkeleton /><StatCardSkeleton /><StatCardSkeleton /><StatCardSkeleton /></div>}>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          <StatCard title="Monthly cost" value={data.totalMonthlyEur} isCurrency accent />
          <StatCard title="Yearly cost" value={data.totalAnnualEur} isCurrency subtitle="Projection" />
          <StatCard title="Active" value={data.activeCount} subtitle={!isProUser ? `of 5 on Free plan` : "subscriptions"} />
          <StatCard
            title="Next renewal"
            value={data.nextRenewal ? (data.nextRenewal.daysUntil === 0 ? "Today" : `${data.nextRenewal.daysUntil}d`) : "—"}
            subtitle={data.nextRenewal ? `${data.nextRenewal.name} · ${formatCurrency(data.nextRenewal.amount, data.nextRenewal.currency)}` : "No active subscriptions"}
          />
        </div>
      </Suspense>

      {data.activeCount === 0 && (
        <div className="mt-8 rounded-2xl border border-dashed border-white/20 bg-[#16161F] p-12 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-600/15">
            <svg className="h-7 w-7 text-violet-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>
          </div>
          <h3 className="font-semibold text-white">Add your first subscription</h3>
          <p className="mt-1 text-sm text-white/40">Track your services and keep everything under control.</p>
          <Link href="/subscriptions/new" className="mt-4 inline-block">
            <Button>Add subscription</Button>
          </Link>
        </div>
      )}

      {data.activeCount > 0 && (
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          <CategoryChart data={data.bySubscription} />
          <UpcomingRenewals items={data.upcoming.map(s => ({ ...s, amount: Number(s.amount), amountEur: s.amountEur ? Number(s.amountEur) : null, nextBillingDate: s.nextBillingDate.toISOString() }))} />
        </div>
      )}
    </div>
  )
}
