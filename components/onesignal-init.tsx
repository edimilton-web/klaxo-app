"use client"
import Script from "next/script"
import { useEffect } from "react"

declare global {
  interface Window {
    OneSignalDeferred?: Array<(os: OneSignalType) => void>
  }
}

interface OneSignalType {
  init: (config: object) => Promise<void>
  Notifications: { requestPermission: () => Promise<void> }
  User: { PushSubscription: { id: string | null; optedIn: boolean; addEventListener: (event: string, cb: (e: SubscriptionChangeEvent) => void) => void } }
}

interface SubscriptionChangeEvent {
  current: { id: string | null; isSubscribed: boolean }
}

export function OneSignalInit() {
  useEffect(() => {
    window.OneSignalDeferred = window.OneSignalDeferred || []
    window.OneSignalDeferred.push(async (OneSignal) => {
      try {
        await OneSignal.init({
          appId: process.env.NEXT_PUBLIC_ONESIGNAL_APP_ID!,
          notifyButton: { enable: false },
        })

        const savePlayerId = async (id: string) => {
          await fetch("/api/onesignal/subscribe", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ playerId: id }),
          })
        }

        OneSignal.User.PushSubscription.addEventListener("change", (event) => {
          if (event.current?.isSubscribed && event.current?.id) {
            savePlayerId(event.current.id)
          }
        })

        if (OneSignal.User.PushSubscription.id) {
          savePlayerId(OneSignal.User.PushSubscription.id)
        }
      } catch (err) {
        console.error("[OneSignal] init error:", err)
      }
    })
  }, [])

  return (
    <Script
      src="https://cdn.onesignal.com/sdks/web/v16/OneSignalSDK.page.js"
      strategy="afterInteractive"
    />
  )
}
