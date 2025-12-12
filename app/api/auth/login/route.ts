import { NextRequest, NextResponse } from 'next/server'
import { generateToken, verifyPassword, checkRateLimit, resetRateLimit } from '../../../lib/security/auth'

// Get admin credentials from environment variables
const ADMIN_USERNAME = process.env.ADMIN_USERNAME || 'admin'
const ADMIN_PASSWORD_HASH = process.env.ADMIN_PASSWORD_HASH || ''

// If no hash is set, we'll use a default (CHANGE THIS IN PRODUCTION)
// In production, generate hash using: await hashPassword('your-secure-password')
const DEFAULT_PASSWORD = process.env.ADMIN_PASSWORD || 'Escort123#888'

export async function POST(request: NextRequest) {
  try {
    // Get client IP for rate limiting
    const ip = request.headers.get('x-forwarded-for') || 
               request.headers.get('x-real-ip') || 
               'unknown'
    
    // Check rate limit
    const rateLimit = checkRateLimit(ip)
    if (!rateLimit.allowed) {
      return NextResponse.json(
        { error: 'Too many login attempts. Please try again in 15 minutes.' },
        { status: 429 }
      )
    }
    
    const body = await request.json()
    const { username, password } = body
    
    if (!username || !password) {
      return NextResponse.json(
        { error: 'Username and password are required' },
        { status: 400 }
      )
    }
    
    // Verify credentials
    let isValid = false
    
    if (ADMIN_PASSWORD_HASH) {
      // Use hashed password if available
      isValid = username === ADMIN_USERNAME && 
                await verifyPassword(password, ADMIN_PASSWORD_HASH)
    } else {
      // Fallback to plain password comparison (NOT SECURE - use env vars in production)
      isValid = username === ADMIN_USERNAME && password === DEFAULT_PASSWORD
    }
    
    if (!isValid) {
      return NextResponse.json(
        { error: 'Invalid username or password', remaining: rateLimit.remaining },
        { status: 401 }
      )
    }
    
    // Reset rate limit on successful login
    resetRateLimit(ip)
    
    // Generate secure token
    const token = generateToken()
    const expiresAt = Date.now() + (24 * 60 * 60 * 1000) // 24 hours
    
    // Create response with secure cookie
    const response = NextResponse.json({ 
      success: true,
      token,
      expiresAt 
    })
    
    // Set secure HTTP-only cookie
    response.cookies.set('admin_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // HTTPS only in production
      sameSite: 'strict',
      maxAge: 24 * 60 * 60, // 24 hours
      path: '/',
    })
    
    return response
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

