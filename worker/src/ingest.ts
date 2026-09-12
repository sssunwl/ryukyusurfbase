/** 抓取氣象廳資料並寫進 D1。抓取失敗一律丟錯，由呼叫端決定要不要沿用上一次成功的資料。 */
import type { Env } from './env'
import { FORECAST_URL, JMA_OFFICE, WARNING_URL } from './jma'
import { parseTideFile, tideFileUrl, TIDE_STATIONS, type TideStation } from './tide'
import { jstIso } from './time'

function requestInit(env: Env): RequestInit {
  return { headers: { 'User-Agent': `ryukyusurfbase-api (+${env.SITE_URL})` } }
}

async function fetchText(url: string, env: Env) {
  const response = await fetch(url, requestInit(env))
  if (!response.ok) throw new Error(`${url} → HTTP ${response.status}`)
  return response.text()
}

export async function refreshForecast(env: Env) {
  const text = await fetchText(FORECAST_URL, env)
  const reportDatetime = (JSON.parse(text) as Array<{ reportDatetime: string }>)[0].reportDatetime
  await env.DB.prepare('INSERT OR REPLACE INTO jma_forecasts (office, report_datetime, payload_json, fetched_at) VALUES (?, ?, ?, ?)')
    .bind(JMA_OFFICE, reportDatetime, text, jstIso())
    .run()
  return reportDatetime
}

export async function refreshWarnings(env: Env) {
  const text = await fetchText(WARNING_URL, env)
  const entries = JSON.parse(text) as Array<{ reportDatetime: string }>
  const reportDatetime = entries.map((entry) => entry.reportDatetime).sort().at(-1) ?? jstIso()
  await env.DB.prepare('INSERT OR REPLACE INTO jma_warnings (office, report_datetime, payload_json, fetched_at) VALUES (?, ?, ?, ?)')
    .bind(JMA_OFFICE, reportDatetime, text, jstIso())
    .run()
  return reportDatetime
}

/** 抓一整年的潮位表。明年的年檔可能還沒發布（404），那就略過。 */
export async function refreshTides(env: Env, year: number) {
  let stored = 0
  for (const station of Object.keys(TIDE_STATIONS) as TideStation[]) {
    const response = await fetch(tideFileUrl(year, station), requestInit(env))
    if (response.status === 404) continue
    if (!response.ok) throw new Error(`${tideFileUrl(year, station)} → HTTP ${response.status}`)
    const days = parseTideFile(await response.text())
    const fetchedAt = jstIso()
    const statement = env.DB.prepare(
      'INSERT OR REPLACE INTO tides (station, date, hourly_json, highs_json, lows_json, fetched_at) VALUES (?, ?, ?, ?, ?, ?)',
    )
    for (let index = 0; index < days.length; index += 50) {
      await env.DB.batch(
        days.slice(index, index + 50).map((day) =>
          statement.bind(station, day.date, JSON.stringify(day.hourly), JSON.stringify(day.highs), JSON.stringify(day.lows), fetchedAt),
        ),
      )
    }
    stored += days.length
  }
  return stored
}
