"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Modal } from "@/components/ui/modal"
import { formatDate } from "@/lib/utils"

interface OverdueBannerProps {
  subscriptionId: string
  subscriptionName: string
  nextBillingDate: string
}

export function OverdueBanner({ subscriptionId, subscriptionName, nextBillingDate }: OverdueBannerProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)
  const [confirmed, setConfirmed] = useState(false)

  async function handleMarkPaid(fromModal = false) {
    setLoading(true)
    const res = await fetch(`/api/subscriptions/${subscriptionId}/mark-paid`, { method: "POST" })
    setLoading(false)
    if (!res.ok) { toast.error("Erro ao registar pagamento"); return }
    if (fromModal) {
      setModalOpen(false)
      setConfirmed(true)
      setTimeout(() => { router.push("/subscriptions"); router.refresh() }, 1200)
    } else {
      toast.success("Ótimo! A próxima renovação foi atualizada automaticamente.")
      router.push("/subscriptions")
      router.refresh()
    }
  }

  if (confirmed) {
    return (
      <div className="mb-6 rounded-xl border border-emerald-500/25 bg-emerald-500/10 p-4 text-center text-sm font-medium text-emerald-400">
        ✓ Atualizado
      </div>
    )
  }

  return (
    <>
      <div className="mb-6 rounded-xl border border-orange-500/25 bg-orange-500/10 p-4">
        <div className="flex items-start gap-3">
          <div className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-orange-500/20">
            <svg className="h-3 w-3 text-orange-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-orange-200">
              Esta subscrição venceu a {formatDate(nextBillingDate)}. Já pagaste?
            </p>
            <p className="mt-0.5 text-xs text-orange-300/60">{subscriptionName}</p>
            <div className="mt-3">
              <Button
                size="sm"
                onClick={() => handleMarkPaid(false)}
                loading={loading}
                className="bg-violet-600 hover:bg-violet-500 text-white"
              >
                Já paguei
              </Button>
            </div>
          </div>
          <button
            onClick={() => setModalOpen(true)}
            className="rounded-lg p-1 text-orange-300/40 hover:text-orange-300/70 hover:bg-orange-500/10 transition-colors"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title="Já pagaste esta subscrição?">
        <p className="text-sm text-white/60">Vamos atualizar a próxima data de renovação automaticamente.</p>
        <div className="mt-5 flex gap-3">
          <Button
            variant="ghost"
            onClick={() => setModalOpen(false)}
            className="flex-1 text-white/50 hover:text-white/70"
          >
            Ainda não
          </Button>
          <Button
            onClick={() => handleMarkPaid(true)}
            loading={loading}
            className="flex-1 bg-violet-600 hover:bg-violet-500 text-white"
          >
            Sim, já paguei
          </Button>
        </div>
      </Modal>
    </>
  )
}
