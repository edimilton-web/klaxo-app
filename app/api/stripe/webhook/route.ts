import { NextResponse } from "next/server"
import { getStripe, stripeUserWhere } from "@/lib/stripe"
import { prisma } from "@/lib/prisma"
import Stripe from "stripe"
import crypto from "crypto"

export async function POST(req: Request) {
  const body = await req.text()
  const sig = req.headers.get("stripe-signature")

  if (!sig) return NextResponse.json({ error: "No signature", code: "NO_SIGNATURE" }, { status: 400 })

  let event: Stripe.Event
  try {
    event = getStripe().webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!)
  } catch {
    return NextResponse.json({ error: "Invalid signature", code: "INVALID_SIGNATURE" }, { status: 400 })
  }

  switch (event.type) {
    case "customer.subscription.updated":
    case "customer.subscription.created": {
      const sub = event.data.object as Stripe.Subscription
      const userId = await resolveUserId(sub)
      if (!userId) break
      const isActive = sub.status === "active" || sub.status === "trialing"
      await prisma.user.updateMany({
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
      const userId = await resolveUserId(sub)
      if (!userId) break
      await prisma.user.updateMany({
        where: { id: userId },
        data: { plan: "FREE", stripeSubId: null },
      })
      break
    }
    case "checkout.session.completed": {
      const session = event.data.object as Stripe.Checkout.Session
      const userId = session.metadata?.userId

      if (userId && session.subscription) {
        // Existing logged-in user upgrading from billing page
        await prisma.user.update({
          where: { id: userId },
          data: { plan: "PRO", stripeSubId: session.subscription as string },
        })
        break
      }

      // Guest checkout (pay before register)
      if (session.metadata?.guestCheckout === "true" && session.customer_details?.email) {
        const email = session.customer_details.email
        const stripeCustomerId = typeof session.customer === "string" ? session.customer : null
        const stripeSubId = session.subscription as string | null

        const existing = await prisma.user.findUnique({ where: { email } })

        let guestUserId: string
        if (existing) {
          await prisma.user.update({
            where: { email },
            data: {
              plan: "PRO",
              ...(stripeCustomerId && { stripeCustomerId }),
              ...(stripeSubId && { stripeSubId }),
            },
          })
          guestUserId = existing.id
        } else {
          const setupToken = crypto.randomBytes(32).toString("hex")
          const created = await prisma.user.create({
            data: {
              email,
              plan: "PRO",
              stripeCustomerId: stripeCustomerId ?? undefined,
              stripeSubId: stripeSubId ?? undefined,
              setupToken,
              setupTokenExpiry: new Date(Date.now() + 24 * 60 * 60 * 1000),
            },
          })
          guestUserId = created.id
        }

        // This is the first moment a guest subscription can know its user, so
        // stamp it now: from here the subscription events identify themselves
        // and never need the lookup fallback. Best effort — the DB is already
        // correct, and failing the webhook would only make Stripe retry a
        // checkout it has finished.
        if (stripeSubId) {
          try {
            await getStripe().subscriptions.update(stripeSubId, {
              metadata: {
                guestCheckout: "true",
                ...(session.metadata?.plan && { plan: session.metadata.plan }),
                userId: guestUserId,
              },
            })
          } catch (err) {
            console.error("[stripe-webhook] could not stamp userId on subscription:", err)
          }
        }
      }
      break
    }
  }

  return NextResponse.json({ received: true })
}

/**
 * The user this subscription belongs to, or null if none can be identified.
 *
 * Resolved to a single id before writing: stripeUserWhere may fall back to an
 * OR across two unique columns, and updateMany over a multi-row match would
 * try to write the same unique stripeSubId onto both rows.
 */
async function resolveUserId(sub: Stripe.Subscription): Promise<string | null> {
  const where = stripeUserWhere(sub)
  if (!where) return null
  const user = await prisma.user.findFirst({ where, select: { id: true } })
  return user?.id ?? null
}

export const dynamic = 'force-dynamic'
