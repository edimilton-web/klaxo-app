import { SubscriptionForm } from "@/components/subscriptions/subscription-form"

export default function NewSubscriptionPage() {
  return (
    <div className="mx-auto max-w-lg">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900">New subscription</h1>
        <p className="mt-0.5 text-sm text-slate-500">Add a new service to your dashboard</p>
      </div>
      <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
        <SubscriptionForm />
      </div>
    </div>
  )
}
