import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import { dictionaries, htmlLang, LANGUAGES } from './dictionaries'
import type { Copy, Language } from './types'

const STORAGE_KEY = 'ryukyu-surf-language'

type LanguageContextValue = {
  language: Language
  setLanguage: (language: Language) => void
  copy: Copy
}

const LanguageContext = createContext<LanguageContextValue | null>(null)

function getInitialLanguage(): Language {
  if (typeof window === 'undefined') return 'zh-TW'
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY)
    return LANGUAGES.find((lang) => lang === saved) ?? 'zh-TW'
  } catch {
    return 'zh-TW'
  }
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(getInitialLanguage)

  const setLanguage = (nextLanguage: Language) => {
    setLanguageState(nextLanguage)
    try {
      window.localStorage.setItem(STORAGE_KEY, nextLanguage)
    } catch {
      // IG 內建瀏覽器等環境可能禁用 localStorage，語言仍可在本次瀏覽中切換
    }
  }

  useEffect(() => {
    const copy = dictionaries[language]
    document.documentElement.lang = htmlLang[language]
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
