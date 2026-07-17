import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { posts, getPostBySlug, type Post } from "@/lib/posts"

// ✅ ALTERAÇÃO 1: params agora é Promise
type Props = { params: Promise<{ slug: string }> }

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }))
}

// ✅ ALTERAÇÃO 2: async + await params + canonical com www
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) return {}
  return {
    title: `${post.title} | Klaxo Blog`,
    description: post.description,
    alternates: { canonical: `https://www.klaxo.app/blog/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.description,
      url: `https://www.klaxo.app/blog/${post.slug}`,
      type: "article",
    },
  }
}

function renderInline(text: string): React.ReactNode {
  const result: React.ReactNode[] = []
  const regex = /\[([^\]]+)\]\(([^)]+)\)|\*\*([^*]+)\*\*/g
  let last = 0
  let m: RegExpExecArray | null
  while ((m = regex.exec(text)) !== null) {
    if (m.index > last) result.push(text.slice(last, m.index))
    if (m[2] !== undefined) {
      result.push(
        <a key={m.index} href={m[2]} className="text-violet-400 underline hover:text-violet-300 transition-colors">
          {m[1]}
        </a>
      )
    } else {
      result.push(
        <strong key={m.index} className="text-white font-semibold">
          {m[3]}
        </strong>
      )
    }
    last = m.index + m[0].length
  }
  if (last < text.length) result.push(text.slice(last))
  return result.length === 0 ? text : result
}

function MidArticleCta() {
  return (
    <div className="my-10 p-6 rounded-xl bg-violet-950/30 border border-violet-500/20 flex flex-col sm:flex-row items-center justify-between gap-4">
      <p className="text-sm text-white/70">Still paying for things you forgot about? Klaxo tracks it all.</p>
      <Link
        href="/register"
        className="shrink-0 inline-block px-5 py-2.5 rounded-lg bg-violet-600 hover:bg-violet-500 text-white font-semibold text-sm transition-colors no-underline"
      >
        Start free
      </Link>
    </div>
  )
}

function renderContent(content: string, midCta?: React.ReactNode): React.ReactNode[] {
  const lines = content.trim().split("\n")
  const out: React.ReactNode[] = []
  let k = 0
  let i = 0

  while (i < lines.length) {
    const t = lines[i].trim()

    if (!t) { i++; continue }

    if (t === "---") {
      out.push(<hr key={k++} className="border-none border-t border-white/10 my-10" />)
      i++; continue
    }

    if (t.startsWith("## ")) {
      out.push(
        <h2 key={k++} className="text-2xl font-semibold text-white mt-12 mb-4 tracking-tight">
          {t.slice(3)}
        </h2>
      )
      i++; continue
    }

    if (t.startsWith("### ")) {
      out.push(
        <h3 key={k++} className="text-lg font-semibold text-white mt-8 mb-3">
          {t.slice(4)}
        </h3>
      )
      i++; continue
    }

    if (t.startsWith("- ")) {
      const items: string[] = []
      while (i < lines.length && lines[i].trim().startsWith("- ")) {
        items.push(lines[i].trim().slice(2))
        i++
      }
      out.push(
        <ul key={k++} className="pl-6 mb-5 mt-1 space-y-2">
          {items.map((item, j) => (
            <li key={j} className="text-base leading-relaxed text-white/60 list-disc">
              {renderInline(item)}
            </li>
          ))}
        </ul>
      )
      continue
    }

    if (t.startsWith("**") && t.endsWith("**") && t.length > 4 && !t.slice(2, -2).includes("**")) {
      out.push(
        <h3 key={k++} className="text-lg font-semibold text-white mt-8 mb-3">
          {t.slice(2, -2)}
        </h3>
      )
      i++; continue
    }

    const paraLines: string[] = []
    while (i < lines.length) {
      const pt = lines[i].trim()
      if (!pt) break
      if (pt === "---" || pt.startsWith("## ") || pt.startsWith("### ") || pt.startsWith("- ")) break
      if (pt.startsWith("**") && pt.endsWith("**") && pt.length > 4 && !pt.slice(2, -2).includes("**")) break
      paraLines.push(pt)
      i++
    }
    if (paraLines.length > 0) {
      out.push(
        <p key={k++} className="text-base leading-relaxed text-white/60 mb-5">
          {renderInline(paraLines.join(" "))}
        </p>
      )
    }
  }
  if (midCta) {
    out.splice(Math.ceil(out.length / 2), 0, <div key="mid-cta">{midCta}</div>)
  }
  return out
}

function getRelatedPosts(current: Post, count = 3): Post[] {
  return posts
    .filter((p) => p.slug !== current.slug)
    .sort((a, b) => Date.parse(b.date) - Date.parse(a.date))
    .slice(0, count)
}

// ✅ ALTERAÇÃO 3: async + await params
export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) notFound()

  const readMinutes = parseInt(post.readTime, 10)
  const relatedPosts = getRelatedPosts(post)

  return (
    <div className="min-h-screen bg-[#0A0A0F] text-white">
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 bg-[#0A0A0F]/80 backdrop-blur border-b border-white/5">
        <Link href="/" className="flex items-center gap-2.5 no-underline">
          <div className="w-8 h-8 rounded-[22%] bg-gradient-to-br from-[#7C6FCD] via-[#7C3AED] to-[#5B21B6] flex items-center justify-center text-white font-black text-lg" style={{ fontFamily: 'Nunito, sans-serif' }}>
            K
          </div>
          <span className="font-semibold text-sm text-white">Klaxo</span>
        </Link>
        <Link
          href="/register"
          className="text-sm font-medium px-4 py-2 rounded-lg bg-violet-600 hover:bg-violet-500 text-white transition-colors no-underline"
        >
          Start free
        </Link>
      </nav>

      <div className="max-w-2xl mx-auto px-6 pt-28 pb-24">
        <Link href="/blog" className="inline-flex items-center gap-2 text-sm text-white/40 hover:text-white/70 transition-colors no-underline mb-12">
          ← Blog
        </Link>

        <div className="flex items-center gap-3 text-xs text-white/30 mb-6">
          <span>{post.date}</span>
          <span>·</span>
          <span>{post.readTime}</span>
        </div>

        <h1 className="text-3xl font-semibold tracking-tight leading-tight text-white mb-6">
          {post.title}
        </h1>

        <p className="text-base text-white/50 leading-relaxed mb-10 pb-8 border-b border-white/10">
          {post.description}
        </p>

        <div>{renderContent(post.content, readMinutes >= 6 ? <MidArticleCta /> : undefined)}</div>

        {relatedPosts.length > 0 && (
          <div className="mt-16">
            <h2 className="text-xl font-semibold text-white mb-6 tracking-tight">Keep reading</h2>
            <div className="flex flex-col gap-px border border-white/5 rounded-2xl overflow-hidden">
              {relatedPosts.map((related, i) => (
                <Link
                  key={related.slug}
                  href={`/blog/${related.slug}`}
                  className="block px-8 py-6 bg-white/[0.02] hover:bg-white/[0.05] transition-colors no-underline group"
                  style={{ borderTop: i > 0 ? "1px solid rgba(255,255,255,0.05)" : undefined }}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <h3 className="text-base font-medium text-white group-hover:text-violet-300 transition-colors leading-snug mb-2">
                        {related.title}
                      </h3>
                      <p className="text-sm text-white/40 leading-relaxed line-clamp-2">
                        {related.description}
                      </p>
                    </div>
                    <span className="text-white/20 group-hover:text-violet-400 transition-colors mt-0.5 shrink-0">→</span>
                  </div>
                  <div className="flex items-center gap-3 mt-4 text-xs text-white/30">
                    <span>{related.readTime}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        <div className="mt-16 p-8 rounded-2xl bg-violet-950/30 border border-violet-500/20 text-center">
          <p className="text-lg font-semibold text-white mb-2">
            Track your subscriptions for free
          </p>
          <p className="text-sm text-white/50 mb-6">
            See everything you pay, get notified before renewals. Built for Europe.
          </p>
          <Link
            href="/register"
            className="inline-block px-7 py-3 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-semibold text-sm transition-colors no-underline"
          >
            Start free →
          </Link>
        </div>
      </div>
    </div>
  )
}