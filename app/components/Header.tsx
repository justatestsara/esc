'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useLanguage } from '../i18n/provider'

export function Header({ showBackButton = false }: { showBackButton?: boolean }) {
  const { t, language, setLanguage } = useLanguage()
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false)

  return (
    <header className="border-b border-gray-800 sticky top-0 bg-black/95 backdrop-blur-sm z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center gap-4">
        <Link href="/" className="text-2xl font-light tracking-wider">
          {t.header.title}
        </Link>
        <div className="flex items-center gap-4">
          <div className="relative">
            <button
              onClick={() => setShowLanguageDropdown(!showLanguageDropdown)}
              className="px-4 py-2 border border-gray-700 hover:border-white transition-colors flex items-center gap-2"
            >
              <span className="text-sm">{language === 'de' ? 'DE' : 'EN'}</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {showLanguageDropdown && (
              <>
                <div className="fixed inset-0 z-10" onClick={() => setShowLanguageDropdown(false)} />
                <div className="absolute right-0 mt-2 bg-gray-900 border border-gray-700 min-w-[120px] z-20">
                  <button onClick={() => { setLanguage('en'); setShowLanguageDropdown(false); }} className={`w-full text-left px-4 py-2 hover:bg-gray-800 transition-colors ${language === 'en' ? 'bg-gray-800' : ''}`}>English</button>
                  <button onClick={() => { setLanguage('de'); setShowLanguageDropdown(false); }} className={`w-full text-left px-4 py-2 hover:bg-gray-800 transition-colors ${language === 'de' ? 'bg-gray-800' : ''}`}>Deutsch</button>
                </div>
              </>
            )}
          </div>
          {showBackButton ? (
            <Link href="/" className="px-4 py-2 border border-gray-700 hover:border-white transition-colors">
              {language === 'de' ? 'Zurück zur Startseite' : 'Back to Home'}
            </Link>
          ) : (
            <Link href="/post-ad" className="px-6 py-2 bg-white text-black hover:bg-gray-200 transition-colors font-medium">
              {t.header.postAd}
            </Link>
          )}
        </div>
      </div>
    </header>
  )
}
