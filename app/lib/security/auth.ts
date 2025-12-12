/**
 * Secure authentication utilities
 * Uses environment variables for credentials
 */

// Simple token generation (in production, use proper JWT library)
export function generateToken(): string {
  if (typeof window === 'undefined') {
    // Server-side: use Node.js crypto
    const crypto = require('crypto')
    return crypto.randomBytes(32).toString('hex')
  }
  
  // Browser fallback (shouldn't be used for tokens)
  const randomBytes = new Uint8Array(32)
  if (typeof crypto !== 'undefined' && crypto.getRandomValues) {
    crypto.getRandomValues(randomBytes)
  } else {
    // Fallback
    for (let i = 0; i < randomBytes.length; i++) {
      randomBytes[i] = Math.floor(Math.random() * 256)
    }
  }
  return Array.from(randomBytes)
    .map(b => b.toString(16).padStart(2, '0'))
    .join('')
}

// Simple password hashing (in production, use bcrypt)
// This is a basic implementation - for production, use bcryptjs or similar
export async function hashPassword(password: string): Promise<string> {
  // In production, use: import bcrypt from 'bcryptjs'
  // return await bcrypt.hash(password, 10)
  
  // Simple hash for now (NOT SECURE - replace with bcrypt in production)
  // Using Node.js crypto for server-side
  if (typeof window === 'undefined') {
    const crypto = require('crypto')
    const salt = process.env.ADMIN_SALT || 'default-salt-change-this'
    return crypto.createHash('sha256').update(password + salt).digest('hex')
  }
  
  // Browser fallback (shouldn't be used for password hashing)
  const encoder = new TextEncoder()
  const data = encoder.encode(password + (process.env.ADMIN_SALT || 'default-salt-change-this'))
  const hashBuffer = await crypto.subtle.digest('SHA-256', data)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('')
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  try {
    const passwordHash = await hashPassword(password)
    return passwordHash === hash
  } catch (error) {
    console.error('Password verification error:', error)
    return false
  }
}

// Rate limiting storage (in-memory, reset on server restart)
const loginAttempts = new Map<string, { count: number; resetTime: number }>()

export function checkRateLimit(ip: string): { allowed: boolean; remaining: number } {
  const now = Date.now()
  const attempt = loginAttempts.get(ip)
  
  if (!attempt || now > attempt.resetTime) {
    // Reset or create new
    loginAttempts.set(ip, { count: 1, resetTime: now + 15 * 60 * 1000 }) // 15 minutes
    return { allowed: true, remaining: 4 }
  }
  
  if (attempt.count >= 5) {
    return { allowed: false, remaining: 0 }
  }
  
  attempt.count++
  loginAttempts.set(ip, attempt)
  return { allowed: true, remaining: 5 - attempt.count }
}

export function resetRateLimit(ip: string): void {
  loginAttempts.delete(ip)
}

