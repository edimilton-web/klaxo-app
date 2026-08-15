import type { Metadata } from "next"
import { IBM_Plex_Mono, Manrope } from "next/font/google"
import "./lp.css"

// Manrope carries the headlines: a tight, semi-geometric grotesque that holds
// its shape at 800 weight without the corporate flatness of a system face.
const display = Manrope({
  subsets: ["latin"],
  display: "swap",
  variable: "--lp-font-display",
})

// Mono is reserved for micro-labels, dates and amounts — the statement voice.
const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
  variable: "--lp-font-mono",
})

// Paid-traffic destinations only. Keeping them out of the index avoids
// competing with the marketing site for the same queries.
export const metadata: Metadata = {
  robots: { index: false, follow: false },
}

export default function LpLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`lp-root ${display.variable} ${mono.variable}`}>{children}</div>
  )
}
