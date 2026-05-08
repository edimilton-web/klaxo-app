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
