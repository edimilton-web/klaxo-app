export default function Loading() {
  return (
    <div className="mx-auto max-w-2xl animate-pulse">
      <div className="mb-5">
        <div className="h-7 w-24 rounded-lg bg-white/10" />
        <div className="mt-1.5 h-4 w-52 rounded-lg bg-white/[0.06]" />
      </div>
      <div className="h-24 rounded-2xl bg-white/[0.06]" />
    </div>
  )
}
