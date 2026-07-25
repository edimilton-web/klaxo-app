import Link from "next/link"
import { CookieSettingsLink } from "@/components/cookie-settings-link"

export function Footer() {
  return (
    <footer className="border-t border-white/[0.05] px-4 py-12 md:px-6">
      <div className="mx-auto max-w-5xl">
        <div className="grid gap-8 sm:grid-cols-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-white/30">Product</p>
            <ul className="mt-3 space-y-2 text-sm text-white/50">
              <li><Link href="#features" className="hover:text-white/80 transition-colors">Features</Link></li>
              <li><Link href="#pricing" className="hover:text-white/80 transition-colors">Pricing</Link></li>
              <li><Link href="/blog" className="hover:text-white/80 transition-colors">Blog</Link></li>
              <li><Link href="#faq" className="hover:text-white/80 transition-colors">FAQ</Link></li>
            </ul>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-white/30">Support</p>
            <ul className="mt-3 space-y-2 text-sm text-white/50">
              <li><a href="mailto:support@klaxo.app" className="hover:text-white/80 transition-colors">support@klaxo.app</a></li>
              <li><CookieSettingsLink className="hover:text-white/80 transition-colors" /></li>
            </ul>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-white/30">Legal</p>
            <ul className="mt-3 space-y-2 text-sm text-white/50">
              <li><Link href="/privacy" className="hover:text-white/80 transition-colors">Privacy &amp; GDPR</Link></li>
              <li><Link href="/terms" className="hover:text-white/80 transition-colors">Terms of Service</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center gap-2 border-t border-white/[0.05] pt-6 text-sm text-white/25 sm:flex-row sm:justify-between">
          <p>© {new Date().getFullYear()} Klaxo · Personal subscription manager</p>
          <p>🇪🇺 Built in the EU · Data hosted in Frankfurt</p>
        </div>
      </div>
    </footer>
  )
}
