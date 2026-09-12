import type { TideDay } from '../../../shared/surf'

type Props = {
  west: TideDay | null
  east: TideDay | null
  sunrise: string
  sunset: string
  label: string
}

const WIDTH = 640
const HEIGHT = 230
const PAD = { left: 40, right: 12, top: 14, bottom: 26 }

const toHour = (clock: string) => {
  const [hour, minute] = clock.split(':').map(Number)
  return hour + minute / 60
}

/** 潮位曲線：數據原樣畫出，陰影標出日落到日出。不標任何「好／壞」時段（SPEC §6.1）。 */
export function TideChart({ west, east, sunrise, sunset, label }: Props) {
  const series = [west, east].filter((day): day is TideDay => !!day && day.hourly.length === 24)
  if (series.length === 0) return null

  const values = series.flatMap((day) => day.hourly)
  const min = Math.floor(Math.min(...values) / 50) * 50
  const max = Math.ceil(Math.max(...values) / 50) * 50 || 50
  const plotWidth = WIDTH - PAD.left - PAD.right
  const plotHeight = HEIGHT - PAD.top - PAD.bottom
  const x = (hour: number) => PAD.left + (hour / 23) * plotWidth
  const y = (value: number) => PAD.top + ((max - value) / (max - min || 1)) * plotHeight
  const path = (day: TideDay) => day.hourly.map((value, hour) => `${hour === 0 ? 'M' : 'L'}${x(hour).toFixed(1)} ${y(value).toFixed(1)}`).join(' ')

  const gridValues: number[] = []
  for (let value = min; value <= max; value += 50) gridValues.push(value)

  const sunriseX = x(Math.min(23, toHour(sunrise)))
  const sunsetX = x(Math.min(23, toHour(sunset)))

  return (
    <svg className="tide-chart" viewBox={`0 0 ${WIDTH} ${HEIGHT}`} role="img" aria-label={label}>
      <rect className="tide-chart__night" x={PAD.left} y={PAD.top} width={Math.max(0, sunriseX - PAD.left)} height={plotHeight} />
      <rect className="tide-chart__night" x={sunsetX} y={PAD.top} width={Math.max(0, x(23) - sunsetX)} height={plotHeight} />
      {gridValues.map((value) => (
        <g key={value}>
          <line className="tide-chart__grid" x1={PAD.left} x2={WIDTH - PAD.right} y1={y(value)} y2={y(value)} />
          <text className="tide-chart__axis" x={PAD.left - 6} y={y(value) + 4} textAnchor="end">{value}</text>
        </g>
      ))}
      {[0, 3, 6, 9, 12, 15, 18, 21].map((hour) => (
        <text key={hour} className="tide-chart__axis" x={x(hour)} y={HEIGHT - 6} textAnchor="middle">{hour}</text>
      ))}
      {east && east.hourly.length === 24 && <path className="tide-chart__east" d={path(east)} />}
      {west && west.hourly.length === 24 && <path className="tide-chart__west" d={path(west)} />}
    </svg>
  )
}
