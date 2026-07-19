export type BillingCycle = "WEEKLY" | "MONTHLY" | "YEARLY"

function daysInUTCMonth(year: number, monthIndex: number): number {
  return new Date(Date.UTC(year, monthIndex + 1, 0)).getUTCDate()
}

/** Advances one billing cycle, clamping to the last day of the target month
 * when the original day doesn't exist there (e.g. Jan 31 -> Feb 28/29). */
export function advanceBillingDate(date: Date, billingCycle: BillingCycle): Date {
  const year = date.getUTCFullYear()
  const month = date.getUTCMonth()
  const day = date.getUTCDate()

  switch (billingCycle) {
    case "WEEKLY": {
      const next = new Date(date)
      next.setUTCDate(next.getUTCDate() + 7)
      return next
    }
    case "MONTHLY": {
      const targetMonth = month + 1
      const targetYear = year + Math.floor(targetMonth / 12)
      const normalizedMonth = ((targetMonth % 12) + 12) % 12
      const lastDay = daysInUTCMonth(targetYear, normalizedMonth)
      return new Date(Date.UTC(targetYear, normalizedMonth, Math.min(day, lastDay)))
    }
    case "YEARLY": {
      const targetYear = year + 1
      const lastDay = daysInUTCMonth(targetYear, month)
      return new Date(Date.UTC(targetYear, month, Math.min(day, lastDay)))
    }
  }
}

/** Advances `date` by whole cycles until it's no longer before `today`,
 * forcing at least `minCycles` advances (used by the payment-confirmation
 * flow, which must always move past the just-paid cycle). */
export function advanceUntilFuture(
  date: Date,
  billingCycle: BillingCycle,
  today: Date,
  minCycles = 0
): { date: Date; cycles: number } {
  let next = new Date(date)
  let cycles = 0
  while (cycles < minCycles || next.getTime() < today.getTime()) {
    next = advanceBillingDate(next, billingCycle)
    cycles++
  }
  return { date: next, cycles }
}
