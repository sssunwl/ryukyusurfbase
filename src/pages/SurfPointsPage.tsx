import { Link } from 'react-router-dom'
import { Eyebrow } from '../components/Eyebrow'
import { WaveDivider } from '../components/WaveDivider'
import { byLanguage } from '../i18n/dictionaries'
import { useLanguage } from '../i18n/LanguageContext'
import { surfCopy } from '../i18n/surf'
import { SURF_POINTS, type SurfPoint } from '../surf/points'

const FIELD_ORDER: Array<keyof typeof surfCopy['zh-TW']['points']['fields']> = ['area', 'type', 'swell', 'offshore', 'tide', 'level', 'hazards', 'etiquette']

export function SurfPointsPage() {
  const { language } = useLanguage()
  const p = surfCopy[language].points

  return (
    <div className="inner-page surf-page">
      <section className="inner-hero" aria-labelledby="surf-points-title">
        <div className="shell inner-hero__content">
          <Eyebrow labels={byLanguage(surfCopy, (c) => c.points.eyebrow)} />
          <h1 id="surf-points-title">{p.title}</h1>
          <p>{p.lead}</p>
        </div>
      </section>
      <WaveDivider />
      <section className="section section--foam" aria-label={p.title}>
        <div className="shell">
          <div className="points-coasts">
            {p.coasts.map((coast) => {
              const points = SURF_POINTS.filter((point) => point.coast === coast.id)
              return (
                <article className="points-coast" id={coast.id} key={coast.id}>
                  <h2>{coast.name}</h2>
                  <dl className="surf-kv">
                    <div><dt>{p.facesLabel}</dt><dd>{coast.faces}</dd></div>
                    <div><dt>{p.swellLabel}</dt><dd>{coast.swell}</dd></div>
                    <div><dt>{p.offshoreLabel}</dt><dd>{coast.offshore}</dd></div>
                  </dl>
                  {points.length === 0 ? (
                    <p className="surf-note">{p.pending}</p>
                  ) : (
                    points.map((point) => <PointCard key={point.id} point={point} />)
                  )}
                </article>
              )
            })}
          </div>
          <p className="surf-note">{p.note}</p>
          <div className="surf-page-actions">
            <Link className="button button--dark" to="/surf-report">{p.toReport}</Link>
          </div>
        </div>
      </section>
    </div>
  )
}

function PointCard({ point }: { point: SurfPoint }) {
  const { language } = useLanguage()
  const p = surfCopy[language].points
  return (
    <section className="point-card">
      <h3>{point.name[language]}</h3>
      <dl className="surf-kv">
        {FIELD_ORDER.map((field) => (
          <div key={field}><dt>{p.fields[field]}</dt><dd>{point[field][language]}</dd></div>
        ))}
      </dl>
    </section>
  )
}
