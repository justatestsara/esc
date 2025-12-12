import type { Metadata } from 'next'
import CityListingClient from './CityListingClient'
import { getMajorCity, majorCities } from '../lib/cityMapping'
import { slugify } from '../lib/utils'

/**
 * Convert slug back to city name
 */
function slugToCityName(slug: string): string {
  return slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

export async function generateMetadata({ params }: { params: { city: string } }): Promise<Metadata> {
  const citySlug = params.city
  const cityName = slugToCityName(citySlug)
  const majorCity = getMajorCity(cityName)
  const isMajorCity = majorCities.includes(cityName)
  
  // If it's a smaller city, mention the major city in description
  const description = isMajorCity
    ? `Find premium escort services in ${cityName}. Browse verified profiles, contact directly, and discover professional companions in ${cityName}.`
    : `Find premium escort services in ${cityName}. ${majorCity !== cityName ? `Showing escorts from nearby ${majorCity}` : 'Browse verified profiles and discover professional companions.'}`
  
  return {
    title: `Escort Services in ${cityName} - Find Companions in ${cityName}`,
    description,
    keywords: [
      `escort ${cityName}`,
      `escort services ${cityName}`,
      `escorts ${cityName}`,
      cityName.toLowerCase(),
      majorCity !== cityName ? `escort ${majorCity}` : '',
    ].filter(Boolean),
    openGraph: {
      title: `Escort Services in ${cityName}`,
      description,
      url: `https://escort.de/escort-${citySlug}`,
      type: 'website',
    },
    twitter: {
      card: 'summary',
      title: `Escort Services in ${cityName}`,
      description,
    },
    alternates: {
      canonical: `https://escort.de/escort-${citySlug}`,
    },
  }
}

export default function CityListingPage({ params }: { params: { city: string } }) {
  const citySlug = params.city
  const cityName = slugToCityName(citySlug)
  const majorCity = getMajorCity(cityName)
  
  // Generate structured data for the city page
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: `Escort Services in ${cityName}`,
    description: `Find premium escort services in ${cityName}`,
    url: `https://escort.de/escort-${citySlug}`,
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: [],
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />
      <CityListingClient citySlug={citySlug} cityName={cityName} majorCity={majorCity} />
    </>
  )
}

