import type { Metadata } from "next"
import Link from "next/link"
import { posts } from "@/lib/posts"

export const metadata: Metadata = {
  title: "Blog — Klaxo",
  description: "Articles on subscription tracking, spending habits, and how to stop paying for things you forgot about.",
  alternates: { canonical: "https://klaxo.app/blog" },
  openGraph: {
    title: "Blog — Klaxo",
    description: "Articles on subscription tracking, spending habits, and how to stop paying for things you forgot about.",
    url: "https://klaxo.app/blog",
    type: "website",
  },
}

export default function BlogPage() {
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

      <div className="max-w-3xl mx-auto px-6 pt-32 pb-20">
        <div className="mb-12">
          <p className="text-xs font-medium tracking-widest uppercase text-violet-400 mb-4">Blog</p>
          <h1 className="text-4xl font-semibold tracking-tight text-white mb-4">
            Subscription insights
          </h1>
          <p className="text-base text-white/50 leading-relaxed">
            How to track, manage, and stop wasting money on subscriptions you forgot about.
          </p>
        </div>

        <div className="flex flex-col gap-px border border-white/5 rounded-2xl overflow-hidden">
          {posts.map((post, i) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="block px-8 py-6 bg-white/[0.02] hover:bg-white/[0.05] transition-colors no-underline group"
              style={{ borderTop: i > 0 ? '1px solid rgba(255,255,255,0.05)' : undefined }}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <h2 className="text-base font-medium text-white group-hover:text-violet-300 transition-colors leading-snug mb-2">
                    {post.title}
                  </h2>
                  <p className="text-sm text-white/40 leading-relaxed line-clamp-2">
                    {post.description}
                  </p>
                </div>
                <span className="text-white/20 group-hover:text-violet-400 transition-colors mt-0.5 shrink-0">→</span>
              </div>
              <div className="flex items-center gap-3 mt-4 text-xs text-white/30">
                <span>{post.date}</span>
                <span>·</span>
                <span>{post.readTime}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
