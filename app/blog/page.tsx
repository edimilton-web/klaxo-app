import type { Metadata } from "next"
import Link from "next/link"
import { posts } from "@/lib/posts"
import { PostCover } from "@/components/blog/PostCover"

export const metadata: Metadata = {
  title: "Blog — Klaxo",
  description: "Articles on subscription tracking, spending habits, and how to stop paying for things you forgot about.",
  alternates: { canonical: "https://www.klaxo.app/blog" },
  openGraph: {
    title: "Blog — Klaxo",
    description: "Articles on subscription tracking, spending habits, and how to stop paying for things you forgot about.",
    url: "https://www.klaxo.app/blog",
    type: "website",
  },
}

export default function BlogPage() {
  const [featured, ...rest] = posts

  return (
    <div className="min-h-screen bg-[#0A0A0F] text-white">
      <style>{`
        @keyframes blogFadeInUp {
          from { opacity: 0; transform: translateY(14px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .blog-fade-in {
          opacity: 0;
          animation: blogFadeInUp 0.6s ease-out forwards;
        }
      `}</style>

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

      <div className="max-w-6xl mx-auto px-6 pt-32 pb-24">
        <div className="mb-16 max-w-2xl">
          <p className="text-xs font-medium tracking-widest uppercase text-violet-400 mb-4">Blog</p>
          <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-white mb-4" style={{ letterSpacing: "-0.02em" }}>
            Subscription insights
          </h1>
          <p className="text-base text-white/50 leading-relaxed">
            How to track, manage, and stop wasting money on subscriptions you forgot about.
          </p>
        </div>

        {featured && (
          <Link
            href={`/blog/${featured.slug}`}
            className="group blog-fade-in grid md:grid-cols-2 items-stretch rounded-2xl overflow-hidden border border-white/10 bg-white/[0.02] no-underline mb-16 transition-shadow duration-300 hover:shadow-[0_0_0_1px_rgba(124,58,237,0.5),0_30px_60px_-20px_rgba(124,58,237,0.35)]"
          >
            <div className="relative h-64 md:h-auto overflow-hidden">
              <PostCover
                slug={featured.slug}
                title={featured.title}
                coverImage={featured.coverImage}
                logoSize={56}
                sizes="(max-width: 768px) 100vw, 50vw"
                className="absolute inset-0 w-full h-full transition-transform duration-500 ease-out group-hover:scale-105"
              />
            </div>

            <div className="p-8 md:p-12 flex flex-col justify-center">
              <div className="flex items-center gap-3 text-xs text-white/50 mb-4">
                <span className="px-2.5 py-1 rounded-full bg-violet-500/15 border border-violet-500/30 text-violet-300 font-medium">Latest</span>
                <span>{featured.date}</span>
                <span>·</span>
                <span>{featured.readTime}</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-white leading-tight mb-3">
                {featured.title}
              </h2>
              <p className="text-base text-white/60 leading-relaxed">
                {featured.description}
              </p>
            </div>
          </Link>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {rest.map((post, i) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group blog-fade-in block rounded-2xl overflow-hidden border border-white/5 bg-white/[0.02] no-underline transition-all duration-300 hover:-translate-y-1 hover:border-violet-500/30 hover:shadow-[0_20px_40px_-20px_rgba(124,58,237,0.4)]"
              style={{ animationDelay: `${Math.min(i, 8) * 70}ms` }}
            >
              <div className="relative w-full aspect-[16/9] overflow-hidden">
                <PostCover
                  slug={post.slug}
                  title={post.title}
                  coverImage={post.coverImage}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="absolute inset-0 w-full h-full transition-transform duration-300 ease-out group-hover:scale-[1.03]"
                />
              </div>
              <div className="p-5">
                <h3 className="text-base font-medium text-white group-hover:text-violet-300 transition-colors leading-snug mb-2">
                  {post.title}
                </h3>
                <p className="text-sm text-white/40 leading-relaxed line-clamp-2 mb-4">
                  {post.description}
                </p>
                <div className="flex items-center gap-2 text-xs text-white/30">
                  <span className="px-2 py-0.5 rounded-full bg-white/5 border border-white/10">{post.date}</span>
                  <span className="px-2 py-0.5 rounded-full bg-white/5 border border-white/10">{post.readTime}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
