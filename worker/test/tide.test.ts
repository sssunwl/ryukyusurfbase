import { describe, expect, it } from 'vitest'
import { parseTideFile, parseTideLine } from '../src/tide'

// 2026-09-12 從氣象廳實際下載的原始行（行首空白是格式的一部分，不能刪）
const NH_0912 = ' 80 57 56 76114158199224227207169122 78 47 38 54 8913518021222321017913626 912NH 739229195822399999999999999 134 531352 3899999999999999'
const NH_0913 = ' 93 60 46 54 83125169204221216191151108 72 53 57 8112016420021921719315526 913NH 817222202322199999999999999 2 8 461422 5299999999999999'
const ZO_0913 = ' 81 57 54 72106148188215222208176134 94 66 58 7110214318321222121017913826 913ZO 750222195722199999999999999 139 531353 5799999999999999'

describe('parseTideLine', () => {
  it('那霸 2026-09-13：時和分用空白補位也要正確解析', () => {
    const day = parseTideLine(NH_0913)
    expect(day).not.toBeNull()
    expect(day!.station).toBe('NH')
    expect(day!.date).toBe('2026-09-13')
    expect(day!.highs).toEqual([{ time: '08:17', cm: 222 }, { time: '20:23', cm: 221 }])
    expect(day!.lows).toEqual([{ time: '02:08', cm: 46 }, { time: '14:22', cm: 52 }])
    expect(day!.hourly).toHaveLength(24)
    expect(day!.hourly.slice(6, 10)).toEqual([169, 204, 221, 216])
  })

  it('中城湾港 2026-09-13', () => {
    const day = parseTideLine(ZO_0913)
    expect(day!.station).toBe('ZO')
    expect(day!.highs).toEqual([{ time: '07:50', cm: 222 }, { time: '19:57', cm: 221 }])
    expect(day!.lows).toEqual([{ time: '01:39', cm: 53 }, { time: '13:53', cm: 57 }])
  })

  it('長度不足的行直接略過', () => {
    expect(parseTideLine('')).toBeNull()
    expect(parseTideLine(NH_0913.slice(0, 100))).toBeNull()
  })
})

describe('parseTideFile', () => {
  it('逐行解析並忽略空行與 CRLF', () => {
    const days = parseTideFile(`${NH_0912}\r\n${NH_0913}\n\n`)
    expect(days.map((day) => day.date)).toEqual(['2026-09-12', '2026-09-13'])
    expect(days[0].highs[0]).toEqual({ time: '07:39', cm: 229 })
    expect(days[0].lows).toEqual([{ time: '01:34', cm: 53 }, { time: '13:52', cm: 38 }])
  })
})
