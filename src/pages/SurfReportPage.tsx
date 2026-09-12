import { Link, useSearchParams } from 'react-router-dom'
import type { ReactNode } from 'react'
import type { SurfDay, SurfReport, TideDay, Tri } from '../../shared/surf'
import { Eyebrow } from '../components/Eyebrow'
import { TideChart } from '../components/surf/TideChart'
import { WaveDivider } from '../components/WaveDivider'
import { byLanguage } from '../i18n/dictionaries'
import { useLanguage } from '../i18n/LanguageContext'
import { surfCopy, type SurfCopy } from '../i18n/surf'
import type { Language } from '../i18n/types'
import { COAST_WINDY, pickTri, useSurfReport } from '../surf/api'

const JMA_WARNING_PAGE = 'https://www.jma.go.jp/bosai/warning/#area_type=offices&area_code=471000'

const LOCALE: Record<Language, string> = { 'zh-TW': 'zh-TW', 'ja-JP': 'ja-JP' }

function dayTab(date: string, language: Language) {
  const value = new Date(`${date}T12:00:00+09:00`)
  const format = (options: Intl.DateTimeFormatOptions) => new Intl.DateTimeFormat(LOCALE[language], { timeZone: 'Asia/Tokyo', ...options }).format(value)
  return { main: format({ month: 'numeric', day: 'numeric' }), weekday: format({ weekday: 'short' }) }
}

const clock = (iso: string | null) => (iso ? `${iso.slice(5, 10).replace('-', '/')} ${iso.slice(11, 16)}` : '—')

export function SurfReportPage() {
  const { language } = useLanguage()
  const s = surfCopy[language].report
  const state = useSurfReport()

  return (
    <div className="inner-page surf-page">
      <section className="inner-hero" aria-labelledby="surf-report-title">
        <div className="shell inner-hero__content">
          <Eyebrow labels={byLanguage(surfCopy, (c) => c.report.eyebrow)} />
          <h1 id="surf-report-title">{s.title}</h1>
          <p>{s.lead}</p>
        </div>
      </section>
      <WaveDivider />
      <section className="section section--foam surf-report" aria-label={s.title}>
        <div className="shell">
          {state.status === 'ready' ? (
            <ReportBody report={state.report} />
          ) : (
            <StatusPanel status={state.status} s={s} />
          )}
          <Sources s={s} report={state.status === 'ready' ? state.report : null} />
        </div>
      </section>
    </div>
  )
}

function StatusPanel({ status, s }: { status: 'unconfigured' | 'loading' | 'error'; s: SurfCopy['report'] }) {
  return (
    <div className="surf-status" role={status === 'loading' ? 'status' : undefined}>
      {status === 'loading' && <p>{s.loading}</p>}
      {status === 'error' && (
        <>
          <p>{s.error}</p>
          <button type="button" className="button button--dark" onClick={() => window.location.reload()}>{s.retry}</button>
        </>
      )}
      {status === 'unconfigured' && (
        <>
          <p><strong>{s.unconfigured}</strong></p>
          <p className="surf-note">{s.unconfiguredHint}</p>
          <div className="surf-links">
            <Link className="surf-chip" to="/surf-guide">{s.toGuide}</Link>
            <Link className="surf-chip" to="/surf-points">{s.toPoints}</Link>
          </div>
          <WindyLinks s={s} />
        </>
      )}
    </div>
  )
}

function ReportBody({ report }: { report: SurfReport }) {
  const { language } = useLanguage()
  const s = surfCopy[language].report
  const [params, setParams] = useSearchParams()
  const requested = params.get('date')
  const index = Math.max(0, report.days.findIndex((day) => day.date === requested))
  const day = report.days[index]

  const selectDay = (date: string) => {
    const next = new URLSearchParams(params)
    next.set('date', date)
    setParams(next, { replace: true })
  }

  return (
    <>
      <Warnings report={report} s={s} />

      <div className="surf-tabs" role="tablist" aria-label={s.tabsLabel}>
        {report.days.map((item, tabIndex) => {
          const label = dayTab(item.date, language)
          return (
            <button
              key={item.date}
              type="button"
              role="tab"
              id={`surf-tab-${item.date}`}
              aria-selected={tabIndex === index}
              aria-controls="surf-day-panel"
              className="surf-tab"
              onClick={() => selectDay(item.date)}
            >
              {label.main}
              <small>{item.date === report.today ? s.today : label.weekday}</small>
            </button>
          )
        })}
      </div>

      <div id="surf-day-panel" role="tabpanel" aria-labelledby={`surf-tab-${day.date}`} className="surf-grid">
        <Block title="tide" s={s} guide="tide" wide>
          <TideBlock day={day} s={s} />
        </Block>
        <Block title="sun" s={s}>
          <div className="surf-sun">
            <p><span>{s.sunrise}</span>{day.sun.sunrise}</p>
            <p><span>{s.sunset}</span>{day.sun.sunset}</p>
          </div>
        </Block>
        {day.fieldReports.length > 0 && (
          <Block title="field" s={s}>
            <div className="surf-field">
              {day.fieldReports.map((item) => (
                <p key={item.postedAt}><time dateTime={item.postedAt}>{item.postedAt.slice(11, 16)}</time>　{item.text}</p>
              ))}
            </div>
            <p className="surf-note">{s.fieldNote}</p>
          </Block>
        )}
        <Block title="forecast" s={s} guide="swell-height" wide>
          <ForecastBlock day={day} report={report} s={s} />
        </Block>
        <Block title="week" s={s}>
          <WeekBlock day={day} s={s} />
        </Block>
        <Block title="model" s={s} guide="period">
          <p className="surf-note">{s.modelOff}</p>
          <WindyLinks s={s} />
        </Block>
      </div>
    </>
  )
}

function Block({ title, s, guide, wide = false, children }: { title: keyof SurfCopy['report']['sections']; s: SurfCopy['report']; guide?: string; wide?: boolean; children: ReactNode }) {
  return (
    <article className={`surf-block${wide ? ' surf-block--wide' : ''}`}>
      <header className="surf-block__head">
        <div>
          <Eyebrow labels={byLanguage(surfCopy, (c) => c.report.sections[title])} />
          <h2>{s.sections[title]}</h2>
        </div>
        {guide && <Link className="surf-block__howto" to={`/surf-guide#${guide}`}>{s.howToRead}</Link>}
      </header>
      {children}
    </article>
  )
}

function TriValue({ value }: { value: Tri | null }) {
  const { language } = useLanguage()
  const s = surfCopy[language].report
  const picked = pickTri(value, language)
  if (!picked) return <>—</>
  return (
    <>
      {picked.text}
      {picked.isOriginal && <small className="surf-original">（{s.original}）</small>}
      {!picked.isOriginal && language !== 'ja-JP' && value && <small className="surf-original">{value['ja-JP']}</small>}
    </>
  )
}

function Warnings({ report, s }: { report: SurfReport; s: SurfCopy['report'] }) {
  const { language } = useLanguage()
  if (!report.warnings) return null
  const active = report.warnings.areas.filter((area) => area.items.length > 0)
  return (
    <article className={`surf-block surf-block--banner${active.length ? ' surf-warning' : ''}`}>
      <header className="surf-block__head">
        <div>
          <Eyebrow labels={byLanguage(surfCopy, (c) => c.report.sections.warnings)} />
          <h2>{s.sections.warnings}</h2>
        </div>
        <a className="surf-block__howto" href={JMA_WARNING_PAGE} target="_blank" rel="noreferrer">{s.warningsLink}</a>
      </header>
      {active.length === 0 ? (
        <p className="surf-note">{s.noWarnings}</p>
      ) : (
        active.map((area) => (
          <div className="surf-area" key={area.areaCode}>
            <h3>{pickTri(area.areaName, language)?.text}</h3>
            {area.items.map((item) => (
              <p key={item.category}>
                <strong>{pickTri(item.name, language)?.text}</strong>（{item.statuses.map((status) => pickTri(status, language)?.text).join('・')}）
                {item.headline && <small className="surf-original">{item.headline}</small>}
              </p>
            ))}
          </div>
        ))
      )}
    </article>
  )
}

function TideList({ label, day, s }: { label: string; day: TideDay | null; s: SurfCopy['report'] }) {
  if (!day) return null
  const events = (list: TideDay['highs']) => list.map((event) => `${event.time}　${event.cm}`).join(' / ') || '—'
  return (
    <tr>
      <th scope="row">{label}</th>
      <td>{s.high} {events(day.highs)}</td>
      <td>{s.low} {events(day.lows)}</td>
    </tr>
  )
}

function TideBlock({ day, s }: { day: SurfDay; s: SurfCopy['report'] }) {
  if (!day.tides.NH && !day.tides.ZO) return <p className="surf-note">{s.tideMissing}</p>
  return (
    <>
      <TideChart west={day.tides.NH} east={day.tides.ZO} sunrise={day.sun.sunrise} sunset={day.sun.sunset} label={`${s.sections.tide} ${day.date}`} />
      <div className="tide-legend">
        {day.tides.NH && <span><i />{s.west}</span>}
        {day.tides.ZO && <span><i className="is-east" />{s.east}</span>}
      </div>
      <div className="surf-table-wrap">
        <table className="tide-table">
          <tbody>
            <TideList label={s.west} day={day.tides.NH} s={s} />
            <TideList label={s.east} day={day.tides.ZO} s={s} />
          </tbody>
        </table>
      </div>
      <p className="surf-note">{s.tideNote}</p>
    </>
  )
}

function ForecastBlock({ day, report, s }: { day: SurfDay; report: SurfReport; s: SurfCopy['report'] }) {
  const { language } = useLanguage()
  if (!day.forecast?.length) return <p className="surf-note">{s.forecastMissing}</p>
  return (
    <>
      {day.forecast.map((area) => (
        <div className="surf-area" key={area.code}>
          <h3>{pickTri(area.name, language)?.text}</h3>
          <dl className="surf-kv">
            <div><dt>{s.weather}</dt><dd><TriValue value={area.weather} />{area.weatherDetail && language !== 'ja-JP' && <small className="surf-original">{area.weatherDetail}</small>}</dd></div>
            <div><dt>{s.wind}</dt><dd><TriValue value={area.wind} /></dd></div>
            <div><dt>{s.wave}</dt><dd><TriValue value={area.wave} /></dd></div>
          </dl>
        </div>
      ))}
      <p className="surf-note">{s.issued.replace('{time}', clock(report.sources.forecastReportDatetime))}</p>
    </>
  )
}

function WeekBlock({ day, s }: { day: SurfDay; s: SurfCopy['report'] }) {
  if (!day.week) return <p className="surf-note">{day.forecast?.length ? s.weekNote : s.weekMissing}</p>
  const temp = day.week.tempMin !== null || day.week.tempMax !== null ? `${day.week.tempMin ?? '—'}–${day.week.tempMax ?? '—'}℃` : '—'
  return (
    <>
      <dl className="surf-kv">
        <div><dt>{s.weather}</dt><dd><TriValue value={day.week.weather} /></dd></div>
        <div><dt>{s.pop}</dt><dd>{day.week.pop === null ? '—' : `${day.week.pop}%`}</dd></div>
        <div><dt>{s.temp}</dt><dd>{temp}</dd></div>
        {day.week.reliability && <div><dt>{s.reliability}</dt><dd>{day.week.reliability}</dd></div>}
      </dl>
      <p className="surf-note">{s.weekNote}</p>
    </>
  )
}

function WindyLinks({ s }: { s: SurfCopy['report'] }) {
  return (
    <div className="surf-links">
      {COAST_WINDY.map((coast) => (
        <a key={coast.id} className="surf-chip" href={coast.url} target="_blank" rel="noreferrer">Windy · {s.coasts[coast.id]}</a>
      ))}
    </div>
  )
}

function Sources({ s, report }: { s: SurfCopy['report']; report: SurfReport | null }) {
  return (
    <footer className="surf-sources">
      <h2>{s.sourcesTitle}</h2>
      <ul>
        {s.sources.map((line) => <li key={line}>{line}</li>)}
      </ul>
      {report && (
        <p>
          JMA {clock(report.sources.forecastReportDatetime)} · tide {clock(report.sources.tideFetchedAt)} · {clock(report.generatedAt)}
        </p>
      )}
      <p>{s.disclaimer}</p>
    </footer>
  )
}
