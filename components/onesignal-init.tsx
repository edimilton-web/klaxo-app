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
      await OneSignal.init({
        appId: process.env.NEXT_PUBLIC_ONESIGNAL_APP_ID!,
        notifyButton: { enable: false },
        welcomeNotification: { disable: true },
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

      if (!OneSignal.User.PushSubscription.optedIn) {
        await OneSignal.Notifications.requestPermission()
      } else if (OneSignal.User.PushSubscription.id) {
        savePlayerId(OneSignal.User.PushSubscription.id)
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
