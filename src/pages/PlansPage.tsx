import { Link } from 'react-router-dom'
import { MotionSection } from '../components/MotionSection'
import { WaveDivider } from '../components/WaveDivider'
import { useLanguage } from '../i18n/LanguageContext'

export function PlansPage() {
  const { copy } = useLanguage()

  return (
    <div className="inner-page plans-page">
      <section className="inner-hero inner-hero--plans" aria-labelledby="plans-page-title">
        <div className="shell inner-hero__content">
          <p className="eyebrow">{copy.plansPage.eyebrow}</p>
          <h1 id="plans-page-title">{copy.plansPage.title}</h1>
          <p>{copy.plansPage.lead}</p>
        </div>
      </section>
      <WaveDivider />
      <section className="section section--foam plan-details" aria-label={copy.plansPage.title}>
        <div className="shell plan-details__list">
          {copy.plansSection.items.map((plan, index) => (
            <MotionSection className="plan-detail" key={plan.englishName}>
              <div className="plan-detail__head">
                <span>0{index + 1}</span>
                <div><p>{plan.englishName}</p><h2>{plan.name}</h2></div>
              </div>
              <div className="plan-detail__summary">
                <div><span>{copy.plansPage.suitable}</span><p>{plan.forWhom}</p></div>
                <div><span>{copy.plansSection.duration}</span><p>TBD</p></div>
                <div><span>{copy.plansSection.price}</span><p>TBD</p></div>
              </div>
              <div className="plan-detail__body">
                <div className="plan-detail__description">
                  <h3>{copy.plansPage.details}</h3><p>{plan.description}</p>
                </div>
                <PendingBlock title={copy.plansPage.included} body={copy.plansPage.pendingBody} />
                <PendingBlock title={copy.plansPage.notIncluded} body={copy.plansPage.pendingBody} />
                <PendingBlock title={copy.plansPage.cancellation} body={copy.plansPage.pendingBody} />
                <PendingBlock title={copy.plansPage.rules} body={copy.plansPage.pendingBody} />
              </div>
            </MotionSection>
          ))}
        </div>
        <div className="shell plan-page-action">
          <a className="button button--dark" href="https://www.instagram.com/ryukyusurfbase/" target="_blank" rel="noreferrer">{copy.common.contactInstagram}</a>
          <Link className="text-link text-link--dark" to="/">← {copy.common.home}</Link>
        </div>
      </section>
    </div>
  )
}

function PendingBlock({ title, body }: { title: string; body: string }) {
  return <div className="pending-block"><h3>{title}</h3><p>{body}</p></div>
}
