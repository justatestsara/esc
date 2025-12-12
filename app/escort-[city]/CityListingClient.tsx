'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useTheme, useLanguage } from '../providers'
import Footer from '../components/Footer'
import LanguageSwitcher from '../components/LanguageSwitcher'
import { generateAdUrl, cityToSlug } from '../lib/utils'

interface Service {
  name: string
  included: boolean
  extraPrice?: number
}

interface Rate {
  time: string
  incall: number
  outcall: number
}

interface Model {
  id: string
  name: string
  age: number
  gender: 'female' | 'male' | 'trans'
  city: string
  country: string
  lat: number
  lng: number
  distance?: number
  image: string
  images?: string[]
  description?: string
  phone?: string
  email?: string
  whatsapp?: string
  telegram?: string
  instagram?: string
  twitter?: string
  hairColor?: string
  languages?: string[]
  services?: Service[]
  rates?: Rate[]
}

interface Location {
  lat: number
  lng: number
  city?: string
  country?: string
}

const SAMPLE_MODELS: Model[] = []

// Calculate distance between two coordinates using Haversine formula
function calculateDistance(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 6371 // Earth's radius in km
  const dLat = (lat2 - lat1) * Math.PI / 180
  const dLng = (lng2 - lng1) * Math.PI / 180
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLng / 2) * Math.sin(dLng / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  return R * c
}

interface CityListingClientProps {
  citySlug: string
  cityName: string
  majorCity: string
}

export default function CityListingClient({ citySlug, cityName, majorCity }: CityListingClientProps) {
  const router = useRouter()
  const [userLocation, setUserLocation] = useState<Location | null>(null)
  const [models, setModels] = useState<Model[]>([])
  const [filteredModels, setFilteredModels] = useState<Model[]>([])
  const [loading, setLoading] = useState(true)
  const [imageIndices, setImageIndices] = useState<Record<string, number>>({})
  const [showingFallback, setShowingFallback] = useState(false)

  const { theme, toggleTheme } = useTheme()
  const { t } = useLanguage()

  // Get user location
  useEffect(() => {
    setUserLocation({ lat: 52.52, lng: 13.405 })
    setLoading(false)
  }, [])

  // Load ads and filter by city
  useEffect(() => {
    if (userLocation) {
      let approvedAds: Model[] = []
      if (typeof window !== 'undefined') {
        const storedAds = localStorage.getItem('submitted_ads')
        if (storedAds) {
          const allAds = JSON.parse(storedAds)
          approvedAds = allAds
            .filter((ad: any) => ad.status === 'approved')
            .map((ad: any) => ({
              id: ad.id,
              name: ad.name,
              age: parseInt(ad.age),
              gender: ad.gender,
              city: ad.city,
              country: ad.country,
              lat: 52.52,
              lng: 13.405,
              image: ad.images && ad.images.length > 0 ? ad.images[0] : 'https://i.ibb.co/GQPtQvJB/image.jpg',
              images: ad.images && ad.images.length > 0 ? ad.images : ['https://i.ibb.co/GQPtQvJB/image.jpg'],
              description: ad.description,
              phone: ad.phone,
              email: ad.email,
              whatsapp: ad.whatsapp,
              telegram: ad.telegram,
              instagram: ad.instagram,
              twitter: ad.twitter,
              hairColor: ad.hairColor,
              languages: ad.languages,
              services: ad.services,
              rates: ad.rates,
            }))
        }
      }
      
      const allModels = [...SAMPLE_MODELS, ...approvedAds]
      
      // First, try to find ads for the exact city
      let cityAds = allModels.filter(m => 
        m.city.toLowerCase() === cityName.toLowerCase()
      )
      
      // If no ads found for the city, use fallback to major city
      if (cityAds.length === 0 && majorCity !== cityName) {
        cityAds = allModels.filter(m => 
          m.city.toLowerCase() === majorCity.toLowerCase()
        )
        setShowingFallback(true)
      } else {
        setShowingFallback(false)
      }
      
      // Calculate distances and sort
      const modelsWithDistance = cityAds.map(model => ({
        ...model,
        distance: calculateDistance(
          userLocation.lat,
          userLocation.lng,
          model.lat,
          model.lng
        ),
      })).sort((a, b) => (a.distance || 0) - (b.distance || 0))
      
      setModels(modelsWithDistance)
      setFilteredModels(modelsWithDistance)
    }
  }, [userLocation, cityName, majorCity])

  return (
    <main className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] transition-colors">
      {/* Header */}
      <header className="border-b border-[var(--border-primary)] sticky top-0 bg-[var(--bg-primary)]/95 backdrop-blur-sm z-50 transition-colors">
        <div className="container mx-auto px-2 sm:px-4 py-2 sm:py-4 flex justify-between items-center gap-2">
          <Link href="/" className="text-xl sm:text-2xl font-header font-semibold tracking-wider text-[var(--header-color)]">
            ESCORT.DE
          </Link>
          <div className="flex items-center gap-2">
            <LanguageSwitcher />
            <button
              onClick={toggleTheme}
              className="px-3 py-1.5 sm:py-2 border border-[var(--border-primary)] hover:border-[var(--border-secondary)] transition-colors font-medium text-sm sm:text-base flex items-center gap-2"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? (
                <>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                  <span className="hidden sm:inline">{t('header.light')}</span>
                </>
              ) : (
                <>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                  </svg>
                  <span className="hidden sm:inline">{t('header.dark')}</span>
                </>
              )}
            </button>
            <Link
              href="/post-ad"
              className="px-3 sm:px-6 py-1.5 sm:py-2 bg-[var(--accent-pink)] text-white hover:opacity-90 transition-opacity font-medium text-sm sm:text-base"
            >
              {t('header.postAd')}
            </Link>
          </div>
        </div>
      </header>

      {/* City Header */}
      <div className="container mx-auto px-2 sm:px-4 py-6 sm:py-8">
        <h1 className="text-3xl sm:text-4xl font-header font-semibold mb-2 text-[var(--text-primary)] transition-colors">
          Escort Services in {cityName}
        </h1>
        {showingFallback && majorCity !== cityName && (
          <p className="text-[var(--text-secondary)] text-sm sm:text-base mb-4 transition-colors">
            No escorts found in {cityName}. Showing escorts from nearby {majorCity}.
          </p>
        )}
        {filteredModels.length > 0 && (
          <p className="text-[var(--text-tertiary)] text-sm transition-colors">
            {filteredModels.length} {filteredModels.length === 1 ? 'escort' : 'escorts'} available
          </p>
        )}
      </div>

      {/* Content */}
      <section className="container mx-auto px-2 sm:px-4 py-4 sm:py-8">
        {loading ? (
          <div className="text-center py-20">
            <p className="text-gray-400">{t('common.loading')}</p>
          </div>
        ) : filteredModels.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-[var(--text-secondary)] transition-colors mb-4">
              No escorts found in {cityName}.
            </p>
            {majorCity !== cityName && (
              <Link
                href={`/escort-${cityToSlug(majorCity)}`}
                className="text-[var(--accent-pink)] hover:opacity-80 transition-opacity underline"
              >
                View escorts in {majorCity}
              </Link>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-5 gap-2 sm:gap-4">
            {filteredModels.map((model) => {
              const currentImageIndex = imageIndices[model.id] || 0
              const images = model.images || [model.image]
              const currentImage = images[currentImageIndex] || model.image
              const hasMultipleImages = images.length > 1

              const handlePrevious = (e: React.MouseEvent) => {
                e.stopPropagation()
                const newIndex = currentImageIndex === 0 ? images.length - 1 : currentImageIndex - 1
                setImageIndices({ ...imageIndices, [model.id]: newIndex })
              }

              const handleNext = (e: React.MouseEvent) => {
                e.stopPropagation()
                const newIndex = currentImageIndex === images.length - 1 ? 0 : currentImageIndex + 1
                setImageIndices({ ...imageIndices, [model.id]: newIndex })
              }

              return (
                <article
                  key={model.id}
                  onClick={() => router.push(generateAdUrl(model.city, model.id))}
                  className={`${theme === 'dark' ? '' : 'border-2 border-[var(--profile-border)] hover:border-[var(--accent-pink)]'} transition-colors bg-[var(--bg-secondary)] overflow-hidden group cursor-pointer rounded-lg`}
                >
                  <div className="aspect-[3/4] overflow-hidden bg-[var(--bg-tertiary)] relative">
                    <Image
                      src={currentImage}
                      alt={`${model.name}, ${model.age}, ${model.city}, ${model.country}`}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300 select-none"
                      sizes="(max-width: 768px) 50vw, (max-width: 1200px) 50vw, 25vw"
                      unoptimized
                      draggable={false}
                      priority={false}
                    />
                    {hasMultipleImages && (
                      <>
                        <button
                          onClick={handlePrevious}
                          className="absolute left-1 sm:left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-1 sm:p-2 rounded-full transition-colors z-10"
                          aria-label="Previous image"
                        >
                          <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                          </svg>
                        </button>
                        <button
                          onClick={handleNext}
                          className="absolute right-1 sm:right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-1 sm:p-2 rounded-full transition-colors z-10"
                          aria-label="Next image"
                        >
                          <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </button>
                        <div className="absolute bottom-1 sm:bottom-2 left-1/2 -translate-x-1/2 flex gap-0.5 sm:gap-1 z-10">
                          {images.map((_, idx) => (
                            <div
                              key={idx}
                              className={`h-0.5 sm:h-1 rounded-full transition-all ${
                                idx === currentImageIndex ? 'bg-pink-400 w-3 sm:w-4' : 'bg-white/50 w-0.5 sm:w-1'
                              }`}
                            />
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                  <div className="p-2 sm:p-4 font-body">
                    <h3 className="text-sm sm:text-lg font-semibold mb-0.5 sm:mb-1 tracking-tight">
                      {model.name} <span className="text-gray-400 text-xs sm:text-base font-normal">{model.age}</span>
                    </h3>
                    <p className="text-gray-400 text-xs sm:text-sm mb-0.5 sm:mb-1 font-light">{model.city}, {model.country}</p>
                    {model.distance !== undefined && (
                      <p className="text-gray-500 text-[10px] sm:text-xs mt-1 sm:mt-2 font-light">
                        {model.distance.toFixed(1)} {t('home.kmAway')}
                      </p>
                    )}
                  </div>
                </article>
              )
            })}
          </div>
        )}
      </section>

      <Footer />
    </main>
  )
}

