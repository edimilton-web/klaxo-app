import { Euro, BellRing, ShieldCheck, CalendarClock, Mail, FileDown } from "lucide-react"

const FEATURES = [
  {
    icon: Euro,
    title: "Real cost in EUR",
    desc: "See exactly how much you spend monthly across all currencies, automatically converted to EUR.",
  },
  {
    icon: BellRing,
    title: "Email alerts",
    desc: "Get notified 5 days before each renewal — no more surprise charges on your statement.",
  },
  {
    icon: ShieldCheck,
    title: "Privacy first",
    desc: "Cookies only run with your consent, and you can opt out anytime — fully GDPR compliant.",
  },
  {
    icon: CalendarClock,
    title: "Any billing cycle",
    desc: "Monthly, yearly, quarterly, custom. Klaxo handles month-end dates correctly — even Feb 31st edge cases.",
  },
  {
    icon: Mail,
    title: "Monthly digest",
    desc: "One email per month with your full spending picture. (Pro)",
  },
  {
    icon: FileDown,
    title: "CSV export",
    desc: "Your data is yours. Export everything, anytime. (Pro)",
  },
]

export function Features() {
  return (
    <section id="features" className="px-4 py-20 md:px-6">
      <div className="mx-auto max-w-4xl">
        <h2 className="mb-10 text-center text-2xl font-bold text-white md:text-3xl">Everything you need</h2>
        <div className="grid gap-4 sm:grid-cols-3">
          {FEATURES.map((f) => (
            <div key={f.title} className="rounded-2xl border border-white/[0.12] bg-[#16161F] p-5 hover:border-violet-500/25 transition-colors">
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-violet-600/15">
                <f.icon className="h-5 w-5 text-violet-400" strokeWidth={1.75} />
              </div>
              <h3 className="font-semibold text-white">{f.title}</h3>
              <p className="mt-1 text-sm leading-relaxed text-white/40">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
