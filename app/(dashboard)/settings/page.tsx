"use client"
import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { signOut } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Modal } from "@/components/ui/modal"
import { PwaInstallModal } from "@/components/pwa-install-modal"
import { toast } from "sonner"

export default function SettingsPage() {
  const { data: session, update } = useSession()
  const [loading, setLoading] = useState(false)
  const [deleteModal, setDeleteModal] = useState(false)
  const [installModal, setInstallModal] = useState(false)
  const [form, setForm] = useState({ name: "", email: "", alertDaysBefore: 5 })
  const [plan, setPlan] = useState<string | null>(null)

  useEffect(() => {
    if (session?.user) {
      fetch("/api/settings").then(r => r.json()).then(d => {
        setForm({ name: d.name ?? "", email: d.email ?? "", alertDaysBefore: d.alertDaysBefore ?? 5 })
        setPlan(d.plan ?? "FREE")
      })
    }
  }, [session])

  const isPro = plan === "PRO"

  async function handleSave(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    const res = await fetch("/api/settings", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    })
    setLoading(false)
    if (!res.ok) { toast.error("Failed to save settings"); return }
    await update()
    toast.success("Settings saved")
  }

  async function handleDelete() {
    const res = await fetch("/api/settings", { method: "DELETE" })
    if (!res.ok) { toast.error("Failed to delete account"); return }
    await signOut({ callbackUrl: "/" })
  }

  return (
    <div className="mx-auto max-w-lg">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white tracking-tight">Settings</h1>
        <p className="mt-0.5 text-sm text-white/40">Manage your profile and preferences</p>
      </div>

      <div className="rounded-2xl border border-white/[0.12] bg-[#16161F] p-6">
        <form onSubmit={handleSave} className="space-y-4">
          <Input label="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          <Input label="Email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
          <Input
            label="Alert me X days before renewal"
            type="number"
            min={1}
            max={30}
            value={form.alertDaysBefore}
            onChange={(e) => setForm({ ...form, alertDaysBefore: parseInt(e.target.value) })}
            disabled={!isPro}
            hint={!isPro ? "Available on the Pro plan" : "Days before renewal to receive an alert email"}
          />
          <Button type="submit" loading={loading} className="w-full">Save changes</Button>
        </form>
      </div>

      {/* Sign out — visible on mobile, hidden on desktop (desktop has it in sidebar) */}
      <div className="mt-4 md:hidden rounded-2xl border border-white/[0.08] bg-[#16161F] px-5 py-4 flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-white/70">Signed in as</p>
          <p className="text-xs text-white/35 truncate">{session?.user?.email}</p>
        </div>
        <button
          onClick={() => signOut({ callbackUrl: "/login" })}
          className="flex items-center gap-2 rounded-xl border border-white/[0.10] px-3 py-2 text-sm text-white/50 hover:border-white/20 hover:text-white/80 transition-colors"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          Sign out
        </button>
      </div>

      <div className="mt-4 rounded-2xl border border-white/[0.08] bg-[#16161F] p-5 flex items-center justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-white">Install Klaxo app</p>
          <p className="mt-0.5 text-xs text-white/40">Add to your home screen or desktop for quick access</p>
        </div>
        <button
          onClick={() => setInstallModal(true)}
          className="flex-shrink-0 flex items-center gap-2 rounded-xl bg-violet-600/15 px-3 py-2 text-sm font-medium text-violet-400 hover:bg-violet-600/25 transition-colors"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          Install
        </button>
      </div>

      <div className="mt-4 rounded-2xl border border-red-500/20 bg-red-500/8 p-5">
        <h3 className="font-semibold text-red-400">Danger zone</h3>
        <p className="mt-1 text-sm text-red-300/70">Deleting your account is irreversible. All your data will be permanently removed.</p>
        <Button variant="danger" size="sm" className="mt-3" onClick={() => setDeleteModal(true)}>
          Delete account
        </Button>
      </div>

      <PwaInstallModal open={installModal} onClose={() => setInstallModal(false)} />

      <Modal open={deleteModal} onClose={() => setDeleteModal(false)} title="Delete account">
        <p className="text-sm text-white/60">This action is <strong className="text-white">irreversible</strong>. All your data, subscriptions, and history will be permanently deleted.</p>
        <div className="mt-5 flex gap-3">
          <Button variant="outline" onClick={() => setDeleteModal(false)} className="flex-1">Cancel</Button>
          <Button variant="danger" onClick={handleDelete} className="flex-1">Confirm deletion</Button>
        </div>
      </Modal>
    </div>
  )
}
