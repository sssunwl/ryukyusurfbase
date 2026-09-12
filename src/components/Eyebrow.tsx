import { otherLanguage } from '../i18n/dictionaries'
import { useLanguage } from '../i18n/LanguageContext'
import type { Language } from '../i18n/types'

/**
 * 標題小字（SPEC §5）：下面的 H1／H2 是目前語言，這裡顯示另一種語言。
 * 繁中頁面顯示日文，日文頁面顯示繁中。
 */
export function Eyebrow({ labels, className = '' }: { labels: Record<Language, string>; className?: string }) {
  const { language } = useLanguage()
  return <p className={`eyebrow ${className}`.trim()}>{labels[otherLanguage(language)]}</p>
}
