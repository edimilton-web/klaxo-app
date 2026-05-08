import { NextResponse } from "next/server"
import { z } from "zod"
import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import { convertToEur } from "@/lib/exchange-rate"

const updateSchema = z.object({
  name: z.string().min(1).max(100).optional(),
  amount: z.number().positive().optional(),
  currency: z.string().length(3).optional(),
  billingCycle: z.enum(["WEEKLY", "MONTHLY", "YEARLY"]).optional(),
  nextBillingDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
  category: z.string().optional(),
  notes: z.string().optional(),
  logoUrl: z.string().optional(),
  status: z.enum(["ACTIVE", "PAUSED", "CANCELLED"]).optional(),
})

async function getSubscription(id: string, userId: string) {
  const sub = await prisma.subscription.findUnique({ where: { id } })
  if (!sub || sub.userId !== userId) return null
  return sub
}

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth()
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized", code: "UNAUTHORIZED" }, { status: 401 })
  const { id } = await params
  const sub = await getSubscription(id, session.user.id)
  if (!sub) return NextResponse.json({ error: "Not found", code: "NOT_FOUND" }, { status: 404 })
  return NextResponse.json(sub)
}

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth()
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized", code: "UNAUTHORIZED" }, { status: 401 })
  const { id } = await params
  const sub = await getSubscription(id, session.user.id)
  if (!sub) return NextResponse.json({ error: "Not found", code: "NOT_FOUND" }, { status: 404 })

  const body = await req.json()
  const parsed = updateSchema.safeParse(body)
  if (!parsed.success) return NextResponse.json({ error: "Invalid data", code: "VALIDATION_ERROR" }, { status: 400 })

  const data = parsed.data
  let amountEur: number | undefined
  if (data.amount || data.currency) {
    const amount = data.amount ?? Number(sub.amount)
    const currency = data.currency ?? sub.currency
    amountEur = await convertToEur(amount, currency)
  }

  const updated = await prisma.subscription.update({
    where: { id },
    data: {
      ...data,
      ...(data.nextBillingDate ? { nextBillingDate: new Date(data.nextBillingDate) } : {}),
      ...(amountEur !== undefined ? { amountEur } : {}),
    },
  })

  return NextResponse.json(updated)
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth()
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized", code: "UNAUTHORIZED" }, { status: 401 })
  const { id } = await params
  const sub = await getSubscription(id, session.user.id)
  if (!sub) return NextResponse.json({ error: "Not found", code: "NOT_FOUND" }, { status: 404 })

  // Never hard-delete — use CANCELLED status
  await prisma.subscription.update({ where: { id }, data: { status: "CANCELLED" } })
  return NextResponse.json({ ok: true })
}
