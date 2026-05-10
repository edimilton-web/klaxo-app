import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(amount: number, currency = "EUR", locale = "en-GB") {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
  }).format(amount)
}

export function formatDate(date: Date | string, locale = "en-GB") {
  return new Intl.DateTimeFormat(locale, {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(date))
}

export function getDaysUntil(date: Date | string): number {
  const now = new Date()
  now.setHours(0, 0, 0, 0)
  const target = new Date(date)
  target.setHours(0, 0, 0, 0)
  return Math.round((target.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
}

export const CATEGORIES = [
  "Entertainment",
  "Music",
  "Productivity",
  "Storage",
  "Design",
  "Development",
  "Communication",
  "Security",
  "Education",
  "Professional",
  "Health",
  "News",
  "Books",
  "AI",
  "Other",
]

export const CURRENCIES = ["EUR", "USD", "GBP", "CHF", "BRL", "JPY", "CAD", "AUD"]

export const BILLING_CYCLE_LABELS: Record<string, string> = {
  WEEKLY: "Weekly",
  MONTHLY: "Monthly",
  YEARLY: "Yearly",
}

export const CATEGORY_COLORS: Record<string, string> = {
  Entertainment: "#6C47FF",
  Music: "#FF6B6B",
  Productivity: "#4ECDC4",
  Storage: "#45B7D1",
  Design: "#FFA07A",
  Development: "#98D8C8",
  Communication: "#DDA0DD",
  Security: "#90EE90",
  Education: "#F0E68C",
  Professional: "#87CEEB",
  Health: "#FFB6C1",
  News: "#D3D3D3",
  Books: "#F4A460",
  AI: "#E6E6FA",
  Other: "#C0C0C0",
}

// Brand colors for well-known services (case-insensitive lookup via getSubscriptionColor)
const SERVICE_BRAND_COLORS: Record<string, string> = {
  netflix:       "#E50914",
  spotify:       "#1DB954",
  "adobe cc":    "#FF0000",
  adobe:         "#FF0000",
  github:        "#7C5CFC",
  "apple tv":    "#555F61",
  "apple music": "#FA233B",
  apple:         "#888888",
  google:        "#4285F4",
  "google one":  "#4285F4",
  microsoft:     "#00A4EF",
  "microsoft 365":"#00A4EF",
  amazon:        "#FF9900",
  "amazon prime":"#00A8E0",
  notion:        "#9B9B9B",
  discord:       "#5865F2",
  slack:         "#E01E5A",
  dropbox:       "#0061FF",
  chatgpt:       "#10A37F",
  openai:        "#10A37F",
  youtube:       "#FF6B00",
  "youtube premium":"#FF6B00",
  "disney+":     "#113CCF",
  disney:        "#113CCF",
  hbo:           "#5822B4",
  "hbo max":     "#5822B4",
  max:           "#5822B4",
  hulu:          "#1CE783",
  twitch:        "#9146FF",
  linkedin:      "#0A66C2",
  twitter:       "#1DA1F2",
  x:             "#1DA1F2",
  figma:         "#F24E1E",
  canva:         "#00C4CC",
  "1password":   "#1A8CFF",
  lastpass:      "#D32D27",
  nordvpn:       "#4687FF",
  expressvpn:    "#DA3940",
  proton:        "#6D4AFF",
  icloud:        "#3478F6",
  "google drive":"#4285F4",
  onedrive:      "#0078D4",
  zoom:          "#2D8CFF",
  "adobe creative cloud":"#FF0000",
}

// Distinct professional palette for unknown services
export const CHART_PALETTE = [
  "#7C3AED", // violet
  "#06B6D4", // cyan
  "#F59E0B", // amber
  "#10B981", // emerald
  "#F43F5E", // rose
  "#F97316", // orange
  "#8B5CF6", // purple
  "#14B8A6", // teal
  "#EC4899", // pink
  "#0EA5E9", // sky
  "#84CC16", // lime
  "#6366F1", // indigo
  "#EF4444", // red
  "#A78BFA", // violet-light
  "#34D399", // green
]

function getBrandColor(name: string): string | null {
  const key = name.toLowerCase().trim()
  if (SERVICE_BRAND_COLORS[key]) return SERVICE_BRAND_COLORS[key]
  for (const [brand, color] of Object.entries(SERVICE_BRAND_COLORS)) {
    if (key.startsWith(brand) || key.includes(brand)) return color
  }
  return null
}

export function getSubscriptionColor(name: string, index: number): string {
  return getBrandColor(name) ?? CHART_PALETTE[index % CHART_PALETTE.length]
}

function hexToRgb(hex: string) {
  const n = parseInt(hex.slice(1), 16)
  return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255 }
}

function colorDistance(a: string, b: string): number {
  const ca = hexToRgb(a), cb = hexToRgb(b)
  return Math.sqrt((ca.r - cb.r) ** 2 + (ca.g - cb.g) ** 2 + (ca.b - cb.b) ** 2)
}

function isTooSimilar(color: string, usedColors: string[]): boolean {
  return usedColors.some((c) => colorDistance(color, c) < 60)
}

// Resolves colors for a full list ensuring no two subscriptions share a visually similar color.
// Brand colors take priority; conflicts fall back to the next unused palette color.
export function resolveSubscriptionColors(names: string[]): string[] {
  const used: string[] = []
  return names.map((name) => {
    const brand = getBrandColor(name)
    if (brand && !isTooSimilar(brand, used)) {
      used.push(brand)
      return brand
    }
    for (const color of CHART_PALETTE) {
      if (!isTooSimilar(color, used)) {
        used.push(color)
        return color
      }
    }
    return CHART_PALETTE[used.length % CHART_PALETTE.length]
  })
}
