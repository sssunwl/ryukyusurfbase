import type { Language } from '../i18n/types'

export type Coast = 'west' | 'east' | 'south' | 'north'
type Text = Record<Language, string>

export type SurfPoint = {
  id: string
  coast: Coast
  name: Text
  area: Text
  type: Text
  swell: Text
  offshore: Text
  tide: Text
  level: Text
  hazards: Text
  etiquette: Text
}

/**
 * 浪點資料只能填 Kaito 確認過的內容（docs/KAITO_SPOTS.md、SPEC §6.3）。
 * 不要從 okinews 或任何衝浪預報網站複製浪點資料。
 */
export const SURF_POINTS: SurfPoint[] = []
