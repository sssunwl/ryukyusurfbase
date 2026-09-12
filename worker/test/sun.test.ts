import { describe, expect, it } from 'vitest'
import { sunTimes } from '../src/sun'

// 標準答案：國立天文台 那覇 2026 年 9 月 https://eco.mtk.nao.ac.jp/koyomi/dni/2026/s4809.html
const NAOJ_NAHA = [
  { date: '2026-09-01', sunrise: '06:09', sunset: '18:49' },
  { date: '2026-09-13', sunrise: '06:14', sunset: '18:36' },
  { date: '2026-09-30', sunrise: '06:21', sunset: '18:17' },
]

const minutes = (clock: string) => {
  const [hour, minute] = clock.split(':').map(Number)
  return hour * 60 + minute
}

describe('sunTimes（那霸）', () => {
  for (const expected of NAOJ_NAHA) {
    it(`${expected.date} 與國立天文台誤差在 2 分鐘內`, () => {
      const actual = sunTimes(expected.date)
      expect(Math.abs(minutes(actual.sunrise) - minutes(expected.sunrise))).toBeLessThanOrEqual(2)
      expect(Math.abs(minutes(actual.sunset) - minutes(expected.sunset))).toBeLessThanOrEqual(2)
    })
  }
})
