import sharp from "sharp"
import { mkdirSync, existsSync } from "fs"
import path from "path"
import { posts } from "../lib/posts"

const PUBLIC_DIR = path.join(__dirname, "..", "public")
const OUT_DIR = path.join(PUBLIC_DIR, "blog", "og")
const WIDTH = 1200
const HEIGHT = 630

const BRAND_SVG = `
<svg width="${WIDTH}" height="${HEIGHT}" viewBox="0 0 ${WIDTH} ${HEIGHT}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0A0A0F"/>
      <stop offset="50%" stop-color="#12101E"/>
      <stop offset="100%" stop-color="#0D0A1A"/>
    </linearGradient>
    <linearGradient id="logo" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#8B5CF6"/>
      <stop offset="100%" stop-color="#5B21B6"/>
    </linearGradient>
    <radialGradient id="glow" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="rgba(124,92,252,0.25)"/>
      <stop offset="70%" stop-color="rgba(124,92,252,0)"/>
    </radialGradient>
  </defs>
  <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#bg)"/>
  <ellipse cx="${WIDTH / 2}" cy="${HEIGHT / 2}" rx="250" ry="150" fill="url(#glow)"/>
  <rect x="${WIDTH / 2 - 48}" y="205" width="96" height="96" rx="24" fill="url(#logo)"/>
  <text x="${WIDTH / 2}" y="265" font-family="sans-serif" font-size="52" font-weight="900" fill="white" text-anchor="middle" letter-spacing="-2">K</text>
  <text x="${WIDTH / 2}" y="366" font-family="sans-serif" font-size="60" font-weight="800" fill="white" text-anchor="middle" letter-spacing="-2">Klaxo Blog</text>
  <text x="${WIDTH / 2}" y="410" font-family="sans-serif" font-size="26" fill="rgba(255,255,255,0.45)" text-anchor="middle">Subscription insights, spending habits, and how to stop</text>
  <text x="${WIDTH / 2}" y="444" font-family="sans-serif" font-size="26" fill="rgba(255,255,255,0.45)" text-anchor="middle">paying for things you forgot about.</text>
</svg>
`.trim()

async function generateBrandOg() {
  const dest = path.join(OUT_DIR, "blog-index.jpg")
  await sharp(Buffer.from(BRAND_SVG)).jpeg({ quality: 80 }).toFile(dest)
  console.log(`✓ blog-index.jpg`)
}

async function main() {
  if (!existsSync(OUT_DIR)) mkdirSync(OUT_DIR, { recursive: true })

  await generateBrandOg()

  for (const post of posts) {
    if (!post.coverImage) continue
    const src = path.join(PUBLIC_DIR, post.coverImage.replace(/^\//, ""))
    const dest = path.join(OUT_DIR, `${post.slug}.jpg`)

    await sharp(src)
      .resize(WIDTH, HEIGHT, { fit: "cover", position: "center" })
      .jpeg({ quality: 80 })
      .toFile(dest)

    console.log(`✓ ${post.slug}.jpg`)
  }
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
