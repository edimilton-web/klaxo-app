export async function searchBrandLogo(
  query: string
): Promise<Array<{ name: string; domain: string; logo: string }>> {
  const res = await fetch(`/api/logo-search?q=${encodeURIComponent(query)}`)
  if (!res.ok) return []
  return res.json()
}

export async function searchBrand(
  query: string
): Promise<Array<{ name: string; domain: string; icon: string }>> {
  const res = await fetch(`/api/logo-search?q=${encodeURIComponent(query)}`)
  if (!res.ok) return []
  return res.json()
}
