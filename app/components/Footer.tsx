'use client'

import Link from 'next/link'
import { useLanguage } from '../i18n/provider'

export function Footer() {
  const { t, language } = useLanguage()

  return (
    <footer className="border-t border-gray-800 mt-20">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm text-center md:text-left">
            {t.footer.copyright}
          </p>
          <Link
            href="/legal/imprint"
            className="px-6 py-2 border border-gray-700 hover:border-white transition-colors text-sm"
          >
            {language === 'de' ? 'Kontaktieren Sie uns' : 'Contact Us'}
          </Link>
        </div>
      </div>
    </footer>
  )
}
