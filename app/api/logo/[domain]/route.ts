import { NextResponse } from "next/server"

type LogoEntry = {
  type: string
  theme: string
  formats: Array<{ format: string; src: string; background: string | null }>
}

export async function GET(_req: Request, { params }: { params: Promise<{ domain: string }> }) {
  const { domain } = await params
  const apiKey = process.env.BRANDFETCH_API_KEY
  if (!apiKey) {
    return NextResponse.redirect(`https://logo.clearbit.com/${domain}`)
  }

  try {
    const brandRes = await fetch(`https://api.brandfetch.io/v2/brands/${domain}`, {
      headers: { Authorization: `Bearer ${apiKey}` },
      cache: "no-store",
    })
    if (!brandRes.ok) return new NextResponse(null, { status: 404 })

    const data = await brandRes.json()
    const logos: LogoEntry[] = data?.logos ?? []

    // Prefer colored symbol/icon (looks best in small square containers)
    // Fall back to any logo
    const pick =
      logos.find((l) => l.type === "symbol" || l.type === "icon") ??
      logos.find((l) => l.theme === "dark") ??
      logos[0]

    const formats = pick?.formats ?? []
    const png = formats.find((f) => f.format === "png")
    const svg = formats.find((f) => f.format === "svg")
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
