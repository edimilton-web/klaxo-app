import { auth } from "@/auth"
import { NextResponse } from "next/server"

const AUTH_PATHS = ["/login", "/register", "/reset-password"]

export default auth((req) => {
  const { nextUrl, auth: session } = req
  const isLoggedIn = !!session?.user
  const isAuthPath = AUTH_PATHS.some((p) => nextUrl.pathname.startsWith(p))
  const isDashboard = nextUrl.pathname.startsWith("/dashboard") || nextUrl.pathname.startsWith("/subscriptions") || nextUrl.pathname.startsWith("/billing") || nextUrl.pathname.startsWith("/settings")
  const isApiProtected = nextUrl.pathname.startsWith("/api/") && !nextUrl.pathname.startsWith("/api/auth") && !nextUrl.pathname.startsWith("/api/stripe/webhook") && !nextUrl.pathname.startsWith("/api/stripe/checkout-guest") && !nextUrl.pathname.startsWith("/api/stripe/session-info") && !nextUrl.pathname.startsWith("/api/cron") && !nextUrl.pathname.startsWith("/api/carousel") && !nextUrl.pathname.endsWith("/confirm-payment")

  if (isLoggedIn && isAuthPath) {
    return NextResponse.redirect(new URL("/dashboard", nextUrl))
  }

  if (!isLoggedIn && (isDashboard || isApiProtected)) {
    if (isApiProtected) {
      return NextResponse.json({ error: "Não autenticado", code: "UNAUTHORIZED" }, { status: 401 })
    }
    return NextResponse.redirect(new URL("/login", nextUrl))
  }

  return NextResponse.next()
})

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|manifest.json|icons).*)",
  ],
}
