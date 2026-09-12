import { LANGUAGES } from '../i18n/dictionaries'
import { useLanguage } from '../i18n/LanguageContext'
import type { Language } from '../i18n/types'

/**
 * 三語 eyebrow（SPEC §5）：下面的 H1／H2 已經是目前語言，
 * 這裡只顯示另外兩種語言，不要把三種語言疊成三行大字。
 */
export function Eyebrow({ labels, className = '' }: { labels: Record<Language, string>; className?: string }) {
  const { language } = useLanguage()
  const others = LANGUAGES.filter((lang) => lang !== language).map((lang) => labels[lang])
  return <p className={`eyebrow ${className}`.trim()}>{others.join(' · ')}</p>
}
