import type { Metadata, Viewport } from "next"
import { Inter } from "next/font/google"
import { SessionProvider } from "next-auth/react"
import { Toaster } from "sonner"
import Script from "next/script"
import "./globals.css"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })

export const metadata: Metadata = {
  title: "Klaxo — Personal subscription manager",
  description: "Track all your subscriptions in one place. Total cost in EUR, email alerts before each renewal. Built for the European market.",
  manifest: "/manifest.json",
  appleWebApp: { capable: true, statusBarStyle: "default", title: "Klaxo" },
  openGraph: {
    title: "Klaxo — Personal subscription manager",
    description: "Stop paying for subscriptions you forgot about.",
    type: "website",
  },
}

export const viewport: Viewport = {
  themeColor: "#6C47FF",
  width: "device-width",
  initialScale: 1,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <head>
        <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
      </head>
      <body className="min-h-full flex flex-col bg-slate-50 font-sans">
        <SessionProvider>
          {children}
          <Toaster richColors position="top-right" />
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
