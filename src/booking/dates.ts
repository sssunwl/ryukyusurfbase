/** 預約示範用的日期工具。日期一律是 JST 的 YYYY-MM-DD 字串。 */

/** 可預約的範圍：明天起 60 天（SPEC §7）。 */
export const BOOKING_WINDOW_DAYS = 60

export function jstToday(now = new Date()) {
  return new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Tokyo' }).format(now)
}

export function addDays(date: string, days: number) {
  const [year, month, day] = date.split('-').map(Number)
  return new Date(Date.UTC(year, month - 1, day + days)).toISOString().slice(0, 10)
}

export function bookableRange() {
  const today = jstToday()
  return { first: addDays(today, 1), last: addDays(today, BOOKING_WINDOW_DAYS) }
}

export function monthsBetween(first: string, last: string) {
  const months: Array<{ year: number; month: number }> = []
  let [year, month] = first.split('-').map(Number)
  const [lastYear, lastMonth] = last.split('-').map(Number)
  while (year < lastYear || (year === lastYear && month <= lastMonth)) {
    months.push({ year, month })
    month += 1
    if (month > 12) {
      month = 1
      year += 1
    }
  }
  return months
}

/** 月曆格子：前面補 null，讓 1 號對齊星期（週日開始）。 */
export function monthCells(year: number, month: number): Array<string | null> {
  const leading = new Date(Date.UTC(year, month - 1, 1)).getUTCDay()
  const days = new Date(Date.UTC(year, month, 0)).getUTCDate()
  const pad = (value: number) => String(value).padStart(2, '0')
  return [...Array<null>(leading).fill(null), ...Array.from({ length: days }, (_, index) => `${year}-${pad(month)}-${pad(index + 1)}`)]
}

export type DayStatus = 'available' | 'full'

/**
 * 示範用的日期狀態：由日期算出固定的假資料（約兩成「已滿」），重新整理不會變。
 * 正式版改由 Worker 讀 Kaito 的 Google 日曆 freebusy（SPEC §7）。
 */
export function demoStatus(date: string): DayStatus {
  const seed = Number(date.replace(/-/g, ''))
  return (seed * 7919) % 10 < 2 ? 'full' : 'available'
}
