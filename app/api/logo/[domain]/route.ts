import { NextResponse } from "next/server"

type LogoEntry = {
  type: string
  theme: string
  formats: Array<{ format: string; src: string; background: string | null }>
}

// Domains where Brandfetch's only asset is verified to be wrong/mismatched
// artwork (not the brand's own mark) rather than a missing-asset 404 we
// could otherwise fall back on. Skip Brandfetch entirely for these.
// - contabo.com: their sole "logo" entry is a partner-hardware banner
//   (Dell/HPE/AMD/Samsung), not Contabo's own logo. Verified 2026-07-26.
const KNOWN_BAD_BRANDFETCH_DOMAINS = new Set(["contabo.com"])

const NO_STORE_HEADERS = { "cache-control": "no-store" }

// Clearbit returns HTTP 200 with a tiny generic placeholder (observed:
// ~300 bytes) for domains it has no real logo for, instead of a 404 —
// so a status check alone isn't enough. The smallest legitimate asset
// we've seen served (a Brandfetch symbol SVG) is ~1.5KB, so anything
// under 1KB is almost certainly a blank/placeholder image, not a logo.
const MIN_VALID_LOGO_BYTES = 1000

// Proxy Clearbit server-side (rather than redirecting the browser to it)
// so a client-side DNS/ad-blocker block on logo.clearbit.com — a common
// case, verified: it fails to resolve on this network while brandfetch.io
// resolves fine — can't break the fallback. Any failure here (timeout,
// DNS, non-200, or a suspiciously tiny placeholder body) returns a fast,
// uncached 404 so the client's onError falls through to the initials
// immediately instead of hanging or rendering an empty/blank image.
async function proxyClearbit(domain: string): Promise<NextResponse> {
  try {
    const res = await fetch(`https://logo.clearbit.com/${domain}`, {
      cache: "no-store",
      signal: AbortSignal.timeout(5000),
    })
    if (!res.ok) return new NextResponse(null, { status: 404, headers: NO_STORE_HEADERS })
    const contentType = res.headers.get("content-type") ?? "image/png"
    const buffer = await res.arrayBuffer()
    if (buffer.byteLength < MIN_VALID_LOGO_BYTES) {
      return new NextResponse(null, { status: 404, headers: NO_STORE_HEADERS })
    }
    return new NextResponse(buffer, {
      headers: {
        "content-type": contentType,
        "cache-control": "public, max-age=3600, stale-while-revalidate=86400",
      },
    })
  } catch {
    return new NextResponse(null, { status: 404, headers: NO_STORE_HEADERS })
  }
}

export async function GET(_req: Request, { params }: { params: Promise<{ domain: string }> }) {
  const { domain } = await params
  const apiKey = process.env.BRANDFETCH_API_KEY
  if (!apiKey || KNOWN_BAD_BRANDFETCH_DOMAINS.has(domain)) {
    return proxyClearbit(domain)
  }

  try {
    const brandRes = await fetch(`https://api.brandfetch.io/v2/brands/${domain}`, {
      headers: { Authorization: `Bearer ${apiKey}` },
      cache: "no-store",
      signal: AbortSignal.timeout(5000),
    })
    if (!brandRes.ok) return proxyClearbit(domain)

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

    if (!src) return proxyClearbit(domain)

    const imgRes = await fetch(src, { signal: AbortSignal.timeout(5000) })
    if (!imgRes.ok) return proxyClearbit(domain)

    const contentType = imgRes.headers.get("content-type") ?? "image/png"
    const buffer = await imgRes.arrayBuffer()

    if (buffer.byteLength < MIN_VALID_LOGO_BYTES) return proxyClearbit(domain)

    return new NextResponse(buffer, {
      headers: {
        "content-type": contentType,
        // Was 24h — logo-selection bugs would keep showing stale (broken)
        // bytes in browsers for a full day after being fixed server-side.
        // 1h + stale-while-revalidate keeps most of the caching benefit
        // while bounding how long a bad response can linger client-side.
        "cache-control": "public, max-age=3600, stale-while-revalidate=86400",
      },
    })
  } catch {
    return proxyClearbit(domain)
  }
}
