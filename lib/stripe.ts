import Stripe from "stripe"

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
