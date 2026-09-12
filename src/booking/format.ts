import type { BookingCopy } from '../i18n/booking'
import type { Language } from '../i18n/types'

const LOCALE: Record<Language, string> = { 'zh-TW': 'zh-TW', 'ja-JP': 'ja-JP' }

export function formatBookingDate(date: string, language: Language) {
  return new Intl.DateTimeFormat(LOCALE[language], { timeZone: 'Asia/Tokyo', month: 'numeric', day: 'numeric', weekday: 'short' })
    .format(new Date(`${date}T12:00:00+09:00`))
}

export function formatMonth(year: number, month: number, language: Language) {
  return new Intl.DateTimeFormat(LOCALE[language], { timeZone: 'UTC', year: 'numeric', month: 'long' }).format(new Date(Date.UTC(year, month - 1, 1)))
}

export function formatDateTime(iso: string, language: Language) {
  return new Intl.DateTimeFormat(LOCALE[language], { timeZone: 'Asia/Tokyo', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit' })
    .format(new Date(iso))
}

export function rentalsText(wetsuits: number, hardboards: number, b: BookingCopy) {
  const parts: string[] = []
  if (wetsuits > 0) parts.push(`${b.confirm.wetsuit} × ${wetsuits}`)
  if (hardboards > 0) parts.push(`${b.confirm.hardboard} × ${hardboards}`)
  return parts.length ? parts.join('、') : b.confirm.noRental
}
