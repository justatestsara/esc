import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import AdDetailClient from '../../ad/[id]/AdDetailClient'
import { slugify } from '../../lib/utils'

// This function would fetch ad data in production
async function getAdData(id: string, citySlug: string) {
  // In production, fetch from database/API
  // For now, return null - the client component will handle localStorage
  return null
}

export async function generateMetadata({ params }: { params: { city: string; id: string } }): Promise<Metadata> {
  const ad = await getAdData(params.id, params.city)
  
  // Convert city slug back to readable format
  const cityName = params.city
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
  
  if (!ad) {
    return {
      title: `Escort Services in ${cityName} - Ad Not Found`,
      description: `Find escort services in ${cityName}. The requested ad could not be found.`,
      robots: {
        index: false,
        follow: false,
      },
    }
  }

  return {
    title: `${ad.name} - Escort Services in ${cityName}, ${ad.country}`,
    description: ad.description || `Professional escort services in ${cityName}, ${ad.country}. Contact ${ad.name} for premium companionship.`,
    openGraph: {
      title: `${ad.name} - Escort Services in ${cityName}`,
      description: ad.description || `Professional escort services in ${cityName}, ${ad.country}.`,
      images: ad.images && ad.images.length > 0 ? [{ url: ad.images[0] }] : [],
      url: `https://escort.de/escort-${params.city}/${params.id}`,
    },
    twitter: {
      card: 'summary_large_image',
      title: `${ad.name} - Escort Services in ${cityName}`,
      description: ad.description || `Professional escort services in ${cityName}, ${ad.country}.`,
      images: ad.images && ad.images.length > 0 ? [ad.images[0]] : [],
    },
    alternates: {
      canonical: `https://escort.de/escort-${params.city}/${params.id}`,
    },
  }
}

export default async function CityAdDetailPage({ params }: { params: { city: string; id: string } }) {
  const ad = await getAdData(params.id, params.city)
  
  // Convert city slug back to readable format
  const cityName = params.city
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
  
  // Generate structured data for the ad
  const structuredData = ad ? {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: ad.name,
    description: ad.description,
    address: {
      '@type': 'PostalAddress',
      addressLocality: cityName,
      addressCountry: ad.country,
    },
    image: ad.images && ad.images.length > 0 ? ad.images : [],
  } : null

  return (
    <>
      {structuredData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />
      )}
      <AdDetailClient adId={params.id} citySlug={params.city} />
    </>
  )
}

