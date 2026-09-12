/** 組出 `GET /api/surf-report` 的內容（SPEC §6.3、§6.5）。 */
import type { FieldReport, SurfDay, SurfReport, TideDay } from '../../shared/surf'
import type { Env } from './env'
import { refreshForecast, refreshTides, refreshWarnings } from './ingest'
import { JMA_OFFICE, parseForecast, parseWarnings, type ParsedForecast } from './jma'
import { sunTimes } from './sun'
import { addDays, hoursSince, jstIso, jstToday } from './time'

/** 超過這個時數沒更新，就在收到請求時補抓一次（cron 失敗時的保險）。 */
const STALE_HOURS = 3
/** 同一個 isolate 裡，同一年的潮位表 6 小時內只補抓一次，避免年檔還沒發布時每個請求都去撞 404。 */
const tideAttempts = new Map<number, number>()

type StoredPayload = { payload_json: string; report_datetime: string; fetched_at: string }

export async function latestForecast(env: Env) {
  return env.DB.prepare('SELECT payload_json, report_datetime, fetched_at FROM jma_forecasts WHERE office = ? ORDER BY report_datetime DESC, fetched_at DESC LIMIT 1')
    .bind(JMA_OFFICE)
    .first<StoredPayload>()
}

async function latestWarnings(env: Env) {
  return env.DB.prepare('SELECT payload_json, report_datetime, fetched_at FROM jma_warnings WHERE office = ? ORDER BY fetched_at DESC LIMIT 1')
    .bind(JMA_OFFICE)
    .first<StoredPayload>()
}

async function refreshIfStale(env: Env) {
  const [forecast, warnings] = await Promise.all([latestForecast(env), latestWarnings(env)])
  const tasks: Promise<unknown>[] = []
  if (!forecast || hoursSince(forecast.fetched_at) > STALE_HOURS) tasks.push(refreshForecast(env))
  if (!warnings || hoursSince(warnings.fetched_at) > STALE_HOURS) tasks.push(refreshWarnings(env))
  const results = await Promise.allSettled(tasks)
  for (const result of results) if (result.status === 'rejected') console.error('refresh failed, using last stored data', result.reason)
}

type TideRow = { station: string; date: string; hourly_json: string; highs_json: string; lows_json: string; fetched_at: string }

async function loadTides(env: Env, from: string, to: string) {
  const { results } = await env.DB.prepare('SELECT station, date, hourly_json, highs_json, lows_json, fetched_at FROM tides WHERE date BETWEEN ? AND ?')
    .bind(from, to)
    .all<TideRow>()
  const map = new Map<string, TideDay>()
  let fetchedAt: string | null = null
  for (const row of results) {
    map.set(`${row.station}:${row.date}`, {
      station: row.station,
      date: row.date,
      hourly: JSON.parse(row.hourly_json),
      highs: JSON.parse(row.highs_json),
      lows: JSON.parse(row.lows_json),
    })
    if (!fetchedAt || row.fetched_at > fetchedAt) fetchedAt = row.fetched_at
  }
  return { map, fetchedAt }
}

async function ensureTides(env: Env, dates: string[]) {
  let tides = await loadTides(env, dates[0], dates[dates.length - 1])
  const missingYears = new Set(dates.filter((date) => !tides.map.has(`NH:${date}`) || !tides.map.has(`ZO:${date}`)).map((date) => Number(date.slice(0, 4))))
  const now = Date.now()
  const toFetch = [...missingYears].filter((year) => now - (tideAttempts.get(year) ?? 0) > 6 * 3_600_000)
  if (toFetch.length === 0) return tides
  for (const year of toFetch) {
    tideAttempts.set(year, now)
    try {
      await refreshTides(env, year)
    } catch (error) {
      console.error('tide refresh failed', year, error)
    }
  }
  tides = await loadTides(env, dates[0], dates[dates.length - 1])
  return tides
}

async function loadFieldReports(env: Env, date: string): Promise<FieldReport[]> {
  const { results } = await env.DB.prepare('SELECT posted_at, text FROM field_reports WHERE substr(posted_at, 1, 10) = ? ORDER BY posted_at DESC LIMIT 5')
    .bind(date)
    .all<{ posted_at: string; text: string }>()
  return results.map((row) => ({ postedAt: row.posted_at, text: row.text }))
}

export async function buildReport(env: Env, from: string, days: number): Promise<SurfReport> {
  const today = jstToday()
  const dates = Array.from({ length: days }, (_, index) => addDays(from, index))

  await refreshIfStale(env)
  const [tides, forecastRow, warningsRow, fieldReports] = await Promise.all([
    ensureTides(env, dates),
    latestForecast(env),
    latestWarnings(env),
    dates.includes(today) ? loadFieldReports(env, today) : Promise.resolve([]),
  ])

  let forecast: ParsedForecast | null = null
  try {
    if (forecastRow) forecast = parseForecast(JSON.parse(forecastRow.payload_json))
  } catch (error) {
    console.error('forecast parse failed', error)
  }

  let warnings: SurfReport['warnings'] = null
  try {
    if (warningsRow) warnings = { ...parseWarnings(JSON.parse(warningsRow.payload_json)), fetchedAt: warningsRow.fetched_at }
  } catch (error) {
    console.error('warnings parse failed', error)
  }

  const surfDays: SurfDay[] = dates.map((date) => ({
    date,
    sun: sunTimes(date),
    tides: { NH: tides.map.get(`NH:${date}`) ?? null, ZO: tides.map.get(`ZO:${date}`) ?? null },
    forecast: forecast?.daily[date] ?? null,
    week: forecast?.week[date] ?? null,
    fieldReports: date === today ? fieldReports : [],
  }))

  return {
    generatedAt: jstIso(),
    today,
    days: surfDays,
    warnings,
    sources: {
      forecastReportDatetime: forecast?.reportDatetime ?? null,
      forecastFetchedAt: forecastRow?.fetched_at ?? null,
      weekReportDatetime: forecast?.weekReportDatetime ?? null,
      tideFetchedAt: tides.fetchedAt,
    },
    modelLayerEnabled: env.MODEL_LAYER_ENABLED === 'true',
  }
}
