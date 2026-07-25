import Link from "next/link"
import { posts } from "@/lib/posts"

export function FromBlog() {
  const latest = posts.slice(0, 3)

  return (
    <section className="px-4 py-20 md:px-6">
      <div className="mx-auto max-w-4xl">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-violet-400">From the blog</p>
          <h2 className="mt-3 text-2xl font-bold text-white md:text-3xl">Learn to spend less on subscriptions.</h2>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          {latest.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="block rounded-2xl border border-white/[0.12] bg-[#16161F] p-5 transition-colors hover:border-violet-500/25"
            >
              <p className="text-xs text-white/35">{post.date}</p>
              <h3 className="mt-2 font-semibold text-white">{post.title}</h3>
              <p className="mt-2 line-clamp-1 text-sm text-white/40">{post.description}</p>
            </Link>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Link href="/blog" className="text-sm font-medium text-violet-400 hover:text-violet-300">
            All articles →
          </Link>
        </div>
      </div>
    </section>
  )
}
