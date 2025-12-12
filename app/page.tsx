import type { Metadata } from 'next'
import { Suspense } from 'react'
import HomeClient from './components/HomeClient'

export const metadata: Metadata = {
  title: 'Find Premium Escort Services in Germany, Austria & Switzerland',
  description: 'Find premium escort services in Germany, Austria, Switzerland and across Europe. Browse verified profiles by location, filter by gender, country, and city.',
  openGraph: {
    title: 'Find Premium Escort Services in Germany, Austria & Switzerland',
    description: 'Find premium escort services in Germany, Austria, Switzerland and across Europe.',
    url: 'https://escort.de',
  },
  alternates: {
    canonical: 'https://escort.de',
  },
}

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'CollectionPage',
            name: 'Escort.de - Premium Escort Services',
            description: 'Find premium escort services in Germany, Austria, Switzerland and across Europe.',
            url: 'https://escort.de',
            mainEntity: {
              '@type': 'ItemList',
              itemListElement: [],
            },
          }),
        }}
      />
      <Suspense fallback={
        <main className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] transition-colors flex items-center justify-center">
          <p className="text-[var(--text-secondary)]">Loading...</p>
        </main>
      }>
        <HomeClient />
      </Suspense>
    </>
  )
}
