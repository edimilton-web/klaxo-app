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
      "rounded-2xl border p-5 shadow-sm",
      accent ? "border-violet-200 bg-gradient-to-br from-violet-600 to-indigo-600 text-white" : "border-slate-100 bg-white"
    )}>
      <div className="flex items-start justify-between">
        <p className={cn("text-sm font-medium", accent ? "text-violet-200" : "text-slate-500")}>{title}</p>
        {icon && <div className={cn("rounded-lg p-1.5", accent ? "bg-white/20" : "bg-violet-50")}>{icon}</div>}
      </div>
      <p className={cn("mt-2 text-3xl font-bold tracking-tight", accent ? "text-white" : "text-slate-900")}>
        {display}
      </p>
      {subtitle && <p className={cn("mt-1 text-sm", accent ? "text-violet-200" : "text-slate-400")}>{subtitle}</p>}
    </div>
  )
}
