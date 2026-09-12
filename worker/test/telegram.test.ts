import { describe, expect, it } from 'vitest'
import type { SurfReport } from '../../shared/surf'
import { buildDailyMessage } from '../src/telegram'

const report: SurfReport = {
  generatedAt: '2026-09-13T05:15:00+09:00',
  today: '2026-09-13',
  days: [{
    date: '2026-09-13',
    sun: { sunrise: '06:14', sunset: '18:36' },
    tides: {
      NH: { station: 'NH', date: '2026-09-13', hourly: [], highs: [{ time: '08:17', cm: 222 }, { time: '20:23', cm: 221 }], lows: [{ time: '02:08', cm: 46 }, { time: '14:22', cm: 52 }] },
      ZO: null,
    },
    forecast: [{
      code: '471010',
      name: { 'ja-JP': '本島中南部', 'zh-TW': '本島中南部', en: 'Central & southern main island' },
      weather: { 'ja-JP': '晴後曇', 'zh-TW': '晴轉多雲', en: 'Clear, cloudy later' },
      weatherDetail: null,
      wind: { 'ja-JP': '東の風', 'zh-TW': '東風', en: 'E wind' },
      wave: { 'ja-JP': '1.5メートル <b>', 'zh-TW': null, en: null },
    }],
    week: null,
    fieldReports: [],
  }],
  warnings: { reportDatetime: '2026-09-12T07:24:00+09:00', fetchedAt: '2026-09-13T05:10:00+09:00', areas: [] },
  sources: { forecastReportDatetime: '2026-09-13T05:00:00+09:00', forecastFetchedAt: null, weekReportDatetime: null, tideFetchedAt: null },
  modelLayerEnabled: false,
}

describe('buildDailyMessage', () => {
  const message = buildDailyMessage(report, report.days[0], 'today', 'https://example.com/ryukyusurfbase/')

  it('包含潮汐、日出日落、預報與網站連結', () => {
    expect(message).toContain('滿潮 High 08:17 222cm・20:23 221cm')
    expect(message).toContain('乾潮 Low 02:08 46cm・14:22 52cm')
    expect(message).toContain('日出 Sunrise 06:14')
    expect(message).toContain('東岸 East・中城湾港\n  —')
    expect(message).toContain('風 Wind：東風 / 東の風 / E wind')
    expect(message).toContain('本島中南部 / Central &amp; southern main island')
    expect(message).toContain('href="https://example.com/ryukyusurfbase/surf-report?date=2026-09-13"')
    expect(message).toContain('（沖縄気象台 2026-09-13 05:00）')
    expect(message).toContain('目前沒有發布')
  })

  it('跳脫 HTML，翻譯不出來時只顯示日文原文', () => {
    expect(message).toContain('浪 Waves：1.5メートル &lt;b&gt;')
  })

  it('不得出現判斷字眼（SPEC §6.1）', () => {
    expect(message).not.toMatch(/適合|不適合|建議|推薦|おすすめ|オススメ|recommend|rating|score|⭐|★/i)
  })
})
