import { ImageResponse } from "next/og"

export const runtime = "edge"
export const alt = "Klaxo — Personal subscription manager"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(135deg, #0A0A0F 0%, #12101E 50%, #0D0A1A 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        {/* Glow backdrop */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 500,
            height: 300,
            background: "radial-gradient(ellipse, rgba(124,92,252,0.25) 0%, transparent 70%)",
            borderRadius: "50%",
          }}
        />

        {/* Logo */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 96,
            height: 96,
            background: "linear-gradient(135deg, #8B5CF6, #5B21B6)",
            borderRadius: 24,
            marginBottom: 28,
            boxShadow: "0 20px 60px rgba(124,92,252,0.5)",
          }}
        >
          <div style={{ color: "white", fontSize: 52, fontWeight: 900, letterSpacing: -2 }}>K</div>
        </div>

        {/* Title */}
        <div
          style={{
            fontSize: 60,
            fontWeight: 800,
            color: "white",
            letterSpacing: -2,
            marginBottom: 16,
          }}
        >
          Klaxo
        </div>

        {/* Tagline */}
        <div
          style={{
            fontSize: 26,
            color: "rgba(255,255,255,0.45)",
            fontWeight: 400,
            letterSpacing: 0,
            textAlign: "center",
            maxWidth: 700,
          }}
        >
          Stop paying for subscriptions you forgot about.
        </div>

        {/* Pills */}
        <div style={{ display: "flex", gap: 12, marginTop: 40 }}>
          {["Free to start", "EU privacy-first", "Email alerts"].map((label) => (
            <div
              key={label}
              style={{
                background: "rgba(139,92,246,0.18)",
                border: "1px solid rgba(139,92,246,0.35)",
                borderRadius: 999,
                padding: "8px 20px",
                color: "rgba(255,255,255,0.75)",
                fontSize: 16,
                fontWeight: 500,
              }}
            >
              {label}
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size }
  )
}
