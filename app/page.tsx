import Link from "next/link"
import { Button } from "@/components/ui/button"
import { KlaxoLogo } from "@/components/klaxo-logo"
import { Hero } from "@/components/home/hero"
import { StatStrip } from "@/components/home/stat-strip"
import { Problem } from "@/components/home/problem"
import { HowItWorks } from "@/components/home/how-it-works"
import { Features } from "@/components/home/features"
import { ProductShowcase } from "@/components/home/product-showcase"
import { AnchorFeature } from "@/components/home/anchor-feature"
import { Privacy } from "@/components/home/privacy"
import { Pricing } from "@/components/home/pricing"
import { Faq } from "@/components/home/faq"
import { FromBlog } from "@/components/home/from-blog"
import { FinalCta } from "@/components/home/final-cta"
import { Footer } from "@/components/home/footer"

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://klaxo.app/#org",
      name: "Klaxo",
      url: "https://klaxo.app",
      logo: "https://klaxo.app/icon",
      contactPoint: { "@type": "ContactPoint", email: "support@klaxo.app", contactType: "customer support" },
    },
    {
      "@type": "SoftwareApplication",
      "@id": "https://klaxo.app/#app",
      name: "Klaxo",
      applicationCategory: "FinanceApplication",
      operatingSystem: "Web, iOS, Android",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "EUR",
        description: "Free plan available. Pro plan for unlimited subscriptions.",
      },
      description: "Track all your subscriptions in one place. Get email alerts before renewals. Built for the European market.",
      url: "https://klaxo.app",
      publisher: { "@id": "https://klaxo.app/#org" },
    },
    {
      "@type": "WebSite",
      "@id": "https://klaxo.app/#website",
      url: "https://klaxo.app",
      name: "Klaxo",
      publisher: { "@id": "https://klaxo.app/#org" },
    },
  ],
}

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#0A0A0F] text-white overflow-x-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* Nav */}
      <nav className="sticky top-0 z-50 border-b border-white/[0.05] bg-[#0A0A0F]/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4 md:px-6">
          <div className="flex items-center gap-2.5">
            <KlaxoLogo size="sm" />
            <span className="text-lg font-semibold text-white">Klaxo</span>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/blog">
              <Button variant="ghost" size="sm" className="hidden sm:inline-flex">Blog</Button>
            </Link>
            <Link href="/login">
              <Button variant="ghost" size="sm" className="hidden sm:inline-flex">Sign in</Button>
            </Link>
            <Link href="/register">
              <Button size="sm">Get started free</Button>
            </Link>
          </div>
        </div>
      </nav>

      <Hero />
      <StatStrip />
      <Problem />
      <HowItWorks />

      <Features />
      <ProductShowcase />
      <AnchorFeature />
      <Privacy />

      <Pricing />
      <Faq />
      <FromBlog />
      <FinalCta />
      <Footer />
    </div>
  )
}
