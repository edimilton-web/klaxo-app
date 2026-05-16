import { ImageResponse } from "next/og"
import { NextRequest } from "next/server"

export const runtime = "edge"

async function getNunitoBlack(): Promise<ArrayBuffer> {
  const css = await fetch(
    "https://fonts.googleapis.com/css2?family=Nunito:wght@900&display=swap",
    { headers: { "User-Agent": "Mozilla/5.0 (compatible; Googlebot/2.1)" } }
  ).then((r) => r.text())
  const url = css.match(/src: url\(([^)]+\.woff2)\)/)?.[1]
  if (!url) throw new Error("Nunito woff2 URL not found")
  return fetch(url).then((r) => r.arrayBuffer())
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const size = Math.min(1024, Math.max(16, parseInt(searchParams.get("size") ?? "512", 10)))
  const maskable = searchParams.get("maskable") === "1"

  const fontData = await getNunitoBlack()
  const fontSize = Math.round(size * 0.625)
  const marginTop = Math.round(size * 0.04)

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
          borderRadius: maskable ? "0%" : "22%",
        }}
      >
        <div
          style={{
            color: "white",
            fontSize,
            fontWeight: 900,
            fontFamily: "Nunito",
            lineHeight: 1,
            marginTop,
          }}
        >
          K
        </div>
      </div>
    ),
    {
      width: size,
      height: size,
      fonts: [{ name: "Nunito", data: fontData, weight: 900, style: "normal" }],
    }
  )
}
