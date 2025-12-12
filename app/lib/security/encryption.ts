/**
 * Simple encryption utilities for sensitive data
 * In production, use proper encryption libraries like crypto-js
 */

// Simple XOR encryption (NOT SECURE for production - use AES-256)
// This is just to obfuscate data in localStorage
export function encryptData(data: string, key: string): string {
  const keyBytes = new TextEncoder().encode(key)
  const dataBytes = new TextEncoder().encode(data)
  const encrypted = new Uint8Array(dataBytes.length)
  
  for (let i = 0; i < dataBytes.length; i++) {
    encrypted[i] = dataBytes[i] ^ keyBytes[i % keyBytes.length]
  }
  
  // Convert to base64 for storage
  return btoa(String.fromCharCode(...encrypted))
}

export function decryptData(encryptedData: string, key: string): string {
  try {
    // Decode from base64
    const encrypted = Uint8Array.from(
      atob(encryptedData),
      c => c.charCodeAt(0)
    )
    const keyBytes = new TextEncoder().encode(key)
    const decrypted = new Uint8Array(encrypted.length)
    
    for (let i = 0; i < encrypted.length; i++) {
      decrypted[i] = encrypted[i] ^ keyBytes[i % keyBytes.length]
    }
    
    return new TextDecoder().decode(decrypted)
  } catch (error) {
    console.error('Decryption error:', error)
    return ''
  }
}

// Generate encryption key from admin token
export function getEncryptionKey(): string {
  if (typeof window === 'undefined') return 'server-key-change-in-production'
  
  // Use a combination of admin token and a secret
  const adminToken = sessionStorage.getItem('admin_token') || ''
  return adminToken + 'escort-de-secret-key-change-this'
}

