import { describe, expect, it } from 'vitest'
import { parseForecast, parseWarnings } from '../src/jma'
import fixture from './fixtures/forecast-471000-20260912.json'

describe('parseForecast（2026-09-12 17:00 發布的實際資料）', () => {
  const parsed = parseForecast(fixture)

  it('三天份、只保留本島兩區（不含久米島）', () => {
    expect(Object.keys(parsed.daily)).toEqual(['2026-09-12', '2026-09-13', '2026-09-14'])
    expect(parsed.daily['2026-09-12'].map((area) => area.code)).toEqual(['471010', '471020'])
  })

  it('風與浪翻譯', () => {
    const central = parsed.daily['2026-09-12'][0]
    expect(central.wind).toEqual({ 'ja-JP': '東の風', 'zh-TW': '東風', en: 'E wind' })
    expect(central.wave?.['zh-TW']).toBe('1.5 公尺')
    const dayAfter = parsed.daily['2026-09-14'][0]
    expect(dayAfter.wave?.en).toBe('2 m with swell')
  })

  it('週間預報：空字串轉 null，數字轉數值', () => {
    expect(parsed.week['2026-09-13'].pop).toBeNull()
    expect(parsed.week['2026-09-14'].pop).toBe(60)
    expect(parsed.week['2026-09-15'].reliability).toBe('C')
    expect(parsed.week['2026-09-13'].weather?.['ja-JP']).toBe('晴後一時雨')
  })
})

describe('parseWarnings（新制 r8 格式）', () => {
  const raw = [
    {
      reportDatetime: '2026-09-12T07:24:00+09:00', dataTypeCode: 'VPWW59', headlineText: '沖縄本島地方では、高波に注意してください。',
      warning: { class10Items: [
        { areaCode: '471010', kinds: [{ code: '16', status: '発表' }] },
        { areaCode: '471020', kinds: [{ status: '発表警報・注意報はなし' }] },
      ] },
    },
    {
      reportDatetime: '2026-09-06T12:19:00+09:00', dataTypeCode: 'VPWW55', headlineText: '注意報を解除します。',
      warning: { class10Items: [{ areaCode: '471010', kinds: [{ code: '10', status: '解除' }] }] },
    },
  ]

  it('只列出發布中的類別，解除的不列', () => {
    const parsed = parseWarnings(raw)
    expect(parsed.reportDatetime).toBe('2026-09-12T07:24:00+09:00')
    const central = parsed.areas.find((area) => area.areaCode === '471010')!
    expect(central.items).toHaveLength(1)
    expect(central.items[0].name.en).toBe('High waves')
    expect(central.items[0].statuses).toEqual([{ 'ja-JP': '発表', 'zh-TW': '發布', en: 'issued' }])
    expect(parsed.areas.find((area) => area.areaCode === '471020')!.items).toHaveLength(0)
  })
})
