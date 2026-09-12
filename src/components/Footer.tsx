import { Link } from 'react-router-dom'
import { useLanguage } from '../i18n/LanguageContext'

export function Footer() {
  const { copy } = useLanguage()
  return (
    <footer className="site-footer">
      <div className="shell footer-grid">
        <div className="footer-brand">
          <span className="eyebrow">RYUKYU SURF BASE</span>
          <p>{copy.common.brand}</p>
        </div>
        <div>
          <h2>{copy.footer.locationLabel}</h2>
          <p>{copy.footer.location}</p>
        </div>
        <div>
          <h2>{copy.footer.seasonLabel}</h2>
          <p>{copy.footer.season}</p>
        </div>
        <div>
          <h2>{copy.footer.socialLabel}</h2>
          <p className="footer-links">
            <a href="https://www.instagram.com/ryukyusurfbase/" target="_blank" rel="noreferrer">Instagram</a>
            <a href="https://www.facebook.com/profile.php?id=61588812223643" target="_blank" rel="noreferrer">Facebook</a>
            <a href="https://www.threads.com/@ryukyusurfbase" target="_blank" rel="noreferrer">Threads</a>
          </p>
        </div>
      </div>
      <div className="shell footer-bottom">
        <span>© {new Date().getFullYear()} {copy.footer.copyright}</span>
        <span className="footer-bottom__links">
          <Link to="/plans">{copy.common.plans}</Link>
          <Link to="/surf-report">{copy.common.surfReport}</Link>
          <Link to="/surf-guide">{copy.common.surfGuide}</Link>
          <Link to="/surf-points">{copy.common.surfPoints}</Link>
          <Link to="/about">{copy.common.about}</Link>
        </span>
      </div>
    </footer>
  )
}
