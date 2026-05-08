import { NextResponse } from "next/server"
import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"

export async function GET() {
  const session = await auth()
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized", code: "UNAUTHORIZED" }, { status: 401 })

  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const in7Days = new Date(today)
  in7Days.setDate(in7Days.getDate() + 7)

  const upcoming = await prisma.subscription.findMany({
    where: {
      userId: session.user.id,
      status: "ACTIVE",
      nextBillingDate: { lte: in7Days },
    },
    orderBy: { nextBillingDate: "asc" },
  })

  return NextResponse.json(upcoming)
}
