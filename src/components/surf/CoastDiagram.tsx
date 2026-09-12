type Labels = Record<'west' | 'east' | 'south' | 'north', string>

type Props = { coasts: Labels; swellLabel: string; offshoreLabel: string; title: string }

/**
 * 沖繩本島四面海岸示意圖。只表達通則：湧浪從海岸面向的方向來，
 * 離岸風從陸地那一側吹出去。刻意抽象化，不標浪點、不連動當天數據（SPEC §6.1）。
 */
export function CoastDiagram({ coasts, swellLabel, offshoreLabel, title }: Props) {
  return (
    <svg className="coast-diagram" viewBox="0 0 360 360" role="img" aria-label={title}>
      <defs>
        <marker id="arrow-swell" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M0 0 10 5 0 10z" className="coast-diagram__head-swell" />
        </marker>
        <marker id="arrow-wind" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M0 0 10 5 0 10z" className="coast-diagram__head-wind" />
        </marker>
      </defs>

      <path className="coast-diagram__island" d="M150 92c22-14 52-12 70 6 16 16 14 40 10 62-4 24-2 48-12 70-12 26-40 42-68 38-26-4-44-26-48-52-4-24 6-46 12-68 6-22 14-44 36-56z" />

      {/* 湧浪：從外海指向海岸 */}
      <path className="coast-diagram__swell" d="M20 180h72" />
      <path className="coast-diagram__swell" d="M340 180h-80" />
      <path className="coast-diagram__swell" d="M180 344v-44" />
      <path className="coast-diagram__swell" d="M180 16v56" />

      {/* 離岸風：從島內往外吹 */}
      <path className="coast-diagram__wind" d="M150 150h-44" />
      <path className="coast-diagram__wind" d="M210 210h44" />
      <path className="coast-diagram__wind" d="M170 240v40" />
      <path className="coast-diagram__wind" d="M190 120v-36" />

      <text x="22" y="168">{coasts.west}</text>
      <text x="338" y="168" textAnchor="end">{coasts.east}</text>
      <text x="194" y="340">{coasts.south}</text>
      <text x="194" y="30">{coasts.north}</text>

      <g className="coast-diagram__legend" transform="translate(16 300)">
        <path className="coast-diagram__swell" d="M0 8h26" />
        <text x="34" y="12">{swellLabel}</text>
        <path className="coast-diagram__wind" d="M0 32h26" />
        <text x="34" y="36">{offshoreLabel}</text>
      </g>
    </svg>
  )
}
