export async function searchBrandLogo(
  query: string
): Promise<Array<{ name: string; domain: string; logo: string }>> {
  const res = await fetch(`/api/logo-search?q=${encodeURIComponent(query)}`)
  if (!res.ok) return []
  return res.json()
}
