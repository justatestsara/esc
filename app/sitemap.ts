import { MetadataRoute } from 'next'
import { majorCities, cityMapping } from './lib/cityMapping'
import { cityToSlug } from './lib/utils'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://escort.de'
  
  // Base pages
  const pages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/post-ad`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/legal/imprint`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
  ]

  // Add all major city pages
  majorCities.forEach(city => {
    pages.push({
      url: `${baseUrl}/escort-${cityToSlug(city)}`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    })
  })

  // Add all mapped smaller city pages
  Object.keys(cityMapping).forEach(city => {
    pages.push({
      url: `${baseUrl}/escort-${cityToSlug(city)}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    })
  })

  // Note: Dynamic ad URLs (escort-[city]/[id]) would be added here in production
  // by fetching all approved ads from the database and generating URLs for each
  // Example:
  // const ads = await getAllApprovedAds()
  // ads.forEach(ad => {
  //   pages.push({
  //     url: `${baseUrl}/escort-${cityToSlug(ad.city)}/${ad.id}`,
  //     lastModified: new Date(ad.updatedAt),
  //     changeFrequency: 'weekly',
  //     priority: 0.7,
  //   })
  // })

  return pages
}

