import { NextResponse } from "next/server"
import { z } from "zod"
import { stripe, STRIPE_PRO_MONTHLY_PRICE_ID, STRIPE_PRO_YEARLY_PRICE_ID } from "@/lib/stripe"

const schema = z.object({
  plan: z.enum(["pro-monthly", "pro-yearly"]),
})

async function createGuestSession(plan: "pro-monthly" | "pro-yearly") {
  const priceId = plan === "pro-yearly" ? STRIPE_PRO_YEARLY_PRICE_ID : STRIPE_PRO_MONTHLY_PRICE_ID
  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "https://app.klaxo.app"

  return stripe.checkout.sessions.create({
    mode: "subscription",
    customer_creation: "always",
    line_items: [{ price: priceId, quantity: 1 }],
    allow_promotion_codes: true,
    billing_address_collection: "auto",
    success_url: `${appUrl}/welcome?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${appUrl}/checkout?plan=${plan}`,
    metadata: { guestCheckout: "true", plan },
    subscription_data: { metadata: { guestCheckout: "true", plan } },
  })
}

export async function POST(req: Request) {
  const body = await req.json()
  const parsed = schema.safeParse(body)
  if (!parsed.success) return NextResponse.json({ error: "Invalid plan" }, { status: 400 })

  const session = await createGuestSession(parsed.data.plan)
  return NextResponse.json({ url: session.url })
}

export const dynamic = "force-dynamic"
