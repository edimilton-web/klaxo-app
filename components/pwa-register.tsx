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
          if (next.state === "installed" && navigator.serviceWorker.controller) {
            toast("New version available", {
              description: "Reload to get the latest Klaxo.",
              action: { label: "Reload", onClick: () => window.location.reload() },
              duration: Infinity,
            })
          }
        })
      })
    }).catch((err) => console.error("[PWA] SW registration failed:", err))
  }, [])

  return null
}
