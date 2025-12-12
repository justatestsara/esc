import { redirect } from 'next/navigation'
import AdDetailClient from './AdDetailClient'

// This page redirects old /ad/[id] URLs to the new city-based format
// The client component will handle the redirect after fetching the ad data
export default async function AdDetailPage({ params }: { params: { id: string } }) {
  // The client component will fetch the ad and redirect to the proper URL
  // This maintains backward compatibility while using the new SEO-friendly URLs
  return <AdDetailClient adId={params.id} citySlug={undefined} isOldRoute={true} />
}
