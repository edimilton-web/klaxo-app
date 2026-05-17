import type { MetadataRoute } from "next"

export default function manifest(): MetadataRoute.Manifest {
  return {
    id: "/dashboard",
    name: "Klaxo",
    short_name: "Klaxo",
    description: "The subscription tracker built for Europe",
    start_url: "/dashboard",
    display: "standalone",
    background_color: "#7C3AED",
    theme_color: "#7C3AED",
    orientation: "portrait",
    categories: ["finance", "productivity"],
    lang: "en",
    icons: [
      { src: "/icons/klaxo-icon-192-any.png",      sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/icons/klaxo-icon-192-maskable.png",  sizes: "192x192", type: "image/png", purpose: "maskable" },
      { src: "/icons/klaxo-icon-512-any.png",       sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "/icons/klaxo-icon-512-maskable.png",  sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
    shortcuts: [
      {
        name: "Add subscription",
        short_name: "Add",
        url: "/subscriptions/new",
        icons: [{ src: "/icons/klaxo-icon-192-any.png", sizes: "192x192" }],
      },
      {
        name: "Dashboard",
        short_name: "Dashboard",
        url: "/dashboard",
        icons: [{ src: "/icons/klaxo-icon-192-any.png", sizes: "192x192" }],
      },
    ],
  }
}
