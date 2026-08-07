import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"

function MiniDashboard() {
  return (
    <div className="relative mx-auto mt-14 max-w-2xl">
      <div className="pointer-events-none absolute -inset-8 rounded-3xl bg-violet-600/10 blur-3xl" />

      <div className="relative overflow-hidden rounded-2xl border border-white/[0.08] bg-[#0D0D14] shadow-2xl shadow-black/60">
        <Image
          src="/screenshots/dashboard.png"
          width={1023}
          height={569}
          alt="Klaxo dashboard showing subscription summary and monthly spending chart"
          className="h-auto w-full"
          priority
        />
      </div>
    </div>
  )
}

export function Hero() {
  return (
    <section className="relative px-4 pt-20 pb-10 text-center md:px-6 md:pt-28">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(124,92,252,0.12)_0%,_transparent_60%)]" />

      <div className="relative mx-auto max-w-3xl">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-violet-500/20 bg-violet-500/8 px-3 py-1 text-xs font-medium text-violet-300">
          🇪🇺 Built for the European market · GDPR compliant
        </div>

        <h1 className="text-4xl font-extrabold tracking-tight text-white md:text-6xl" style={{ letterSpacing: "-0.03em" }}>
          You&apos;re paying for things
          <br />
          <span className="bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent">
            you forgot exist.
          </span>
        </h1>

        <p className="mx-auto mt-5 max-w-lg text-base text-white/45 md:text-lg">
          The average person underestimates their subscription spend by <span className="font-semibold text-white/80">$200+</span> per month. Klaxo shows you the real number — and warns you before every renewal.
        </p>

        <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <Link href="/register">
            <Button size="lg" className="w-full sm:w-auto shadow-lg shadow-violet-900/40">
              Create free account
            </Button>
          </Link>
          <Link href="/login">
            <Button variant="outline" size="lg" className="w-full sm:w-auto">
              Already have an account →
            </Button>
          </Link>
        </div>

        <p className="mt-4 text-sm text-white/25">Free plan · Up to 5 subscriptions · Forever free</p>
      </div>

      <MiniDashboard />
    </section>
  )
}
