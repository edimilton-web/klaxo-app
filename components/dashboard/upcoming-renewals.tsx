import { formatCurrency, getDaysUntil, formatDate } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"

interface Subscription {
  id: string
  name: string
  amount: number
  currency: string
  nextBillingDate: string
  logoUrl?: string | null
  category?: string | null
}

interface UpcomingRenewalsProps {
  items: Subscription[]
}

export function UpcomingRenewals({ items }: UpcomingRenewalsProps) {
  if (!items.length) {
    return (
      <div className="rounded-2xl border border-white/[0.12] bg-[#16161F] p-5">
        <h3 className="mb-4 font-semibold text-white">Upcoming renewals</h3>
        <p className="py-6 text-center text-sm text-white/30">No renewals in the next 7 days.</p>
      </div>
    )
  }

  return (
    <div className="rounded-2xl border border-white/[0.12] bg-[#16161F] p-5">
      <h3 className="mb-4 font-semibold text-white">Upcoming renewals</h3>
      <div className="space-y-3">
        {items.map((item) => {
          const days = getDaysUntil(item.nextBillingDate)
          return (
            <div key={item.id} className="flex items-center gap-3">
              <div className={`flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl overflow-hidden ${item.logoUrl ? "bg-white" : "bg-white/8 text-sm font-bold text-white/60"}`}>
                {item.logoUrl ? (
                  <img src={item.logoUrl} alt={item.name} className="h-full w-full object-contain p-1" />
                ) : (
                  item.name[0].toUpperCase()
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="truncate text-sm font-medium text-white">{item.name}</p>
                <p className="text-xs text-white/35">{formatDate(item.nextBillingDate)}</p>
              </div>
              <div className="flex flex-col items-end gap-1">
                <span className="text-sm font-semibold text-white">{formatCurrency(Number(item.amount), item.currency)}</span>
                <Badge variant={days === 0 ? "danger" : days <= 2 ? "warning" : "default"}>
                  {days === 0 ? "Today" : `${days}d`}
                </Badge>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
