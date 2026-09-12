import { Link } from 'react-router-dom'
import { Eyebrow } from '../components/Eyebrow'
import { MotionSection } from '../components/MotionSection'
import { WaveDivider } from '../components/WaveDivider'
import { dictionaries, tri } from '../i18n/dictionaries'
import { useLanguage } from '../i18n/LanguageContext'

export function AboutPage() {
  const { copy } = useLanguage()

  return (
    <div className="inner-page about-page">
      <section className="inner-hero" aria-labelledby="about-page-title">
        <div className="shell inner-hero__content">
          <Eyebrow labels={tri(dictionaries, (c) => c.aboutPage.eyebrow)} />
          <h1 id="about-page-title">{copy.aboutPage.title}</h1>
          <p>{copy.aboutPage.lead}</p>
        </div>
      </section>
      <WaveDivider />
      <MotionSection className="section section--foam about-story" aria-label={copy.aboutPage.title}>
        <div className="shell about-story__grid">
          <div className="photo-placeholder photo-placeholder--about" data-placeholder="coach-story-photo" role="img" aria-label={copy.aboutPage.placeholder}>
            <span>OKINAWA</span><small>{copy.aboutPage.placeholder}</small>
          </div>
          <div className="story-copy">
            <span className="story-copy__mark" aria-hidden="true">“</span>
            <p>{copy.aboutPage.story}</p>
            <Link className="text-link text-link--dark" to="/">← {copy.aboutPage.back}</Link>
          </div>
        </div>
      </MotionSection>
    </div>
  )
}
