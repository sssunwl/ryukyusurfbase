/**
 * 氣象廳潮位表文字檔解析（SPEC §6.2）。
 * https://www.data.jma.go.jp/kaiyou/data/db/tide/suisan/txt/{YYYY}/{站碼}.txt
 *
 * 每一行是一天，固定寬度：
 *   1–72    每小時潮位，3 字元 × 24 小時（cm，以潮位表基準面為準）
 *   73–78   年、月、日，各 2 字元，用空白補位
 *   79–80   站碼
 *   81–108  滿潮，4 組 × 7 字元（時 2＋分 2＋潮位 3）
 *   109–136 乾潮，4 組 × 7 字元
 * 坑：時和分都可能用空白補位，例如「 2 8」是 02:08、「 817」是 08:17。
 * 沒有資料的欄位是 9999／999。
 */
import type { TideDay, TideEvent } from '../../shared/surf'

export const TIDE_STATIONS = { NH: '那覇', ZO: '沖縄（中城湾港）' } as const
export type TideStation = keyof typeof TIDE_STATIONS

export function tideFileUrl(year: number, station: TideStation) {
  return `https://www.data.jma.go.jp/kaiyou/data/db/tide/suisan/txt/${year}/${station}.txt`
}

const pad2 = (value: number) => String(value).padStart(2, '0')
const field = (text: string) => Number(text.trim())

function parseEvents(block: string): TideEvent[] {
  const events: TideEvent[] = []
  for (let slot = 0; slot < 4; slot += 1) {
    const chunk = block.slice(slot * 7, slot * 7 + 7)
    if (chunk.length < 7) break
    const hour = chunk.slice(0, 2)
    const minute = chunk.slice(2, 4)
    const height = chunk.slice(4, 7)
    if (hour === '99' || height === '999') continue
    events.push({ time: `${pad2(field(hour))}:${pad2(field(minute))}`, cm: field(height) })
  }
  return events
}

export function parseTideLine(line: string): TideDay | null {
  if (line.length < 136) return null
  const hourly: number[] = []
  for (let hour = 0; hour < 24; hour += 1) hourly.push(field(line.slice(hour * 3, hour * 3 + 3)))
  const year = field(line.slice(72, 74))
  const month = field(line.slice(74, 76))
  const day = field(line.slice(76, 78))
  if (hourly.some(Number.isNaN) || !month || !day) return null
  return {
    station: line.slice(78, 80),
    date: `20${pad2(year)}-${pad2(month)}-${pad2(day)}`,
    hourly,
    highs: parseEvents(line.slice(80, 108)),
    lows: parseEvents(line.slice(108, 136)),
  }
}

export function parseTideFile(text: string): TideDay[] {
  return text.split('\n').map((line) => parseTideLine(line.replace(/\r$/, ''))).filter((day): day is TideDay => day !== null)
}
