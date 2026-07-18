import { ImageResponse } from "next/og"

export const runtime = "edge"
export const alt = "Klaxo Blog"
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

        <div
          style={{
            fontSize: 60,
            fontWeight: 800,
            color: "white",
            letterSpacing: -2,
            marginBottom: 16,
          }}
        >
          Klaxo Blog
        </div>

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
          Subscription insights, spending habits, and how to stop paying for things you forgot about.
        </div>
      </div>
    ),
    { ...size }
  )
}
