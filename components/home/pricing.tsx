import Link from "next/link"
import { Button } from "@/components/ui/button"

export function Pricing() {
  return (
    <section id="pricing" className="px-4 py-16 md:px-6">
      <div className="mx-auto max-w-2xl">
        <h2 className="mb-4 text-center text-2xl font-bold text-white md:text-3xl">Simple pricing</h2>
        <p className="mb-10 text-center text-sm text-white/35">
          No trials that convert silently. No hidden tiers. Ironic pricing games would be a bad look for us.
        </p>
        <div className="grid gap-5 sm:grid-cols-2">
          {/* Free */}
          <div className="rounded-2xl border border-white/[0.12] bg-[#16161F] p-6">
            <p className="font-semibold text-white">Free</p>
            <div className="mt-2 flex items-end gap-1">
              <span className="text-4xl font-bold text-white">€0</span>
              <span className="mb-1 text-white/40">/forever</span>
            </div>
            <ul className="mt-4 space-y-2 text-sm text-white/50">
              {["Up to 5 subscriptions", "Renewal alerts", "Consolidated dashboard"].map((f) => (
                <li key={f} className="flex items-center gap-2">
                  <svg className="h-4 w-4 flex-shrink-0 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  {f}
                </li>
              ))}
            </ul>
            <Link href="/register" className="mt-6 block">
              <Button variant="outline" className="w-full">Get started free</Button>
            </Link>
          </div>

          {/* Pro */}
          <div className="relative rounded-2xl border border-violet-500/40 bg-gradient-to-b from-violet-600/20 to-indigo-600/10 p-6 shadow-lg shadow-violet-900/20">
            <div className="absolute -top-3 left-5 rounded-full bg-amber-400 px-3 py-0.5 text-xs font-bold text-amber-900">Most popular</div>
            <p className="font-semibold text-white">Pro</p>
            <div className="mt-2 flex items-end gap-1">
              <span className="text-4xl font-bold text-white">€3.99</span>
              <span className="mb-1 text-violet-300">/month</span>
            </div>
            <p className="text-sm text-white/40">or €29/year (save €18.88)</p>
            <ul className="mt-4 space-y-2 text-sm text-violet-200/70">
              {["Unlimited subscriptions", "Custom alerts", "Monthly email digest", "CSV export"].map((f) => (
                <li key={f} className="flex items-center gap-2">
                  <svg className="h-4 w-4 flex-shrink-0 text-violet-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  {f}
                </li>
              ))}
            </ul>
            <Link href="/register" className="mt-6 block">
              <Button className="w-full">Start Pro</Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
