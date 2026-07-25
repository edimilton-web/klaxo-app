import { Database, Ban, MapPin, Trash2 } from "lucide-react"

const CARDS = [
  {
    icon: Database,
    title: "You enter, you control",
    desc: "Klaxo never connects to your bank account. You add what you want tracked.",
  },
  {
    icon: Ban,
    title: "No third-party sales",
    desc: "We don't sell or share your data. Our business model is the Pro plan, not your data.",
  },
  {
    icon: MapPin,
    title: "EU infrastructure",
    desc: "Hosted on EU servers (Frankfurt). Subject to GDPR, by design and by law.",
  },
  {
    icon: Trash2,
    title: "Delete anytime",
    desc: "One click erases your account and every byte of your data.",
  },
]

export function Privacy() {
  return (
    <section className="px-4 py-20 md:px-6">
      <div className="mx-auto max-w-4xl">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-violet-400">Privacy first</p>
          <h2 className="mt-3 text-2xl font-bold text-white md:text-3xl">No bank logins. No data selling. No tricks.</h2>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {CARDS.map((card) => (
            <div key={card.title} className="rounded-2xl border border-white/[0.12] bg-[#16161F] p-5">
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-violet-600/15">
                <card.icon className="h-5 w-5 text-violet-400" strokeWidth={1.75} />
              </div>
              <h3 className="font-semibold text-white">{card.title}</h3>
              <p className="mt-1 text-sm leading-relaxed text-white/40">{card.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
