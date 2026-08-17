import { NextResponse } from "next/server"
import { Webhook } from "svix"
import { prisma } from "@/lib/prisma"

// Signature verification needs node crypto and the untouched request body.
export const runtime = "nodejs"

/**
 * Resend's documentation disagrees with itself about how a bounce is
 * classified: the payload reference shows `data.bounce.type` with
 * "Permanent"/"Temporary", while Resend's own skills repo reads
 * `data.bounce_type` with 'hard'. The SDK ships no types for webhook
 * payloads, so there is nothing authoritative to check against.
 *
 * So: read every documented path, and suppress unless something explicitly
 * says the failure was temporary. A renamed field or a new spelling then
 * lands on the safe side — Resend describes email.bounced as firing when the
 * server "permanently rejected" the mail, so a permanent reading is the
 * right default. The logging below records the real shape of the first
 * bounce we receive, and the filter can be tightened once we know it.
 */
const SOFT_BOUNCE = /transient|temporary|soft|deferred/i

type BouncePayload = {
  type?: string
  data?: {
    to?: string | string[]
    email_id?: string
    bounce?: { type?: string; subType?: string; message?: string }
    bounce_type?: string
    type?: string
  }
}

function isHardBounce(payload: BouncePayload): boolean {
  const candidates = [
    payload.data?.bounce?.type,
    payload.data?.bounce?.subType,
    payload.data?.bounce_type,
    payload.data?.type,
  ].filter((v): v is string => typeof v === "string")

  return !candidates.some((v) => SOFT_BOUNCE.test(v))
}

function recipients(payload: BouncePayload): string[] {
  const to = payload.data?.to
  if (Array.isArray(to)) return to.filter((t) => typeof t === "string")
  return typeof to === "string" ? [to] : []
}

async function suppress(emails: string[], reason: "hard_bounce" | "complaint") {
  let count = 0
  for (const email of emails) {
    // updateMany, not update: an address with no account is a no-op rather
    // than a P2025. The emailSuppressedAt filter keeps the first reason.
    const { count: n } = await prisma.user.updateMany({
      where: { email: { equals: email, mode: "insensitive" }, emailSuppressedAt: null },
      data: { emailSuppressedAt: new Date(), emailSuppressReason: reason },
    })
    count += n
  }
  return count
}

export async function POST(req: Request) {
  const secret = process.env.RESEND_WEBHOOK_SECRET
  if (!secret) {
    console.error("[resend-webhook] RESEND_WEBHOOK_SECRET is not set — rejecting")
    return new NextResponse("Webhook not configured", { status: 500 })
  }

  // The raw body is what was signed; parsing it first would break the check.
  const body = await req.text()

  let payload: BouncePayload
  try {
    payload = new Webhook(secret).verify(body, {
      "svix-id": req.headers.get("svix-id") ?? "",
      "svix-timestamp": req.headers.get("svix-timestamp") ?? "",
      "svix-signature": req.headers.get("svix-signature") ?? "",
    }) as BouncePayload
  } catch {
    // Missing or wrong signature: nothing is read, nothing is written.
    return new NextResponse("Invalid signature", { status: 401 })
  }

  const emails = recipients(payload)

  if (payload.type === "email.bounced") {
    const hard = isHardBounce(payload)

    // Logged so the real payload shape can be read off the first live event.
    // Subject, tags and template id are left out: they can carry user data
    // and say nothing about the format.
    console.log(
      "[resend-webhook] bounce",
      JSON.stringify({
        eventType: payload.type,
        to: emails,
        emailId: payload.data?.email_id,
        bounce: payload.data?.bounce,
        bounceType: payload.data?.bounce_type,
        dataKeys: Object.keys(payload.data ?? {}),
        classifiedHard: hard,
      })
    )

    if (hard) {
      const n = await suppress(emails, "hard_bounce")
      console.log(`[resend-webhook] suppressed ${n} user(s) for hard_bounce`)
    }

    return NextResponse.json({ received: true, suppressed: hard })
  }

  if (payload.type === "email.complained") {
    const n = await suppress(emails, "complaint")
    console.log(`[resend-webhook] complaint from ${emails.join(", ")} — suppressed ${n} user(s)`)
    return NextResponse.json({ received: true, suppressed: true })
  }

  // Everything else is acknowledged so Resend stops retrying.
  return NextResponse.json({ received: true, ignored: payload.type })
}
