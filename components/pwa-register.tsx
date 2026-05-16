"use client"
import { useEffect } from "react"
import { toast } from "sonner"

export function PwaRegister() {
  useEffect(() => {
    if (!("serviceWorker" in navigator)) return

    navigator.serviceWorker.register("/sw.js").then((reg) => {
      reg.addEventListener("updatefound", () => {
        const next = reg.installing
        if (!next) return

        next.addEventListener("statechange", () => {
          if (next.state !== "installed") return
          if (!navigator.serviceWorker.controller) return

          // Only show once per SW script URL to avoid reload loops
          const swUrl = reg.active?.scriptURL ?? reg.scope
          const seenKey = `pwa-update-seen:${swUrl}`
          if (localStorage.getItem(seenKey)) return
          localStorage.setItem(seenKey, "1")

          toast("New version available", {
            description: "Reload to get the latest Klaxo.",
            action: { label: "Reload", onClick: () => window.location.reload() },
            duration: 10000,
          })
        })
      })
    }).catch((err) => console.error("[PWA] SW registration failed:", err))
  }, [])

  return null
}
