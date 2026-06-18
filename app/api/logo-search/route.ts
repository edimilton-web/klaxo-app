import { NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest) {
  const q = req.nextUrl.searchParams.get("q") ?? ""
  if (q.length < 2) return NextResponse.json([])

  try {
    const res = await fetch(
      `https://autocomplete.clearbit.com/v1/companies/suggest?query=${encodeURIComponent(q)}`,
      { next: { revalidate: 86400 } }
    )
    if (!res.ok) return NextResponse.json([])
    const data = await res.json()
    return NextResponse.json((data as Array<{ name: string; domain: string; logo: string }>).slice(0, 6))
  } catch {
    return NextResponse.json([])
  }
}
