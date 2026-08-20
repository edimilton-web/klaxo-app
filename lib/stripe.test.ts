import { describe, it, expect } from "vitest"
import { stripeUserWhere } from "./stripe"

describe("stripeUserWhere", () => {
  it("uses metadata.userId when the billing-page checkout set it", () => {
    expect(
      stripeUserWhere({ id: "sub_1", customer: "cus_1", metadata: { userId: "user_abc" } })
    ).toEqual({ id: "user_abc" })
  })

  it("falls back to subscription and customer id for a guest subscription", () => {
    // The bug: guest checkout writes { guestCheckout, plan } and no userId.
    expect(stripeUserWhere({ id: "sub_1", customer: "cus_1", metadata: {} })).toEqual({
      OR: [{ stripeSubId: "sub_1" }, { stripeCustomerId: "cus_1" }],
    })
  })

  it("accepts an expanded customer object", () => {
    expect(stripeUserWhere({ id: "sub_1", customer: { id: "cus_1" } })).toEqual({
      OR: [{ stripeSubId: "sub_1" }, { stripeCustomerId: "cus_1" }],
    })
  })

  it("falls back to the subscription id alone when there is no customer", () => {
    expect(stripeUserWhere({ id: "sub_1", customer: null })).toEqual({
      OR: [{ stripeSubId: "sub_1" }],
    })
  })

  it("ignores an empty userId rather than filtering on it", () => {
    expect(stripeUserWhere({ id: "sub_1", customer: "cus_1", metadata: { userId: "" } })).toEqual({
      OR: [{ stripeSubId: "sub_1" }, { stripeCustomerId: "cus_1" }],
    })
  })

  it("returns null when nothing identifies the user, so no write happens", () => {
    expect(stripeUserWhere({ id: "", customer: null, metadata: {} })).toBeNull()
  })
})
