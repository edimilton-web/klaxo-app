export function AnchorFeature() {
  return (
    <section className="px-4 py-20 md:px-6">
      <div className="mx-auto grid max-w-4xl items-center gap-10 md:grid-cols-2">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-violet-400">Your real number</p>
          <h2 className="mt-3 text-2xl font-bold text-white md:text-3xl">One number that changes behavior.</h2>
          <p className="mt-4 text-sm leading-relaxed text-white/45 md:text-base">
            Klaxo converts every subscription — dollars, pounds, kroner — into one monthly total in EUR. Most users are surprised by what they see. That surprise is the point.
          </p>
        </div>

        <div className="relative">
          <div className="pointer-events-none absolute -inset-8 rounded-3xl bg-violet-600/10 blur-3xl" />
          <div className="relative overflow-hidden rounded-2xl border border-white/[0.08] bg-[#0D0D14] p-8 text-center shadow-2xl shadow-black/60">
            <p className="text-xs font-semibold uppercase tracking-wider text-white/35">Monthly total</p>
            <p className="mt-3 text-5xl font-extrabold text-white md:text-6xl" style={{ letterSpacing: "-0.03em" }}>
              €84.64
            </p>
            <p className="mt-3 text-sm text-white/35">across 3 currencies</p>
          </div>
        </div>
      </div>
    </section>
  )
}
