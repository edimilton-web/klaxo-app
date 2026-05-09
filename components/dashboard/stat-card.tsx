import { formatCurrency } from "@/lib/utils"
import { cn } from "@/lib/utils"

interface StatCardProps {
  title: string
  value: string | number
  subtitle?: string
  isCurrency?: boolean
  currency?: string
  accent?: boolean
  icon?: React.ReactNode
}

export function StatCard({ title, value, subtitle, isCurrency, currency = "EUR", accent, icon }: StatCardProps) {
  const display = isCurrency ? formatCurrency(Number(value), currency) : value

  return (
    <div className={cn(
      "rounded-2xl border p-5",
      accent
        ? "border-violet-500/30 bg-gradient-to-br from-violet-600 to-indigo-600 text-white shadow-lg shadow-violet-900/20"
        : "border-white/[0.07] bg-[#111118]"
    )}>
      <div className="flex items-start justify-between">
        <p className={cn("text-xs font-semibold uppercase tracking-wider", accent ? "text-violet-200" : "text-white/40")}>
          {title}
        </p>
        {icon && (
          <div className={cn("rounded-lg p-1.5", accent ? "bg-white/20" : "bg-violet-600/15")}>
            {icon}
          </div>
        )}
      </div>
      <p className={cn("mt-3 text-3xl font-bold tracking-tight", accent ? "text-white" : "text-white")}>
        {display}
      </p>
      {subtitle && (
        <p className={cn("mt-1.5 text-xs", accent ? "text-violet-200" : "text-white/40")}>
          {subtitle}
        </p>
      )}
    </div>
  )
}
