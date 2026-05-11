importScripts("https://cdn.onesignal.com/sdks/web/v16/OneSignalSDK.sw.js")

const CACHE = "klaxo-v1"

self.addEventListener("install", (e) => {
  self.skipWaiting()
})

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))
    )
  )
  self.clients.claim()
})

self.addEventListener("fetch", (e) => {
  if (e.request.method !== "GET") return
  if (!e.request.url.startsWith(self.location.origin)) return
  if (e.request.url.includes("/api/")) return

  e.respondWith(
    fetch(e.request)
      .then((res) => {
        if (res.ok) {
          const clone = res.clone()
          caches.open(CACHE).then((cache) => cache.put(e.request, clone))
        }
        return res
      })
      .catch(() => caches.match(e.request))
  )
})
