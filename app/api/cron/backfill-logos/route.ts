import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getLogoUrlForService } from "@/lib/service-logos"

export async function POST(req: Request) {
  const secret = req.headers.get("x-cron-secret")
  if (secret !== process.env.CRON_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const subs = await prisma.subscription.findMany({
    where: {
      OR: [
        { logoUrl: null },
        { logoUrl: { startsWith: "https://logo.clearbit.com/" } },
      ],
    },
    select: { id: true, name: true },
  })

  let updated = 0
  for (const sub of subs) {
    const logoUrl = getLogoUrlForService(sub.name)
    if (logoUrl) {
      await prisma.subscription.update({ where: { id: sub.id }, data: { logoUrl } })
      updated++
    }
  }

  return NextResponse.json({ total: subs.length, updated })
}
