import Link from "next/link"
import { Button } from "@/components/ui/button"
import { KlaxoLogo } from "@/components/klaxo-logo"

export const metadata = {
  title: "Privacy Policy & GDPR — Klaxo",
  description: "How Klaxo collects, uses, and protects your personal data in accordance with GDPR.",
}

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white">
      <nav className="sticky top-0 z-50 border-b border-slate-100 bg-white/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <Link href="/" className="flex items-center gap-2.5">
            <KlaxoLogo size="sm" />
            <span className="text-lg font-semibold text-slate-900">Klaxo</span>
          </Link>
          <div className="flex items-center gap-3">
            <Link href="/login"><Button variant="ghost" size="sm">Sign in</Button></Link>
            <Link href="/register"><Button size="sm">Get started free</Button></Link>
          </div>
        </div>
      </nav>

      <main className="mx-auto max-w-3xl px-6 py-16">
        <h1 className="text-4xl font-extrabold tracking-tight text-slate-900">Privacy Policy &amp; GDPR</h1>
        <p className="mt-3 text-sm text-slate-500">Last updated: August 2026</p>

        <div className="mt-10 space-y-10 text-slate-700">

          <section>
            <h2 className="text-xl font-bold text-slate-900">1. Who we are</h2>
            <p className="mt-3 leading-relaxed">
              Klaxo is a personal subscription management service operated by Edimilton Gomes Reis, a sole trader established in Portugal, acting as data controller.
              For any privacy-related matter, including a request for our full postal address, contact us at{" "}
              <a href="mailto:privacy@klaxo.app" className="text-violet-600 hover:underline">privacy@klaxo.app</a>.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900">2. What data we collect</h2>
            <ul className="mt-3 list-disc space-y-2 pl-5 leading-relaxed">
              <li><strong>Account data:</strong> name, email address, and (for password accounts) a bcrypt-hashed password.</li>
              <li><strong>Subscription data:</strong> service names, amounts, currencies, billing cycles, and renewal dates that you enter manually.</li>
              <li><strong>Billing data:</strong> your Stripe customer ID and subscription ID. We never store full card numbers — Stripe handles all payment data.</li>
              <li><strong>Usage analytics:</strong> anonymous, cookieless page-view data via Plausible. No personal identifiers, no cross-site tracking.</li>
              <li><strong>Analytics &amp; marketing cookies (with consent):</strong> if you accept them in the cookie banner, Google Analytics (GA4) and the Meta Pixel set cookies to measure site usage and ad performance. These load only after you consent and can be withdrawn at any time — see Section 9.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900">3. Why we collect it (legal bases)</h2>
            <ul className="mt-3 list-disc space-y-2 pl-5 leading-relaxed">
              <li><strong>Contract performance (Art. 6(1)(b) GDPR):</strong> to provide the Klaxo service you signed up for.</li>
              <li><strong>Legitimate interest (Art. 6(1)(f) GDPR):</strong> to detect abuse and improve the service using aggregated, anonymous analytics.</li>
              <li><strong>Consent (Art. 6(1)(a) GDPR):</strong> for optional email alerts (disable anytime in Settings) and for analytics/marketing cookies (GA4, Meta Pixel) — these only load after you accept them in the cookie banner.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900">4. How we use your data</h2>
            <ul className="mt-3 list-disc space-y-2 pl-5 leading-relaxed">
              <li>To display your subscription dashboard and calculate spending totals in EUR.</li>
              <li>To send renewal alert emails and monthly summary emails (opt-out available in Settings).</li>
              <li>To process payments via Stripe.</li>
              <li>We <strong>never</strong> sell your data or share it with advertisers.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900">5. Sub-processors</h2>
            <div className="mt-3 overflow-hidden rounded-xl border border-slate-200">
              <table className="w-full text-sm">
                <thead className="bg-slate-50 text-slate-600">
                  <tr>
                    <th className="px-4 py-3 text-left font-semibold">Service</th>
                    <th className="px-4 py-3 text-left font-semibold">Purpose</th>
                    <th className="px-4 py-3 text-left font-semibold">Location</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  <tr><td className="px-4 py-3">Neon</td><td className="px-4 py-3">Database (PostgreSQL)</td><td className="px-4 py-3">EU (Frankfurt)</td></tr>
                  <tr><td className="px-4 py-3">Vercel</td><td className="px-4 py-3">Hosting &amp; serverless functions</td><td className="px-4 py-3">EU (Paris/Frankfurt)</td></tr>
                  <tr><td className="px-4 py-3">Stripe</td><td className="px-4 py-3">Payment processing</td><td className="px-4 py-3">EU (Ireland)</td></tr>
                  <tr><td className="px-4 py-3">Resend</td><td className="px-4 py-3">Transactional email</td><td className="px-4 py-3">EU region</td></tr>
                  <tr><td className="px-4 py-3">Plausible</td><td className="px-4 py-3">Anonymous analytics</td><td className="px-4 py-3">EU (Germany)</td></tr>
                  <tr><td className="px-4 py-3">Google Analytics (GA4)</td><td className="px-4 py-3">Analytics — with consent only</td><td className="px-4 py-3">EU/US (SCCs)</td></tr>
                  <tr><td className="px-4 py-3">Meta Pixel</td><td className="px-4 py-3">Ad measurement — with consent only</td><td className="px-4 py-3">EU/US (SCCs)</td></tr>
                  <tr><td className="px-4 py-3">Cloudflare</td><td className="px-4 py-3">CDN and DNS</td><td className="px-4 py-3">Global (EU edge)</td></tr>
                </tbody>
              </table>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900">6. International data transfers</h2>
            <p className="mt-3 leading-relaxed">
              The vast majority of your data is processed and stored within the EU/EEA. Where a sub-processor is based outside the EU/EEA — currently Google Analytics (GA4) and the Meta Pixel, both of which may involve a transfer of data to the United States — that transfer is safeguarded under the European Commission&apos;s Standard Contractual Clauses (SCCs) and, where applicable, the EU-US Data Privacy Framework. Both of these tools load only after you give explicit consent in the cookie banner (see Section 9).
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900">7. Data retention</h2>
            <p className="mt-3 leading-relaxed">
              Your data is retained for as long as your account is active. When you delete your account (Settings → Delete account), all personal data is permanently removed from our database within 30 days. Anonymised analytics data is retained indefinitely.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900">8. Your rights under GDPR</h2>
            <p className="mt-3 leading-relaxed">As a data subject in the EU/EEA you have the right to:</p>
            <ul className="mt-2 list-disc space-y-1 pl-5 leading-relaxed">
              <li><strong>Access</strong> — request a copy of the personal data we hold about you.</li>
              <li><strong>Rectification</strong> — correct inaccurate data (available directly in Settings).</li>
              <li><strong>Erasure</strong> — delete your account and all associated data.</li>
              <li><strong>Portability</strong> — export your subscriptions as CSV (Pro feature).</li>
              <li><strong>Objection / Restriction</strong> — object to or restrict certain processing.</li>
              <li><strong>Withdraw consent</strong> — disable email alerts at any time in Settings.</li>
              <li><strong>Lodge a complaint</strong> — with a supervisory authority, namely the CNPD in Portugal (<a href="https://www.cnpd.pt" target="_blank" rel="noopener noreferrer" className="text-violet-600 hover:underline">cnpd.pt</a>) or the data protection authority of your country of residence; for UK residents, the ICO (<a href="https://ico.org.uk" target="_blank" rel="noopener noreferrer" className="text-violet-600 hover:underline">ico.org.uk</a>).</li>
            </ul>
            <p className="mt-3 leading-relaxed">
              To exercise any of these rights, email{" "}
              <a href="mailto:privacy@klaxo.app" className="text-violet-600 hover:underline">privacy@klaxo.app</a>.
              We will respond within 30 days.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900">9. Cookies</h2>
            <p className="mt-3 leading-relaxed">
              Klaxo uses a single session cookie required for authentication. Plausible analytics is cookieless and always on. Google Analytics (GA4) and the Meta Pixel are <strong>off by default</strong> and only load after you accept analytics or marketing cookies in the cookie banner — you can accept, reject, or customize your choice at any time, and withdraw it just as easily.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900">10. Security</h2>
            <p className="mt-3 leading-relaxed">
              All data is encrypted in transit (TLS 1.3) and at rest. Passwords are hashed with bcrypt (12 rounds). We conduct periodic security reviews.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900">11. Contact</h2>
            <p className="mt-3 leading-relaxed">
              For privacy and GDPR enquiries:{" "}
              <a href="mailto:privacy@klaxo.app" className="text-violet-600 hover:underline">privacy@klaxo.app</a>
              <br />
              For general support:{" "}
              <a href="mailto:support@klaxo.app" className="text-violet-600 hover:underline">support@klaxo.app</a>
              <br />
              Website:{" "}
              <a href="https://www.klaxo.app" target="_blank" rel="noopener noreferrer" className="text-violet-600 hover:underline">www.klaxo.app</a>
            </p>
          </section>

        </div>
      </main>

      <footer className="border-t border-slate-100 px-6 py-10">
        <div className="mx-auto max-w-5xl flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
          <p className="text-sm text-slate-400">© {new Date().getFullYear()} Klaxo · Personal subscription manager</p>
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-slate-400">
            <a href="mailto:support@klaxo.app" className="hover:text-violet-600 transition-colors">support@klaxo.app</a>
            <Link href="/privacy" className="hover:text-violet-600 transition-colors">Privacy &amp; GDPR</Link>
            <Link href="/terms" className="hover:text-violet-600 transition-colors">Terms of Service</Link>
            <a href="https://www.klaxo.app" target="_blank" rel="noopener noreferrer" className="hover:text-violet-600 transition-colors">klaxo.app</a>
          </div>
        </div>
      </footer>
    </div>
  )
}
