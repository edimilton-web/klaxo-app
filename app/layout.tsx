import type { Metadata, Viewport } from "next"
import { DM_Sans, Nunito } from "next/font/google"
import { SessionProvider } from "next-auth/react"
import { Toaster } from "sonner"
import Script from "next/script"
import { PwaRegister } from "@/components/pwa-register"
import { PwaInstallBanner } from "@/components/pwa-install-banner"
import { ConsentBanner } from "@/components/consent-banner"
import "./globals.css"

const dmSans = DM_Sans({ subsets: ["latin"], variable: "--font-dm-sans" })
const nunito = Nunito({ subsets: ["latin"], weight: ["900"], variable: "--font-nunito" })

export const metadata: Metadata = {
  title: "Klaxo — Personal subscription manager",
  description: "Track all your subscriptions in one place. Total cost in EUR, email alerts before each renewal. Built for the European market.",
  metadataBase: new URL("https://www.klaxo.app"),
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
  manifest: "/manifest.json",
  appleWebApp: { capable: true, statusBarStyle: "black-translucent", title: "Klaxo" },
  icons: {
    icon: [
      { url: "/icons/klaxo-icon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/icons/klaxo-icon.svg", type: "image/svg+xml" },
    ],
    apple: [{ url: "/icons/klaxo-icon-180.png", sizes: "180x180", type: "image/png" }],
    other: [
      { rel: "icon", url: "/icons/klaxo-icon-192.png", sizes: "192x192", type: "image/png" },
      { rel: "icon", url: "/icons/klaxo-icon-512.png", sizes: "512x512", type: "image/png" },
    ],
  },
  openGraph: {
    title: "Klaxo — Personal subscription manager",
    description: "Stop paying for subscriptions you forgot about.",
    type: "website",
    url: "https://www.klaxo.app",
    siteName: "Klaxo",
    locale: "en_EU",
    images: [{ url: "/icons/klaxo-icon-512.png", width: 512, height: 512, alt: "Klaxo" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Klaxo — Personal subscription manager",
    description: "Stop paying for subscriptions you forgot about.",
    images: ["/icons/klaxo-icon-512.png"],
  },
}

export const viewport: Viewport = {
  themeColor: "#7C3AED",
  width: "device-width",
  initialScale: 1,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${dmSans.variable} ${nunito.variable} h-full antialiased`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: `window.__pwaPrompt=null;window.addEventListener('beforeinstallprompt',function(e){window.__pwaPrompt=e;if(!localStorage.getItem('pwa-install-dismissed-v1')){e.preventDefault();}});` }} />
        <Script id="consent-default" strategy="beforeInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            window.gtag = gtag;
            gtag('consent', 'default', {
              'analytics_storage': 'denied',
              'ad_storage': 'denied',
              'ad_user_data': 'denied',
              'ad_personalization': 'denied',
              'wait_for_update': 500
            });
          `}
        </Script>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-2T6K61JYF9"
          strategy="afterInteractive"
        />
        <Script id="google-analytics-app" strategy="afterInteractive">
          {`
            gtag('js', new Date());
            gtag('config', 'G-2T6K61JYF9', {
              linker: { domains: ['klaxo.app', 'www.klaxo.app', 'app.klaxo.app'] }
            });
          `}
        </Script>
        <Script id="meta-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '968536769219649');
            fbq('consent', 'revoke');
          `}
        </Script>
      </head>
      <body className="min-h-full flex flex-col bg-[#0A0A0F] font-sans">
        <SessionProvider>
          {children}
          <Toaster richColors position="top-right" />
          <PwaRegister />
          <PwaInstallBanner />
          <ConsentBanner />
        </SessionProvider>
        {process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN && (
          <Script
            defer
            data-domain={process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN}
            src="https://plausible.io/js/script.js"
          />
        )}
      </body>
    </html>
  )
}
