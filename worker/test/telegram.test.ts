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
  warnings: {
    reportDatetime: '2026-09-12T07:24:00+09:00',
    fetchedAt: '2026-09-13T05:10:00+09:00',
    areas: [{
      areaCode: '471010',
      areaName: { 'ja-JP': '本島中南部', 'zh-TW': '本島中南部', en: 'Central & southern main island' },
      items: [{ category: 'VPWW59', name: { 'ja-JP': '波浪', 'zh-TW': '波浪', en: 'High waves' }, statuses: [{ 'ja-JP': '発表', 'zh-TW': '發布', en: 'issued' }], headline: null, reportDatetime: '2026-09-12T07:24:00+09:00' }],
    }],
  },
  sources: { forecastReportDatetime: '2026-09-13T05:00:00+09:00', forecastFetchedAt: null, weekReportDatetime: null, tideFetchedAt: null },
  modelLayerEnabled: false,
}

describe('buildDailyMessage', () => {
  const message = buildDailyMessage(report, report.days[0], 'today', 'https://example.com/ryukyusurfbase/')

  it('繁中為主、標題附日文：潮汐、日出日落、預報與網站連結', () => {
    expect(message).toContain('🌊 <b>琉球衝浪情報</b>｜サーフ情報')
    expect(message).toContain('2026-09-13（週日）')
    expect(message).toContain('滿潮 08:17 222cm・20:23 221cm')
    expect(message).toContain('乾潮 02:08 46cm・14:22 52cm')
    expect(message).toContain('日出 06:14')
    expect(message).toContain('東岸・中城灣港\n  —')
    expect(message).toContain('天氣：晴轉多雲（晴後曇）')
    expect(message).toContain('風：東風（東の風）')
    expect(message).toContain('▸ 本島中南部\n')
    expect(message).toContain('href="https://example.com/ryukyusurfbase/surf-report?date=2026-09-13"')
    expect(message).toContain('（沖縄気象台 2026-09-13 05:00 發布）')
    expect(message).toContain('本島中南部｜波浪：發布（発表）')
  })

  it('不放英文版內容', () => {
    expect(message).not.toContain('E wind')
    expect(message).not.toContain('Central & southern')
  })

  it('跳脫 HTML，翻譯不出來時只顯示日文原文', () => {
    expect(message).toContain('浪高：1.5メートル &lt;b&gt;')
  })

  it('不得出現判斷字眼（SPEC §6.1）', () => {
    expect(message).not.toMatch(/適合|不適合|建議|推薦|おすすめ|オススメ|recommend|rating|score|⭐|★/i)
  })
})
