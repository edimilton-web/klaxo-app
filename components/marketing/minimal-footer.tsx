import Link from "next/link"

export function MinimalFooter() {
  return (
    <footer className="border-t border-white/[0.05] px-4 py-10 md:px-6">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-3 text-sm text-white/25 sm:flex-row sm:justify-between">
        <p>© {new Date().getFullYear()} Klaxo · Personal subscription manager</p>
        <div className="flex gap-4">
          <Link href="/privacy" className="hover:text-white/50 transition-colors">Privacy</Link>
          <Link href="/terms" className="hover:text-white/50 transition-colors">Terms</Link>
        </div>
      </div>
    </footer>
  )
}
