export default function Loading() {
  return (
    <div className="mx-auto max-w-lg animate-pulse">
      <div className="mb-6">
        <div className="h-7 w-28 rounded-lg bg-white/10" />
        <div className="mt-1.5 h-4 w-56 rounded-lg bg-white/[0.06]" />
      </div>
      <div className="h-64 rounded-2xl bg-white/[0.06]" />
    </div>
  )
}
