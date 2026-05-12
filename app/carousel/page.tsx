import { CarouselDownloadBtn } from "@/components/carousel-download-btn"

export default function CarouselPreview() {
  return (
    <div className="min-h-screen bg-zinc-950 py-12 px-4">
      <h1 className="text-center text-white/40 text-sm font-mono mb-10 tracking-widest uppercase">
        Klaxo — Instagram Carousel Preview
      </h1>

      <div className="flex flex-col items-center gap-8">
        {/* Slide 1 — Hook */}
        <Slide n={1}>
          <div style={{
            background: "linear-gradient(160deg, #0A0A0F 0%, #12101E 60%, #1A0A2E 100%)",
            width: "100%", height: "100%",
            display: "flex", flexDirection: "column",
            alignItems: "center", justifyContent: "center",
            padding: "60px", boxSizing: "border-box",
            position: "relative", overflow: "hidden",
          }}>
            {/* Glow */}
            <div style={{
              position: "absolute", width: 500, height: 500,
              borderRadius: "50%", top: "50%", left: "50%",
              transform: "translate(-50%,-60%)",
              background: "radial-gradient(circle, rgba(124,58,237,0.3) 0%, transparent 70%)",
            }} />

            {/* Emoji */}
            <div style={{ fontSize: 72, marginBottom: 32, lineHeight: 1 }}>😰</div>

            {/* Headline */}
            <div style={{
              color: "white", fontWeight: 900,
              fontSize: 72, lineHeight: 1.1, textAlign: "center",
              letterSpacing: "-2px", marginBottom: 28,
            }}>
              Estás a pagar{" "}
              <span style={{ color: "#A78BFA" }}>€180/mês</span>
              {" "}por coisas que já{" "}
              <span style={{
                textDecoration: "line-through", color: "rgba(255,255,255,0.3)",
              }}>nem usas.</span>
            </div>

            {/* Sub */}
            <div style={{
              color: "rgba(255,255,255,0.45)", fontSize: 28,
              textAlign: "center", lineHeight: 1.5, maxWidth: 600,
            }}>
              O europeu médio paga €2.160 por ano em subscrições.<br />
              Metade são desperdício.
            </div>

            {/* Swipe hint */}
            <div style={{
              position: "absolute", bottom: 48, right: 60,
              color: "rgba(255,255,255,0.25)", fontSize: 20,
              display: "flex", alignItems: "center", gap: 8,
            }}>
              desliza →
            </div>

            {/* Logo watermark */}
            <Logo style={{ position: "absolute", bottom: 44, left: 56 }} />
          </div>
        </Slide>

        {/* Slide 2 — O problema */}
        <Slide n={2}>
          <div style={{
            background: "linear-gradient(160deg, #0A0A0F 0%, #12101E 100%)",
            width: "100%", height: "100%",
            display: "flex", flexDirection: "column",
            padding: "56px 60px", boxSizing: "border-box",
            position: "relative",
          }}>
            <div style={{ color: "#A78BFA", fontSize: 22, fontWeight: 700, letterSpacing: 3, textTransform: "uppercase", marginBottom: 20 }}>
              Reconheces isto?
            </div>

            <div style={{ color: "white", fontSize: 52, fontWeight: 900, lineHeight: 1.15, letterSpacing: "-1px", marginBottom: 40 }}>
              Subscrições que<br />esqueceste de cancelar
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 18, flex: 1 }}>
              {[
                { emoji: "💔", text: "Netflix que partilhavas com o ex", amount: "€17.99/mês" },
                { emoji: "🎨", text: "Adobe que abres uma vez por ano", amount: "€54.99/mês" },
                { emoji: "🏋️", text: "Ginásio que vais começar em Janeiro", amount: "€39.90/mês" },
                { emoji: "🎵", text: "Spotify familiar com 2 pessoas", amount: "€17.99/mês" },
                { emoji: "☁️", text: "Cloud storage já cheio há meses", amount: "€9.99/mês" },
              ].map((item) => (
                <div key={item.text} style={{
                  display: "flex", alignItems: "center",
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: 16, padding: "14px 20px", gap: 16,
                }}>
                  <span style={{ fontSize: 28 }}>{item.emoji}</span>
                  <span style={{ flex: 1, color: "rgba(255,255,255,0.7)", fontSize: 22 }}>{item.text}</span>
                  <span style={{ color: "#F87171", fontSize: 20, fontWeight: 700 }}>{item.amount}</span>
                </div>
              ))}
            </div>

            <Logo style={{ position: "absolute", bottom: 44, right: 56 }} />
          </div>
        </Slide>

        {/* Slide 3 — Dashboard mockup */}
        <Slide n={3}>
          <div style={{
            background: "linear-gradient(160deg, #0A0A0F 0%, #12101E 100%)",
            width: "100%", height: "100%",
            display: "flex", flexDirection: "column",
            padding: "56px 56px 40px", boxSizing: "border-box",
            position: "relative",
          }}>
            <div style={{ color: "#A78BFA", fontSize: 22, fontWeight: 700, letterSpacing: 3, textTransform: "uppercase", marginBottom: 16 }}>
              Com o Klaxo
            </div>
            <div style={{ color: "white", fontSize: 46, fontWeight: 900, lineHeight: 1.2, letterSpacing: "-1px", marginBottom: 28 }}>
              Tudo numa lista.<br />Em euros. Sem surpresas.
            </div>

            {/* Mini dashboard */}
            <div style={{
              flex: 1, background: "#0D0D14",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: 20, overflow: "hidden",
              display: "flex", flexDirection: "column",
            }}>
              {/* Stats row */}
              <div style={{ display: "flex", borderBottom: "1px solid rgba(255,255,255,0.06)", padding: "18px 20px", gap: 12 }}>
                {[
                  { label: "Mensal", value: "€140.86", accent: true },
                  { label: "Anual", value: "€1.690", accent: false },
                  { label: "Activas", value: "8", accent: false },
                ].map((s) => (
                  <div key={s.label} style={{
                    flex: 1, background: s.accent ? "linear-gradient(135deg,#7C3AED,#5B21B6)" : "rgba(255,255,255,0.04)",
                    border: `1px solid ${s.accent ? "transparent" : "rgba(255,255,255,0.08)"}`,
                    borderRadius: 12, padding: "10px 14px",
                  }}>
                    <div style={{ color: s.accent ? "rgba(255,255,255,0.7)" : "rgba(255,255,255,0.35)", fontSize: 14, marginBottom: 4 }}>{s.label}</div>
                    <div style={{ color: "white", fontSize: 22, fontWeight: 800 }}>{s.value}</div>
                  </div>
                ))}
              </div>

              {/* Sub list */}
              {[
                { name: "Netflix", amount: "€17.99", days: 3, color: "#E50914" },
                { name: "Spotify", amount: "€9.99", days: 11, color: "#1DB954" },
                { name: "Adobe CC", amount: "€54.99", days: 18, color: "#FF0000" },
                { name: "iCloud", amount: "€2.99", days: 24, color: "#007AFF" },
              ].map((sub) => (
                <div key={sub.name} style={{
                  display: "flex", alignItems: "center",
                  padding: "12px 20px", gap: 14,
                  borderBottom: "1px solid rgba(255,255,255,0.04)",
                }}>
                  <div style={{
                    width: 36, height: 36, borderRadius: 10,
                    background: sub.color, display: "flex",
                    alignItems: "center", justifyContent: "center",
                    fontSize: 14, fontWeight: 800, color: "white",
                  }}>{sub.name[0]}</div>
                  <span style={{ flex: 1, color: "white", fontSize: 18, fontWeight: 600 }}>{sub.name}</span>
                  <span style={{ color: "rgba(255,255,255,0.4)", fontSize: 14, marginRight: 12 }}>em {sub.days}d</span>
                  <span style={{ color: "white", fontSize: 18, fontWeight: 700 }}>{sub.amount}</span>
                </div>
              ))}
            </div>

            <Logo style={{ position: "absolute", bottom: 40, left: 56 }} />
          </div>
        </Slide>

        {/* Slide 4 — Solução */}
        <Slide n={4}>
          <div style={{
            background: "linear-gradient(160deg, #0A0A0F 0%, #12101E 100%)",
            width: "100%", height: "100%",
            display: "flex", flexDirection: "column",
            padding: "60px", boxSizing: "border-box",
            position: "relative",
          }}>
            {/* Glow */}
            <div style={{
              position: "absolute", width: 400, height: 400,
              borderRadius: "50%", bottom: 0, right: 0,
              background: "radial-gradient(circle, rgba(124,58,237,0.2) 0%, transparent 70%)",
            }} />

            <div style={{ color: "#A78BFA", fontSize: 22, fontWeight: 700, letterSpacing: 3, textTransform: "uppercase", marginBottom: 20 }}>
              A solução
            </div>

            <div style={{ color: "white", fontSize: 58, fontWeight: 900, lineHeight: 1.15, letterSpacing: "-1.5px", marginBottom: 48 }}>
              O Klaxo faz<br />o trabalho por ti
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
              {[
                { icon: "📋", title: "Lista todas as subscrições", desc: "Num só sítio, para nunca mais perderes o rasto" },
                { icon: "💶", title: "Converte tudo para €", desc: "Mesmo as que pagas em USD, GBP ou outra moeda" },
                { icon: "🔔", title: "Avisa 5 dias antes", desc: "Email antes de cada renovação, sem surpresas" },
              ].map((f) => (
                <div key={f.title} style={{ display: "flex", gap: 20, alignItems: "flex-start" }}>
                  <div style={{
                    width: 52, height: 52, borderRadius: 14, flexShrink: 0,
                    background: "rgba(124,58,237,0.2)",
                    border: "1px solid rgba(124,58,237,0.4)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 26,
                  }}>{f.icon}</div>
                  <div>
                    <div style={{ color: "white", fontSize: 24, fontWeight: 700, marginBottom: 4 }}>{f.title}</div>
                    <div style={{ color: "rgba(255,255,255,0.45)", fontSize: 20, lineHeight: 1.4 }}>{f.desc}</div>
                  </div>
                </div>
              ))}
            </div>

            <Logo style={{ position: "absolute", bottom: 44, right: 56 }} />
          </div>
        </Slide>

        {/* Slide 5 — CTA */}
        <Slide n={5}>
          <div style={{
            background: "linear-gradient(160deg, #0D0620 0%, #12101E 40%, #0A0A0F 100%)",
            width: "100%", height: "100%",
            display: "flex", flexDirection: "column",
            alignItems: "center", justifyContent: "center",
            padding: "60px", boxSizing: "border-box",
            position: "relative", overflow: "hidden", textAlign: "center",
          }}>
            {/* Big glow */}
            <div style={{
              position: "absolute", width: 600, height: 600,
              borderRadius: "50%", top: "50%", left: "50%",
              transform: "translate(-50%,-50%)",
              background: "radial-gradient(circle, rgba(124,58,237,0.25) 0%, transparent 65%)",
            }} />

            {/* Logo big */}
            <div style={{
              width: 100, height: 100, borderRadius: "22%",
              background: "linear-gradient(135deg, #A78BFA 0%, #7C3AED 52%, #3B0764 100%)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 58, fontWeight: 900, color: "white",
              marginBottom: 32, boxShadow: "0 20px 60px rgba(124,58,237,0.5)",
            }}>K</div>

            <div style={{ color: "white", fontSize: 58, fontWeight: 900, lineHeight: 1.15, letterSpacing: "-1.5px", marginBottom: 16 }}>
              Começa grátis.<br />Agora.
            </div>

            <div style={{ color: "rgba(255,255,255,0.45)", fontSize: 26, lineHeight: 1.5, marginBottom: 48, maxWidth: 580 }}>
              Sem cartão de crédito.<br />2 minutos para saber exactamente o que pagas.
            </div>

            {/* CTA button */}
            <div style={{
              background: "linear-gradient(135deg, #7C3AED, #5B21B6)",
              borderRadius: 100, padding: "20px 60px",
              color: "white", fontSize: 28, fontWeight: 800,
              letterSpacing: "-0.5px",
              boxShadow: "0 12px 40px rgba(124,58,237,0.5)",
              marginBottom: 28,
            }}>
              klaxo.app
            </div>

            <div style={{ color: "rgba(255,255,255,0.3)", fontSize: 20 }}>
              🔗 link na bio
            </div>
          </div>
        </Slide>
      </div>

      <p className="text-center text-white/20 text-xs font-mono mt-12">
        /carousel — preview only, não indexado
      </p>
    </div>
  )
}

function Slide({ n, children }: { n: number; children: React.ReactNode }) {
  return (
    <div style={{ width: 540 }}>
      <div className="flex items-center justify-between mb-2">
        <p className="text-white/30 text-xs font-mono">Slide {n}/5</p>
        <CarouselDownloadBtn n={n} />
      </div>
      <div style={{ width: 540, height: 540, overflow: "hidden", borderRadius: 16, boxShadow: "0 25px 60px rgba(0,0,0,0.6)" }}>
        <div style={{ width: 1080, height: 1080, transform: "scale(0.5)", transformOrigin: "top left" }}>
          {children}
        </div>
      </div>
    </div>
  )
}

function Logo({ style }: { style?: React.CSSProperties }) {
  return (
    <div style={{
      display: "flex", alignItems: "center", gap: 8,
      ...style,
    }}>
      <div style={{
        width: 28, height: 28, borderRadius: "30%",
        background: "linear-gradient(135deg, #A78BFA, #7C3AED)",
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: 16, fontWeight: 900, color: "white",
      }}>K</div>
      <span style={{ color: "rgba(255,255,255,0.4)", fontSize: 16, fontWeight: 600 }}>klaxo.app</span>
    </div>
  )
}
