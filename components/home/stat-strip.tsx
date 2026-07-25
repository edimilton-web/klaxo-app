const STATS = [
  { value: "Any currency → EUR", label: "Automatic conversion" },
  { value: "5 days", label: "Warning before each renewal" },
  { value: "EU hosted", label: "Data stored in Frankfurt" },
  { value: "GDPR", label: "Compliant by design" },
]

export function StatStrip() {
  return (
    <section className="border-y border-white/[0.05] bg-white/[0.02] px-4 py-10 md:px-6">
      <div className="mx-auto grid max-w-5xl grid-cols-1 divide-y divide-white/[0.06] md:grid-cols-4 md:divide-x md:divide-y-0">
        {STATS.map((stat) => (
          <div key={stat.label} className="px-4 py-3 text-center first:pl-0 last:pr-0 md:py-0">
            <p className="text-lg font-bold text-white md:text-xl">{stat.value}</p>
            <p className="mt-1 text-xs text-white/40">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
