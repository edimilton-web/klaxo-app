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
          "bg-white/10 text-white/60": variant === "default",
          "bg-emerald-500/15 text-emerald-400": variant === "success",
          "bg-amber-500/15 text-amber-400": variant === "warning",
          "bg-red-500/15 text-red-400": variant === "danger",
          "bg-gradient-to-r from-violet-600 to-indigo-600 text-white": variant === "pro",
          "bg-white/10 text-white/40": variant === "free",
        },
        className
      )}
    >
      {children}
    </span>
  )
}
