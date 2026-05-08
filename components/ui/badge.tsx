import { cn } from "@/lib/utils"

interface BadgeProps {
  children: React.ReactNode
  variant?: "default" | "success" | "warning" | "danger" | "pro" | "free"
  className?: string
}

export function Badge({ children, variant = "default", className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold",
        {
          "bg-slate-100 text-slate-700": variant === "default",
          "bg-emerald-100 text-emerald-700": variant === "success",
          "bg-amber-100 text-amber-700": variant === "warning",
          "bg-red-100 text-red-700": variant === "danger",
          "bg-gradient-to-r from-violet-600 to-indigo-600 text-white": variant === "pro",
          "bg-slate-200 text-slate-600": variant === "free",
        },
        className
      )}
    >
      {children}
    </span>
  )
}
