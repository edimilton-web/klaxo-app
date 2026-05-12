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
  const fId  = `kf-${uid}`
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
            <filter id={fId} x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur in="SourceAlpha" stdDeviation="2" result="blur" />
              <feFlood floodColor="white" floodOpacity="0.3" result="color" />
              <feComposite in="color" in2="blur" operator="in" result="glow" />
              <feMerge>
                <feMergeNode in="glow" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
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

      {/* K — vertical stem */}
      <path
        d="M 32 23 L 32 77"
        stroke="white" strokeWidth="17" strokeLinecap="round"
        filter={animated ? `url(#${fId})` : undefined}
        className={animated ? "klaxo-stroke-v" : undefined}
      />

      {/* K — junction fill (hides the notch) */}
      <circle
        cx="32" cy="48" r="8.5"
        fill="white"
        filter={animated ? `url(#${fId})` : undefined}
        className={animated ? "klaxo-junction" : undefined}
      />

      {/* K — upper arm */}
      <path
        d="M 32 48 L 69 23"
        stroke="white" strokeWidth="17" strokeLinecap="round"
        filter={animated ? `url(#${fId})` : undefined}
        className={animated ? "klaxo-stroke-u" : undefined}
      />

      {/* K — lower arm */}
      <path
        d="M 32 48 L 69 77"
        stroke="white" strokeWidth="17" strokeLinecap="round"
        filter={animated ? `url(#${fId})` : undefined}
        className={animated ? "klaxo-stroke-l" : undefined}
      />
    </svg>
  )
}
