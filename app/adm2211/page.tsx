'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useTheme } from '../providers'

export default function AdminLogin() {
  const router = useRouter()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const { theme, toggleTheme } = useTheme()

  const [loading, setLoading] = useState(false)

  useEffect(() => {
    // Check if already logged in via API
    const checkAuth = async () => {
      try {
        const response = await fetch('/api/auth/verify')
        if (response.ok) {
          const data = await response.json()
          if (data.authenticated) {
            router.push('/adm2211/dashboard')
          }
        }
      } catch (error) {
        // Not authenticated, stay on login page
      }
    }
    
    if (typeof window !== 'undefined') {
      checkAuth()
    }
  }, [router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      })
      
      const data = await response.json()
      
      if (response.ok && data.success) {
        // Login successful, redirect to dashboard
        router.push('/adm2211/dashboard')
      } else {
        // Login failed
        setError(data.error || 'Invalid username or password')
        if (data.remaining !== undefined) {
          setError(`${data.error} (${data.remaining} attempts remaining)`)
        }
      }
    } catch (error) {
      setError('Login failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] transition-colors flex items-center justify-center">
      <div className="w-full max-w-md px-4">
        <div className="mb-8 text-center">
          <Link href="/" className="text-3xl font-header font-semibold tracking-wider text-[var(--header-color)] block mb-2">
            ESCORT.DE
          </Link>
          <h1 className="text-2xl font-semibold text-[var(--text-primary)] mt-4">Admin Login</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 bg-[var(--bg-secondary)] p-8 border border-[var(--border-primary)] transition-colors">
          {error && (
            <div className="bg-red-500/10 border border-red-500 text-red-500 p-3 text-sm">
              {error}
            </div>
          )}

          <div>
            <label htmlFor="username" className="block text-sm text-[var(--text-secondary)] mb-2 transition-colors">
              Username
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2 bg-[var(--bg-primary)] border border-[var(--border-primary)] focus:outline-none focus:border-[var(--accent-pink)] text-[var(--text-primary)] transition-colors"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm text-[var(--text-secondary)] mb-2 transition-colors">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 bg-[var(--bg-primary)] border border-[var(--border-primary)] focus:outline-none focus:border-[var(--accent-pink)] text-[var(--text-primary)] transition-colors"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full px-6 py-3 bg-[var(--accent-pink)] text-white hover:opacity-90 transition-opacity font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <div className="mt-4 text-center">
          <Link href="/" className="text-sm text-[var(--text-tertiary)] hover:text-[var(--text-primary)] transition-colors">
            Back to Home
          </Link>
        </div>
      </div>
    </main>
  )
}

