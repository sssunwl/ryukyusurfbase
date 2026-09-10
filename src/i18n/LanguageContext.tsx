import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import { jaJP } from './ja-JP'
import type { Copy, Language } from './types'
import { zhTW } from './zh-TW'

const STORAGE_KEY = 'ryukyu-surf-language'
const dictionaries: Record<Language, Copy> = { 'zh-TW': zhTW, 'ja-JP': jaJP }

type LanguageContextValue = {
  language: Language
  setLanguage: (language: Language) => void
  copy: Copy
}

const LanguageContext = createContext<LanguageContextValue | null>(null)

function getInitialLanguage(): Language {
  if (typeof window === 'undefined') return 'zh-TW'
  const saved = window.localStorage.getItem(STORAGE_KEY)
  return saved === 'ja-JP' ? 'ja-JP' : 'zh-TW'
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(getInitialLanguage)

  const setLanguage = (nextLanguage: Language) => {
    setLanguageState(nextLanguage)
    window.localStorage.setItem(STORAGE_KEY, nextLanguage)
  }

  useEffect(() => {
    const copy = dictionaries[language]
    document.documentElement.lang = language === 'zh-TW' ? 'zh-Hant' : 'ja'
    document.title = copy.meta.title
    document.querySelector('meta[name="description"]')?.setAttribute('content', copy.meta.description)
    document.querySelector('meta[property="og:title"]')?.setAttribute('content', copy.meta.title)
    document.querySelector('meta[property="og:description"]')?.setAttribute('content', copy.meta.description)
  }, [language])

  const value = useMemo(() => ({ language, setLanguage, copy: dictionaries[language] }), [language])
  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) throw new Error('useLanguage must be used inside LanguageProvider')
  return context
}
