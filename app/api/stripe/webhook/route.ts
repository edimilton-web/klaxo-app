import { NextResponse } from "next/server"
import { stripe } from "@/lib/stripe"
import { prisma } from "@/lib/prisma"
import Stripe from "stripe"

export async function POST(req: Request) {
  const body = await req.text()
  const sig = req.headers.get("stripe-signature")

  if (!sig) return NextResponse.json({ error: "No signature", code: "NO_SIGNATURE" }, { status: 400 })

  let event: Stripe.Event
  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!)
  } catch {
    return NextResponse.json({ error: "Invalid signature", code: "INVALID_SIGNATURE" }, { status: 400 })
  }

  switch (event.type) {
    case "customer.subscription.updated":
    case "customer.subscription.created": {
      const sub = event.data.object as Stripe.Subscription
      const userId = sub.metadata?.userId
      if (!userId) break
      const isActive = sub.status === "active" || sub.status === "trialing"
      await prisma.user.update({
        where: { id: userId },
        data: {
          plan: isActive ? "PRO" : "FREE",
          stripeSubId: sub.id,
        },
      })
      break
    }
    case "customer.subscription.deleted": {
      const sub = event.data.object as Stripe.Subscription
      const userId = sub.metadata?.userId
      if (!userId) break
      await prisma.user.update({
        where: { id: userId },
        data: { plan: "FREE", stripeSubId: null },
      })
      break
    }
    case "checkout.session.completed": {
      const session = event.data.object as Stripe.Checkout.Session
      const userId = session.metadata?.userId
      if (userId && session.subscription) {
        await prisma.user.update({
          where: { id: userId },
          data: { plan: "PRO", stripeSubId: session.subscription as string },
        })
      }
      break
    }
  }

  return NextResponse.json({ received: true })
}

export const dynamic = 'force-dynamic'
