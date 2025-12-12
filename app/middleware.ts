import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Protect admin routes
  if (request.nextUrl.pathname.startsWith('/adm2211')) {
    const token = request.cookies.get('admin_token')?.value
    
    // Allow access to login page
    if (request.nextUrl.pathname === '/adm2211') {
      return NextResponse.next()
    }
    
    // Check authentication for other admin routes
    if (!token || token.length !== 64) {
      return NextResponse.redirect(new URL('/adm2211', request.url))
    }
  }
  
  return NextResponse.next()
}

export const config = {
  matcher: '/adm2211/:path*',
}

