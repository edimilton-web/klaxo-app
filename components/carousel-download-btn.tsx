"use client"
import { useState } from "react"

export function CarouselDownloadBtn({ n }: { n: number }) {
  const [loading, setLoading] = useState(false)

  async function download() {
    setLoading(true)
    try {
      const res = await fetch(`/api/carousel/${n}`)
      const blob = await res.blob()
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = `klaxo-slide-${n}.png`
      a.click()
      URL.revokeObjectURL(url)
    } finally {
      setLoading(false)
    }
  }

  return (
    <button
      onClick={download}
      disabled={loading}
      className="flex items-center gap-1.5 rounded-lg bg-violet-600/20 border border-violet-500/30 px-3 py-1 text-xs font-medium text-violet-400 hover:bg-violet-600/30 transition-colors disabled:opacity-50"
    >
      <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
      </svg>
      {loading ? "A guardar…" : "Download PNG"}
    </button>
  )
}
