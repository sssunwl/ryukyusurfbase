import { Link } from 'react-router-dom'
import type { ReactNode } from 'react'
import { Eyebrow } from '../components/Eyebrow'
import { MotionSection } from '../components/MotionSection'
import { WaveDivider } from '../components/WaveDivider'
import { byLanguage, dictionaries, otherLanguage } from '../i18n/dictionaries'
import { useLanguage } from '../i18n/LanguageContext'
import type { Copy, Plan, PriceRow } from '../i18n/types'
import { BOOKING_FORM_URL, INSTAGRAM_URL } from '../links'

export function PlansPage() {
  const { copy, language } = useLanguage()
  const p = copy.plansPage
  const otherPlans = dictionaries[otherLanguage(language)].plansSection.items

  return (
    <div className="inner-page plans-page">
      <section className="inner-hero inner-hero--plans" aria-labelledby="plans-page-title">
        <div className="shell inner-hero__content">
          <Eyebrow labels={byLanguage(dictionaries, (c) => c.plansPage.eyebrow)} />
          <h1 id="plans-page-title">{p.title}</h1>
          <p>{p.lead}</p>
        </div>
      </section>
      <WaveDivider />
      <section className="section section--foam plan-details" aria-label={p.title}>
        <div className="shell plan-details__list">
          {copy.plansSection.items.map((plan, index) => (
            <MotionSection className="plan-detail" key={plan.englishName}>
              <div className="plan-detail__head">
                <span>0{index + 1}</span>
                <div>
                  {otherPlans[index] && otherPlans[index].name !== plan.name && <p>{otherPlans[index].name}</p>}
                  <h2>{plan.name}</h2>
                </div>
              </div>
              <div className="plan-detail__summary">
                <div><span>{p.suitable}</span><p>{plan.forWhom}</p></div>
                <div><span>{copy.plansSection.duration}</span><p>{plan.duration}</p></div>
                <div><span>{copy.plansSection.price}</span><p>{plan.priceSummary}</p></div>
              </div>
              <PlanBody plan={plan} />
            </MotionSection>
          ))}
        </div>

        <div className="shell plan-info">
          <InfoCard pick={(c) => c.plansPage.locationTitle} title={p.locationTitle}>
            <List items={p.locationBody} />
          </InfoCard>
          <InfoCard pick={(c) => c.plansPage.rentalTitle} title={p.rentalTitle}>
            <PriceList rows={p.rentals} />
            <List items={p.rentalNotes} className="plan-list--note" />
          </InfoCard>
          <InfoCard pick={(c) => c.plansPage.policyTitle} title={p.policyTitle}>
            <List items={p.policies} />
          </InfoCard>
          <InfoCard pick={(c) => c.plansPage.rulesTitle} title={p.rulesTitle}>
            <List items={p.rules} />
          </InfoCard>
          <InfoCard pick={(c) => c.plansPage.localTitle} title={p.localTitle} wide>
            <List items={p.localRules} />
          </InfoCard>
        </div>

        <div className="shell plan-booking">
          <Eyebrow labels={byLanguage(dictionaries, (c) => c.plansPage.bookingTitle)} />
          <h2>{p.bookingTitle}</h2>
          <p>{p.bookingBody}</p>
          <div className="plan-page-action">
            <a className="button button--primary" href={BOOKING_FORM_URL} target="_blank" rel="noreferrer">{p.bookingButton}</a>
            <a className="text-link text-link--dark" href={INSTAGRAM_URL} target="_blank" rel="noreferrer">{copy.common.contactInstagram}</a>
          </div>
          <Link className="text-link text-link--dark plan-booking__home" to="/">← {copy.common.home}</Link>
        </div>
      </section>
    </div>
  )
}

function PlanBody({ plan }: { plan: Plan }) {
  const { copy } = useLanguage()
  const p = copy.plansPage

  // 還沒有 Kaito 提供資料的方案（目前是 Surf Trip）：只放說明與待補
  if (plan.prices.length === 0) {
    return (
      <div className="plan-detail__body">
        <div className="plan-detail__description"><h3>{p.details}</h3><p>{plan.description}</p></div>
        <div className="pending-block"><p>{p.pendingBody}</p></div>
      </div>
    )
  }

  return (
    <div className="plan-detail__body">
      <div className="plan-detail__description"><h3>{p.details}</h3><p>{plan.description}</p></div>
      <div><h3>{p.audience}</h3><List items={plan.audience} /></div>
      <div><h3>{p.features}</h3><List items={plan.features} /></div>
      <div>
        <h3>{p.priceDetail}</h3>
        <PriceList rows={plan.prices} />
        {plan.priceNote && <p className="plan-note">{plan.priceNote}</p>}
      </div>
      <div>
        {plan.included.length > 0 && (<><h3>{p.included}</h3><List items={plan.included} /></>)}
        {plan.extras.length > 0 && (<><h3 className={plan.included.length ? 'plan-subhead' : undefined}>{p.extras}</h3><List items={plan.extras} /></>)}
      </div>
    </div>
  )
}

function InfoCard({ pick, title, wide = false, children }: { pick: (copy: Copy) => string; title: string; wide?: boolean; children: ReactNode }) {
  return (
    <section className={`info-card${wide ? ' info-card--wide' : ''}`}>
      <Eyebrow labels={byLanguage(dictionaries, pick)} />
      <h2>{title}</h2>
      {children}
    </section>
  )
}

function List({ items, className = '' }: { items: string[]; className?: string }) {
  return <ul className={`plan-list ${className}`.trim()}>{items.map((item) => <li key={item}>{item}</li>)}</ul>
}

function PriceList({ rows }: { rows: PriceRow[] }) {
  return (
    <dl className="price-list">
      {rows.map((row) => <div key={row.label}><dt>{row.label}</dt><dd>{row.value}</dd></div>)}
    </dl>
  )
}
