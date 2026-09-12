/** 全部以 JST 處理（SPEC §6.5）。Workers 的時區固定是 UTC，所以一律手動加 9 小時。 */

const JST_OFFSET_MS = 9 * 60 * 60 * 1000

export function jstIso(date = new Date()) {
  return new Date(date.getTime() + JST_OFFSET_MS).toISOString().replace(/\.\d{3}Z$/, '+09:00')
}

export function jstToday(date = new Date()) {
  return jstIso(date).slice(0, 10)
}

export function addDays(date: string, days: number) {
  const [year, month, day] = date.split('-').map(Number)
  return new Date(Date.UTC(year, month - 1, day + days)).toISOString().slice(0, 10)
}

export function isDateString(value: string | null): value is string {
  return !!value && /^\d{4}-\d{2}-\d{2}$/.test(value) && !Number.isNaN(Date.parse(value))
}

export function hoursSince(iso: string, now = new Date()) {
  return (now.getTime() - Date.parse(iso)) / 3_600_000
}
