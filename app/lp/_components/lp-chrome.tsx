import Link from "next/link"
import { KlaxoLogo } from "@/components/klaxo-logo"

/** The mark, and nothing else. Paid traffic gets exactly one way forward. */
export function LpHeader() {
  return (
    <header className="lp-shell lp-head">
      <KlaxoLogo size="xs" />
      <span className="lp-head__word">Klaxo</span>
    </header>
  )
}

/**
 * The single call to action, repeated three times. Always the same
 * destination: the existing registration flow at /register.
 */
export function LpCta({ label }: { label: string }) {
  return (
    <Link href="/register" className="lp-cta" aria-label={`${label} — create your Klaxo account`}>
      {label}
      <span className="lp-cta__arrow" aria-hidden="true">
        →
      </span>
    </Link>
  )
}

/** Centred section opener: micro-label, headline, optional body. */
export function LpOpen({
  label,
  title,
  children,
}: {
  label: string
  title: string
  children?: React.ReactNode
}) {
  return (
    <div className="lp-open">
      <p className="lp-label">{label}</p>
      <h2 className="lp-h2">{title}</h2>
      {children}
    </div>
  )
}

/** Legal links and copyright. Nothing else — every other link is an exit. */
export function LpFooter() {
  return (
    <div className="lp-shell">
      <footer className="lp-foot">
        <p>© {new Date().getFullYear()} Klaxo</p>
        <div className="lp-foot__links">
          <Link href="/privacy">Privacy &amp; GDPR</Link>
          <Link href="/terms">Terms</Link>
        </div>
      </footer>
    </div>
  )
}
