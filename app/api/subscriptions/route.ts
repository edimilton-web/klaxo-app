import { NextResponse } from "next/server"
import { z } from "zod"
import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import { convertToEur } from "@/lib/exchange-rate"
import { fetchBrandLogo, KNOWN_SERVICES } from "@/lib/brandfetch"

const createSchema = z.object({
  name: z.string().min(1).max(100),
  amount: z.number().positive(),
  currency: z.string().length(3).default("EUR"),
  billingCycle: z.enum(["WEEKLY", "MONTHLY", "YEARLY"]).default("MONTHLY"),
  nextBillingDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  category: z.string().optional(),
  notes: z.string().optional(),
  logoUrl: z.string().url().optional(),
  domain: z.string().optional(),
})

export async function GET() {
  const session = await auth()
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized", code: "UNAUTHORIZED" }, { status: 401 })
  }
  const subscriptions = await prisma.subscription.findMany({
    where: { userId: session.user.id, status: { not: "CANCELLED" } },
    orderBy: { nextBillingDate: "asc" },
  })
  return NextResponse.json(subscriptions)
}

export async function POST(req: Request) {
  const session = await auth()
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized", code: "UNAUTHORIZED" }, { status: 401 })
  }

  const user = await prisma.user.findUnique({ where: { id: session.user.id }, select: { plan: true } })
  if (!user) return NextResponse.json({ error: "User not found", code: "NOT_FOUND" }, { status: 404 })

  if (user.plan === "FREE") {
    const count = await prisma.subscription.count({
      where: { userId: session.user.id, status: "ACTIVE" },
    })
    if (count >= 5) {
      return NextResponse.json({ error: "Free plan limit reached (max 5 subscriptions). Upgrade to Pro for unlimited.", code: "PLAN_LIMIT" }, { status: 403 })
    }
  }

  const body = await req.json()
  const parsed = createSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid data", code: "VALIDATION_ERROR" }, { status: 400 })
  }

  const { name, amount, currency, billingCycle, nextBillingDate, category, notes, domain } = parsed.data
  let { logoUrl } = parsed.data

  const resolvedDomain = domain || KNOWN_SERVICES.find(
    (s) => s.name.toLowerCase() === name.toLowerCase()
  )?.domain

  if (!logoUrl && resolvedDomain) {
    logoUrl = fetchBrandLogo(resolvedDomain)
  }

  const amountEur = await convertToEur(amount, currency)

  const subscription = await prisma.subscription.create({
    data: {
      userId: session.user.id,
      name,
      amount,
      currency,
      amountEur,
      billingCycle,
      nextBillingDate: new Date(nextBillingDate),
      category,
      notes,
      logoUrl,
    },
  })

  return NextResponse.json(subscription, { status: 201 })
}
