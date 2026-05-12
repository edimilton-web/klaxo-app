import Link from "next/link"
import { Button } from "@/components/ui/button"
import { KlaxoLogo } from "@/components/klaxo-logo"

export const metadata = {
  title: "Terms of Service — Klaxo",
  description: "Terms and conditions governing your use of the Klaxo subscription management service.",
}

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-white">
      <nav className="sticky top-0 z-50 border-b border-slate-100 bg-white/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <Link href="/" className="flex items-center gap-2.5">
            <KlaxoLogo size="sm" />
            <span className="text-lg font-bold text-slate-900">Klaxo</span>
          </Link>
          <div className="flex items-center gap-3">
            <Link href="/login"><Button variant="ghost" size="sm">Sign in</Button></Link>
            <Link href="/register"><Button size="sm">Get started free</Button></Link>
          </div>
        </div>
      </nav>

      <main className="mx-auto max-w-3xl px-6 py-16">
        <h1 className="text-4xl font-extrabold tracking-tight text-slate-900">Terms of Service</h1>
        <p className="mt-3 text-sm text-slate-500">Last updated: May 2026</p>

        <div className="mt-10 space-y-10 text-slate-700">

          <section>
            <h2 className="text-xl font-bold text-slate-900">1. Acceptance of terms</h2>
            <p className="mt-3 leading-relaxed">
              By creating an account or using Klaxo (&ldquo;the Service&rdquo;), you agree to be bound by these Terms of Service.
              If you do not agree, do not use the Service. These terms apply to all users, whether on the free or paid plan.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900">2. Description of service</h2>
            <p className="mt-3 leading-relaxed">
              Klaxo is a personal subscription management tool that helps you track, organise, and receive alerts for your recurring
              subscriptions. You enter your subscription data manually — Klaxo does not access your bank accounts, email, or any
              third-party service on your behalf.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900">3. Accounts</h2>
            <ul className="mt-3 list-disc space-y-2 pl-5 leading-relaxed">
              <li>You must be at least 16 years old to create an account.</li>
              <li>You are responsible for maintaining the confidentiality of your credentials.</li>
              <li>You must provide accurate information when registering.</li>
              <li>One account per person. You may not share or transfer your account.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900">4. Free and paid plans</h2>
            <ul className="mt-3 list-disc space-y-2 pl-5 leading-relaxed">
              <li><strong>Free plan:</strong> Limited to a set number of subscriptions. No credit card required.</li>
              <li><strong>Pro plan:</strong> Unlimited subscriptions, CSV export, and priority email alerts. Billed monthly or annually via Stripe.</li>
              <li>Prices are displayed in EUR and include VAT where applicable.</li>
              <li>You may cancel your Pro subscription at any time. Access continues until the end of the billing period — no refunds for partial periods.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900">5. Acceptable use</h2>
            <p className="mt-3 leading-relaxed">You agree not to:</p>
            <ul className="mt-2 list-disc space-y-1 pl-5 leading-relaxed">
              <li>Use the Service for any unlawful purpose.</li>
              <li>Attempt to gain unauthorised access to any part of the Service or its infrastructure.</li>
              <li>Reverse-engineer, scrape, or otherwise extract data from the Service by automated means.</li>
              <li>Resell or commercially exploit the Service without our written permission.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900">6. Your data</h2>
            <p className="mt-3 leading-relaxed">
              You own the subscription data you enter into Klaxo. We process it solely to provide the Service, as described in our{" "}
              <Link href="/privacy" className="text-violet-600 hover:underline">Privacy Policy</Link>.
              You can export or delete your data at any time from Settings.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900">7. Service availability</h2>
            <p className="mt-3 leading-relaxed">
              We aim for high availability but do not guarantee uninterrupted access. We may perform maintenance, apply updates,
              or temporarily suspend access when necessary. We will endeavour to notify users in advance of planned downtime.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900">8. Disclaimer of warranties</h2>
            <p className="mt-3 leading-relaxed">
              The Service is provided &ldquo;as is&rdquo; without warranties of any kind, express or implied. Klaxo is a reminder tool —
              renewal alerts are best-effort and must not be relied upon as the sole method of managing financial obligations.
              Always verify renewal dates directly with your service providers.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900">9. Limitation of liability</h2>
            <p className="mt-3 leading-relaxed">
              To the maximum extent permitted by law, Klaxo shall not be liable for any indirect, incidental, or consequential
              damages arising from your use of the Service, including missed renewal dates or unintended charges by third-party
              services. Our total liability shall not exceed the amount you paid us in the 12 months preceding the claim.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900">10. Termination</h2>
            <p className="mt-3 leading-relaxed">
              You may delete your account at any time from Settings. We reserve the right to suspend or terminate accounts that
              violate these terms. Upon termination, your data is deleted as described in our Privacy Policy.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900">11. Changes to these terms</h2>
            <p className="mt-3 leading-relaxed">
              We may update these terms from time to time. We will notify registered users by email at least 14 days before
              material changes take effect. Continued use of the Service after that date constitutes acceptance of the new terms.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900">12. Governing law</h2>
            <p className="mt-3 leading-relaxed">
              These terms are governed by the laws of the European Union and the jurisdiction in which Klaxo operates.
              Any disputes shall be resolved through good-faith negotiation first; failing that, through the competent courts.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900">13. Contact</h2>
            <p className="mt-3 leading-relaxed">
              For questions about these terms:{" "}
              <a href="mailto:support@klaxo.app" className="text-violet-600 hover:underline">support@klaxo.app</a>
              <br />
              For privacy enquiries:{" "}
              <a href="mailto:privacy@klaxo.app" className="text-violet-600 hover:underline">privacy@klaxo.app</a>
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
