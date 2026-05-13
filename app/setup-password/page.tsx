"use client"
import { useState, Suspense } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { signIn } from "next-auth/react"
import { KlaxoLogo } from "@/components/klaxo-logo"

function SetupPasswordContent() {
  const searchParams = useSearchParams()
  const token = searchParams.get("token") ?? ""
  const router = useRouter()

  const [password, setPassword] = useState("")
  const [state, setState] = useState<"idle" | "loading" | "expired" | "error">("idle")
  const [errorMsg, setErrorMsg] = useState("")

  if (!token) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#0A0F1E] px-4">
        <div className="w-full max-w-sm rounded-2xl border border-red-500/20 bg-[#111827] p-6 text-center">
          <p className="font-semibold text-white">Invalid link</p>
          <p className="mt-1 text-sm text-white/40">
            This setup link is invalid. Contact{" "}
            <a href="mailto:hello@klaxo.app" className="text-violet-400">hello@klaxo.app</a>.
          </p>
        </div>
      </div>
    )
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (password.length < 8) { setErrorMsg("Password must be at least 8 characters"); return }
    setState("loading")
    setErrorMsg("")

    const res = await fetch("/api/auth/setup-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token, password }),
    })
    const data = await res.json()

    if (!res.ok) {
      if (data.code === "TOKEN_EXPIRED") { setState("expired"); return }
      setState("error")
      setErrorMsg(data.error ?? "Something went wrong. Please try again.")
      return
    }

    await signIn("credentials", { email: data.email, password, redirect: false })
    router.push("/dashboard")
  }

  if (state === "expired") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#0A0F1E] px-4">
        <div className="w-full max-w-sm rounded-2xl border border-amber-500/20 bg-[#111827] p-6 text-center">
          <p className="font-semibold text-white">Setup link expired</p>
          <p className="mt-1 text-sm text-white/40">Your 24-hour setup window has passed.</p>
          <a href="mailto:hello@klaxo.app"
            className="mt-4 block text-sm font-medium text-violet-400 hover:text-violet-300">
            Contact support to resend →
          </a>
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#0A0F1E] px-4 py-12">
      <div className="w-full max-w-sm">
        <div className="mb-8 flex flex-col items-center">
          <KlaxoLogo size="md" animated />
          <p className="mt-3 text-sm font-medium text-white/40">Klaxo Pro</p>
        </div>

        <div className="mb-4 rounded-2xl border border-emerald-500/20 bg-emerald-500/8 p-4 text-center">
          <p className="text-sm font-semibold text-emerald-300">Payment confirmed ✓</p>
          <p className="mt-0.5 text-xs text-white/40">Set up your password to access Klaxo Pro</p>
        </div>

        <div className="rounded-2xl border border-white/[0.10] bg-[#111827] p-6">
          <h1 className="mb-1 text-xl font-bold text-white">Create your account</h1>
          <p className="mb-5 text-sm text-white/40">Choose a password to activate your Klaxo Pro account.</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="mb-1.5 block text-xs font-medium text-white/50">Password</label>
              <input
                type="password"
                placeholder="At least 8 characters"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={8}
                autoFocus
                className="w-full rounded-xl border border-white/[0.08] bg-white/[0.04] px-3.5 py-2.5 text-sm text-white placeholder-white/20 outline-none focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/30"
              />
            </div>

            {errorMsg && (
              <p className="text-xs text-red-400">{errorMsg}</p>
            )}

            <button
              type="submit"
              disabled={state === "loading"}
              className="w-full rounded-xl bg-violet-600 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-violet-500 disabled:opacity-60"
            >
              {state === "loading" ? "Creating account…" : "Create my account →"}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default function SetupPasswordPage() {
  return (
    <Suspense fallback={null}>
      <SetupPasswordContent />
    </Suspense>
  )
}
