/**
 * Telegram 頻道推播與現場報告（SPEC §6.4）。
 * 訊息只放數據與氣象廳原文，不得出現任何判斷字眼（SPEC §6.1，由 check:forecast-words 檢查）。
 */
import type { SurfDay, SurfReport, TideDay, Tri } from '../../shared/surf'
import type { Env } from './env'
import { refreshForecast } from './ingest'
import { buildReport, latestForecast } from './report'
import { addDays, jstIso, jstToday } from './time'

export type PostKind = 'today' | 'tomorrow'

const escapeHtml = (text: string) => text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

/** 三語並列；中日文相同時只寫一次。 */
function triText(value: Tri | null, fallback = '—') {
  if (!value) return fallback
  return [...new Set([value['zh-TW'], value['ja-JP'], value.en].filter(Boolean))].join(' / ')
}

const WEEKDAYS_EN = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

function tideBlock(label: string, day: TideDay | null) {
  if (!day) return `${label}\n  —`
  const events = (list: TideDay['highs']) => list.map((event) => `${event.time} ${event.cm}cm`).join('・') || '—'
  return `${label}\n  滿潮 High ${events(day.highs)}\n  乾潮 Low ${events(day.lows)}`
}

const clock = (iso: string | null) => (iso ? `${iso.slice(0, 10)} ${iso.slice(11, 16)}` : '—')

export function buildDailyMessage(report: SurfReport, day: SurfDay, kind: PostKind, siteUrl: string) {
  const weekday = WEEKDAYS_EN[new Date(`${day.date}T00:00:00Z`).getUTCDay()]
  const dayLabel = kind === 'today' ? '今天｜今日｜Today' : '明天｜明日｜Tomorrow'
  const lines: string[] = [
    '🌊 <b>琉球衝浪情報｜サーフ情報｜Surf Report</b>',
    `📅 <b>${day.date} (${weekday})</b>　${dayLabel}`,
    '',
    `☀️ 日出 Sunrise ${day.sun.sunrise}　🌇 日落 Sunset ${day.sun.sunset}`,
    '',
    '<b>潮汐｜潮汐｜Tide</b>',
    tideBlock('西岸 West・那覇', day.tides.NH),
    tideBlock('東岸 East・中城湾港', day.tides.ZO),
    '',
    '<b>氣象廳預報｜気象庁の予報｜JMA forecast</b>',
    `（沖縄気象台 ${clock(report.sources.forecastReportDatetime)}）`,
  ]

  if (day.forecast?.length) {
    for (const area of day.forecast) {
      lines.push(
        `▸ ${escapeHtml(triText(area.name))}`,
        `  天氣 Weather：${escapeHtml(triText(area.weather))}`,
        `  風 Wind：${escapeHtml(triText(area.wind))}`,
        `  浪 Waves：${escapeHtml(triText(area.wave))}`,
      )
    }
  } else {
    lines.push('尚未發布｜未発表｜Not issued yet')
  }

  lines.push('', '⚠️ <b>警報・注意報｜Warnings</b>')
  const active = report.warnings?.areas.filter((area) => area.items.length > 0) ?? []
  if (!report.warnings) {
    lines.push('資料暫時無法取得｜取得できません｜Unavailable')
  } else if (active.length === 0) {
    lines.push('目前沒有發布｜発表なし｜None in effect')
  } else {
    for (const area of active) {
      const items = area.items.map((item) => `${triText(item.name)}（${item.statuses.map((status) => triText(status)).join('・')}）`).join('、')
      lines.push(`  ${escapeHtml(triText(area.areaName))}：${escapeHtml(items)}`)
    }
  }

  const link = `${siteUrl.replace(/\/$/, '')}/surf-report?date=${day.date}`
  lines.push(
    '',
    `🔗 <a href="${escapeHtml(link)}">其他日子｜他の日｜More days</a>`,
    '',
    '<i>資料：氣象廳（潮位表、府縣天氣預報、警報注意報），由琉球衝浪基地翻譯整理。這裡只轉載數據與官方預報，不代表能否下水；出發前請再看一次官方資訊與現場狀況。</i>',
  )
  return lines.join('\n')
}

async function sendMessage(env: Env, text: string, silent: boolean) {
  const response = await fetch(`https://api.telegram.org/bot${env.TELEGRAM_BOT_TOKEN}/sendMessage`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({
      chat_id: env.TELEGRAM_CHANNEL_ID,
      text,
      parse_mode: 'HTML',
      disable_notification: silent,
      link_preview_options: { is_disabled: true },
    }),
  })
  const result = (await response.json()) as { ok: boolean; description?: string; result?: { message_id: number } }
  if (!result.ok || !result.result) throw new Error(`Telegram sendMessage failed: ${result.description ?? response.status}`)
  return result.result.message_id
}

async function recordPost(env: Env, kind: PostKind, targetDate: string, messageId: number | null, status: string, detail: string | null) {
  await env.DB.prepare('INSERT OR REPLACE INTO tg_posts (kind, target_date, message_id, sent_at, status, detail) VALUES (?, ?, ?, ?, ?, ?)')
    .bind(kind, targetDate, messageId, jstIso(), status, detail)
    .run()
}

export async function postDaily(env: Env, kind: PostKind) {
  const today = jstToday()
  const target = kind === 'today' ? today : addDays(today, 1)

  const previous = await env.DB.prepare('SELECT status FROM tg_posts WHERE kind = ? AND target_date = ?').bind(kind, target).first<{ status: string }>()
  if (previous?.status === 'sent') return

  if (!env.TELEGRAM_BOT_TOKEN || !env.TELEGRAM_CHANNEL_ID) {
    await recordPost(env, kind, target, null, 'skipped', 'TELEGRAM_BOT_TOKEN 或 TELEGRAM_CHANNEL_ID 未設定')
    return
  }

  // 今天的報告要用 05:00 那一版，明天的報告要用 11:00 那一版；還是舊的就重抓一次，抓不到就照發並寫出資料時間
  const expected = `${today}T${kind === 'today' ? '05' : '11'}:00:00+09:00`
  const latest = await latestForecast(env)
  if (!latest || latest.report_datetime < expected) {
    try {
      await refreshForecast(env)
    } catch (error) {
      console.error('forecast refresh before posting failed', error)
    }
  }

  const report = await buildReport(env, target, 1)
  const text = buildDailyMessage(report, report.days[0], kind, env.SITE_URL)
  try {
    const messageId = await sendMessage(env, text, kind === 'today')
    await recordPost(env, kind, target, messageId, 'sent', null)
  } catch (error) {
    await recordPost(env, kind, target, null, 'failed', String(error))
    throw error
  }
}

type ChannelPost = { message_id: number; date: number; text?: string; chat: { id: number; username?: string } }

function isOurChannel(chat: ChannelPost['chat'], configured: string) {
  if (!configured) return false
  return configured.startsWith('@') ? `@${chat.username ?? ''}`.toLowerCase() === configured.toLowerCase() : String(chat.id) === configured
}

/** Kaito 在頻道發 `#現場` 開頭的貼文 → 存進 field_reports，網站今天的頁面顯示。 */
export async function handleWebhook(request: Request, env: Env) {
  if (!env.TELEGRAM_WEBHOOK_SECRET || request.headers.get('X-Telegram-Bot-Api-Secret-Token') !== env.TELEGRAM_WEBHOOK_SECRET) {
    return new Response('unauthorized', { status: 401 })
  }
  const update = (await request.json()) as { channel_post?: ChannelPost; edited_channel_post?: ChannelPost }
  const post = update.channel_post ?? update.edited_channel_post
  const text = post?.text?.trim()
  if (!post || !text || !isOurChannel(post.chat, env.TELEGRAM_CHANNEL_ID) || !text.startsWith('#現場')) {
    return new Response('ignored')
  }
  const body = text.replace(/^#現場\s*/, '')
  await env.DB.prepare('INSERT INTO field_reports (posted_at, text, tg_message_id) VALUES (?, ?, ?) ON CONFLICT(tg_message_id) DO UPDATE SET text = excluded.text')
    .bind(jstIso(new Date(post.date * 1000)), body, post.message_id)
    .run()
  return new Response('stored')
}
