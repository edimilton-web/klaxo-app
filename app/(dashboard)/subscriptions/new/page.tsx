import { SubscriptionForm } from "@/components/subscriptions/subscription-form"

export default function NewSubscriptionPage() {
  return (
    <div className="mx-auto max-w-lg">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white tracking-tight">New subscription</h1>
        <p className="mt-0.5 text-sm text-white/40">Add a new service to your dashboard</p>
      </div>
      <div className="rounded-2xl border border-white/[0.12] bg-[#16161F] p-6">
        <SubscriptionForm />
      </div>
    </div>
  )
}
