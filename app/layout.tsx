import type { Metadata } from 'next'
import Script from 'next/script'
import { Montserrat, Open_Sans } from 'next/font/google'
import { ThemeProvider, LanguageProvider } from './providers'
import './globals.css'

// Geometric sans-serif for headings
const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-header',
})

// Humanist/neo-grotesque sans-serif for body text
const openSans = Open_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-body',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://escort.de'),
  title: {
    default: 'Escort.de - Premium Escort Services',
    template: '%s | Escort.de',
  },
  description: 'Find premium escort services in Germany, Austria, Switzerland and across Europe. Browse verified profiles, contact directly, and discover professional companions near you.',
  keywords: ['escort', 'escort services', 'Germany', 'Austria', 'Switzerland', 'companion', 'escort.de'],
  authors: [{ name: 'Escort.de' }],
  creator: 'Escort.de',
  publisher: 'Escort.de',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'de_DE',
    url: 'https://escort.de',
    siteName: 'Escort.de',
    title: 'Escort.de - Premium Escort Services',
    description: 'Find premium escort services in Germany, Austria, Switzerland and across Europe.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Escort.de',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Escort.de - Premium Escort Services',
    description: 'Find premium escort services in Germany, Austria, Switzerland and across Europe.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://escort.de',
    languages: {
      'de-DE': 'https://escort.de',
      'en-US': 'https://escort.de',
    },
  },
  verification: {
    // Add your verification codes here when available
    // google: 'your-google-verification-code',
    // yandex: 'your-yandex-verification-code',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="de" className={`${montserrat.variable} ${openSans.variable}`}>
      <head>
        <Script
          defer
          src="https://cloud.umami.is/script.js"
          data-website-id="7ce2a2a1-1c8f-4391-8993-14b027d37878"
          strategy="afterInteractive"
        />
      </head>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              name: 'Escort.de',
              url: 'https://escort.de',
              description: 'Find premium escort services in Germany, Austria, Switzerland and across Europe.',
              inLanguage: ['de-DE', 'en-US'],
              potentialAction: {
                '@type': 'SearchAction',
                target: {
                  '@type': 'EntryPoint',
                  urlTemplate: 'https://escort.de/?country={search_term_string}',
                },
                'query-input': 'required name=search_term_string',
              },
            }),
          }}
        />
        <ThemeProvider>
          <LanguageProvider>{children}</LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}

