import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import { notFound } from "next/navigation"
import { SubscriptionForm } from "@/components/subscriptions/subscription-form"

export default async function EditSubscriptionPage({ params }: { params: Promise<{ id: string }> }) {
  const session = await auth()
  const { id } = await params
  const sub = await prisma.subscription.findUnique({ where: { id } })
  if (!sub || sub.userId !== session!.user.id) notFound()

  return (
    <div className="mx-auto max-w-lg">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900">Edit subscription</h1>
        <p className="mt-0.5 text-sm text-slate-500">{sub.name}</p>
      </div>
      <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
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
