import { Link } from 'react-router-dom'
import { Eyebrow } from '../components/Eyebrow'
import { WaveDivider } from '../components/WaveDivider'
import { byLanguage } from '../i18n/dictionaries'
import { useLanguage } from '../i18n/LanguageContext'
import { surfCopy } from '../i18n/surf'

/**
 * 沖繩四面海岸：只放通則（SPEC §6.3，2026-09-12 SS 定案）。
 * 依 Kaito 的在地規則，不列出具體浪點，也不連動當天數據。
 */
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
            {p.coasts.map((coast) => (
              <article className="points-coast" id={coast.id} key={coast.id}>
                <h2>{coast.name}</h2>
                <dl className="surf-kv">
                  <div><dt>{p.facesLabel}</dt><dd>{coast.faces}</dd></div>
                  <div><dt>{p.swellLabel}</dt><dd>{coast.swell}</dd></div>
                  <div><dt>{p.offshoreLabel}</dt><dd>{coast.offshore}</dd></div>
                </dl>
              </article>
            ))}
          </div>
          <p className="surf-note">{p.localNote}</p>
          <p className="surf-note">{p.note}</p>
          <div className="surf-page-actions">
            <Link className="button button--dark" to="/surf-report">{p.toReport}</Link>
          </div>
        </div>
      </section>
    </div>
  )
}
