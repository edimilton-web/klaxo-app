"use client"
import { useState, useCallback } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select } from "@/components/ui/select"
import { toast } from "sonner"
import { KNOWN_SERVICES } from "@/lib/brandfetch"
import { CATEGORIES, CURRENCIES, BILLING_CYCLE_LABELS } from "@/lib/utils"
import { z } from "zod"

const schema = z.object({
  name: z.string().min(1, "Name is required"),
  amount: z.coerce.number().positive("Amount must be positive"),
  currency: z.string(),
  billingCycle: z.enum(["WEEKLY", "MONTHLY", "YEARLY"]),
  nextBillingDate: z.string().min(1, "Date is required"),
  category: z.string().optional(),
  notes: z.string().optional(),
})

interface SubscriptionFormProps {
  initialData?: {
    id?: string
    name?: string
    amount?: number
    currency?: string
    billingCycle?: string
    nextBillingDate?: string
    category?: string
    notes?: string
    logoUrl?: string
  }
}

export function SubscriptionForm({ initialData }: SubscriptionFormProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [suggestions, setSuggestions] = useState<typeof KNOWN_SERVICES>([])
  const [form, setForm] = useState({
    name: initialData?.name ?? "",
    amount: initialData?.amount?.toString() ?? "",
    currency: initialData?.currency ?? "EUR",
    billingCycle: initialData?.billingCycle ?? "MONTHLY",
    nextBillingDate: initialData?.nextBillingDate ? initialData.nextBillingDate.split("T")[0] : "",
    category: initialData?.category ?? "",
    notes: initialData?.notes ?? "",
    logoUrl: initialData?.logoUrl ?? "",
    domain: "",
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleNameChange = useCallback((value: string) => {
    setForm((f) => ({ ...f, name: value }))
    if (value.length >= 2) {
      const matches = KNOWN_SERVICES.filter((s) => s.name.toLowerCase().includes(value.toLowerCase())).slice(0, 6)
      setSuggestions(matches)
    } else {
      setSuggestions([])
    }
  }, [])

  const selectSuggestion = (service: typeof KNOWN_SERVICES[0]) => {
    setForm((f) => ({ ...f, name: service.name, category: service.category, domain: service.domain }))
    setSuggestions([])
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const parsed = schema.safeParse(form)
    if (!parsed.success) {
      const errs: Record<string, string> = {}
      for (const issue of parsed.error.issues) errs[issue.path[0] as string] = issue.message
      setErrors(errs)
      return
    }
    setErrors({})
    setLoading(true)
    const isEdit = !!initialData?.id
    const res = await fetch(isEdit ? `/api/subscriptions/${initialData.id}` : "/api/subscriptions", {
      method: isEdit ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...parsed.data, logoUrl: form.logoUrl || undefined, domain: form.domain || undefined }),
    })
    const data = await res.json()
    setLoading(false)
    if (!res.ok) {
      if (data.code === "PLAN_LIMIT") {
        toast.error("Free plan limit reached. Upgrade to Pro for unlimited subscriptions.", {
          action: { label: "Upgrade", onClick: () => router.push("/billing") },
          duration: 6000,
        })
        router.push("/billing")
        return
      }
      toast.error(data.error ?? "Failed to save subscription")
      return
    }
    toast.success(isEdit ? "Subscription updated" : "Subscription added")
    router.push("/subscriptions")
    router.refresh()
  }

  const today = new Date().toISOString().split("T")[0]

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="relative">
        <Input
          label="Service name"
          placeholder="e.g. Netflix, Spotify..."
          value={form.name}
          onChange={(e) => handleNameChange(e.target.value)}
          error={errors.name}
          autoComplete="off"
        />
        {suggestions.length > 0 && (
          <ul className="absolute z-10 mt-1 w-full rounded-xl border border-white/[0.10] bg-[#1A1A26] shadow-2xl shadow-black/60 overflow-hidden">
            {suggestions.map((s) => (
              <li key={s.name}>
                <button type="button" onClick={() => selectSuggestion(s)}
                  className="flex w-full items-center gap-3 px-3 py-2.5 text-sm hover:bg-white/5 transition-colors">
                  <span className="font-medium text-white">{s.name}</span>
                  <span className="ml-auto text-xs text-white/35">{s.category}</span>
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Input label="Amount" type="number" step="0.01" min="0.01" placeholder="9.99" value={form.amount} onChange={(e) => setForm({ ...form, amount: e.target.value })} error={errors.amount} />
        <Select label="Currency" value={form.currency} onChange={(e) => setForm({ ...form, currency: e.target.value })} options={CURRENCIES.map((c) => ({ value: c, label: c }))} />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Select label="Billing cycle" value={form.billingCycle} onChange={(e) => setForm({ ...form, billingCycle: e.target.value })} options={Object.entries(BILLING_CYCLE_LABELS).map(([v, l]) => ({ value: v, label: l }))} error={errors.billingCycle} />
        <Input label="Next billing date" type="date" min={today} value={form.nextBillingDate} onChange={(e) => setForm({ ...form, nextBillingDate: e.target.value })} error={errors.nextBillingDate} />
      </div>

      <Select label="Category" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} options={[{ value: "", label: "Select a category" }, ...CATEGORIES.map((c) => ({ value: c, label: c }))]} />

      <Input label="Notes (optional)" placeholder="Any observations..." value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} />

      <div className="flex gap-3 pt-2">
        <Button type="button" variant="outline" onClick={() => router.back()}>Cancel</Button>
        <Button type="submit" loading={loading} className="flex-1">{initialData?.id ? "Save changes" : "Add subscription"}</Button>
      </div>
    </form>
  )
}
