import { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Eyebrow } from '../components/Eyebrow'
import { CoastDiagram } from '../components/surf/CoastDiagram'
import { WaveDivider } from '../components/WaveDivider'
import { tri } from '../i18n/dictionaries'
import { useLanguage } from '../i18n/LanguageContext'
import { surfCopy } from '../i18n/surf'

export function SurfGuidePage() {
  const { language } = useLanguage()
  const g = surfCopy[language].guide
  const r = surfCopy[language].report
  const { hash } = useLocation()

  // 從衝浪情報的「怎麼看 →」連過來時，捲到對應步驟
  useEffect(() => {
    if (!hash) return
    const target = document.getElementById(decodeURIComponent(hash.slice(1)))
    target?.scrollIntoView({ block: 'start' })
  }, [hash])

  return (
    <div className="inner-page surf-page">
      <section className="inner-hero" aria-labelledby="surf-guide-title">
        <div className="shell inner-hero__content">
          <Eyebrow labels={tri(surfCopy, (c) => c.guide.eyebrow)} />
          <h1 id="surf-guide-title">{g.title}</h1>
          <p>{g.lead}</p>
        </div>
      </section>
      <WaveDivider />
      <section className="section section--foam" aria-label={g.title}>
        <div className="shell">
          <ol className="guide-steps">
            {g.steps.map((step, index) => (
              <li className="guide-step" id={step.id} key={step.id} data-draft="kaito-review">
                <span className="guide-step__n">0{index + 1}</span>
                <div>
                  <h2>{step.title}</h2>
                  <dl>
                    <div><dt>{g.lookLabel}</dt><dd>{step.look}</dd></div>
                    <div><dt>{g.meaningLabel}</dt><dd>{step.meaning}</dd></div>
                    <div><dt>{g.mythLabel}</dt><dd>{step.myth}</dd></div>
                  </dl>
                </div>
              </li>
            ))}
          </ol>

          <div className="guide-coasts">
            <CoastDiagram coasts={r.coasts} swellLabel={g.swellLabel} offshoreLabel={g.offshoreLabel} title={g.coastsTitle} />
            <div>
              <h2>{g.coastsTitle}</h2>
              <p>{g.coastsBody}</p>
              <Link className="text-link text-link--dark" to="/surf-points">{r.toPoints} →</Link>
            </div>
          </div>

          <div className="guide-rest" id="rest">
            <h2>{g.restTitle}</h2>
            <p>{g.restBody}</p>
          </div>

          <div className="surf-page-actions">
            <Link className="button button--dark" to="/surf-report">{g.toReport}</Link>
          </div>
          <p className="surf-draft">{g.draftNote}</p>
        </div>
      </section>
    </div>
  )
}
