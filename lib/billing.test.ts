import { describe, it, expect } from "vitest"
import { advanceBillingDate, advanceUntilFuture } from "./billing"

function utc(y: number, m: number, d: number): Date {
  return new Date(Date.UTC(y, m, d))
}

describe("advanceBillingDate", () => {
  it("clamps Jan 31 + 1 month to Feb 28 (non-leap year)", () => {
    const result = advanceBillingDate(utc(2026, 0, 31), "MONTHLY")
    expect(result).toEqual(utc(2026, 1, 28))
  })

  it("clamps Jan 31 + 1 month to Feb 29 (leap year)", () => {
    const result = advanceBillingDate(utc(2028, 0, 31), "MONTHLY")
    expect(result).toEqual(utc(2028, 1, 29))
  })

  it("advances Jan 30 to Feb 28 then keeps day 28 onward (non-leap)", () => {
    const feb = advanceBillingDate(utc(2026, 0, 30), "MONTHLY")
    expect(feb).toEqual(utc(2026, 1, 28))
    const mar = advanceBillingDate(feb, "MONTHLY")
    expect(mar).toEqual(utc(2026, 2, 28))
  })

  it("advances a mid-month date normally", () => {
    const result = advanceBillingDate(utc(2026, 2, 15), "MONTHLY")
    expect(result).toEqual(utc(2026, 3, 15))
  })

  it("advances Dec 31 + 1 month into next year (Jan 31)", () => {
    const result = advanceBillingDate(utc(2025, 11, 31), "MONTHLY")
    expect(result).toEqual(utc(2026, 0, 31))
  })

  it("advances weekly by exactly 7 days", () => {
    const result = advanceBillingDate(utc(2026, 2, 1), "WEEKLY")
    expect(result).toEqual(utc(2026, 2, 8))
  })

  it("advances yearly, same month/day", () => {
    const result = advanceBillingDate(utc(2026, 5, 15), "YEARLY")
    expect(result).toEqual(utc(2027, 5, 15))
  })

  it("clamps Feb 29 + 1 year to Feb 28 on a non-leap year", () => {
    const result = advanceBillingDate(utc(2028, 1, 29), "YEARLY")
    expect(result).toEqual(utc(2029, 1, 28))
  })
})

describe("advanceUntilFuture", () => {
  it("advances multiple monthly cycles until reaching today or later", () => {
    const today = utc(2026, 8, 19) // Sep 19, 2026
    const { date, cycles } = advanceUntilFuture(utc(2026, 5, 19), "MONTHLY", today) // Jun 19
    expect(date.getTime()).toBeGreaterThanOrEqual(today.getTime())
    expect(cycles).toBe(3) // Jun -> Jul -> Aug -> Sep
    expect(date).toEqual(utc(2026, 8, 19))
  })

  it("does nothing when the date is already in the future", () => {
    const today = utc(2026, 5, 1)
    const { date, cycles } = advanceUntilFuture(utc(2026, 8, 1), "MONTHLY", today)
    expect(cycles).toBe(0)
    expect(date).toEqual(utc(2026, 8, 1))
  })

  it("forces at least minCycles advances even if already in the future", () => {
    const today = utc(2026, 5, 1)
    const { date, cycles } = advanceUntilFuture(utc(2026, 8, 1), "MONTHLY", today, 1)
    expect(cycles).toBe(1)
    expect(date).toEqual(utc(2026, 9, 1))
  })

  it("preserves end-of-month clamping across multiple cycles", () => {
    const today = utc(2026, 3, 20) // Apr 20
    const { date } = advanceUntilFuture(utc(2026, 0, 31), "MONTHLY", today) // Jan 31
    // Jan31 -> Feb28 -> Mar28 -> Apr28 (never returns to 31 once clamped)
    expect(date).toEqual(utc(2026, 3, 28))
  })
})
