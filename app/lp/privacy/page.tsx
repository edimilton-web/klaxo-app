import type { Metadata } from "next"
import { DashboardMock } from "../_components/dashboard-mock"
import { LpCta, LpFooter, LpHeader, LpOpen } from "../_components/lp-chrome"

export const metadata: Metadata = {
  title: "Track every subscription — without connecting your bank | Klaxo",
  description:
    "Emma and Snoop need access to your bank account. Klaxo doesn’t. Add your subscriptions in seconds, get reminded before every renewal. Free to start.",
}

const CTA = "Start free — no bank, no card"

/**
 * What an Open Banking account-information consent actually covers. Kept
 * factual: these are the permissions such a connection grants, and UK
 * consents genuinely lapse and are re-confirmed every 90 days.
 */
const PERMISSIONS = [
  "Read your account balance",
  "Read every transaction on the account, going back years",
  "Read every payment coming in, including your salary",
  "Read your name, address and account number",
  "Renewed every 90 days, for as long as you keep the app",
]

const STEPS = [
  {
    title: "Add a subscription",
    body: "Netflix, gym, that app you forgot about. Takes seconds.",
  },
  {
    title: "See everything in one place",
    body: "Total monthly cost, next billing dates, all of it.",
  },
  {
    title: "Get reminded before you’re charged",
    body: "So a renewal never surprises you again.",
  },
]

const BENEFITS = [
  { title: "Your bank stays private", body: "No Open Banking, no account access, ever." },
  { title: "Works everywhere you do", body: "Android, iOS and web." },
  { title: "Free to start", body: "Track your first subscriptions without paying a cent." },
  { title: "Built for Europe", body: "GDPR-first, data hosted in the EU." },
]

const TRUST = [
  "No bank connection required",
  "We never see or store your card details (payments handled by Stripe)",
  "Your data is hosted in the EU and handled under GDPR",
  "Cancel or delete your account any time",
]

const FAQS = [
  {
    q: "Do I need to connect my bank?",
    a: "No. You add subscriptions manually. Klaxo never connects to your bank account.",
  },
  {
    q: "Is it really free?",
    a: "Yes — the free plan lets you track up to 5 subscriptions. Upgrade only if you need more.",
  },
  {
    q: "How is this different from Emma or Snoop?",
    a: "They require Open Banking access to your bank. Klaxo doesn’t.",
  },
]

export default function LpPrivacyPage() {
  return (
    <div className="lp-page--privacy">
      <LpHeader />

      <main>
        {/* 1 — Hero */}
        <section className="lp-shell lp-hero">
          <div>
            <p className="lp-label lp-rise" style={{ "--lp-d": "60ms" } as React.CSSProperties}>
              Subscription tracker · No bank connection
            </p>

            <h1 className="lp-h1 lp-rise" style={{ "--lp-d": "140ms" } as React.CSSProperties}>
              {/* Non-breaking space keeps the em dash off the start of a line. */}
              Track every subscription{"\u00A0"}— without connecting your bank.
            </h1>

            <p className="lp-lead lp-rise" style={{ "--lp-d": "240ms" } as React.CSSProperties}>
              Emma and Snoop need access to your bank account. Klaxo doesn’t. Add your subscriptions
              in seconds and never get caught by a renewal again.
            </p>

            <div
              className="lp-hero__act lp-rise"
              style={{ "--lp-d": "340ms" } as React.CSSProperties}
            >
              <LpCta label={CTA} />
              <p className="lp-trust">
                No bank connection · No card required
                <br />
                GDPR-first, hosted in the EU
              </p>
            </div>
          </div>

          {/* The consent screen you never have to see. */}
          <div>
            <div className="lp-card lp-rise" style={{ "--lp-d": "460ms" } as React.CSSProperties}>
              <div className="lp-card__head">
                <span>Access request</span>
                <span>A bank-connected tracker</span>
              </div>
              {PERMISSIONS.map((p) => (
                <div className="lp-perm" key={p}>
                  <span className="lp-perm__mark" aria-hidden="true">
                    ✓
                  </span>
                  <span>{p}</span>
                </div>
              ))}
            </div>

            <div
              className="lp-card lp-rise"
              style={{ "--lp-d": "620ms", marginTop: "1rem" } as React.CSSProperties}
            >
              <div className="lp-card__head">
                <span>Access request</span>
                <span>Klaxo</span>
              </div>
              <p className="lp-answer">
                Klaxo requests: <span>nothing.</span>
              </p>
              <div className="lp-row">
                <span className="lp-row__date">03 Feb</span>
                <span className="lp-row__name">Netflix — typed in by you</span>
                <span className="lp-row__amount">£10.99</span>
              </div>
            </div>
          </div>
        </section>

        {/* 2 — Data */}
        <section className="lp-shell lp-sec">
          <LpOpen label="The scale of it" title="You’re not the only one losing track." />

          <div className="lp-figures">
            <div className="lp-card lp-figure">
              <p className="lp-stat__num">13m+</p>
              <p>People in the UK who accidentally signed up for a subscription in a single year.</p>
            </div>
            <div className="lp-card lp-figure">
              <p className="lp-stat__num">2 in 5</p>
              <p>Roughly how many people actually use everything they pay for.</p>
            </div>
          </div>

          <p className="lp-source lp-open">Source: Citizens Advice UK</p>
        </section>

        {/* 3 — Problem */}
        <section className="lp-shell lp-sec">
          <LpOpen
            label="Why we built it differently"
            title="Most subscription trackers make you hand over your bank login."
          >
            <p className="lp-body">
              Apps like Emma and Snoop only work if you connect your bank account through Open
              Banking. For a lot of people, that’s a hard no — you shouldn’t have to give a
              third-party app read access to your finances just to see what you’re paying for.
            </p>
            <p className="lp-body">
              Klaxo works differently. You add your subscriptions yourself. Nothing is pulled from
              your bank, because Klaxo never touches it.
            </p>
          </LpOpen>
        </section>

        {/* 4 — How it works */}
        <section className="lp-shell lp-sec">
          <LpOpen label="How it works" title="Three steps, no credentials." />

          <ol className="lp-steps">
            {STEPS.map((s) => (
              <li className="lp-card lp-card--hover lp-step" key={s.title}>
                <h3 className="lp-h3">{s.title}</h3>
                <p>{s.body}</p>
              </li>
            ))}
          </ol>

          <div className="lp-card lp-shot">
            <DashboardMock />
          </div>
        </section>

        {/* 5 — Mid-page call to action */}
        <section className="lp-shell">
          <div className="lp-card lp-mid">
            <p className="lp-mid__line">That’s the whole setup. No bank login, no card.</p>
            <div className="lp-mid__act">
              <LpCta label={CTA} />
              <p className="lp-trust">No bank connection · No card required · Free to start</p>
            </div>
          </div>
        </section>

        {/* 6 — Benefits */}
        <section className="lp-shell lp-sec">
          <LpOpen
            label="What you get"
            title="Everything a tracker should do. Nothing it shouldn’t."
          />

          <div className="lp-grid">
            {BENEFITS.map((b) => (
              <div className="lp-card lp-card--pad lp-card--ruled lp-card--hover" key={b.title}>
                <h3 className="lp-h3">{b.title}</h3>
                <p>{b.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 7 — Trust */}
        <section className="lp-shell lp-sec">
          <LpOpen
            label="Where we stand"
            title="Privacy isn’t a feature we bolted on. It’s the whole point."
          />

          <ul className="lp-trust-grid">
            {TRUST.map((t) => (
              <li className="lp-card" key={t}>
                <span className="lp-tick" aria-hidden="true">
                  ✓
                </span>
                <span>{t}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* 8 — FAQ */}
        <section className="lp-shell lp-sec">
          <LpOpen label="Questions" title="Straight answers." />

          <div className="lp-faq">
            {FAQS.map((f) => (
              <details className="lp-card" key={f.q}>
                <summary>
                  {f.q}
                  <span className="lp-faq__sign" aria-hidden="true">
                    +
                  </span>
                </summary>
                <p>{f.a}</p>
              </details>
            ))}
          </div>
        </section>

        {/* 9 — Closing call to action */}
        <section className="lp-shell lp-sec" style={{ paddingTop: 0 }}>
          <div className="lp-card lp-close">
            <h2 className="lp-h2">
              Take back control of your subscriptions{"\u00A0"}— without giving up your privacy.
            </h2>
            <div className="lp-close__act">
              <LpCta label={CTA} />
              <p className="lp-trust">No bank connection · No card required · Free to start</p>
            </div>
          </div>
        </section>
      </main>

      <LpFooter />
    </div>
  )
}
