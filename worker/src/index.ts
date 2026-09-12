import type { Env } from './env'
import { refreshForecast, refreshTides, refreshWarnings } from './ingest'
import { buildReport } from './report'
import { handleWebhook, postDaily } from './telegram'
import { addDays, isDateString, jstToday } from './time'

function corsHeaders(request: Request, env: Env): Record<string, string> {
  const origin = request.headers.get('Origin')
  if (!origin) return {}
  const allowed = env.ALLOWED_ORIGINS.split(',').map((value) => value.trim()).filter(Boolean)
  const isLocal = /^http:\/\/(localhost|127\.0\.0\.1):\d+$/.test(origin)
  return allowed.includes(origin) || isLocal ? { 'Access-Control-Allow-Origin': origin, Vary: 'Origin' } : {}
}

function json(body: unknown, status: number, headers: Record<string, string>) {
  return new Response(JSON.stringify(body), { status, headers: { 'content-type': 'application/json; charset=utf-8', ...headers } })
}

async function surfReport(request: Request, env: Env) {
  const cors = corsHeaders(request, env)
  const url = new URL(request.url)
  const today = jstToday()
  const from = url.searchParams.get('from') ?? today
  const days = Math.min(7, Math.max(1, Number(url.searchParams.get('days') ?? 7) || 7))
  if (!isDateString(from) || from < addDays(today, -1) || from > addDays(today, 6)) {
    return json({ error: 'from must be a date between yesterday and 6 days ahead (JST)' }, 400, cors)
  }
  const report = await buildReport(env, from, days)
  return json(report, 200, { ...cors, 'Cache-Control': 'public, max-age=600' })
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url)
    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: { ...corsHeaders(request, env), 'Access-Control-Allow-Methods': 'GET', 'Access-Control-Max-Age': '86400' } })
    }
    try {
      if (url.pathname === '/api/surf-report' && request.method === 'GET') return await surfReport(request, env)
      if (url.pathname === '/telegram/webhook' && request.method === 'POST') return await handleWebhook(request, env)
    } catch (error) {
      console.error(error)
      return json({ error: 'internal error' }, 500, corsHeaders(request, env))
    }
    return new Response('not found', { status: 404 })
  },

  async scheduled(controller: ScheduledController, env: Env, ctx: ExecutionContext) {
    const run = async () => {
      switch (controller.cron) {
        case '10 20,2,8 * * *': {
          const results = await Promise.allSettled([refreshForecast(env), refreshWarnings(env)])
          for (const result of results) if (result.status === 'rejected') console.error(result.reason)
          break
        }
        case '15 20 * * *':
          await postDaily(env, 'today')
          break
        case '15 2 * * *':
          await postDaily(env, 'tomorrow')
          break
        case '0 21 * * 1': {
          const year = Number(jstToday().slice(0, 4))
          await refreshTides(env, year)
          await refreshTides(env, year + 1)
          break
        }
        default:
          console.warn('unknown cron', controller.cron)
      }
    }
    ctx.waitUntil(run())
  },
}
