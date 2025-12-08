'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { Language, translations } from './translations'

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: typeof translations.en
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>('en')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    
    const storedLang = typeof window !== 'undefined' ? localStorage.getItem('language') : null
    if (storedLang && (storedLang === 'en' || storedLang === 'de')) {
      setLanguageState(storedLang as Language)
      return
    }

    const detectLanguage = async () => {
      try {
        const response = await fetch('https://ipapi.co/json/')
        const data = await response.json()
        
        if (data.country_name === 'Germany' || data.country_code === 'DE') {
          setLanguageState('de')
          if (typeof window !== 'undefined') {
            localStorage.setItem('language', 'de')
          }
        } else {
          setLanguageState('en')
          if (typeof window !== 'undefined') {
            localStorage.setItem('language', 'en')
          }
        }
      } catch (error) {
        setLanguageState('en')
      }
    }

    detectLanguage()
  }, [])

  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
    if (typeof window !== 'undefined') {
      localStorage.setItem('language', lang)
    }
  }

  if (!mounted) {
    return <>{children}</>
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t: translations[language] }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}