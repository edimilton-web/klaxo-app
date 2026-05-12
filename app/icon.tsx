import { ImageResponse } from "next/og"

export const runtime = "edge"
export const size = { width: 512, height: 512 }
export const contentType = "image/png"

async function getNunitoBlack(): Promise<ArrayBuffer> {
  const css = await fetch(
    "https://fonts.googleapis.com/css2?family=Nunito:wght@900&display=swap",
    { headers: { "User-Agent": "Mozilla/5.0 (compatible; Googlebot/2.1)" } }
  ).then((r) => r.text())
  const url = css.match(/src: url\(([^)]+\.woff2)\)/)?.[1]
  if (!url) throw new Error("Nunito woff2 URL not found")
  return fetch(url).then((r) => r.arrayBuffer())
}

export default async function Icon() {
  const fontData = await getNunitoBlack()

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
            fontFamily: "Nunito",
            lineHeight: 1,
            marginTop: "30px",
          }}
        >
          K
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [{ name: "Nunito", data: fontData, weight: 900, style: "normal" }],
    }
  )
}
