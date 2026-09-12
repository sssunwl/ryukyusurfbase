/**
 * 後台可編輯的網站內容（docs/ADMIN_SPEC.md）。
 * 前台以程式內建的文案為底，再套上後台存的覆寫；形狀不對的覆寫一律忽略，
 * 確保網站不會因為一筆壞資料整頁壞掉。
 */

export type ContentDoc = { zh: unknown; ja: unknown; updatedAt: string }

export type ContentResponse = { docs: Record<string, ContentDoc> }

/** 可以被後台覆寫的 i18n 區塊（對應前台 Copy 的最上層 key）。 */
export const EDITABLE_SECTIONS = ['hero', 'plansSection', 'why', 'day', 'coach', 'faq', 'booking', 'footer', 'aboutPage', 'plansPage'] as const

const isPlainObject = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value)

const isPrimitive = (value: unknown) => typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean'

/** 沒有範本可對照時，只接受「純值」或「值全是純值的物件」（例如價格列 { label, value }）。 */
const isFlat = (value: unknown) => isPrimitive(value) || (isPlainObject(value) && Object.values(value).every(isPrimitive))

export function deepMerge<T>(base: T, patch: unknown): T {
  if (patch === undefined || patch === null) return base

  if (Array.isArray(base)) {
    if (!Array.isArray(patch)) return base
    if (base.length === 0) return (patch.every(isFlat) ? patch : base) as T
    // 陣列整批取代；每一項用同位置（沒有就用第一項）的預設內容當範本補齊欄位，避免缺欄位讓畫面壞掉
    return patch.map((item, index) => deepMerge(base[index] ?? base[0], item)) as T
  }

  if (isPlainObject(base)) {
    if (!isPlainObject(patch)) return base
    const merged: Record<string, unknown> = { ...base }
    for (const [key, value] of Object.entries(patch)) {
      if (key in merged) merged[key] = deepMerge(merged[key], value)
    }
    return merged as T
  }

  // 預設是 null 的欄位（例如 priceNote）只接受字串
  if (base === null) return (typeof patch === 'string' ? patch : base) as T
  return (typeof patch === typeof base ? patch : base) as T
}

export function applyContent<T extends object>(copy: T, docs: Record<string, ContentDoc> | undefined, lang: 'zh' | 'ja'): T {
  if (!docs) return copy
  const result: Record<string, unknown> = { ...(copy as Record<string, unknown>) }
  for (const section of EDITABLE_SECTIONS) {
    const doc = docs[section]
    if (!doc || !(section in result)) continue
    // 日文留空時退回繁中（ADMIN_SPEC）
    const patch = lang === 'ja' ? (doc.ja ?? doc.zh) : doc.zh
    result[section] = deepMerge(result[section], patch)
  }
  return result as T
}
