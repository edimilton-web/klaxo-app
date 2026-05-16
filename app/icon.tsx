import { ImageResponse } from "next/og"

export const size = { width: 512, height: 512 }
export const contentType = "image/png"

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(135deg, #A78BFA 0%, #7C3AED 52%, #3B0764 100%)",
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
            fontSize: 300,
            fontWeight: 900,
            fontFamily: "'Arial Black', 'Helvetica Neue', Arial, sans-serif",
            lineHeight: 1,
            marginTop: "30px",
          }}
        >
          K
        </div>
      </div>
    ),
    { ...size }
  )
}
