import { jaJP } from './ja-JP'
import type { Copy, Language } from './types'
import { zhTW } from './zh-TW'

/** 繁中（預設）→ 日文（SPEC §3）。 */
export const LANGUAGES: Language[] = ['zh-TW', 'ja-JP']

export const dictionaries: Record<Language, Copy> = { 'zh-TW': zhTW, 'ja-JP': jaJP }

export const htmlLang: Record<Language, string> = { 'zh-TW': 'zh-Hant', 'ja-JP': 'ja' }

/** 標題小字用的「另一種語言」：繁中頁面配日文，日文頁面配繁中。 */
export const otherLanguage = (language: Language): Language => (language === 'zh-TW' ? 'ja-JP' : 'zh-TW')

/** 從兩份字典取出同一個欄位。 */
export function byLanguage<T>(dicts: Record<Language, T>, pick: (copy: T) => string): Record<Language, string> {
  return { 'zh-TW': pick(dicts['zh-TW']), 'ja-JP': pick(dicts['ja-JP']) }
}
