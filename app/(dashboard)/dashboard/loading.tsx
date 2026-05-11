export default function Loading() {
  return (
    <div className="animate-pulse">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <div className="h-7 w-32 rounded-lg bg-white/10" />
          <div className="mt-1.5 h-4 w-52 rounded-lg bg-white/[0.06]" />
        </div>
        <div className="h-8 w-14 rounded-lg bg-white/10" />
      </div>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-24 rounded-2xl bg-white/[0.06]" />
        ))}
      </div>
      <div className="mt-6 grid gap-6 md:grid-cols-2">
        <div className="h-64 rounded-2xl bg-white/[0.06]" />
        <div className="h-64 rounded-2xl bg-white/[0.06]" />
      </div>
    </div>
  )
}
