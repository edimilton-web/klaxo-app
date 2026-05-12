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
  const gId   = `kg-${uid}`
  const shId  = `ksh-${uid}`
  const glId  = `kgl-${uid}`
  const fId   = `kf-${uid}`
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
        {/* Rich 3-stop background gradient */}
        <linearGradient id={gId} x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
          <stop offset="0%"   stopColor="#A78BFA" />
          <stop offset="52%"  stopColor="#7C3AED" />
          <stop offset="100%" stopColor="#3B0764" />
        </linearGradient>

        {/* Glass-shine overlay gradient */}
        <linearGradient id={shId} x1="50" y1="4" x2="50" y2="56" gradientUnits="userSpaceOnUse">
          <stop offset="0%"   stopColor="white" stopOpacity="0.22" />
          <stop offset="100%" stopColor="white" stopOpacity="0" />
        </linearGradient>

        {/* Glow filter — two layered drop shadows */}
        <filter id={glId} x="-45%" y="-45%" width="190%" height="190%">
          <feDropShadow dx="0" dy="10" stdDeviation="14" floodColor="#6D28D9" floodOpacity="0.65" />
          <feDropShadow dx="0" dy="2"  stdDeviation="4"  floodColor="#A78BFA" floodOpacity="0.35" />
        </filter>

        {/* White letter glow for xl/lg sizes */}
        <filter id={fId} x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur in="SourceAlpha" stdDeviation="2" result="blur" />
          <feFlood floodColor="white" floodOpacity="0.3" result="color" />
          <feComposite in="color" in2="blur" operator="in" result="glow" />
          <feMerge>
            <feMergeNode in="glow" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Background tile */}
      <rect
        x="4" y="4" width="92" height="92" rx="22"
        fill={`url(#${gId})`}
        filter={animated ? `url(#${glId})` : undefined}
        className={animated ? "klaxo-glow" : undefined}
      />

      {/* Glass shine overlay */}
      <rect x="4" y="4" width="92" height="48" rx="22"
        fill={`url(#${shId})`}
        style={{ pointerEvents: "none" }}
      />
      {/* Cover bottom half of shine rect so it stays in top portion only */}
      <rect x="4" y="30" width="92" height="22"
        fill={`url(#${gId})`}
        style={{ pointerEvents: "none" }}
      />

      {/* ── K letter — thick strokes, junction slightly above centre ── */}

      {/* Vertical stem */}
      <path
        d="M 30 17 L 30 83"
        stroke="white" strokeWidth="15" strokeLinecap="round"
        filter={`url(#${fId})`}
        className={animated ? "klaxo-stroke-v" : undefined}
      />

      {/* Junction fill — hides the notch where arms meet the stem */}
      <circle
        cx="30" cy="46" r="7.5"
        fill="white"
        filter={`url(#${fId})`}
        className={animated ? "klaxo-junction" : undefined}
      />

      {/* Upper arm */}
      <path
        d="M 30 46 L 72 17"
        stroke="white" strokeWidth="15" strokeLinecap="round"
        filter={`url(#${fId})`}
        className={animated ? "klaxo-stroke-u" : undefined}
      />

      {/* Lower arm */}
      <path
        d="M 30 46 L 72 83"
        stroke="white" strokeWidth="15" strokeLinecap="round"
        filter={`url(#${fId})`}
        className={animated ? "klaxo-stroke-l" : undefined}
      />
    </svg>
  )
}
