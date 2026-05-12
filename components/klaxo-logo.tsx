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
        <linearGradient id={gId} x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
          <stop offset="0%"   stopColor="#A78BFA" />
          <stop offset="52%"  stopColor="#7C3AED" />
          <stop offset="100%" stopColor="#3B0764" />
        </linearGradient>

        {animated && (
          <>
            <linearGradient id={shId} x1="50" y1="4" x2="50" y2="60" gradientUnits="userSpaceOnUse">
              <stop offset="0%"   stopColor="white" stopOpacity="0.2" />
              <stop offset="100%" stopColor="white" stopOpacity="0" />
            </linearGradient>
            <filter id={glId} x="-45%" y="-45%" width="190%" height="190%">
              <feDropShadow dx="0" dy="10" stdDeviation="14" floodColor="#6D28D9" floodOpacity="0.65" />
              <feDropShadow dx="0" dy="2"  stdDeviation="4"  floodColor="#A78BFA" floodOpacity="0.35" />
            </filter>
          </>
        )}
      </defs>

      {/* Background */}
      <rect
        x="4" y="4" width="92" height="92" rx="22"
        fill={`url(#${gId})`}
        filter={animated ? `url(#${glId})` : undefined}
        className={animated ? "klaxo-glow" : undefined}
      />

      {/* Glass shine — animated only */}
      {animated && (
        <rect x="4" y="4" width="92" height="52" rx="22"
          fill={`url(#${shId})`}
          style={{ pointerEvents: "none" }}
        />
      )}

      {/* K — letter */}
      <text
        x="50" y="70"
        textAnchor="middle"
        fill="white"
        fontSize="62"
        className={`klaxo-k${animated ? " klaxo-letter" : ""}`}
      >
        K
      </text>
    </svg>
  )
}
