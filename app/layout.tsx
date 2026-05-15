import type { Metadata, Viewport } from "next"
import { DM_Sans, Nunito } from "next/font/google"
import { SessionProvider } from "next-auth/react"
import { Toaster } from "sonner"
import Script from "next/script"
import { PwaRegister } from "@/components/pwa-register"
import { PwaInstallBanner } from "@/components/pwa-install-banner"
import "./globals.css"

const dmSans = DM_Sans({ subsets: ["latin"], variable: "--font-dm-sans" })
const nunito = Nunito({ subsets: ["latin"], weight: ["900"], variable: "--font-nunito" })

export const metadata: Metadata = {
  title: "Klaxo — Personal subscription manager",
  description: "Track all your subscriptions in one place. Total cost in EUR, email alerts before each renewal. Built for the European market.",
  metadataBase: new URL("https://app.klaxo.app"),
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
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
    url: "https://app.klaxo.app",
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
        <script dangerouslySetInnerHTML={{ __html: `window.__pwaPrompt=null;window.addEventListener('beforeinstallprompt',function(e){e.preventDefault();window.__pwaPrompt=e;});` }} />
      </head>
      <body className="min-h-full flex flex-col bg-[#0A0A0F] font-sans">
        <SessionProvider>
          {children}
          <Toaster richColors position="top-right" />
          <PwaRegister />
          <PwaInstallBanner />
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
