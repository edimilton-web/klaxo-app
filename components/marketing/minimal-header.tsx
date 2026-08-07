import Link from "next/link"
import { Button } from "@/components/ui/button"
import { KlaxoLogo } from "@/components/klaxo-logo"

export function MinimalHeader() {
  return (
    <nav className="sticky top-0 z-50 border-b border-white/[0.05] bg-[#0A0A0F]/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4 md:px-6">
        <div className="flex items-center gap-2.5">
          <KlaxoLogo size="sm" />
          <span className="text-lg font-semibold text-white">Klaxo</span>
        </div>
        <Link href="/register">
          <Button size="sm" className="min-h-11">Create free account</Button>
        </Link>
      </div>
    </nav>
  )
}
