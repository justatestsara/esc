'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { useTheme } from '../../providers'

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

interface Ad {
  id: string
  name: string
  age: string | number
  gender: 'female' | 'male' | 'trans'
  city: string
  country: string
  phone: string
  email?: string
  whatsapp?: string
  telegram?: string
  instagram?: string
  twitter?: string
  hairColor?: string
  languages?: string[]
  description: string
  services?: Service[]
  rates?: Rate[]
  images?: string[] // Base64 encoded images
  status: 'pending' | 'approved' | 'inactive'
  submittedAt: string
}

interface ContactSubmission {
  id: string
  name: string
  subject: string
  description: string
  submittedAt: string
  status: 'pending' | 'reviewed'
}

// Sample models from the main page (these are pre-approved)
const SAMPLE_MODELS: Ad[] = [] // Empty - ready for real ads

export default function AdminDashboard() {
  const router = useRouter()
  const [ads, setAds] = useState<Ad[]>([])
  const [contactSubmissions, setContactSubmissions] = useState<ContactSubmission[]>([])
  const [loading, setLoading] = useState(true)
  const [editingAd, setEditingAd] = useState<Ad | null>(null)
  const [editFormData, setEditFormData] = useState<Partial<Ad>>({})
  const { theme, toggleTheme } = useTheme()

  useEffect(() => {
    // Check if logged in via API
    const checkAuth = async () => {
      try {
        const response = await fetch('/api/auth/verify')
        if (!response.ok) {
          router.push('/adm2211')
          return
        }
        const data = await response.json()
        if (!data.authenticated) {
          router.push('/adm2211')
          return
        }
        // Authenticated, load ads
        loadAds()
      } catch (error) {
        router.push('/adm2211')
      }
    }
    
    if (typeof window !== 'undefined') {
      checkAuth()
    }
  }, [router])

  const loadAds = () => {
    if (typeof window !== 'undefined') {
      const storedAds = localStorage.getItem('submitted_ads')
      const userSubmittedAds = storedAds ? JSON.parse(storedAds) : []
      
      // Combine sample models (pre-approved) with user-submitted ads
      const allAds = [...SAMPLE_MODELS, ...userSubmittedAds]
      setAds(allAds)
      
      // Load contact submissions
      const storedSubmissions = localStorage.getItem('contact_submissions')
      const submissions = storedSubmissions ? JSON.parse(storedSubmissions) : []
      setContactSubmissions(submissions)
      
      setLoading(false)
    }
  }

  const updateAdStatus = (adId: string, newStatus: 'pending' | 'approved' | 'inactive') => {
    // Check if it's a sample model (can't modify those, but we can show the action)
    const isSampleModel = SAMPLE_MODELS.some(model => model.id === adId)
    
    if (isSampleModel) {
      // For sample models, we'll just update the local state for display
      // but they remain approved in the main site
      const updatedAds = ads.map(ad => 
        ad.id === adId ? { ...ad, status: newStatus } : ad
      )
      setAds(updatedAds)
    } else {
      // For user-submitted ads, update both state and localStorage
      const updatedAds = ads.map(ad => 
        ad.id === adId ? { ...ad, status: newStatus } : ad
      )
      setAds(updatedAds)
      
      // Update only user-submitted ads in localStorage
      const userSubmittedAds = ads.filter(ad => !SAMPLE_MODELS.some(model => model.id === ad.id))
      const updatedUserAds = userSubmittedAds.map(ad => 
        ad.id === adId ? { ...ad, status: newStatus } : ad
      )
      localStorage.setItem('submitted_ads', JSON.stringify(updatedUserAds))
    }
  }

  const deleteAd = (adId: string) => {
    // Check if it's a sample model
    const isSampleModel = SAMPLE_MODELS.some(model => model.id === adId)
    
    if (isSampleModel) {
      alert('Sample models cannot be deleted. They are part of the demo content.')
      return
    }
    
    if (confirm('Are you sure you want to delete this ad?')) {
      const updatedAds = ads.filter(ad => ad.id !== adId)
      setAds(updatedAds)
      
      // Update only user-submitted ads in localStorage
      const updatedUserAds = updatedAds.filter(ad => !SAMPLE_MODELS.some(model => model.id === ad.id))
      localStorage.setItem('submitted_ads', JSON.stringify(updatedUserAds))
    }
  }

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' })
    } catch (error) {
      console.error('Logout error:', error)
    }
    router.push('/adm2211')
  }

  const stats = {
    live: ads.filter(ad => ad.status === 'approved').length,
    pending: ads.filter(ad => ad.status === 'pending').length,
    inactive: ads.filter(ad => ad.status === 'inactive').length,
  }

  const pendingAds = ads.filter(ad => ad.status === 'pending')
  const approvedAds = ads.filter(ad => ad.status === 'approved')
  const inactiveAds = ads.filter(ad => ad.status === 'inactive')
  const pendingContacts = contactSubmissions.filter(contact => contact.status === 'pending')
  const reviewedContacts = contactSubmissions.filter(contact => contact.status === 'reviewed')

  const markContactAsReviewed = (contactId: string) => {
    const updatedSubmissions = contactSubmissions.map(submission =>
      submission.id === contactId ? { ...submission, status: 'reviewed' as const } : submission
    )
    setContactSubmissions(updatedSubmissions)
    if (typeof window !== 'undefined') {
      localStorage.setItem('contact_submissions', JSON.stringify(updatedSubmissions))
    }
  }

  const deleteContact = (contactId: string) => {
    const updatedSubmissions = contactSubmissions.filter(submission => submission.id !== contactId)
    setContactSubmissions(updatedSubmissions)
    if (typeof window !== 'undefined') {
      localStorage.setItem('contact_submissions', JSON.stringify(updatedSubmissions))
    }
  }

  const startEdit = (ad: Ad) => {
    setEditingAd(ad)
    setEditFormData({ ...ad })
  }

  const cancelEdit = () => {
    setEditingAd(null)
    setEditFormData({})
  }

  const saveEdit = () => {
    if (!editingAd) return

    const isSampleModel = SAMPLE_MODELS.some(model => model.id === editingAd.id)
    
    if (isSampleModel) {
      alert('Sample models cannot be edited.')
      return
    }

    const updatedAds = ads.map(ad => 
      ad.id === editingAd.id ? { ...ad, ...editFormData } : ad
    )
    setAds(updatedAds)
    
    // Update localStorage
    const updatedUserAds = updatedAds.filter(ad => !SAMPLE_MODELS.some(model => model.id === ad.id))
    localStorage.setItem('submitted_ads', JSON.stringify(updatedUserAds))
    
    setEditingAd(null)
    setEditFormData({})
  }

  const handleEditChange = (field: keyof Ad, value: any) => {
    setEditFormData(prev => ({ ...prev, [field]: value }))
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] transition-colors flex items-center justify-center">
        <p className="text-[var(--text-secondary)]">Loading...</p>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] transition-colors">
      {/* Header */}
      <header className="border-b border-[var(--border-primary)] sticky top-0 bg-[var(--bg-primary)]/95 backdrop-blur-sm z-50 transition-colors">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center gap-2">
          <Link href="/" className="text-2xl font-header font-semibold tracking-wider text-[var(--header-color)]">
            ESCORT.DE
          </Link>
          <div className="flex items-center gap-2">
            <button
              onClick={handleLogout}
              className="px-4 py-2 border border-[var(--border-primary)] hover:border-[var(--accent-pink)] transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12 max-w-7xl">
        <h1 className="text-3xl font-semibold mb-8 text-[var(--text-primary)] transition-colors">Admin Dashboard</h1>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div className="bg-[var(--bg-secondary)] border border-[var(--border-primary)] p-6 transition-colors">
            <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-2 transition-colors">Live Ads</h3>
            <p className="text-3xl font-bold text-green-500">{stats.live}</p>
          </div>
          <div className="bg-[var(--bg-secondary)] border border-[var(--border-primary)] p-6 transition-colors">
            <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-2 transition-colors">Pending Approval</h3>
            <p className="text-3xl font-bold text-yellow-500">{stats.pending}</p>
          </div>
          <div className="bg-[var(--bg-secondary)] border border-[var(--border-primary)] p-6 transition-colors">
            <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-2 transition-colors">Inactive Ads</h3>
            <p className="text-3xl font-bold text-red-500">{stats.inactive}</p>
          </div>
          <div className="bg-[var(--bg-secondary)] border border-[var(--border-primary)] p-6 transition-colors">
            <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-2 transition-colors">Contact Messages</h3>
            <p className="text-3xl font-bold text-blue-500">{pendingContacts.length}</p>
          </div>
        </div>

        {/* Pending Ads Section */}
        {pendingAds.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-semibold mb-6 text-[var(--text-primary)] border-b border-[var(--border-primary)] pb-2 transition-colors">
              Pending Approval ({pendingAds.length})
            </h2>
            <div className="space-y-4">
              {pendingAds.map(ad => (
                <div key={ad.id} className="bg-[var(--bg-secondary)] border border-yellow-500/50 p-6 transition-colors">
                  <div className="flex gap-6 mb-4">
                    {/* Images */}
                    {ad.images && ad.images.length > 0 && (
                      <div className="flex-shrink-0">
                        <div className="grid grid-cols-2 gap-2 w-32">
                          {ad.images.slice(0, 4).map((img, idx) => (
                            <div key={idx} className="aspect-[3/4] overflow-hidden rounded bg-[var(--bg-tertiary)]">
                              <img 
                                src={img} 
                                alt={`${ad.name} ${idx + 1}`}
                                className="w-full h-full object-cover"
                              />
                            </div>
                          ))}
                        </div>
                        {ad.images.length > 4 && (
                          <p className="text-xs text-[var(--text-tertiary)] mt-2 text-center">
                            +{ad.images.length - 4} more
                          </p>
                        )}
                      </div>
                    )}
                    
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-xl font-semibold text-[var(--text-primary)] transition-colors">
                            {ad.name}, {typeof ad.age === 'number' ? ad.age : ad.age} - {ad.gender}
                            {SAMPLE_MODELS.some(model => model.id === ad.id) && (
                              <span className="ml-2 text-xs text-[var(--text-tertiary)]">(Sample Model)</span>
                            )}
                          </h3>
                          <p className="text-sm text-[var(--text-secondary)] transition-colors">
                            {ad.city}, {ad.country} • Submitted: {new Date(ad.submittedAt).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => startEdit(ad)}
                            className="px-4 py-2 bg-blue-500 text-white hover:bg-blue-600 transition-colors"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => updateAdStatus(ad.id, 'approved')}
                            className="px-4 py-2 bg-green-500 text-white hover:bg-green-600 transition-colors"
                          >
                            Approve
                          </button>
                          <button
                            onClick={() => updateAdStatus(ad.id, 'inactive')}
                            className="px-4 py-2 bg-red-500 text-white hover:bg-red-600 transition-colors"
                          >
                            Reject
                          </button>
                        </div>
                      </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-[var(--text-secondary)] transition-colors"><strong>Phone:</strong> {ad.phone}</p>
                      {ad.email && <p className="text-[var(--text-secondary)] transition-colors"><strong>Email:</strong> {ad.email}</p>}
                      {ad.whatsapp && <p className="text-[var(--text-secondary)] transition-colors"><strong>WhatsApp:</strong> {ad.whatsapp}</p>}
                    </div>
                    <div>
                      {ad.hairColor && <p className="text-[var(--text-secondary)] transition-colors"><strong>Hair Color:</strong> {ad.hairColor}</p>}
                      {ad.languages && ad.languages.length > 0 && (
                        <p className="text-[var(--text-secondary)] transition-colors"><strong>Languages:</strong> {ad.languages.join(', ')}</p>
                      )}
                    </div>
                  </div>
                  <div className="mt-4">
                    <p className="text-[var(--text-secondary)] transition-colors"><strong>Description:</strong></p>
                    <p className="text-[var(--text-primary)] mt-1 transition-colors">{ad.description}</p>
                  </div>
                  {ad.services && ad.services.length > 0 && (
                    <div className="mt-4">
                      <p className="text-[var(--text-secondary)] transition-colors"><strong>Services:</strong> {ad.services.length} service(s)</p>
                    </div>
                  )}
                  {ad.rates && ad.rates.length > 0 && (
                    <div className="mt-4">
                      <p className="text-[var(--text-secondary)] transition-colors"><strong>Rates:</strong> {ad.rates.length} rate(s)</p>
                    </div>
                  )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Approved Ads Section */}
        {approvedAds.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-semibold mb-6 text-[var(--text-primary)] border-b border-[var(--border-primary)] pb-2 transition-colors">
              Approved Ads ({approvedAds.length})
            </h2>
            <div className="space-y-4">
              {approvedAds.map(ad => (
                <div key={ad.id} className="bg-[var(--bg-secondary)] border border-green-500/50 p-6 transition-colors">
                  <div className="flex gap-6 mb-4">
                    {/* Images */}
                    {ad.images && ad.images.length > 0 && (
                      <div className="flex-shrink-0">
                        <div className="grid grid-cols-2 gap-2 w-32">
                          {ad.images.slice(0, 4).map((img, idx) => (
                            <div key={idx} className="aspect-[3/4] overflow-hidden rounded bg-[var(--bg-tertiary)]">
                              <img 
                                src={img} 
                                alt={`${ad.name} ${idx + 1}`}
                                className="w-full h-full object-cover"
                              />
                            </div>
                          ))}
                        </div>
                        {ad.images.length > 4 && (
                          <p className="text-xs text-[var(--text-tertiary)] mt-2 text-center">
                            +{ad.images.length - 4} more
                          </p>
                        )}
                      </div>
                    )}
                    
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-xl font-semibold text-[var(--text-primary)] transition-colors">
                            {ad.name}, {typeof ad.age === 'number' ? ad.age : ad.age} - {ad.gender}
                            {SAMPLE_MODELS.some(model => model.id === ad.id) && (
                              <span className="ml-2 text-xs text-[var(--text-tertiary)]">(Sample Model)</span>
                            )}
                          </h3>
                          <p className="text-sm text-[var(--text-secondary)] transition-colors">
                            {ad.city}, {ad.country} • Approved: {new Date(ad.submittedAt).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => startEdit(ad)}
                            className="px-4 py-2 bg-blue-500 text-white hover:bg-blue-600 transition-colors"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => updateAdStatus(ad.id, 'inactive')}
                            className="px-4 py-2 bg-yellow-500 text-white hover:bg-yellow-600 transition-colors"
                          >
                            Deactivate
                          </button>
                          <button
                            onClick={() => deleteAd(ad.id)}
                            className="px-4 py-2 bg-red-500 text-white hover:bg-red-600 transition-colors"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-[var(--text-secondary)] transition-colors"><strong>Phone:</strong> {ad.phone}</p>
                          {ad.email && <p className="text-[var(--text-secondary)] transition-colors"><strong>Email:</strong> {ad.email}</p>}
                        </div>
                        <div>
                          {ad.hairColor && <p className="text-[var(--text-secondary)] transition-colors"><strong>Hair Color:</strong> {ad.hairColor}</p>}
                          {ad.languages && ad.languages.length > 0 && (
                            <p className="text-[var(--text-secondary)] transition-colors"><strong>Languages:</strong> {ad.languages.join(', ')}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Inactive Ads Section */}
        {inactiveAds.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-semibold mb-6 text-[var(--text-primary)] border-b border-[var(--border-primary)] pb-2 transition-colors">
              Inactive Ads ({inactiveAds.length})
            </h2>
            <div className="space-y-4">
              {inactiveAds.map(ad => (
                <div key={ad.id} className="bg-[var(--bg-secondary)] border border-red-500/50 p-6 transition-colors">
                  <div className="flex gap-6 mb-4">
                    {/* Images */}
                    {ad.images && ad.images.length > 0 && (
                      <div className="flex-shrink-0">
                        <div className="grid grid-cols-2 gap-2 w-32">
                          {ad.images.slice(0, 4).map((img, idx) => (
                            <div key={idx} className="aspect-[3/4] overflow-hidden rounded bg-[var(--bg-tertiary)]">
                              <img 
                                src={img} 
                                alt={`${ad.name} ${idx + 1}`}
                                className="w-full h-full object-cover"
                              />
                            </div>
                          ))}
                        </div>
                        {ad.images.length > 4 && (
                          <p className="text-xs text-[var(--text-tertiary)] mt-2 text-center">
                            +{ad.images.length - 4} more
                          </p>
                        )}
                      </div>
                    )}
                    
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-xl font-semibold text-[var(--text-primary)] transition-colors">
                            {ad.name}, {typeof ad.age === 'number' ? ad.age : ad.age} - {ad.gender}
                            {SAMPLE_MODELS.some(model => model.id === ad.id) && (
                              <span className="ml-2 text-xs text-[var(--text-tertiary)]">(Sample Model)</span>
                            )}
                          </h3>
                          <p className="text-sm text-[var(--text-secondary)] transition-colors">
                            {ad.city}, {ad.country} • Inactive since: {new Date(ad.submittedAt).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => startEdit(ad)}
                            className="px-4 py-2 bg-blue-500 text-white hover:bg-blue-600 transition-colors"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => updateAdStatus(ad.id, 'approved')}
                            className="px-4 py-2 bg-green-500 text-white hover:bg-green-600 transition-colors"
                          >
                            Reactivate
                          </button>
                          <button
                            onClick={() => deleteAd(ad.id)}
                            className="px-4 py-2 bg-red-500 text-white hover:bg-red-600 transition-colors"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Contact Submissions Section */}
        {pendingContacts.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-semibold mb-6 text-[var(--text-primary)] border-b border-[var(--border-primary)] pb-2 transition-colors">
              Pending Contact Messages ({pendingContacts.length})
            </h2>
            <div className="space-y-4">
              {pendingContacts.map(contact => (
                <div key={contact.id} className="bg-[var(--bg-secondary)] border border-blue-500/50 p-6 transition-colors">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-semibold text-[var(--text-primary)] transition-colors">
                        {contact.subject}
                      </h3>
                      <p className="text-sm text-[var(--text-secondary)] transition-colors">
                        From: {contact.name} • Submitted: {new Date(contact.submittedAt).toLocaleDateString()} {new Date(contact.submittedAt).toLocaleTimeString()}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => markContactAsReviewed(contact.id)}
                        className="px-4 py-2 bg-green-500 text-white hover:bg-green-600 transition-colors"
                      >
                        Mark as Reviewed
                      </button>
                      <button
                        onClick={() => deleteContact(contact.id)}
                        className="px-4 py-2 bg-red-500 text-white hover:bg-red-600 transition-colors"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                  <div className="mt-4">
                    <p className="text-[var(--text-secondary)] transition-colors"><strong>Message:</strong></p>
                    <p className="text-[var(--text-primary)] mt-2 whitespace-pre-wrap transition-colors">{contact.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Reviewed Contact Submissions Section */}
        {reviewedContacts.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-semibold mb-6 text-[var(--text-primary)] border-b border-[var(--border-primary)] pb-2 transition-colors">
              Reviewed Contact Messages ({reviewedContacts.length})
            </h2>
            <div className="space-y-4">
              {reviewedContacts.map(contact => (
                <div key={contact.id} className="bg-[var(--bg-secondary)] border border-[var(--border-primary)] opacity-60 p-6 transition-colors">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-semibold text-[var(--text-primary)] transition-colors">
                        {contact.subject}
                      </h3>
                      <p className="text-sm text-[var(--text-secondary)] transition-colors">
                        From: {contact.name} • Reviewed: {new Date(contact.submittedAt).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => deleteContact(contact.id)}
                        className="px-4 py-2 bg-red-500 text-white hover:bg-red-600 transition-colors"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                  <div className="mt-4">
                    <p className="text-[var(--text-secondary)] transition-colors"><strong>Message:</strong></p>
                    <p className="text-[var(--text-primary)] mt-2 whitespace-pre-wrap transition-colors">{contact.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {ads.length === 0 && contactSubmissions.length === 0 && (
          <div className="text-center py-20">
            <p className="text-[var(--text-secondary)] text-lg">No submissions yet.</p>
          </div>
        )}
      </div>

      {/* Edit Modal */}
      {editingAd && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-[var(--bg-primary)] border border-[var(--border-primary)] rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold text-[var(--text-primary)] transition-colors">
                  Edit Ad: {editingAd.name}
                </h2>
                <button
                  onClick={cancelEdit}
                  className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-6">
                {/* Basic Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-[var(--text-secondary)] mb-2">Name *</label>
                    <input
                      type="text"
                      value={editFormData.name || ''}
                      onChange={(e) => handleEditChange('name', e.target.value)}
                      className="w-full px-4 py-2 bg-[var(--bg-secondary)] border border-[var(--border-primary)] text-[var(--text-primary)] transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-[var(--text-secondary)] mb-2">Age *</label>
                    <input
                      type="text"
                      value={editFormData.age || ''}
                      onChange={(e) => handleEditChange('age', e.target.value)}
                      className="w-full px-4 py-2 bg-[var(--bg-secondary)] border border-[var(--border-primary)] text-[var(--text-primary)] transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-[var(--text-secondary)] mb-2">Gender *</label>
                    <select
                      value={editFormData.gender || 'female'}
                      onChange={(e) => handleEditChange('gender', e.target.value)}
                      className="w-full px-4 py-2 bg-[var(--bg-secondary)] border border-[var(--border-primary)] text-[var(--text-primary)] transition-colors"
                    >
                      <option value="female">Female</option>
                      <option value="male">Male</option>
                      <option value="trans">Trans</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm text-[var(--text-secondary)] mb-2">City *</label>
                    <input
                      type="text"
                      value={editFormData.city || ''}
                      onChange={(e) => handleEditChange('city', e.target.value)}
                      className="w-full px-4 py-2 bg-[var(--bg-secondary)] border border-[var(--border-primary)] text-[var(--text-primary)] transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-[var(--text-secondary)] mb-2">Country *</label>
                    <input
                      type="text"
                      value={editFormData.country || ''}
                      onChange={(e) => handleEditChange('country', e.target.value)}
                      className="w-full px-4 py-2 bg-[var(--bg-secondary)] border border-[var(--border-primary)] text-[var(--text-primary)] transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-[var(--text-secondary)] mb-2">Phone *</label>
                    <input
                      type="text"
                      value={editFormData.phone || ''}
                      onChange={(e) => handleEditChange('phone', e.target.value)}
                      className="w-full px-4 py-2 bg-[var(--bg-secondary)] border border-[var(--border-primary)] text-[var(--text-primary)] transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-[var(--text-secondary)] mb-2">Email</label>
                    <input
                      type="email"
                      value={editFormData.email || ''}
                      onChange={(e) => handleEditChange('email', e.target.value)}
                      className="w-full px-4 py-2 bg-[var(--bg-secondary)] border border-[var(--border-primary)] text-[var(--text-primary)] transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-[var(--text-secondary)] mb-2">WhatsApp</label>
                    <input
                      type="text"
                      value={editFormData.whatsapp || ''}
                      onChange={(e) => handleEditChange('whatsapp', e.target.value)}
                      className="w-full px-4 py-2 bg-[var(--bg-secondary)] border border-[var(--border-primary)] text-[var(--text-primary)] transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-[var(--text-secondary)] mb-2">Telegram</label>
                    <input
                      type="text"
                      value={editFormData.telegram || ''}
                      onChange={(e) => handleEditChange('telegram', e.target.value)}
                      className="w-full px-4 py-2 bg-[var(--bg-secondary)] border border-[var(--border-primary)] text-[var(--text-primary)] transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-[var(--text-secondary)] mb-2">Instagram</label>
                    <input
                      type="text"
                      value={editFormData.instagram || ''}
                      onChange={(e) => handleEditChange('instagram', e.target.value)}
                      className="w-full px-4 py-2 bg-[var(--bg-secondary)] border border-[var(--border-primary)] text-[var(--text-primary)] transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-[var(--text-secondary)] mb-2">Twitter</label>
                    <input
                      type="text"
                      value={editFormData.twitter || ''}
                      onChange={(e) => handleEditChange('twitter', e.target.value)}
                      className="w-full px-4 py-2 bg-[var(--bg-secondary)] border border-[var(--border-primary)] text-[var(--text-primary)] transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-[var(--text-secondary)] mb-2">Hair Color</label>
                    <input
                      type="text"
                      value={editFormData.hairColor || ''}
                      onChange={(e) => handleEditChange('hairColor', e.target.value)}
                      className="w-full px-4 py-2 bg-[var(--bg-secondary)] border border-[var(--border-primary)] text-[var(--text-primary)] transition-colors"
                    />
                  </div>
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm text-[var(--text-secondary)] mb-2">Description *</label>
                  <textarea
                    value={editFormData.description || ''}
                    onChange={(e) => handleEditChange('description', e.target.value)}
                    rows={6}
                    className="w-full px-4 py-2 bg-[var(--bg-secondary)] border border-[var(--border-primary)] text-[var(--text-primary)] transition-colors resize-none"
                  />
                </div>

                {/* Languages */}
                <div>
                  <label className="block text-sm text-[var(--text-secondary)] mb-2">Languages (comma-separated)</label>
                  <input
                    type="text"
                    value={Array.isArray(editFormData.languages) ? editFormData.languages.join(', ') : ''}
                    onChange={(e) => handleEditChange('languages', e.target.value.split(',').map(l => l.trim()).filter(l => l))}
                    className="w-full px-4 py-2 bg-[var(--bg-secondary)] border border-[var(--border-primary)] text-[var(--text-primary)] transition-colors"
                    placeholder="German, English, French"
                  />
                </div>

                {/* Images Preview */}
                {editFormData.images && editFormData.images.length > 0 && (
                  <div>
                    <label className="block text-sm text-[var(--text-secondary)] mb-2">Images ({editFormData.images.length})</label>
                    <div className="grid grid-cols-4 gap-2">
                      {editFormData.images.map((img, idx) => (
                        <div key={idx} className="aspect-[3/4] overflow-hidden rounded bg-[var(--bg-tertiary)] relative group">
                          <img src={img} alt={`Image ${idx + 1}`} className="w-full h-full object-cover" />
                          <button
                            onClick={() => {
                              const newImages = [...(editFormData.images || [])]
                              newImages.splice(idx, 1)
                              handleEditChange('images', newImages)
                            }}
                            className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            ×
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Services */}
                {editFormData.services && editFormData.services.length > 0 && (
                  <div>
                    <label className="block text-sm text-[var(--text-secondary)] mb-2">Services ({editFormData.services.length})</label>
                    <div className="space-y-2">
                      {editFormData.services.map((service, idx) => (
                        <div key={idx} className="flex items-center gap-2 p-2 bg-[var(--bg-secondary)] rounded">
                          <span className="flex-1 text-[var(--text-primary)]">{service.name}</span>
                          <span className="text-xs text-[var(--text-secondary)]">
                            {service.included ? 'Included' : `Extra: €${service.extraPrice || 0}`}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Rates */}
                {editFormData.rates && editFormData.rates.length > 0 && (
                  <div>
                    <label className="block text-sm text-[var(--text-secondary)] mb-2">Rates ({editFormData.rates.length})</label>
                    <div className="space-y-2">
                      {editFormData.rates.map((rate, idx) => (
                        <div key={idx} className="flex items-center gap-2 p-2 bg-[var(--bg-secondary)] rounded text-sm text-[var(--text-primary)]">
                          <span className="flex-1">{rate.time}</span>
                          <span>Incall: €{rate.incall}</span>
                          <span>Outcall: €{rate.outcall}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex gap-4 pt-4 border-t border-[var(--border-primary)]">
                  <button
                    onClick={saveEdit}
                    className="px-6 py-2 bg-green-500 text-white hover:bg-green-600 transition-colors"
                  >
                    Save Changes
                  </button>
                  <button
                    onClick={cancelEdit}
                    className="px-6 py-2 bg-gray-500 text-white hover:bg-gray-600 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  )
}

