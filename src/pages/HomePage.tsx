import { Link } from 'react-router-dom'
import { Eyebrow } from '../components/Eyebrow'
import { MotionSection } from '../components/MotionSection'
import { ZoneMarker } from '../components/ZoneMarker'
import { WaveCanvas } from '../components/WaveCanvas'
import { WaveDivider } from '../components/WaveDivider'
import { byLanguage, dictionaries, otherLanguage } from '../i18n/dictionaries'
import { useLanguage } from '../i18n/LanguageContext'
import { BOOKING_FORM_URL, INSTAGRAM_URL } from '../links'

export function HomePage() {
  const { copy, language } = useLanguage()
  const otherPlans = dictionaries[otherLanguage(language)].plansSection.items

  return (
    <>
      <section className="hero" aria-labelledby="hero-title">
        <WaveCanvas />
        <div className="shell hero-content">
          <ZoneMarker {...copy.markers.hero} />
          <Eyebrow labels={byLanguage(dictionaries, (c) => c.hero.eyebrow)} />
          <h1 id="hero-title">{copy.hero.title}</h1>
          <p className="hero-copy">{copy.hero.body}</p>
          <div className="button-row">
            <a className="button button--primary" href={BOOKING_FORM_URL} target="_blank" rel="noreferrer">{copy.hero.primary}<ArrowIcon /></a>
            <Link className="text-link" to="/plans">{copy.hero.secondary}<ArrowIcon /></Link>
          </div>
        </div>
        <WaveDivider className="wave-divider--shore" />
        <a className="scroll-cue" href="#plans-preview"><span>{copy.hero.scroll}</span><i aria-hidden="true" /></a>
      </section>

      <MotionSection id="plans-preview" className="section section--foam plans-preview" aria-labelledby="plans-title">
        <div className="shell"><ZoneMarker {...copy.markers.plans} tone="dark" /></div>
        <div className="shell">
          <div className="section-heading section-heading--dark">
            <Eyebrow labels={byLanguage(dictionaries, (c) => c.plansSection.eyebrow)} />
            <h2 id="plans-title">{copy.plansSection.title}</h2>
            <p>{copy.plansSection.body}</p>
          </div>
          <div className="plan-grid">
            {copy.plansSection.items.map((plan, index) => (
              <article className="plan-card" key={plan.englishName}>
                <span className="plan-card__number">0{index + 1}</span>
                {/* 方案名稱的小字放另一種語言；兩邊一樣（例如 Surf Trip）就不重複 */}
                {otherPlans[index] && otherPlans[index].name !== plan.name && <p className="plan-card__english">{otherPlans[index].name}</p>}
                <h3>{plan.name}</h3>
                <p className="plan-card__audience">{plan.forWhom}</p>
                <p>{plan.description}</p>
                <dl>
                  <div><dt>{copy.plansSection.duration}</dt><dd>{plan.duration}</dd></div>
                  <div><dt>{copy.plansSection.price}</dt><dd>{plan.priceSummary}</dd></div>
                  <div><dt>{copy.plansSection.included}</dt><dd>{plan.includes}</dd></div>
                </dl>
              </article>
            ))}
          </div>
          <div className="center-action"><Link className="text-link text-link--dark" to="/plans">{copy.common.viewPlans}<ArrowIcon /></Link></div>
        </div>
      </MotionSection>

      <WaveDivider />

      <MotionSection className="section why-section" aria-labelledby="why-title">
        <div className="shell"><ZoneMarker {...copy.markers.why} /></div>
        <div className="shell why-layout">
          <div className="section-heading section-heading--sticky">
            <Eyebrow labels={byLanguage(dictionaries, (c) => c.why.eyebrow)} />
            <h2 id="why-title">{copy.why.title}</h2>
            <div className="tide-mark" aria-hidden="true"><span /><span /><span /></div>
          </div>
          <ol className="reason-list">
            {copy.why.items.map((item, index) => (
              <li key={item.title}>
                <span>0{index + 1}</span>
                <div><h3>{item.title}</h3><p>{item.body}</p></div>
              </li>
            ))}
          </ol>
        </div>
      </MotionSection>

      <MotionSection className="section day-section" aria-labelledby="day-title">
        <div className="shell"><ZoneMarker {...copy.markers.day} /></div>
        <div className="shell">
          <div className="section-heading section-heading--day">
            <Eyebrow labels={byLanguage(dictionaries, (c) => c.day.eyebrow)} />
            <h2 id="day-title">{copy.day.title}</h2>
            <p>{copy.day.body}</p>
          </div>
          <ol className="day-timeline">
            {copy.day.steps.map((step) => (
              <li key={step.number}>
                <span className="day-timeline__number">{step.number}</span>
                <div><h3>{step.title}</h3><p>{step.body}</p></div>
              </li>
            ))}
          </ol>
        </div>
      </MotionSection>

      <WaveDivider flip />

      <MotionSection className="section section--foam coach-section" aria-labelledby="coach-title">
        <div className="shell"><ZoneMarker {...copy.markers.coach} tone="dark" /></div>
        <div className="shell coach-layout">
          <div className="photo-placeholder photo-placeholder--portrait" data-placeholder="coach-photo" role="img" aria-label={copy.coach.placeholder}>
            <span>KAITO</span><small>{copy.coach.placeholder}</small>
          </div>
          <div className="coach-copy">
            <Eyebrow labels={byLanguage(dictionaries, (c) => c.coach.eyebrow)} />
            <h2 id="coach-title">{copy.coach.title}</h2>
            <p>{copy.coach.intro}</p>
            <Link className="text-link text-link--dark" to="/about">{copy.coach.link}<ArrowIcon /></Link>
          </div>
        </div>
      </MotionSection>

      <MotionSection className="section faq-section" aria-labelledby="faq-title">
        <div className="shell"><ZoneMarker {...copy.markers.faq} /></div>
        <div className="shell faq-layout">
          <div className="section-heading">
            <Eyebrow labels={byLanguage(dictionaries, (c) => c.faq.eyebrow)} />
            <h2 id="faq-title">{copy.faq.title}</h2>
          </div>
          <div className="faq-list">
            {copy.faq.items.map((item, index) => (
              <details key={item.question}>
                <summary><span>0{index + 1}</span>{item.question}<i aria-hidden="true" /></summary>
                <p>{item.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </MotionSection>

      <MotionSection className="booking-section" aria-labelledby="booking-title">
        <div className="shell"><ZoneMarker {...copy.markers.booking} tone="dark" /></div>
        <div className="booking-line booking-line--one" aria-hidden="true" />
        <div className="booking-line booking-line--two" aria-hidden="true" />
        <div className="shell booking-content">
          <Eyebrow labels={byLanguage(dictionaries, (c) => c.booking.eyebrow)} />
          <h2 id="booking-title">{copy.booking.title}</h2>
          <p>{copy.booking.body}</p>
          <a className="button button--light" href={BOOKING_FORM_URL} target="_blank" rel="noreferrer">{copy.booking.button}<ArrowIcon /></a>
          <div className="booking-alt"><a className="text-link text-link--dark" href={INSTAGRAM_URL} target="_blank" rel="noreferrer">{copy.booking.alt}</a></div>
          <small>{copy.booking.note}</small>
        </div>
      </MotionSection>
    </>
  )
}

function ArrowIcon() {
  return <svg className="arrow-icon" viewBox="0 0 20 20" aria-hidden="true"><path d="M3 10h13M11 5l5 5-5 5" /></svg>
}
