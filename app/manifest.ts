import type { MetadataRoute } from "next"

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Klaxo",
    short_name: "Klaxo",
    description: "Track all your subscriptions in one place.",
    start_url: "/dashboard",
    display: "standalone",
    background_color: "#0A0A0F",
    theme_color: "#7C5CFC",
    orientation: "portrait-primary",
    categories: ["finance", "productivity"],
    lang: "en",
    scope: "/",
    icons: [
      { src: "/icon", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "/apple-icon", sizes: "180x180", type: "image/png", purpose: "maskable" },
    ],
  }
}
