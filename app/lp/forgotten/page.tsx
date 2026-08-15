import type { Metadata } from "next"
import { DashboardMock } from "../_components/dashboard-mock"
import { LpCta, LpFooter, LpHeader, LpOpen } from "../_components/lp-chrome"
import { RunningTotal } from "../_components/running-total"
import { ogImages, twitterImages } from "../og-metadata"

const TITLE = "The subscriptions you forgot about are still charging you | Klaxo"
const DESCRIPTION =
  "Free trials that quietly became paid. Apps you used once. See everything you’re actually paying for — in one place, without linking your bank account."

// Metadata merges shallowly, so defining openGraph here replaces the root
// layout's block outright — every field it needs has to be spelled out.
export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  openGraph: {
    type: "website",
    siteName: "Klaxo",
    locale: "en_GB",
    url: "https://www.klaxo.app/lp/forgotten",
    title: TITLE,
    description: DESCRIPTION,
    images: ogImages,
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: twitterImages,
  },
}

const CTA = "Find what you’re wasting — free"

/**
 * A month of small charges. Generic service names on purpose — this is an
 * illustration of the pattern, not a claim about any particular company.
 */
const LEDGER = [
  { date: "04 Feb", name: "Streaming service", amount: "10.99" },
  { date: "11 Feb", name: "Fitness app", amount: "4.99" },
  { date: "19 Feb", name: "Music", amount: "11.99" },
  { date: "22 Feb", name: "Free trial, now paid", amount: "7.99" },
  { date: "28 Feb", name: "A newsletter you don’t read", amount: "5.49" },
]

/** The five rows above, summed. Kept in step with the dashboard mock. */
const LEDGER_TOTAL = 41.45
const TOTAL_DELAY = 960

const STEPS = [
  {
    title: "Add what you’re paying for",
    body: "Everything, even the ones you’d forgotten.",
  },
  {
    title: "See your real monthly total",
    body: "The number most people find uncomfortable.",
  },
  {
    title: "Cut what you don’t use",
    body: "And get reminded before the next one renews.",
  },
]

const BENEFITS = [
  { title: "See your true monthly spend", body: "The full picture, not a guess." },
  {
    title: "Never pay for a forgotten trial again",
    body: "Reminders before every renewal.",
  },
  { title: "No bank access needed", body: "You stay in control of your own data." },
  { title: "Free to start", body: "See what you’re wasting before you pay anything." },
]

const TRUST = [
  "No bank connection required",
  "We never see or store your card details (payments handled by Stripe)",
  "Your data is hosted in the EU and handled under GDPR",
  "Cancel or delete your account any time",
]

const FAQS = [
  {
    q: "Does Klaxo cancel subscriptions for me?",
    a: "No — Klaxo shows you everything you’re paying for and reminds you before each renewal, so you can cancel in time yourself.",
  },
  {
    q: "Do I need to connect my bank?",
    a: "No. You add subscriptions manually.",
  },
  {
    q: "Is it free?",
    a: "Yes — track up to 5 subscriptions free.",
  },
]

export default function LpForgottenPage() {
  return (
    <div className="lp-page--forgotten">
      <LpHeader />

      <main>
        {/* 1 — Hero */}
        <section className="lp-shell lp-hero">
          <div>
            <p className="lp-label lp-rise" style={{ "--lp-d": "60ms" } as React.CSSProperties}>
              Subscription tracker · One monthly total
            </p>

            <h1 className="lp-h1 lp-rise" style={{ "--lp-d": "140ms" } as React.CSSProperties}>
              The subscriptions you forgot about are still charging you.
            </h1>

            <p className="lp-lead lp-rise" style={{ "--lp-d": "240ms" } as React.CSSProperties}>
              Free trials that quietly became paid. Apps you used once. See everything you’re
              actually paying for — in one place, without linking your bank account.
            </p>

            <div
              className="lp-hero__act lp-rise"
              style={{ "--lp-d": "340ms" } as React.CSSProperties}
            >
              <LpCta label={CTA} />
              <p className="lp-trust">No bank connection · No card required · Free to start</p>
            </div>
          </div>

          {/* The small charges, one under another, adding up. */}
          <div>
            <div className="lp-card lp-rise" style={{ "--lp-d": "440ms" } as React.CSSProperties}>
              <div className="lp-card__head">
                <span>February</span>
                <span>Five things you forgot</span>
              </div>

              {LEDGER.map((row, i) => (
                <div
                  className="lp-row lp-rise"
                  key={row.name}
                  style={{ "--lp-d": `${520 + i * 75}ms` } as React.CSSProperties}
                >
                  <span className="lp-row__date">{row.date}</span>
                  <span className="lp-row__name">{row.name}</span>
                  <span className="lp-row__amount lp-row__amount--money">£{row.amount}</span>
                </div>
              ))}

              <div
                className="lp-total lp-rise"
                style={{ "--lp-d": `${TOTAL_DELAY}ms` } as React.CSSProperties}
              >
                <span className="lp-total__label">Leaving your account</span>
                <RunningTotal value={LEDGER_TOTAL} delay={TOTAL_DELAY} />
              </div>
            </div>
          </div>
        </section>

        {/* 2 — Data */}
        <section className="lp-shell lp-sec">
          <LpOpen
            label="The scale of it"
            title="Forgotten subscriptions are a bigger problem than you think."
          />

          <div className="lp-figures lp-figures--single">
            <div className="lp-card lp-figure">
              <p className="lp-stat__num">£1.6bn</p>
              <p>
                In early 2026, UK households were estimated to waste around £1.6 billion a year on
                “zombie” subscriptions — services that are active but completely unused. Most people
                underestimate how much they’re really spending.
              </p>
            </div>
          </div>

          <p className="lp-source lp-open">Sources: ClearScore, Citizens Advice UK</p>
        </section>

        {/* 3 — Problem */}
        <section className="lp-shell lp-sec">
          <LpOpen
            label="Why it goes unnoticed"
            title="It’s not one big expense. It’s ten small ones you stopped noticing."
          >
            <p className="lp-body">
              £7.99 here. £4.99 there. A trial you meant to cancel. A service you haven’t opened in
              months. On their own they’re easy to ignore — added up, they’re real money leaving
              your account every single month.
            </p>
            <p className="lp-body">
              The problem isn’t the spending. It’s that you can’t see it all in one place. Klaxo
              fixes that.
            </p>
          </LpOpen>
        </section>

        {/* 4 — How it works */}
        <section className="lp-shell lp-sec">
          <LpOpen label="How it works" title="Three steps to the real number." />

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
            <p className="lp-mid__line">Your real total takes a couple of minutes to find out.</p>
            <div className="lp-mid__act">
              <LpCta label={CTA} />
              <p className="lp-trust">No bank connection · No card required · Free to start</p>
            </div>
          </div>
        </section>

        {/* 6 — Benefits */}
        <section className="lp-shell lp-sec">
          <LpOpen label="What you get" title="The full picture, before the next charge." />

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
          <LpOpen label="Where we stand" title="You keep your bank to yourself." />

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
            <h2 className="lp-h2">Stop paying for things you forgot about.</h2>
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
