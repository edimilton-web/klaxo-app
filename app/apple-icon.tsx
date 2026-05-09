import { ImageResponse } from "next/og"

export const runtime = "edge"
export const size = { width: 180, height: 180 }
export const contentType = "image/png"

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(135deg, #7C5CFC 0%, #5B3FD4 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            color: "white",
            fontSize: 90,
            fontWeight: 800,
            fontFamily: "sans-serif",
            letterSpacing: "-3px",
            marginTop: "4px",
          }}
        >
          K
        </div>
      </div>
    ),
    { ...size }
  )
}
