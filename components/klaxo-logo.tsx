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
  const gradId = `kg-${uid}`
  const shadowId = `ks-${uid}`
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
        <linearGradient id={gradId} x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#8B5CF6" />
          <stop offset="100%" stopColor="#5B21B6" />
        </linearGradient>
        {animated && (
          <filter id={shadowId} x="-30%" y="-30%" width="160%" height="160%">
            <feDropShadow dx="0" dy="4" stdDeviation="8" floodColor="#7C3AED" floodOpacity="0.45" />
          </filter>
        )}
      </defs>

      <rect
        x="4" y="4" width="92" height="92" rx="22"
        fill={animated ? `url(#${gradId})` : "#7C3AED"}
        filter={animated ? `url(#${shadowId})` : undefined}
        className={animated ? "klaxo-glow" : undefined}
      />

      {/* K — vertical stroke */}
      <path
        d="M 32 20 L 32 80"
        stroke="white" strokeWidth="11" strokeLinecap="round"
        className={animated ? "klaxo-stroke-v" : undefined}
      />
      {/* K — upper arm */}
      <path
        d="M 32 50 L 70 20"
        stroke="white" strokeWidth="11" strokeLinecap="round"
        className={animated ? "klaxo-stroke-u" : undefined}
      />
      {/* K — lower arm */}
      <path
        d="M 32 50 L 70 80"
        stroke="white" strokeWidth="11" strokeLinecap="round"
        className={animated ? "klaxo-stroke-l" : undefined}
      />
    </svg>
  )
}
