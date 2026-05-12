"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { signOut } from "next-auth/react"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"

const NAV = [
  { href: "/dashboard", label: "Dashboard", icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" },
  { href: "/subscriptions", label: "Subscriptions", icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" },
  { href: "/billing", label: "Billing", icon: "M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" },
  { href: "/settings", label: "Settings", icon: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z" },
]

interface SidebarProps {
  user: { name?: string | null; email?: string | null; plan?: string }
}

export function Sidebar({ user }: SidebarProps) {
  const pathname = usePathname()

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden md:flex h-screen w-64 flex-col border-r border-white/[0.06] bg-[#0D0D14] sticky top-0">
        <div className="flex h-16 items-center gap-3 border-b border-white/[0.06] px-5">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-violet-600">
            <span className="text-sm font-black text-white">K</span>
          </div>
          <span className="text-lg font-bold text-white tracking-tight">Klaxo</span>
        </div>

        <nav className="flex-1 space-y-0.5 p-3">
          {NAV.map((item) => {
            const active = pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href))
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-150",
                  active
                    ? "bg-violet-600/15 text-violet-400"
                    : "text-white/40 hover:bg-white/5 hover:text-white/80"
                )}
              >
                <svg
                  className={cn("h-5 w-5 flex-shrink-0 transition-colors", active ? "text-violet-400" : "text-white/30")}
                  fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
                </svg>
                {item.label}
              </Link>
            )
          })}
        </nav>

        <div className="border-t border-white/[0.06] p-3">
          <div className="mb-1 flex items-center gap-3 rounded-xl px-3 py-2.5">
            <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-violet-600/20 text-sm font-semibold text-violet-400">
              {user.name?.[0]?.toUpperCase() ?? user.email?.[0]?.toUpperCase() ?? "U"}
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-white/80">{user.name ?? "User"}</p>
              <div className="flex items-center gap-1.5 mt-0.5">
                <Badge variant={user.plan === "PRO" ? "pro" : "free"}>{user.plan === "PRO" ? "Pro" : "Free"}</Badge>
              </div>
            </div>
          </div>
          <button
            onClick={() => signOut({ callbackUrl: "/login" })}
            className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-sm text-white/35 hover:bg-white/5 hover:text-white/60 transition-colors"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            Sign out
          </button>
          <div className="mt-3 border-t border-white/[0.06] pt-3 px-3 space-y-1">
            <a href="mailto:support@klaxo.app" className="block text-xs text-white/25 hover:text-violet-400 transition-colors">
              support@klaxo.app
            </a>
            <Link href="/privacy" className="block text-xs text-white/25 hover:text-violet-400 transition-colors">
              Privacy &amp; GDPR
            </Link>
            <Link href="/terms" className="block text-xs text-white/25 hover:text-violet-400 transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </aside>

      {/* Mobile bottom navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 flex items-center justify-around border-t border-white/[0.08] bg-[#0D0D14] px-2 py-2">
        {NAV.map((item) => {
          const active = pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href))
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center gap-1 rounded-xl px-3 py-1.5 text-xs font-medium transition-colors",
                active ? "text-violet-400" : "text-white/35"
              )}
            >
              <svg className={cn("h-5 w-5", active ? "text-violet-400" : "text-white/30")} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
                <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
              </svg>
              <span>{item.label}</span>
            </Link>
          )
        })}
      </nav>
    </>
  )
}
