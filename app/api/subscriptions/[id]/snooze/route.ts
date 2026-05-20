import { NextResponse } from "next/server"
import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"

export async function POST(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth()
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const { id } = await params
  const sub = await prisma.subscription.findUnique({ where: { id } })
  if (!sub || sub.userId !== session.user.id) {
    return NextResponse.json({ error: "Not found" }, { status: 404 })
  }

  const snoozedUntil = new Date(Date.now() + 24 * 60 * 60 * 1000)
  await prisma.subscription.update({ where: { id }, data: { snoozedUntil } })

  return NextResponse.json({ ok: true })
}
