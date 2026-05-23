export const SERVICE_DOMAIN_MAP: Record<string, string> = {
  // STREAMING VIDEO
  "netflix": "netflix.com",
  "disney+": "disneyplus.com",
  "disney plus": "disneyplus.com",
  "hbo max": "max.com",
  "max": "max.com",
  "amazon prime": "amazon.com",
  "prime video": "amazon.com",
  "apple tv+": "apple.com",
  "apple tv": "apple.com",
  "youtube premium": "youtube.com",
  "nos play": "nos.pt",
  "nos tv": "nos.pt",
  "meo": "meo.pt",
  "vodafone tv": "vodafone.pt",
  "sic": "sic.pt",
  "rtp": "rtp.pt",
  // MÚSICA
  "spotify": "spotify.com",
  "apple music": "apple.com",
  "youtube music": "youtube.com",
  "deezer": "deezer.com",
  "tidal": "tidal.com",
  // OPERADORAS PT
  "nos": "nos.pt",
  "vodafone": "vodafone.pt",
  "nowo": "nowo.pt",
  // CLOUD / ARMAZENAMENTO
  "icloud": "apple.com",
  "google one": "google.com",
  "dropbox": "dropbox.com",
  "onedrive": "microsoft.com",
  "pcloud": "pcloud.com",
  // FITNESS / SAÚDE
  "gympass": "gympass.com",
  "holmes place": "holmesplace.pt",
  "vivafit": "vivafit.pt",
  "headspace": "headspace.com",
  "calm": "calm.com",
  // SOFTWARE / PRODUTIVIDADE
  "microsoft 365": "microsoft.com",
  "microsoft office": "microsoft.com",
  "adobe creative cloud": "adobe.com",
  "adobe": "adobe.com",
  "notion": "notion.so",
  "canva": "canva.com",
  "zoom": "zoom.us",
  "slack": "slack.com",
  // JOGOS
  "playstation plus": "playstation.com",
  "ps plus": "playstation.com",
  "xbox game pass": "xbox.com",
  "xbox": "xbox.com",
  "nintendo switch online": "nintendo.com",
  "nintendo": "nintendo.com",
  "ea play": "ea.com",
  "steam": "steampowered.com",
  // NOTÍCIAS / LEITURA
  "público": "publico.pt",
  "publico": "publico.pt",
  "expresso": "expresso.pt",
  "observador": "observador.pt",
  "kindle unlimited": "amazon.com",
  "readwise": "readwise.io",
  // OUTROS
  "duolingo": "duolingo.com",
  "chatgpt": "openai.com",
  "openai": "openai.com",
  "linkedin premium": "linkedin.com",
  "linkedin": "linkedin.com",
  "tinder": "tinder.com",
}

export function getServiceDomain(name: string): string | null {
  const normalized = name.toLowerCase().trim()
  return SERVICE_DOMAIN_MAP[normalized] ?? null
}

export function getClearbitLogoUrl(domain: string): string {
  return `https://www.google.com/s2/favicons?domain=${domain}&sz=128`
}

export function getLogoUrlForService(name: string): string | null {
  const domain = getServiceDomain(name)
  if (!domain) return null
  return getClearbitLogoUrl(domain)
}
