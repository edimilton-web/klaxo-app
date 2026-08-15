/**
 * Shared Open Graph image for the paid landing pages.
 *
 * Static file on purpose: a dynamic ImageResponse route runs through the
 * NextAuth middleware and trips the bug we already hit once.
 *
 * Absolute URL rather than a path — some crawlers do not resolve relative
 * og:image values against metadataBase.
 */
const OG_IMAGE = {
  url: "https://www.klaxo.app/lp/og-lp.jpg",
  width: 1200,
  height: 630,
  alt: "Klaxo — every subscription you pay for, in one place",
}

export const ogImages = [OG_IMAGE]
export const twitterImages = [OG_IMAGE.url]
