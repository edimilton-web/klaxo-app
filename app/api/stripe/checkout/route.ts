import { NextResponse } from "next/server"
import { z } from "zod"
import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import { getStripe, STRIPE_PRO_MONTHLY_PRICE_ID, STRIPE_PRO_YEARLY_PRICE_ID } from "@/lib/stripe"

const schema = z.object({
  priceType: z.enum(["monthly", "yearly"]),
})

export async function POST(req: Request) {
  const session = await auth()
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized", code: "UNAUTHORIZED" }, { status: 401 })

  const body = await req.json()
  const parsed = schema.safeParse(body)
  if (!parsed.success) return NextResponse.json({ error: "Invalid data", code: "VALIDATION_ERROR" }, { status: 400 })

  const user = await prisma.user.findUnique({ where: { id: session.user.id } })
  if (!user) return NextResponse.json({ error: "User not found", code: "NOT_FOUND" }, { status: 404 })

  let customerId = user.stripeCustomerId
  if (!customerId) {
    const customer = await getStripe().customers.create({ email: user.email, name: user.name ?? undefined, metadata: { userId: user.id } })
    customerId = customer.id
    await prisma.user.update({ where: { id: user.id }, data: { stripeCustomerId: customerId } })
  }

  const priceId = parsed.data.priceType === "yearly" ? STRIPE_PRO_YEARLY_PRICE_ID : STRIPE_PRO_MONTHLY_PRICE_ID

  const checkoutSession = await getStripe().checkout.sessions.create({
    customer: customerId,
    mode: "subscription",
    line_items: [{ price: priceId, quantity: 1 }],
    allow_promotion_codes: true,
    success_url: `${process.env.NEXT_PUBLIC_APP_URL}/billing?success=1`,
    cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/billing?canceled=1`,
    metadata: { userId: user.id },
    subscription_data: { metadata: { userId: user.id } },
  })

  return NextResponse.json({ url: checkoutSession.url })
}
