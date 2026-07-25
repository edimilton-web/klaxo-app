import Link from "next/link"
import { Button } from "@/components/ui/button"

export function FinalCta() {
  return (
    <section className="px-4 py-16 text-center md:px-6">
      <div className="mx-auto max-w-2xl rounded-3xl border border-violet-500/20 bg-gradient-to-br from-violet-600/15 to-indigo-600/10 p-10 shadow-xl shadow-violet-900/20">
        <h2 className="text-2xl font-bold text-white md:text-3xl">Start today, for free</h2>
        <p className="mt-3 text-white/40">No credit card required. No commitment.</p>
        <Link href="/register" className="mt-6 inline-block">
          <Button size="lg" className="shadow-lg shadow-violet-900/40">Create free account</Button>
        </Link>
      </div>
    </section>
  )
}
