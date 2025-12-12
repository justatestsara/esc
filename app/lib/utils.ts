/**
 * Convert a city name to a URL-friendly slug
 * Example: "Berlin" -> "berlin", "New York" -> "new-york"
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/[\s_-]+/g, '-') // Replace spaces, underscores, and hyphens with single hyphen
    .replace(/^-+|-+$/g, '') // Remove leading/trailing hyphens
}

/**
 * Generate SEO-friendly URL for an ad
 * Example: { city: "Berlin", id: "123" } -> "/escort-berlin/123"
 */
export function generateAdUrl(city: string, id: string): string {
  const citySlug = slugify(city)
  return `/escort-${citySlug}/${id}`
}

/**
 * Extract city and ID from a URL
 * Example: "/escort-berlin/123" -> { city: "Berlin", id: "123" }
 */
export function parseAdUrl(url: string): { city: string; id: string } | null {
  const match = url.match(/^\/escort-([^/]+)\/(.+)$/)
  if (!match) return null
  
  const citySlug = match[1]
  const id = match[2]
  
  // Convert slug back to city name (capitalize first letter of each word)
  const city = citySlug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
  
  return { city, id }
}

/**
 * Convert city name to slug for URL
 * Handles special cases like "Frankfurt (Oder)" -> "frankfurt-oder"
 */
export function cityToSlug(city: string): string {
  return slugify(city.replace(/[()]/g, '').trim())
}

