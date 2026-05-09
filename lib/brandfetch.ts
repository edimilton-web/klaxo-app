export async function fetchBrandLogo(domain: string): Promise<string | null> {
  try {
    const url = `https://logo.clearbit.com/${domain}`
    const res = await fetch(url, { cache: 'no-store' })
    if (!res.ok) return null
    return url
  } catch {
    return null
  }
}

export const KNOWN_SERVICES: Array<{ name: string; domain: string; category: string; logoUrl?: string }> = [
  { name: "Netflix", domain: "netflix.com", category: "Entertainment" },
  { name: "Spotify", domain: "spotify.com", category: "Music" },
  { name: "Apple Music", domain: "apple.com", category: "Music" },
  { name: "YouTube Premium", domain: "youtube.com", category: "Entertainment" },
  { name: "Disney+", domain: "disneyplus.com", category: "Entertainment" },
  { name: "HBO Max", domain: "hbomax.com", category: "Entertainment" },
  { name: "Amazon Prime Video", domain: "primevideo.com", category: "Entertainment" },
  { name: "Apple TV+", domain: "apple.com", category: "Entertainment" },
  { name: "Paramount+", domain: "paramountplus.com", category: "Entertainment" },
  { name: "Adobe Creative Cloud", domain: "adobe.com", category: "Design" },
  { name: "Adobe Photoshop", domain: "adobe.com", category: "Design" },
  { name: "Adobe Illustrator", domain: "adobe.com", category: "Design" },
  { name: "Microsoft 365", domain: "microsoft.com", category: "Productivity" },
  { name: "Google One", domain: "google.com", category: "Storage" },
  { name: "iCloud", domain: "apple.com", category: "Storage" },
  { name: "Dropbox", domain: "dropbox.com", category: "Storage" },
  { name: "Notion", domain: "notion.so", category: "Productivity" },
  { name: "Figma", domain: "figma.com", category: "Design" },
  { name: "GitHub", domain: "github.com", category: "Development" },
  { name: "Vercel", domain: "vercel.com", category: "Development" },
  { name: "Heroku", domain: "heroku.com", category: "Development" },
  { name: "AWS", domain: "aws.amazon.com", category: "Development" },
  { name: "DigitalOcean", domain: "digitalocean.com", category: "Development" },
  { name: "Cloudflare", domain: "cloudflare.com", category: "Development" },
  { name: "Slack", domain: "slack.com", category: "Communication" },
  { name: "Zoom", domain: "zoom.us", category: "Communication" },
  { name: "Discord Nitro", domain: "discord.com", category: "Communication" },
  { name: "NordVPN", domain: "nordvpn.com", category: "Security" },
  { name: "ExpressVPN", domain: "expressvpn.com", category: "Security" },
  { name: "1Password", domain: "1password.com", category: "Security" },
  { name: "LastPass", domain: "lastpass.com", category: "Security" },
  { name: "Dashlane", domain: "dashlane.com", category: "Security" },
  { name: "Duolingo Plus", domain: "duolingo.com", category: "Education" },
  { name: "Coursera", domain: "coursera.org", category: "Education" },
  { name: "Udemy", domain: "udemy.com", category: "Education" },
  { name: "LinkedIn Premium", domain: "linkedin.com", category: "Professional" },
  { name: "Canva Pro", domain: "canva.com", category: "Design" },
  { name: "Grammarly", domain: "grammarly.com", category: "Productivity" },
  { name: "Evernote", domain: "evernote.com", category: "Productivity" },
  { name: "Todoist", domain: "todoist.com", category: "Productivity" },
  { name: "Trello", domain: "trello.com", category: "Productivity" },
  { name: "Asana", domain: "asana.com", category: "Productivity" },
  { name: "Monday.com", domain: "monday.com", category: "Productivity" },
  { name: "Headspace", domain: "headspace.com", category: "Health" },
  { name: "Calm", domain: "calm.com", category: "Health" },
  { name: "Strava", domain: "strava.com", category: "Health" },
  { name: "Apple Fitness+", domain: "apple.com", category: "Health" },
  { name: "The New York Times", domain: "nytimes.com", category: "News" },
  { name: "The Economist", domain: "economist.com", category: "News" },
  { name: "Audible", domain: "audible.com", category: "Books" },
  { name: "Kindle Unlimited", domain: "amazon.com", category: "Books" },
  { name: "ChatGPT Plus", domain: "openai.com", category: "AI" },
  { name: "Claude Pro", domain: "anthropic.com", category: "AI" },
  { name: "Midjourney", domain: "midjourney.com", category: "AI" },
]
