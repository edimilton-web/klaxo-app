"use client"
import { useId } from "react"

const sizes = { xs: 24, sm: 32, md: 48, lg: 80, xl: 120 } as const
export type LogoSize = keyof typeof sizes

export function KlaxoLogo({
  size = "sm",
  animated = false,
  className = "",
}: {
  size?: LogoSize
  animated?: boolean
  className?: string
}) {
  const uid = useId()
  const gId  = `kg-${uid}`
  const shId = `ksh-${uid}`
  const glId = `kgl-${uid}`
  const px = sizes[size]

  return (
    <svg
      width={px}
      height={px}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Klaxo"
      role="img"
      className={`${animated ? "klaxo-animate" : ""} ${className}`}
    >
      <defs>
        {/* Rich 4-stop gradient — deeper violet with warm top */}
        <linearGradient id={gId} x1="10" y1="4" x2="90" y2="96" gradientUnits="userSpaceOnUse">
          <stop offset="0%"   stopColor="#C4B5FD" />
          <stop offset="30%"  stopColor="#8B5CF6" />
          <stop offset="68%"  stopColor="#6D28D9" />
          <stop offset="100%" stopColor="#3B0764" />
        </linearGradient>

        {/* Shine gradient — always rendered for subtle top highlight */}
        <linearGradient id={shId} x1="50" y1="4" x2="50" y2="58" gradientUnits="userSpaceOnUse">
          <stop offset="0%"   stopColor="white" stopOpacity="0.18" />
          <stop offset="100%" stopColor="white" stopOpacity="0" />
        </linearGradient>

        {/* Glow filter — richer for animated, subtle for static */}
        <filter id={glId} x="-50%" y="-50%" width="200%" height="200%">
          <feDropShadow dx="0" dy="12" stdDeviation="16" floodColor="#5B21B6" floodOpacity={animated ? "0.7" : "0.25"} />
          <feDropShadow dx="0" dy="3"  stdDeviation="5"  floodColor="#A78BFA" floodOpacity={animated ? "0.45" : "0.15"} />
          <feDropShadow dx="0" dy="0"  stdDeviation="2"  floodColor="#DDD6FE" floodOpacity={animated ? "0.2" : "0"} />
        </filter>
      </defs>

      {/* Background rounded rect */}
      <rect
        x="4" y="4" width="92" height="92" rx="22"
        fill={`url(#${gId})`}
        filter={`url(#${glId})`}
        className={animated ? "klaxo-glow" : undefined}
      />

      {/* Subtle top-left glass shine — always present */}
      <rect x="4" y="4" width="92" height="54" rx="22"
        fill={`url(#${shId})`}
        style={{ pointerEvents: "none" }}
      />

      {/* Inner border for depth */}
      <rect
        x="5.5" y="5.5" width="89" height="89" rx="21"
        stroke="white" strokeOpacity="0.12" strokeWidth="1"
        fill="none"
        style={{ pointerEvents: "none" }}
      />

      {/* K — bold SVG paths, round caps */}
      <g
        stroke="white"
        strokeWidth="13"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="klaxo-k"
      >
        {/* Vertical bar */}
        <line x1="30" y1="18" x2="30" y2="82" />
        {/* Upper arm */}
        <line x1="30" y1="50" x2="72" y2="18" />
        {/* Lower arm */}
        <line x1="30" y1="50" x2="72" y2="82" />
      </g>
    </svg>
  )
}
