import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import { applyContent, type ContentResponse } from '../../shared/content'
import { API_BASE } from '../lib/apiBase'
import { dictionaries, htmlLang, LANGUAGES } from './dictionaries'
import type { Copy, Language } from './types'

const STORAGE_KEY = 'ryukyu-surf-language'
/** 上一次抓到的後台內容：下次開頁先套用，避免畫面先出現舊文案再跳換。 */
const CONTENT_CACHE_KEY = 'ryukyu-content-cache'

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

function readCachedDocs(): ContentResponse['docs'] | undefined {
  try {
    const raw = window.localStorage.getItem(CONTENT_CACHE_KEY)
    return raw ? (JSON.parse(raw) as ContentResponse).docs : undefined
  } catch {
    return undefined
  }
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(getInitialLanguage)
  const [docs, setDocs] = useState<ContentResponse['docs'] | undefined>(readCachedDocs)

  const setLanguage = (nextLanguage: Language) => {
    setLanguageState(nextLanguage)
    try {
      window.localStorage.setItem(STORAGE_KEY, nextLanguage)
    } catch {
      // IG 內建瀏覽器等環境可能禁用 localStorage，語言仍可在本次瀏覽中切換
    }
  }

  // 後台存的內容覆寫（docs/ADMIN_SPEC.md）。抓不到時沿用內建文案，網站不會空白。
  useEffect(() => {
    const controller = new AbortController()
    fetch(`${API_BASE}/api/content`, { signal: controller.signal })
      .then((response) => (response.ok ? (response.json() as Promise<ContentResponse>) : Promise.reject(new Error(`HTTP ${response.status}`))))
      .then((data) => {
        if (!data || typeof data.docs !== 'object') return
        setDocs(data.docs)
        try {
          window.localStorage.setItem(CONTENT_CACHE_KEY, JSON.stringify(data))
        } catch {
          // 無法快取時只影響下次開頁速度
        }
      })
      .catch(() => undefined)
    return () => controller.abort()
  }, [])

  const copy = useMemo(() => applyContent(dictionaries[language], docs, language === 'ja-JP' ? 'ja' : 'zh'), [language, docs])

  useEffect(() => {
    document.documentElement.lang = htmlLang[language]
    document.title = copy.meta.title
    document.querySelector('meta[name="description"]')?.setAttribute('content', copy.meta.description)
    document.querySelector('meta[property="og:title"]')?.setAttribute('content', copy.meta.title)
    document.querySelector('meta[property="og:description"]')?.setAttribute('content', copy.meta.description)
  }, [language, copy])

  const value = useMemo(() => ({ language, setLanguage, copy }), [language, copy])
  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) throw new Error('useLanguage must be used inside LanguageProvider')
  return context
}
