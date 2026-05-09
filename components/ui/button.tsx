"use client"
import { forwardRef } from "react"
import { cn } from "@/lib/utils"

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "danger" | "outline"
  size?: "sm" | "md" | "lg"
  loading?: boolean
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", loading, children, disabled, ...props }, ref) => {
    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={cn(
          "inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition-all duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0A0A0F] disabled:pointer-events-none disabled:opacity-40",
          {
            "bg-violet-600 text-white hover:bg-violet-500 active:scale-95 shadow-sm shadow-violet-900/30": variant === "primary",
            "bg-violet-600/15 text-violet-400 border border-violet-500/25 hover:bg-violet-600/25": variant === "secondary",
            "bg-transparent text-white/50 hover:bg-white/5 hover:text-white/80": variant === "ghost",
            "bg-red-600 text-white hover:bg-red-500 active:scale-95": variant === "danger",
            "border border-white/10 bg-white/5 text-white/60 hover:bg-white/10 hover:text-white/80": variant === "outline",
            "px-3 py-1.5 text-sm": size === "sm",
            "px-4 py-2.5 text-sm": size === "md",
            "px-6 py-3 text-base": size === "lg",
          },
          className
        )}
        {...props}
      >
        {loading && (
          <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
        )}
        {children}
      </button>
    )
  }
)
Button.displayName = "Button"
