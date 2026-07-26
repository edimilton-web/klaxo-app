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

    // Our container has a light/white background. Brandfetch's `theme`
    // describes the mark's OWN color, not the background it targets:
    // theme "light" = a light/white-colored mark (meant to sit on a dark
    // backdrop — invisible on our white box), theme "dark" = a dark/black
    // mark (meant to sit on a light backdrop — what we need). Confirmed by
    // pixel-sampling real assets (Anthropic/Vercel/GitHub "light" symbols
    // render as pure white; their "dark" symbols render near-black).
    // Prefer symbol/icon over full logo, and within each type prefer
    // theme "dark", then unthemed, and only use "light" as a last resort.
    const typeRank = (l: LogoEntry) => (l.type === "symbol" || l.type === "icon" ? 0 : l.type === "logo" ? 1 : 2)
    const themeRank = (l: LogoEntry) => (l.theme === "dark" ? 0 : l.theme === "light" ? 2 : 1)
    const pick = [...logos].sort((a, b) => typeRank(a) - typeRank(b) || themeRank(a) - themeRank(b))[0]

    const formats = pick?.formats ?? []
    // Prefer transparent-background assets, then PNG over SVG
    const transparentFormats = formats.filter((f) => !f.background)
    const formatPool = transparentFormats.length ? transparentFormats : formats
    const png = formatPool.find((f) => f.format === "png")
    const svg = formatPool.find((f) => f.format === "svg")
    const src: string | undefined = png?.src ?? svg?.src ?? formatPool[0]?.src

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
