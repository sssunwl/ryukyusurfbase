/**
 * 日出日落（SPEC §6.2）：NOAA 簡化公式，誤差約 1–2 分鐘，不接外部 API。
 * https://gml.noaa.gov/grad/solcalc/solareqns.PDF
 */

export const NAHA = { lat: 26.2125, lon: 127.6811 }

const RAD = Math.PI / 180

function toClock(minutes: number) {
  const total = Math.round(((minutes % 1440) + 1440) % 1440)
  return `${String(Math.floor(total / 60)).padStart(2, '0')}:${String(total % 60).padStart(2, '0')}`
}

export function sunTimes(date: string, lat = NAHA.lat, lon = NAHA.lon, tzHours = 9) {
  const [year, month, day] = date.split('-').map(Number)
  const leap = year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0)
  const dayOfYear = Math.round((Date.UTC(year, month - 1, day) - Date.UTC(year, 0, 1)) / 86_400_000) + 1
  // 以當地正午（換算成 UTC 小時）計算當天的太陽位置
  const gamma = ((2 * Math.PI) / (leap ? 366 : 365)) * (dayOfYear - 1 + (12 - tzHours - 12) / 24)

  const eqTime = 229.18 * (0.000075 + 0.001868 * Math.cos(gamma) - 0.032077 * Math.sin(gamma)
    - 0.014615 * Math.cos(2 * gamma) - 0.040849 * Math.sin(2 * gamma))
  const decl = 0.006918 - 0.399912 * Math.cos(gamma) + 0.070257 * Math.sin(gamma)
    - 0.006758 * Math.cos(2 * gamma) + 0.000907 * Math.sin(2 * gamma)
    - 0.002697 * Math.cos(3 * gamma) + 0.00148 * Math.sin(3 * gamma)

  const cosHourAngle = Math.cos(90.833 * RAD) / (Math.cos(lat * RAD) * Math.cos(decl)) - Math.tan(lat * RAD) * Math.tan(decl)
  const hourAngle = Math.acos(Math.min(1, Math.max(-1, cosHourAngle))) / RAD

  const sunriseUtc = 720 - 4 * (lon + hourAngle) - eqTime
  const sunsetUtc = 720 - 4 * (lon - hourAngle) - eqTime
  return { sunrise: toClock(sunriseUtc + tzHours * 60), sunset: toClock(sunsetUtc + tzHours * 60) }
}
