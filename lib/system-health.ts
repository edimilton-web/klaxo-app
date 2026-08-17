import { prisma } from "@/lib/prisma"
import { getStripe } from "@/lib/stripe"
import { resend } from "@/lib/resend"

/**
 * Daily health indicators for the admin health email.
 *
 * Every check is read-only and runs inside its own try/catch: a check that
 * throws becomes a warning ("não consegui verificar X"), never a silent ok.
 * A broken query must not be able to buy silence.
 */

export type HealthIndicator = {
  label: string
  status: "ok" | "warn"
  detail: string
  /**
   * Rendered instead of "label: detail" when the line reads better as a whole
   * sentence — used to tell a Stripe access failure apart from real drift.
   */
  message?: string
}

/** Any suppression at all is worth knowing at this volume. */
const NEW_SUPPRESSIONS_WARN_AT = 1

/** Stripe and the database should agree exactly on who is paying. */
const STRIPE_DRIFT_WARN_AT = 1

/**
 * Industry guidance puts a healthy hard-bounce rate near 2%. The minimum
 * volume matters more than the threshold: 1 bounce in 3 sends is 33% and
 * means nothing, and an indicator that cries wolf is one you stop reading.
 *
 * At current volume (~20 emails a week) a single bounce clears 2% on its
 * own, and that bounce is already reported by the suppressions indicator.
 * So the ratio only speaks once there is enough of it to mean something;
 * individual dead addresses are indicator 1's job, not this one's.
 */
const BOUNCE_RATE_WARN_AT = 0.02
const BOUNCE_RATE_MIN_EMAILS = 50
const BOUNCE_WINDOW_DAYS = 7
const BOUNCE_MAX_PAGES = 5

function warn(label: string, detail: string): HealthIndicator {
  return { label, status: "warn", detail }
}

function ok(label: string, detail: string): HealthIndicator {
  return { label, status: "ok", detail }
}

/** Turns a thrown check into a warning rather than an absent one. */
async function check(label: string, fn: () => Promise<HealthIndicator>): Promise<HealthIndicator> {
  try {
    return await fn()
  } catch (err) {
    const reason = err instanceof Error ? err.message : String(err)
    return warn(label, `não consegui verificar: ${reason}`)
  }
}

async function newSuppressions(): Promise<HealthIndicator> {
  const label = "Supressões novas (24h)"
  const since = new Date(Date.now() - 24 * 3600 * 1000)
  const rows = await prisma.user.findMany({
    where: { emailSuppressedAt: { gte: since } },
    select: { email: true, emailSuppressReason: true },
  })

  if (rows.length >= NEW_SUPPRESSIONS_WARN_AT) {
    const list = rows.map((r) => `${r.email} (${r.emailSuppressReason})`).join(", ")
    return warn(label, `${rows.length} novo(s): ${list}`)
  }
  return ok(label, "nenhuma")
}

/**
 * Two failures live here and they need different actions: not being able to
 * reach Stripe is a configuration problem, while a number that disagrees with
 * the database is a data problem. They must be distinguishable at a glance,
 * so the access failure carries its own full sentence.
 */
async function stripeDrift(): Promise<HealthIndicator> {
  const label = "Drift Stripe↔BD"

  let stripeActive: number
  try {
    // getStripe() itself throws when STRIPE_SECRET_KEY is missing, so a
    // missing key and a failing call both land here.
    const subs = await getStripe()
      .subscriptions.list({ status: "active", limit: 100 })
      .autoPagingToArray({ limit: 500 })
    stripeActive = subs.length
  } catch (err) {
    const reason = err instanceof Error ? err.message : String(err)
    return {
      label,
      status: "warn",
      detail: `erro de acesso ao Stripe: ${reason}`,
      message: `Não consegui verificar o drift Stripe↔BD (erro de acesso ao Stripe: ${reason})`,
    }
  }

  const dbPro = await prisma.user.count({ where: { plan: "PRO" } })
  const detail = `${stripeActive} subs ACTIVE no Stripe vs ${dbPro} users PRO na BD`

  return Math.abs(stripeActive - dbPro) >= STRIPE_DRIFT_WARN_AT ? warn(label, detail) : ok(label, detail)
}

function remindersDelivered(eligible: number, sent: number): HealthIndicator {
  const label = "Lembretes: esperado vs enviado"
  const detail = `${sent}/${eligible} enviados`
  return sent < eligible ? warn(label, `${detail} — ${eligible - sent} falhou(aram)`) : ok(label, detail)
}

async function bounceRate(): Promise<HealthIndicator> {
  const label = `Bounce rate (${BOUNCE_WINDOW_DAYS}d)`
  const cutoff = Date.now() - BOUNCE_WINDOW_DAYS * 24 * 3600 * 1000

  // The list endpoint has no server-side date filter, so walk back through
  // pages until we pass the window, with a hard page cap.
  let total = 0
  let bounced = 0
  let after: string | undefined
  let reachedWindow = false

  for (let page = 0; page < BOUNCE_MAX_PAGES; page++) {
    const res = await resend.emails.list(after ? { limit: 100, after } : { limit: 100 })
    if (res.error) throw new Error(res.error.message)

    const emails = res.data?.data ?? []
    if (emails.length === 0) {
      reachedWindow = true
      break
    }

    for (const e of emails) {
      if (new Date(e.created_at).getTime() < cutoff) {
        reachedWindow = true
        continue
      }
      total++
      if (e.last_event === "bounced") bounced++
    }

    if (reachedWindow || !res.data?.has_more) {
      reachedWindow = true
      break
    }
    after = emails[emails.length - 1]?.id
  }

  if (total < BOUNCE_RATE_MIN_EMAILS) {
    return ok(label, `${bounced}/${total} — volume abaixo de ${BOUNCE_RATE_MIN_EMAILS}, rácio não é significativo`)
  }

  const rate = bounced / total
  const pct = (rate * 100).toFixed(1) + "%"
  const detail = `${bounced}/${total} = ${pct}${reachedWindow ? "" : ` (só as ${BOUNCE_MAX_PAGES * 100} mais recentes)`}`

  return rate > BOUNCE_RATE_WARN_AT
    ? warn(label, `${detail} — acima de ${BOUNCE_RATE_WARN_AT * 100}%`)
    : ok(label, detail)
}

export async function collectHealthIndicators({
  eligible,
  sent,
}: {
  eligible: number
  sent: number
}): Promise<HealthIndicator[]> {
  return Promise.all([
    check("Supressões novas (24h)", newSuppressions),
    check("Drift Stripe↔BD", stripeDrift),
    Promise.resolve(remindersDelivered(eligible, sent)),
    check(`Bounce rate (${BOUNCE_WINDOW_DAYS}d)`, bounceRate),
  ])
}
