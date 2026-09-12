/**
 * 衝浪情報 API 的共用型別：Worker 產出、前端讀取（SPEC §6）。
 * 這裡只放「數據」，不放任何判斷欄位（SPEC §6.1）。
 */

/** 氣象廳原文一定有日文；翻譯不出來的語言是 null，前端改顯示日文原文。 */
export type Tri = { 'ja-JP': string; 'zh-TW': string | null; en: string | null }

export type TideEvent = { time: string; cm: number }

export type TideDay = {
  station: string
  date: string
  /** 0–23 時的潮位（cm，以潮位表基準面為準） */
  hourly: number[]
  highs: TideEvent[]
  lows: TideEvent[]
}

/** 府縣天氣預報（第 0–2 天），分本島中南部、本島北部 */
export type ForecastArea = {
  code: string
  name: Tri
  /** 由天氣代碼查出的官方短標籤 */
  weather: Tri | null
  /** 氣象廳的完整天氣文字（日文原文，例如「晴れ 昼過ぎ から くもり 所により 夜 雨 で 雷を伴う」） */
  weatherDetail: string | null
  wind: Tri | null
  wave: Tri | null
}

/** 週間天氣預報（第 1–6 天）。氣象廳的週間預報不含浪與風。 */
export type WeekForecast = {
  weather: Tri | null
  pop: number | null
  tempMin: number | null
  tempMax: number | null
  reliability: string | null
}

/** 新制警報（2026-05-28 起）：只列出目前「發布中／持續中」的類別，不猜細部代碼的意思。 */
export type WarningItem = {
  category: string
  name: Tri
  statuses: Tri[]
  headline: string | null
  reportDatetime: string
}

export type AreaWarnings = { areaCode: string; areaName: Tri; items: WarningItem[] }

export type FieldReport = { postedAt: string; text: string }

export type SurfDay = {
  date: string
  sun: { sunrise: string; sunset: string }
  tides: { NH: TideDay | null; ZO: TideDay | null }
  forecast: ForecastArea[] | null
  week: WeekForecast | null
  fieldReports: FieldReport[]
}

export type SurfReport = {
  generatedAt: string
  today: string
  days: SurfDay[]
  warnings: { reportDatetime: string; fetchedAt: string; areas: AreaWarnings[] } | null
  sources: {
    forecastReportDatetime: string | null
    forecastFetchedAt: string | null
    weekReportDatetime: string | null
    tideFetchedAt: string | null
  }
  modelLayerEnabled: boolean
}
