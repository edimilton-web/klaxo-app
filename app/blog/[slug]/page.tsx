import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { posts, getPostBySlug } from "@/lib/posts"

type Props = { params: { slug: string } }

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }))
}

export function generateMetadata({ params }: Props): Metadata {
  const post = getPostBySlug(params.slug)
  if (!post) return {}
  return {
    title: `${post.title} | Klaxo Blog`,
    description: post.description,
    alternates: { canonical: `https://klaxo.app/blog/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.description,
      url: `https://klaxo.app/blog/${post.slug}`,
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

function renderContent(content: string): React.ReactNode[] {
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
  return out
}

export default function BlogPostPage({ params }: Props) {
  const post = getPostBySlug(params.slug)
  if (!post) notFound()

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

        <div>{renderContent(post.content)}</div>

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
