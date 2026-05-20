import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import { notFound } from "next/navigation"
import { SubscriptionForm } from "@/components/subscriptions/subscription-form"
import { OverdueBanner } from "@/components/subscriptions/overdue-banner"

export default async function EditSubscriptionPage({ params }: { params: Promise<{ id: string }> }) {
  const session = await auth()
  const { id } = await params
  const sub = await prisma.subscription.findUnique({ where: { id } })
  if (!sub || sub.userId !== session!.user.id) notFound()

  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const billingDate = new Date(sub.nextBillingDate)
  billingDate.setHours(0, 0, 0, 0)
  const isSnoozed = sub.snoozedUntil ? new Date(sub.snoozedUntil) > new Date() : false
  const showBanner = billingDate < today && sub.status === "ACTIVE" && !isSnoozed

  return (
    <div className="mx-auto max-w-lg">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white">Edit subscription</h1>
        <p className="mt-0.5 text-sm text-white/40">{sub.name}</p>
      </div>
      {showBanner && (
        <OverdueBanner
          subscriptionId={sub.id}
          subscriptionName={sub.name}
          nextBillingDate={sub.nextBillingDate.toISOString()}
        />
      )}
      <div className="rounded-2xl border border-white/[0.08] bg-[#16161F] p-6">
        <SubscriptionForm
          initialData={{
            id: sub.id,
            name: sub.name,
            amount: Number(sub.amount),
            currency: sub.currency,
            billingCycle: sub.billingCycle,
            nextBillingDate: sub.nextBillingDate.toISOString().split("T")[0],
            category: sub.category ?? "",
            notes: sub.notes ?? "",
            logoUrl: sub.logoUrl ?? "",
          }}
        />
      </div>
    </div>
  )
}
