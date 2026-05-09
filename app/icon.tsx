import { ImageResponse } from "next/og"

export const runtime = "edge"
export const size = { width: 512, height: 512 }
export const contentType = "image/png"

export default function Icon() {
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
          borderRadius: "24%",
        }}
      >
        <div
          style={{
            color: "white",
            fontSize: 240,
            fontWeight: 800,
            fontFamily: "sans-serif",
            letterSpacing: "-8px",
            marginTop: "8px",
          }}
        >
          K
        </div>
      </div>
    ),
    { ...size }
  )
}
