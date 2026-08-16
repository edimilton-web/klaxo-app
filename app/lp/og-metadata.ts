/**
 * Open Graph share cards for the paid landing pages — one per angle, so a
 * shared link previews the promise the page actually opens with.
 *
 * Static files on purpose: a dynamic ImageResponse route runs through the
 * NextAuth middleware and trips the bug we already hit once.
 *
 * Absolute URLs rather than paths — some crawlers do not resolve relative
 * og:image values against metadataBase.
 */

/**
 * /lp/privacy. Exported under unprefixed names because that page already
 * imports them and is deliberately left untouched.
 */
const PRIVACY_IMAGE = {
  url: "https://www.klaxo.app/lp/og-lp.jpg",
  width: 1200,
  height: 630,
  alt: "Klaxo — every subscription you pay for, in one place",
}

export const ogImages = [PRIVACY_IMAGE]
export const twitterImages = [PRIVACY_IMAGE.url]

/** /lp/forgotten. */
const FORGOTTEN_IMAGE = {
  url: "https://www.klaxo.app/lp/og-forgotten.jpg",
  width: 1200,
  height: 630,
  alt: "Klaxo — the subscriptions you forgot about are still charging you",
}

export const forgottenOgImages = [FORGOTTEN_IMAGE]
export const forgottenTwitterImages = [FORGOTTEN_IMAGE.url]
