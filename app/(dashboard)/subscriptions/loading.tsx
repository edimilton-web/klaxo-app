export default function Loading() {
  return (
    <div className="animate-pulse">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <div className="h-7 w-36 rounded-lg bg-white/10" />
          <div className="mt-1.5 h-4 w-48 rounded-lg bg-white/[0.06]" />
        </div>
        <div className="h-8 w-16 rounded-lg bg-white/10" />
      </div>
      <div className="space-y-2">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="h-16 rounded-2xl bg-white/[0.06]" />
        ))}
      </div>
    </div>
  )
}
