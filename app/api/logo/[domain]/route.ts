import { NextResponse } from "next/server"

export async function GET(_req: Request, { params }: { params: { domain: string } }) {
  const apiKey = process.env.BRANDFETCH_API_KEY
  if (!apiKey) return new NextResponse(null, { status: 404 })

  try {
    const brandRes = await fetch(`https://api.brandfetch.io/v2/brands/${params.domain}`, {
      headers: { Authorization: `Bearer ${apiKey}` },
      cache: "no-store",
    })
    if (!brandRes.ok) return new NextResponse(null, { status: 404 })

    const data = await brandRes.json()
    const formats = data?.logos?.[0]?.formats ?? []
    const png = formats.find((f: { format: string }) => f.format === "png")
    const svg = formats.find((f: { format: string }) => f.format === "svg")
    const src: string | undefined = png?.src ?? svg?.src

    if (!src) return new NextResponse(null, { status: 404 })

    const imgRes = await fetch(src)
    if (!imgRes.ok) return new NextResponse(null, { status: 404 })

    const contentType = imgRes.headers.get("content-type") ?? "image/png"
    const buffer = await imgRes.arrayBuffer()

    return new NextResponse(buffer, {
      headers: {
        "content-type": contentType,
        "cache-control": "public, max-age=86400",
      },
    })
  } catch {
    return new NextResponse(null, { status: 404 })
  }
}
