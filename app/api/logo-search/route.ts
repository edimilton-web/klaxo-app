import { NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest) {
  const q = req.nextUrl.searchParams.get("q") ?? ""
  if (q.length < 2) return NextResponse.json([])

  const apiKey = process.env.BRANDFETCH_API_KEY
  if (!apiKey) return NextResponse.json([])

  try {
    const res = await fetch(
      `https://api.brandfetch.io/v2/search/${encodeURIComponent(q)}`,
      {
        headers: { Authorization: `Bearer ${apiKey}` },
        next: { revalidate: 86400 },
      }
    )
    if (!res.ok) return NextResponse.json([])
    const data = (await res.json()) as Array<{ name: string; domain: string; icon: string }>
    return NextResponse.json(
      data.slice(0, 6).map(({ name, domain, icon }) => ({ name, domain, icon }))
    )
  } catch {
    return NextResponse.json([])
  }
}
