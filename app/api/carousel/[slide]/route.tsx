import { ImageResponse } from "next/og"
import { NextRequest } from "next/server"
import React from "react"

export const runtime = "edge"

const W = 1080
const H = 1080
const BG = "linear-gradient(160deg, #0A0A0F 0%, #12101E 100%)"

function slide1() {
  return (
    <div style={{ width: W, height: H, background: "linear-gradient(160deg,#0A0A0F 0%,#12101E 60%,#1A0A2E 100%)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 90, position: "relative" }}>
      <div style={{ position: "absolute", width: 700, height: 700, borderRadius: "50%", top: "30%", left: "50%", background: "radial-gradient(circle,rgba(124,58,237,0.28) 0%,transparent 70%)" }} />
      <div style={{ fontSize: 100, marginBottom: 48, display: "flex" }}>😰</div>
      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", color: "white", fontWeight: 900, fontSize: 90, lineHeight: 1.1, textAlign: "center", letterSpacing: "-3px", marginBottom: 40, maxWidth: 880 }}>
        <span>Estás a pagar&nbsp;</span>
        <span style={{ color: "#A78BFA" }}>€180/mês</span>
        <span>&nbsp;por coisas que já&nbsp;</span>
        <span style={{ textDecoration: "line-through", color: "rgba(255,255,255,0.28)" }}>nem usas.</span>
      </div>
      <div style={{ display: "flex", color: "rgba(255,255,255,0.45)", fontSize: 34, textAlign: "center", lineHeight: 1.5, maxWidth: 780 }}>
        O europeu médio paga €2.160 por ano em subscrições. Metade são desperdício.
      </div>
      <div style={{ display: "flex", position: "absolute", bottom: 60, left: 80, alignItems: "center", gap: 10 }}>
        <div style={{ width: 34, height: 34, borderRadius: "30%", background: "linear-gradient(135deg,#A78BFA,#7C3AED)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, fontWeight: 900, color: "white" }}>K</div>
        <span style={{ color: "rgba(255,255,255,0.35)", fontSize: 20, fontWeight: 600, display: "flex" }}>klaxo.app</span>
      </div>
      <div style={{ display: "flex", position: "absolute", bottom: 68, right: 80, color: "rgba(255,255,255,0.25)", fontSize: 26 }}>desliza →</div>
    </div>
  )
}

function slide2() {
  const items = [
    { emoji: "💔", text: "Netflix que partilhavas com o ex", amount: "€17.99/mês" },
    { emoji: "🎨", text: "Adobe que abres uma vez por ano", amount: "€54.99/mês" },
    { emoji: "🏋️", text: "Ginásio que vais começar em Janeiro", amount: "€39.90/mês" },
    { emoji: "🎵", text: "Spotify familiar com 2 pessoas", amount: "€17.99/mês" },
    { emoji: "☁️", text: "Cloud storage já cheio há meses", amount: "€9.99/mês" },
  ]
  return (
    <div style={{ width: W, height: H, background: BG, display: "flex", flexDirection: "column", padding: "80px 90px", position: "relative" }}>
      <div style={{ display: "flex", color: "#A78BFA", fontSize: 28, fontWeight: 700, letterSpacing: 4, marginBottom: 24 }}>RECONHECES ISTO?</div>
      <div style={{ display: "flex", color: "white", fontSize: 68, fontWeight: 900, lineHeight: 1.15, letterSpacing: "-2px", marginBottom: 50 }}>Subscrições que esqueceste de cancelar</div>
      <div style={{ display: "flex", flexDirection: "column", gap: 20, flex: 1 }}>
        {items.map((item) => (
          <div key={item.text} style={{ display: "flex", alignItems: "center", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 20, padding: "18px 28px", gap: 22 }}>
            <span style={{ fontSize: 36, display: "flex" }}>{item.emoji}</span>
            <span style={{ flex: 1, color: "rgba(255,255,255,0.72)", fontSize: 28, display: "flex" }}>{item.text}</span>
            <span style={{ color: "#F87171", fontSize: 26, fontWeight: 700, display: "flex" }}>{item.amount}</span>
          </div>
        ))}
      </div>
      <div style={{ display: "flex", position: "absolute", bottom: 60, right: 80, alignItems: "center", gap: 10 }}>
        <div style={{ width: 34, height: 34, borderRadius: "30%", background: "linear-gradient(135deg,#A78BFA,#7C3AED)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, fontWeight: 900, color: "white" }}>K</div>
        <span style={{ color: "rgba(255,255,255,0.35)", fontSize: 20, fontWeight: 600, display: "flex" }}>klaxo.app</span>
      </div>
    </div>
  )
}

function slide3() {
  const stats = [
    { label: "Mensal", value: "€140.86", accent: true },
    { label: "Anual", value: "€1.690", accent: false },
    { label: "Activas", value: "8", accent: false },
  ]
  const subs = [
    { name: "Netflix", amount: "€17.99", days: 3, color: "#E50914" },
    { name: "Spotify", amount: "€9.99", days: 11, color: "#1DB954" },
    { name: "Adobe CC", amount: "€54.99", days: 18, color: "#FF0000" },
    { name: "iCloud", amount: "€2.99", days: 24, color: "#007AFF" },
  ]
  return (
    <div style={{ width: W, height: H, background: BG, display: "flex", flexDirection: "column", padding: "80px 90px 60px", position: "relative" }}>
      <div style={{ display: "flex", color: "#A78BFA", fontSize: 28, fontWeight: 700, letterSpacing: 4, marginBottom: 20 }}>COM O KLAXO</div>
      <div style={{ display: "flex", color: "white", fontSize: 62, fontWeight: 900, lineHeight: 1.2, letterSpacing: "-2px", marginBottom: 36 }}>Tudo numa lista. Em euros. Sem surpresas.</div>
      <div style={{ flex: 1, background: "#0D0D14", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 28, overflow: "hidden", display: "flex", flexDirection: "column" }}>
        <div style={{ display: "flex", borderBottom: "1px solid rgba(255,255,255,0.06)", padding: "24px 28px", gap: 14 }}>
          {stats.map((s) => (
            <div key={s.label} style={{ flex: 1, background: s.accent ? "linear-gradient(135deg,#7C3AED,#5B21B6)" : "rgba(255,255,255,0.04)", border: `1px solid ${s.accent ? "transparent" : "rgba(255,255,255,0.08)"}`, borderRadius: 16, padding: "14px 18px", display: "flex", flexDirection: "column", gap: 6 }}>
              <span style={{ color: s.accent ? "rgba(255,255,255,0.65)" : "rgba(255,255,255,0.35)", fontSize: 18, display: "flex" }}>{s.label}</span>
              <span style={{ color: "white", fontSize: 30, fontWeight: 800, display: "flex" }}>{s.value}</span>
            </div>
          ))}
        </div>
        {subs.map((sub) => (
          <div key={sub.name} style={{ display: "flex", alignItems: "center", padding: "18px 28px", gap: 18, borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
            <div style={{ width: 48, height: 48, borderRadius: 12, background: sub.color, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, fontWeight: 800, color: "white" }}>{sub.name[0]}</div>
            <span style={{ flex: 1, color: "white", fontSize: 26, fontWeight: 600, display: "flex" }}>{sub.name}</span>
            <span style={{ color: "rgba(255,255,255,0.4)", fontSize: 20, marginRight: 14, display: "flex" }}>em {sub.days}d</span>
            <span style={{ color: "white", fontSize: 26, fontWeight: 700, display: "flex" }}>{sub.amount}</span>
          </div>
        ))}
      </div>
      <div style={{ display: "flex", position: "absolute", bottom: 40, left: 90, alignItems: "center", gap: 10 }}>
        <div style={{ width: 34, height: 34, borderRadius: "30%", background: "linear-gradient(135deg,#A78BFA,#7C3AED)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, fontWeight: 900, color: "white" }}>K</div>
        <span style={{ color: "rgba(255,255,255,0.35)", fontSize: 20, fontWeight: 600, display: "flex" }}>klaxo.app</span>
      </div>
    </div>
  )
}

function slide4() {
  const features = [
    { icon: "📋", title: "Lista todas as subscrições", desc: "Num só sítio, para nunca mais perderes o rasto" },
    { icon: "💶", title: "Converte tudo para €", desc: "Mesmo as que pagas em USD, GBP ou outra moeda" },
    { icon: "🔔", title: "Avisa 5 dias antes", desc: "Email antes de cada renovação, sem surpresas" },
  ]
  return (
    <div style={{ width: W, height: H, background: BG, display: "flex", flexDirection: "column", padding: 90, position: "relative" }}>
      <div style={{ position: "absolute", width: 500, height: 500, borderRadius: "50%", bottom: 0, right: 0, background: "radial-gradient(circle,rgba(124,58,237,0.18) 0%,transparent 70%)" }} />
      <div style={{ display: "flex", color: "#A78BFA", fontSize: 28, fontWeight: 700, letterSpacing: 4, marginBottom: 28 }}>A SOLUÇÃO</div>
      <div style={{ display: "flex", color: "white", fontSize: 78, fontWeight: 900, lineHeight: 1.15, letterSpacing: "-2px", marginBottom: 64 }}>O Klaxo faz o trabalho por ti</div>
      <div style={{ display: "flex", flexDirection: "column", gap: 38 }}>
        {features.map((f) => (
          <div key={f.title} style={{ display: "flex", gap: 28, alignItems: "flex-start" }}>
            <div style={{ width: 70, height: 70, borderRadius: 20, flexShrink: 0, background: "rgba(124,58,237,0.2)", border: "1px solid rgba(124,58,237,0.4)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 34 }}>{f.icon}</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <span style={{ color: "white", fontSize: 32, fontWeight: 700, display: "flex" }}>{f.title}</span>
              <span style={{ color: "rgba(255,255,255,0.45)", fontSize: 26, lineHeight: 1.4, display: "flex" }}>{f.desc}</span>
            </div>
          </div>
        ))}
      </div>
      <div style={{ display: "flex", position: "absolute", bottom: 60, right: 80, alignItems: "center", gap: 10 }}>
        <div style={{ width: 34, height: 34, borderRadius: "30%", background: "linear-gradient(135deg,#A78BFA,#7C3AED)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, fontWeight: 900, color: "white" }}>K</div>
        <span style={{ color: "rgba(255,255,255,0.35)", fontSize: 20, fontWeight: 600, display: "flex" }}>klaxo.app</span>
      </div>
    </div>
  )
}

function slide5() {
  return (
    <div style={{ width: W, height: H, background: "linear-gradient(160deg,#0D0620 0%,#12101E 40%,#0A0A0F 100%)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 90, position: "relative" }}>
      <div style={{ position: "absolute", width: 800, height: 800, borderRadius: "50%", top: "50%", left: "50%", background: "radial-gradient(circle,rgba(124,58,237,0.22) 0%,transparent 65%)" }} />
      <div style={{ width: 140, height: 140, borderRadius: "22%", background: "linear-gradient(135deg,#A78BFA 0%,#7C3AED 52%,#3B0764 100%)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 80, fontWeight: 900, color: "white", marginBottom: 44 }}>K</div>
      <div style={{ display: "flex", color: "white", fontSize: 84, fontWeight: 900, lineHeight: 1.1, letterSpacing: "-2px", marginBottom: 20, textAlign: "center" }}>Começa grátis. Agora.</div>
      <div style={{ display: "flex", color: "rgba(255,255,255,0.45)", fontSize: 32, lineHeight: 1.5, marginBottom: 60, maxWidth: 700, textAlign: "center" }}>Sem cartão de crédito. 2 minutos para saber exactamente o que pagas.</div>
      <div style={{ display: "flex", background: "linear-gradient(135deg,#7C3AED,#5B21B6)", borderRadius: 999, padding: "28px 80px", color: "white", fontSize: 38, fontWeight: 800, marginBottom: 32 }}>klaxo.app</div>
      <div style={{ display: "flex", color: "rgba(255,255,255,0.3)", fontSize: 28 }}>🔗 link na bio</div>
    </div>
  )
}

const slides: Record<string, () => React.JSX.Element> = { "1": slide1, "2": slide2, "3": slide3, "4": slide4, "5": slide5 }

export async function GET(req: NextRequest, { params }: { params: Promise<{ slide: string }> }) {
  const { slide } = await params
  const fn = slides[slide]
  if (!fn) return new Response("Not found", { status: 404 })
  return new ImageResponse(fn(), { width: W, height: H })
}
