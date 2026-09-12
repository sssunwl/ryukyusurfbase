import { describe, expect, it } from 'vitest'
import { translatePhrase } from '../src/phrases'
import { weatherCodeLabel } from '../src/weatherCodes'

describe('translatePhrase', () => {
  it('風：方位與「後」', () => {
    expect(translatePhrase('東の風　後　北東の風')).toEqual({ 'ja-JP': '東の風 後 北東の風', 'zh-TW': '東風後轉東北風', en: 'E wind then NE wind' })
  })

  it('浪：全形數字與「うねり　を伴う」', () => {
    const result = translatePhrase('１．５メートル　後　２メートル　うねり　を伴う')
    expect(result?.['ja-JP']).toBe('1.5メートル 後 2メートル うねり を伴う')
    expect(result?.['zh-TW']).toBe('1.5 公尺後轉2 公尺，伴有湧浪')
    expect(result?.en).toBe('1.5 m then 2 m with swell')
  })

  it('查不到的片語就不翻，回傳 null，保留日文原文', () => {
    const result = translatePhrase('北の風　のち　未知の表現')
    expect(result?.['ja-JP']).toBe('北の風 のち 未知の表現')
    expect(result?.['zh-TW']).toBeNull()
    expect(result?.en).toBeNull()
  })
})

describe('weatherCodeLabel', () => {
  it('官方日文、英文，中文依規則轉換', () => {
    expect(weatherCodeLabel('101')).toEqual({ 'ja-JP': '晴時々曇', 'zh-TW': '晴時多雲', en: 'Partly cloudy' })
    expect(weatherCodeLabel('202')?.['zh-TW']).toBe('多雲短暫雨')
    expect(weatherCodeLabel('111')?.['zh-TW']).toBe('晴轉多雲')
    expect(weatherCodeLabel('240')?.['zh-TW']).toBe('多雲時雨並伴有雷')
  })

  it('全部代碼的中文都不能殘留假名', () => {
    for (const code of ['100', '120', '121', '125', '130', '131', '231', '302', '308', '322', '328', '329', '406', '426']) {
      expect(weatherCodeLabel(code)?.['zh-TW'], code).not.toBeNull()
    }
  })

  it('不存在的代碼回傳 null', () => {
    expect(weatherCodeLabel('999')).toBeNull()
    expect(weatherCodeLabel(undefined)).toBeNull()
  })
})
