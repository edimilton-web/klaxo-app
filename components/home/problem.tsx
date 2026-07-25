const STATS = [
  {
    stat: "89% of people underestimate what they spend on subscriptions",
    source: "West Monroe survey of 2,500 consumers",
  },
  {
    stat: "13 million people in the UK have taken out a subscription by accident",
    source: "Citizens Advice",
  },
  {
    stat: "£800M wasted per year on unwanted subscriptions",
    source: "Citizens Advice",
  },
]

export function Problem() {
  return (
    <section className="px-4 py-20 md:px-6">
      <div className="mx-auto max-w-4xl">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-violet-400">The problem</p>
          <h2 className="mt-3 text-2xl font-bold text-white md:text-3xl">Subscriptions are designed to be forgotten.</h2>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          {STATS.map((item) => (
            <div key={item.source + item.stat} className="rounded-2xl border border-white/[0.12] bg-[#16161F] p-5">
              <p className="text-lg font-semibold text-white">{item.stat}</p>
              <p className="mt-3 text-xs text-white/35">Source: {item.source}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
