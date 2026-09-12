/**
 * 氣象廳預報與警報解析（SPEC §6.2）。只做原文轉載與翻譯，不產生任何判斷。
 */
import type { AreaWarnings, ForecastArea, Tri, WeekForecast } from '../../shared/surf'
import { translatePhrase } from './phrases'
import { weatherCodeLabel } from './weatherCodes'

export const JMA_OFFICE = '471000'
export const FORECAST_URL = `https://www.jma.go.jp/bosai/forecast/data/forecast/${JMA_OFFICE}.json`
/** 2026-05-28 起的新制警報 JSON。舊的 bosai/warning/data/warning/ 從那天起就停止更新了。 */
export const WARNING_URL = `https://www.jma.go.jp/bosai/warning/data/r8/${JMA_OFFICE}.json`
export const WARNING_PAGE_URL = `https://www.jma.go.jp/bosai/warning/#area_type=offices&area_code=${JMA_OFFICE}`

/** 只取沖繩本島兩區；久米島不在本島，不顯示。 */
export const SURF_AREAS: Record<string, Tri> = {
  '471010': { 'ja-JP': '本島中南部', 'zh-TW': '本島中南部', en: 'Central & southern main island' },
  '471020': { 'ja-JP': '本島北部', 'zh-TW': '本島北部', en: 'Northern main island' },
}

/** 新制警報 JSON 最外層依現象分類（dataTypeCode）。 */
export const WARNING_CATEGORIES: Record<string, Tri> = {
  VPWW55: { 'ja-JP': '大雨', 'zh-TW': '大雨', en: 'Heavy rain' },
  VPWW56: { 'ja-JP': '土砂災害', 'zh-TW': '土石災害', en: 'Landslides' },
  VPWW57: { 'ja-JP': '高潮', 'zh-TW': '暴潮', en: 'Storm surge' },
  VPWW58: { 'ja-JP': '暴風', 'zh-TW': '暴風', en: 'Strong wind' },
  VPWW59: { 'ja-JP': '波浪', 'zh-TW': '波浪', en: 'High waves' },
  VPWW60: { 'ja-JP': '大雪', 'zh-TW': '大雪', en: 'Heavy snow' },
  VPWW61: { 'ja-JP': 'その他の注意報', 'zh-TW': '其他注意報', en: 'Other advisories' },
}

type RawArea = { area: { name: string; code: string } } & Record<string, unknown>
type RawSeries = { timeDefines: string[]; areas: RawArea[] }
type RawBlock = { reportDatetime: string; timeSeries: RawSeries[] }

const list = (value: unknown): string[] => (Array.isArray(value) ? value.map(String) : [])

function numberOrNull(value: string | undefined) {
  if (value === undefined || value === '') return null
  const parsed = Number(value)
  return Number.isFinite(parsed) ? parsed : null
}

export type ParsedForecast = {
  reportDatetime: string
  weekReportDatetime: string | null
  daily: Record<string, ForecastArea[]>
  week: Record<string, WeekForecast>
}

export function parseForecast(raw: unknown): ParsedForecast {
  const [short, weekly] = raw as RawBlock[]

  const daily: Record<string, ForecastArea[]> = {}
  const series = short.timeSeries[0]
  series.timeDefines.forEach((time, index) => {
    daily[time.slice(0, 10)] = series.areas
      .filter((area) => area.area.code in SURF_AREAS)
      .map((area) => ({
        code: area.area.code,
        name: SURF_AREAS[area.area.code],
        weather: weatherCodeLabel(list(area.weatherCodes)[index]),
        weatherDetail: list(area.weathers)[index]?.replace(/　/g, ' ') ?? null,
        wind: translatePhrase(list(area.winds)[index]),
        wave: translatePhrase(list(area.waves)[index]),
      }))
  })

  const week: Record<string, WeekForecast> = {}
  if (weekly) {
    const [weatherSeries, tempSeries] = weekly.timeSeries
    const weatherArea = weatherSeries?.areas[0]
    const tempArea = tempSeries?.areas.find((area) => area.area.code === '91197') ?? tempSeries?.areas[0]
    weatherSeries?.timeDefines.forEach((time, index) => {
      week[time.slice(0, 10)] = {
        weather: weatherCodeLabel(list(weatherArea?.weatherCodes)[index]),
        pop: numberOrNull(list(weatherArea?.pops)[index]),
        reliability: list(weatherArea?.reliabilities)[index] || null,
        tempMin: numberOrNull(list(tempArea?.tempsMin)[index]),
        tempMax: numberOrNull(list(tempArea?.tempsMax)[index]),
      }
    })
  }

  return { reportDatetime: short.reportDatetime, weekReportDatetime: weekly?.reportDatetime ?? null, daily, week }
}

type RawWarningEntry = {
  reportDatetime: string
  headlineText?: string
  dataTypeCode: string
  warning?: { class10Items?: Array<{ areaCode: string; kinds?: Array<{ code?: string; status?: string }> }> }
}

const INACTIVE_STATUSES = new Set(['解除', '発表警報・注意報はなし'])

/** 查不到的狀態保留日文原文，不猜。 */
const STATUS_LABELS: Record<string, Tri> = {
  発表: { 'ja-JP': '発表', 'zh-TW': '發布', en: 'issued' },
  継続: { 'ja-JP': '継続', 'zh-TW': '持續', en: 'continuing' },
}

export function parseWarnings(raw: unknown): { reportDatetime: string; areas: AreaWarnings[] } {
  const entries = raw as RawWarningEntry[]
  const areas: AreaWarnings[] = Object.entries(SURF_AREAS).map(([areaCode, areaName]) => ({ areaCode, areaName, items: [] }))

  for (const entry of entries) {
    const name = WARNING_CATEGORIES[entry.dataTypeCode]
    if (!name) continue
    for (const item of entry.warning?.class10Items ?? []) {
      const area = areas.find((candidate) => candidate.areaCode === item.areaCode)
      if (!area) continue
      const active = (item.kinds ?? []).filter((kind) => kind.code && kind.status && !INACTIVE_STATUSES.has(kind.status))
      if (active.length === 0) continue
      area.items.push({
        category: entry.dataTypeCode,
        name,
        statuses: [...new Set(active.map((kind) => kind.status as string))].map(
          (status) => STATUS_LABELS[status] ?? { 'ja-JP': status, 'zh-TW': null, en: null },
        ),
        headline: entry.headlineText ?? null,
        reportDatetime: entry.reportDatetime,
      })
    }
  }

  const reportDatetime = entries.map((entry) => entry.reportDatetime).sort().at(-1) ?? ''
  return { reportDatetime, areas }
}
