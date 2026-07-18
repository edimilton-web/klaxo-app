import { ImageResponse } from "next/og"
import { getPostBySlug } from "@/lib/posts"

export const alt = "Klaxo Blog"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

const SITE_URL = "https://www.klaxo.app"

type Props = { params: Promise<{ slug: string }> }

export default async function OgImage({ params }: Props) {
  const { slug } = await params
  const post = getPostBySlug(slug)
  const title = post?.title ?? "Klaxo Blog"

  // Real photo cover: full-bleed image with dark overlay + title bottom-left.
  if (post?.coverImage) {
    return new ImageResponse(
      (
        <div style={{ width: "100%", height: "100%", display: "flex", position: "relative" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`${SITE_URL}${post.coverImage}`}
            alt=""
            width={size.width}
            height={size.height}
            style={{ objectFit: "cover", width: "100%", height: "100%" }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(0deg, rgba(10,10,15,0.85) 0%, rgba(10,10,15,0.15) 55%, rgba(10,10,15,0.35) 100%)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-end",
              padding: 64,
            }}
          >
            <div
              style={{
                display: "flex",
                fontSize: 52,
                fontWeight: 800,
                color: "white",
                letterSpacing: -1.5,
                lineHeight: 1.2,
                maxWidth: 1000,
                marginBottom: 24,
              }}
            >
              {title}
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: 44,
                  height: 44,
                  background: "linear-gradient(135deg, #8B5CF6, #7C3AED)",
                  borderRadius: 11,
                }}
              >
                <div style={{ color: "white", fontSize: 24, fontWeight: 900, letterSpacing: -1 }}>K</div>
              </div>
              <div style={{ display: "flex", fontSize: 22, fontWeight: 600, color: "rgba(255,255,255,0.75)" }}>
                Klaxo Blog
              </div>
            </div>
          </div>
        </div>
      ),
      { ...size }
    )
  }

  // Fallback: generated gradient cover (no photo set for this post yet).
  return new ImageResponse(
    (
      <div
        style={{
          background: "#0A0A0F",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          fontFamily: "sans-serif",
        }}
      >
        {/* Glow backdrop */}
        <div
          style={{
            position: "absolute",
            top: "20%",
            left: "60%",
            width: 500,
            height: 300,
            background: "radial-gradient(ellipse, rgba(124,92,252,0.22) 0%, transparent 70%)",
            borderRadius: "50%",
          }}
        />

        {/* Title */}
        <div
          style={{
            display: "flex",
            fontSize: 56,
            fontWeight: 800,
            color: "white",
            letterSpacing: -1.5,
            lineHeight: 1.2,
            maxWidth: 980,
          }}
        >
          {title}
        </div>

        {/* Footer */}
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 56,
              height: 56,
              background: "linear-gradient(135deg, #8B5CF6, #7C3AED)",
              borderRadius: 14,
            }}
          >
            <div style={{ color: "white", fontSize: 30, fontWeight: 900, letterSpacing: -1 }}>K</div>
          </div>
          <div style={{ display: "flex", fontSize: 26, fontWeight: 600, color: "rgba(255,255,255,0.7)" }}>
            Klaxo Blog
          </div>
        </div>
      </div>
    ),
    { ...size }
  )
}
