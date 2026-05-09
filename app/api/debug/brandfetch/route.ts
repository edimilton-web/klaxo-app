import { NextResponse } from "next/server"

export async function GET() {
  const apiKey = process.env.BRANDFETCH_API_KEY

  if (!apiKey) {
    return NextResponse.json({ error: "BRANDFETCH_API_KEY não está definida" }, { status: 500 })
  }

  try {
    const res = await fetch("https://api.brandfetch.io/v2/brands/netflix.com", {
      headers: { Authorization: `Bearer ${apiKey}` },
      cache: "no-store",
    })

    const status = res.status
    const text = await res.text()

    let data: unknown
    try {
      data = JSON.parse(text)
    } catch {
      data = text
    }

    return NextResponse.json({
      apiKeyPresent: true,
      apiKeyPrefix: apiKey.slice(0, 8) + "...",
      httpStatus: status,
      ok: res.ok,
      response: data,
    })
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 })
  }
}
