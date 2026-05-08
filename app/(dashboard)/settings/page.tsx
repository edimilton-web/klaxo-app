"use client"
import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { signOut } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Modal } from "@/components/ui/modal"
import { toast } from "sonner"

export default function SettingsPage() {
  const { data: session, update } = useSession()
  const [loading, setLoading] = useState(false)
  const [deleteModal, setDeleteModal] = useState(false)
  const [form, setForm] = useState({ name: "", email: "", alertDaysBefore: 5 })

  useEffect(() => {
    if (session?.user) {
      fetch("/api/settings").then(r => r.json()).then(d => {
        setForm({ name: d.name ?? "", email: d.email ?? "", alertDaysBefore: d.alertDaysBefore ?? 5 })
      })
    }
  }, [session])

  const isPro = session?.user?.plan === "PRO"

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
        <h1 className="text-2xl font-bold text-slate-900">Settings</h1>
        <p className="mt-0.5 text-sm text-slate-500">Manage your profile and preferences</p>
      </div>

      <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
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

      <div className="mt-6 rounded-2xl border border-red-100 bg-red-50 p-5">
        <h3 className="font-semibold text-red-900">Danger zone</h3>
        <p className="mt-1 text-sm text-red-700">Deleting your account is irreversible. All your data will be permanently removed.</p>
        <Button variant="danger" size="sm" className="mt-3" onClick={() => setDeleteModal(true)}>
          Delete account
        </Button>
      </div>

      <Modal open={deleteModal} onClose={() => setDeleteModal(false)} title="Delete account">
        <p className="text-sm text-slate-600">This action is <strong>irreversible</strong>. All your data, subscriptions, and history will be permanently deleted.</p>
        <div className="mt-5 flex gap-3">
          <Button variant="outline" onClick={() => setDeleteModal(false)} className="flex-1">Cancel</Button>
          <Button variant="danger" onClick={handleDelete} className="flex-1">Confirm deletion</Button>
        </div>
      </Modal>
    </div>
  )
}
