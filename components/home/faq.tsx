const FAQS = [
  {
    q: "Does Klaxo connect to my bank?",
    a: "No, and that's deliberate. You add subscriptions manually in seconds. No bank credentials, no open-banking permissions, no risk.",
  },
  {
    q: "Do you store my card details?",
    a: "No. When you subscribe, you're redirected to a secure Stripe checkout page where you enter your card details directly into Stripe's system. Klaxo's servers never see or store your card number, expiry date, or CVC — we only receive an anonymous customer reference to manage your subscription. Stripe is certified PCI DSS Level 1, the highest standard in the industry.",
  },
  {
    q: "What happens when I hit 5 subscriptions on the free plan?",
    a: "Nothing bad. Your existing subscriptions keep working and you keep getting alerts. You just can't add a 6th until you upgrade or remove one.",
  },
  {
    q: "Which currencies are supported?",
    a: "All major currencies. Everything is converted to EUR automatically so you see one real total.",
  },
  {
    q: "Can I cancel Pro anytime?",
    a: "Yes, in two clicks from Billing. You keep Pro until the end of the period you paid for.",
  },
  {
    q: "Where is my data stored?",
    a: "On EU servers in Frankfurt, Germany. Klaxo is GDPR compliant and we don't sell or share your data.",
  },
  {
    q: "How do renewal alerts work?",
    a: "You get an email 5 days before each renewal (configurable), plus a second reminder 2 days before. No surprises on your statement.",
  },
]

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.a,
    },
  })),
}

export function Faq() {
  return (
    <section id="faq" className="px-4 py-20 md:px-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <div className="mx-auto max-w-2xl">
        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-violet-400">Questions</p>
          <h2 className="mt-3 text-2xl font-bold text-white md:text-3xl">Fair questions, straight answers.</h2>
        </div>

        <div className="mt-10 space-y-3">
          {FAQS.map((item) => (
            <details key={item.q} className="group rounded-2xl border border-white/[0.12] bg-[#16161F] p-5 open:border-violet-500/25">
              <summary className="cursor-pointer list-none font-semibold text-white marker:content-none">
                <span className="flex items-center justify-between gap-4">
                  {item.q}
                  <span className="flex-shrink-0 text-white/30 transition-transform group-open:rotate-45">+</span>
                </span>
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-white/40">{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
