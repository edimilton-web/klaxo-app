import Link from "next/link"
import Image from "next/image"
import { Euro, BellRing, ShieldCheck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { MinimalHeader } from "@/components/marketing/minimal-header"
import { MinimalFooter } from "@/components/marketing/minimal-footer"

export const metadata = {
  title: "Subscription Tracker — See Every Subscription in One Place | Klaxo",
  description:
    "Track all your subscriptions in one place. See your real monthly cost and get an email alert before every renewal. Free for up to 5 subscriptions.",
}

const PROOFS = [
  {
    icon: Euro,
    title: "Your real total",
    desc: "Every subscription converted into one monthly number.",
  },
  {
    icon: BellRing,
    title: "Alerts before renewal",
    desc: "An email 5 days before anything charges you.",
  },
  {
    icon: ShieldCheck,
    title: "Private by design",
    desc: "No bank login. No data selling. You stay in control.",
  },
]

export default function SubscriptionTrackerPage() {
  return (
    <div className="min-h-screen bg-[#0A0A0F] text-white overflow-x-hidden">
      <MinimalHeader />

      <section className="relative px-4 pt-16 pb-10 text-center md:px-6 md:pt-24">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(124,92,252,0.12)_0%,_transparent_60%)]" />

        <div className="relative mx-auto max-w-3xl">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-violet-500/20 bg-violet-500/8 px-3 py-1 text-xs font-medium text-violet-300">
            🇪🇺 Built for the European market · GDPR compliant
          </div>

          <h1 className="text-4xl font-extrabold tracking-tight text-white md:text-6xl" style={{ letterSpacing: "-0.03em" }}>
            Every subscription you&apos;re paying for,
            <br />
            <span className="bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent">
              in one place.
            </span>
          </h1>

          <p className="mx-auto mt-5 max-w-lg text-base text-white/45 md:text-lg">
            Klaxo shows your real monthly total and emails you 5 days before each renewal. Free for up to 5 subscriptions.
          </p>

          <div className="mt-8 flex justify-center">
            <Link href="/register">
              <Button size="lg" className="shadow-lg shadow-violet-900/40">
                Create free account
              </Button>
            </Link>
          </div>

          <p className="mt-4 text-sm text-white/25">Free plan · Up to 5 subscriptions · Forever free</p>
        </div>

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
      </section>

      <section className="px-4 py-16 md:px-6">
        <div className="mx-auto max-w-4xl">
          <div className="grid gap-4 sm:grid-cols-3">
            {PROOFS.map((p) => (
              <div key={p.title} className="rounded-2xl border border-white/[0.12] bg-[#16161F] p-5 hover:border-violet-500/25 transition-colors">
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-violet-600/15">
                  <p.icon className="h-5 w-5 text-violet-400" strokeWidth={1.75} />
                </div>
                <h3 className="font-semibold text-white">{p.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-white/40">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-16 text-center md:px-6">
        <div className="mx-auto max-w-2xl rounded-3xl border border-violet-500/20 bg-gradient-to-br from-violet-600/15 to-indigo-600/10 p-10 shadow-xl shadow-violet-900/20">
          <h2 className="text-2xl font-bold text-white md:text-3xl">Start tracking — free</h2>
          <p className="mt-3 text-white/40">No credit card required. No commitment.</p>
          <Link href="/register" className="mt-6 inline-block">
            <Button size="lg" className="shadow-lg shadow-violet-900/40">Create free account</Button>
          </Link>
        </div>
      </section>

      <MinimalFooter />
    </div>
  )
}
