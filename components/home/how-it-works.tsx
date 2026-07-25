const STEPS = [
  {
    number: "1",
    title: "Create your free account",
    desc: "No credit card. No bank connection. Your data stays yours.",
  },
  {
    number: "2",
    title: "Add your subscriptions",
    desc: "Name, price, billing cycle. Takes seconds each — Klaxo fetches the logo automatically.",
  },
  {
    number: "3",
    title: "Relax",
    desc: "See your true monthly cost in EUR and get an email 5 days before anything renews.",
  },
]

export function HowItWorks() {
  return (
    <section className="px-4 py-20 md:px-6">
      <div className="mx-auto max-w-4xl">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-violet-400">Simple by design</p>
          <h2 className="mt-3 text-2xl font-bold text-white md:text-3xl">Ready in three steps.</h2>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-3">
          {STEPS.map((step) => (
            <div key={step.number} className="text-center sm:text-left">
              <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-violet-600/15 text-sm font-bold text-violet-400 sm:mx-0">
                {step.number}
              </div>
              <h3 className="mt-4 font-semibold text-white">{step.title}</h3>
              <p className="mt-1 text-sm leading-relaxed text-white/40">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
