export default function OfflinePage() {
  return (
    <div className="min-h-screen bg-[#0A0A0F] flex items-center justify-center px-4">
      <div className="text-center max-w-sm">
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-[22%] bg-gradient-to-br from-[#A78BFA] via-[#7C3AED] to-[#3B0764]">
          <span
            className="text-5xl font-black text-white"
            style={{ fontFamily: "Nunito, system-ui, sans-serif" }}
          >
            K
          </span>
        </div>

        <h1 className="text-2xl font-semibold text-white">You&apos;re offline</h1>
        <p className="mt-2 text-sm text-white/40">
          Check your connection and try again. Your subscription data will be here when you&apos;re back.
        </p>

        <button
          onClick={() => window.location.reload()}
          className="mt-8 w-full rounded-xl bg-violet-600 py-3 text-sm font-semibold text-white transition-colors hover:bg-violet-500"
        >
          Try again
        </button>
      </div>
    </div>
  )
}
