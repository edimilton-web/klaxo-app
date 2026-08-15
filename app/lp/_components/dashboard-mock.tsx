/**
 * The Klaxo dashboard, rendered rather than screenshotted.
 *
 * The real screenshot in /public/screenshots is priced in euros, and these
 * pages sell to the UK — a PNG can't be re-priced, so the dashboard is drawn
 * here in sterling instead. It also removes a failure mode: a lazily loaded
 * image can leave an empty rectangle mid-page, and this can't.
 *
 * Figures match the statement card in the hero of /lp/forgotten, so a visitor
 * who scrolls sees the same month twice rather than two invented ones.
 *
 * Five subscriptions, not six: that is what the free plan allows, and the mock
 * should not show a state the free plan would have blocked.
 */

const STATS = [
  { label: "Monthly cost", value: "£41.45", note: "Across 5 subscriptions", lead: true },
  { label: "Yearly cost", value: "£497.40", note: "Projection" },
  { label: "Active", value: "5", note: "of 5 on Free plan" },
  { label: "Next renewal", value: "5d", note: "Streaming · £10.99" },
]

/** Shares of the £41.45 month, in the order they appear in the legend. */
const SLICES = [
  { name: "Streaming", color: "#7c5cfc", pct: 26.51 },
  { name: "Music", color: "#06b6d4", pct: 28.93 },
  { name: "Trial", color: "#f59e0b", pct: 19.28 },
  { name: "Newsletter", color: "#10b981", pct: 13.24 },
  { name: "Fitness", color: "#f43f5e", pct: 12.04 },
]

/** Colours match each service's slice in the donut, so the two panels read
    as the same month rather than two unrelated lists. */
const RENEWALS = [
  { name: "Streaming service", date: "04 Mar 2026", amount: "£10.99", days: "5d", color: "#7c5cfc" },
  { name: "Music", date: "11 Mar 2026", amount: "£11.99", days: "12d", color: "#06b6d4" },
  { name: "Fitness app", date: "18 Mar 2026", amount: "£4.99", days: "19d", color: "#f43f5e" },
]

function donutGradient() {
  let at = 0
  const stops = SLICES.map((s) => {
    const from = at
    at += s.pct
    return `${s.color} ${from}% ${at}%`
  })
  return `conic-gradient(${stops.join(", ")})`
}

export function DashboardMock() {
  return (
    <div
      className="lp-mock"
      role="img"
      aria-label="The Klaxo dashboard: a £41.45 monthly total across five subscriptions, a breakdown by subscription, and the next renewal in five days."
    >
      <div className="lp-mock__bar">
        <div>
          <p className="lp-mock__title">Dashboard</p>
          <p className="lp-mock__sub">Your subscriptions at a glance</p>
        </div>
        <span className="lp-mock__add">+ Add</span>
      </div>

      <div className="lp-mock__stats">
        {STATS.map((s) => (
          <div className={`lp-mock__stat${s.lead ? " lp-mock__stat--lead" : ""}`} key={s.label}>
            <p className="lp-mock__stat-label">{s.label}</p>
            <p className="lp-mock__stat-value">{s.value}</p>
            <p className="lp-mock__stat-note">{s.note}</p>
          </div>
        ))}
      </div>

      <div className="lp-mock__panels">
        <div className="lp-mock__panel">
          <p className="lp-mock__panel-title">By subscription</p>
          <div className="lp-mock__donut" style={{ background: donutGradient() }} />
          <div className="lp-mock__legend">
            {SLICES.map((s) => (
              <span key={s.name}>
                <i style={{ background: s.color }} />
                {s.name}
              </span>
            ))}
          </div>
        </div>

        <div className="lp-mock__panel">
          <p className="lp-mock__panel-title">Upcoming renewals</p>
          {RENEWALS.map((r) => (
            <div className="lp-mock__renewal" key={r.name}>
              <span className="lp-mock__avatar" style={{ background: r.color }} />
              <span className="lp-mock__renewal-name">
                {r.name}
                <em>{r.date}</em>
              </span>
              <span className="lp-mock__renewal-amount">
                {r.amount}
                <em>{r.days}</em>
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
