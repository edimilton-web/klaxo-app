import Stripe from "stripe"
import type { Prisma } from "@prisma/client"

let stripeInstance: Stripe | null = null

export function getStripe(): Stripe {
  if (!stripeInstance) {
    stripeInstance = new Stripe(process.env.STRIPE_SECRET_KEY!, {
      apiVersion: "2026-04-22.dahlia",
      typescript: true,
    })
  }
  return stripeInstance
}

export const STRIPE_PRO_MONTHLY_PRICE_ID = process.env.STRIPE_PRO_MONTHLY_PRICE_ID!
export const STRIPE_PRO_YEARLY_PRICE_ID = process.env.STRIPE_PRO_YEARLY_PRICE_ID!

type SubscriptionLike = {
  id: string
  customer?: string | { id: string } | null
  metadata?: { userId?: string | null } | null
}

/**
 * Prisma filter that finds the user behind a Stripe subscription.
 *
 * Subscriptions opened from the billing page carry `metadata.userId` (see
 * app/api/stripe/checkout/route.ts), but guest checkout has no user yet when
 * the session is created, so its subscriptions never did. The downgrade
 * handlers keyed on that field alone, so a guest customer who cancelled found
 * nobody to downgrade and kept PRO for free.
 *
 * Metadata stays authoritative; the subscription id and the customer id are
 * the fallback, both unique columns. Returns null when nothing identifies the
 * user, so the caller skips the write rather than matching every row.
 */
export function stripeUserWhere(sub: SubscriptionLike): Prisma.UserWhereInput | null {
  const userId = sub.metadata?.userId
  if (userId) return { id: userId }

  const customerId = typeof sub.customer === "string" ? sub.customer : sub.customer?.id

  const or: Prisma.UserWhereInput[] = []
  if (sub.id) or.push({ stripeSubId: sub.id })
  if (customerId) or.push({ stripeCustomerId: customerId })

  return or.length > 0 ? { OR: or } : null
}
