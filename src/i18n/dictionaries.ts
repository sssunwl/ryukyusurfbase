import { enUS } from './en-US'
import { jaJP } from './ja-JP'
import type { Copy, Language } from './types'
import { zhTW } from './zh-TW'

/** 顯示順序：繁中（預設）→ 日文 → 英文。 */
export const LANGUAGES: Language[] = ['zh-TW', 'ja-JP', 'en']

export const dictionaries: Record<Language, Copy> = { 'zh-TW': zhTW, 'ja-JP': jaJP, en: enUS }

export const htmlLang: Record<Language, string> = { 'zh-TW': 'zh-Hant', 'ja-JP': 'ja', en: 'en' }

/** 從三份字典取出同一個欄位，給三語 eyebrow 用。 */
export function tri<T>(dicts: Record<Language, T>, pick: (copy: T) => string): Record<Language, string> {
  return { 'zh-TW': pick(dicts['zh-TW']), 'ja-JP': pick(dicts['ja-JP']), en: pick(dicts.en) }
}
