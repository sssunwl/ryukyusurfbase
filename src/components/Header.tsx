import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { useLanguage } from '../i18n/LanguageContext'

export function Header() {
  const { language, setLanguage, copy } = useLanguage()
  const [open, setOpen] = useState(false)
  const location = useLocation()

  useEffect(() => setOpen(false), [location.pathname])

  return (
    <header className="site-header">
      <div className="shell header-inner">
        <Link className="brand" to="/" aria-label={copy.common.home}>
          <img className="brand-mark" src={`${import.meta.env.BASE_URL}logo.png`} alt="" width="38" height="38" />
          <span><strong>{copy.common.brand}</strong><small>{copy.common.brandEn}</small></span>
        </Link>

        <button className="menu-button" type="button" onClick={() => setOpen((value) => !value)} aria-expanded={open} aria-controls="site-navigation">
          <span className="sr-only">{open ? copy.common.closeMenu : copy.common.openMenu}</span>
          <span /><span />
        </button>

        <nav id="site-navigation" className={`site-nav ${open ? 'site-nav--open' : ''}`} aria-label="Primary navigation">
          <NavLink to="/">{copy.common.home}</NavLink>
          <NavLink to="/plans">{copy.common.plans}</NavLink>
          <NavLink to="/about">{copy.common.about}</NavLink>
          <div className="language-switch" aria-label={copy.common.language}>
            <button type="button" onClick={() => setLanguage('zh-TW')} aria-pressed={language === 'zh-TW'}>繁中</button>
            <span aria-hidden="true">/</span>
            <button type="button" onClick={() => setLanguage('ja-JP')} aria-pressed={language === 'ja-JP'}>日本語</button>
          </div>
        </nav>
      </div>
    </header>
  )
}
