const GRADIENTS = [
  "linear-gradient(135deg, #7C3AED 0%, #5B21B6 100%)",
  "linear-gradient(135deg, #8B5CF6 0%, #4C1D95 100%)",
  "linear-gradient(160deg, #6D28D9 0%, #7C3AED 50%, #3B1670 100%)",
]

function hashSlug(slug: string): number {
  let h = 0
  for (let i = 0; i < slug.length; i++) h = (h * 31 + slug.charCodeAt(i)) % 1000
  return h
}

type Props = {
  slug: string
  className?: string
  logoSize?: number
}

export function CoverArt({ slug, className, logoSize = 40 }: Props) {
  const gradient = GRADIENTS[hashSlug(slug) % GRADIENTS.length]

  return (
    <div className={className} style={{ background: gradient, position: "relative", overflow: "hidden" }}>
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "repeating-linear-gradient(135deg, rgba(255,255,255,0.05) 0px, rgba(255,255,255,0.05) 1px, transparent 1px, transparent 14px)",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: "-25%",
          right: "-10%",
          width: "65%",
          aspectRatio: "1 / 1",
          background: "radial-gradient(circle, rgba(255,255,255,0.14) 0%, transparent 70%)",
          borderRadius: "50%",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: 16,
          right: 16,
          width: logoSize,
          height: logoSize,
          borderRadius: "22%",
          background: "rgba(255,255,255,0.15)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontWeight: 900,
          fontFamily: "Nunito, sans-serif",
          color: "white",
          fontSize: logoSize * 0.5,
          backdropFilter: "blur(4px)",
        }}
      >
        K
      </div>
    </div>
  )
}
