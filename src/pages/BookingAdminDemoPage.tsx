import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Eyebrow } from '../components/Eyebrow'
import { WaveDivider } from '../components/WaveDivider'
import { formatBookingDate, formatDateTime, rentalsText } from '../booking/format'
import { estimate, PLAN_INDEX, yen } from '../booking/pricing'
import { loadRequests, sampleRequests, saveRequests, type BookingRequest, type BookingStatus } from '../booking/storage'
import { bookingCopy } from '../i18n/booking'
import { byLanguage } from '../i18n/dictionaries'
import { useLanguage } from '../i18n/LanguageContext'

/**
 * 預約系統示範（Kaito 端）。只讀這個瀏覽器的示範資料。
 * 正式版是 /admin，用 Cloudflare Access 保護、資料在 D1（SPEC §7、§8）。
 */
export function BookingAdminDemoPage() {
  const { language, copy } = useLanguage()
  const b = bookingCopy[language]
  const a = b.admin
  const [requests, setRequests] = useState<BookingRequest[]>(() => loadRequests())

  const commit = (next: BookingRequest[]) => {
    saveRequests(next)
    setRequests(next)
  }
  const setStatus = (id: string, status: BookingStatus) => commit(requests.map((request) => (request.id === id ? { ...request, status } : request)))
  const remove = (id: string) => commit(requests.filter((request) => request.id !== id))

  const sorted = [...requests].sort((left, right) => left.datePrimary.localeCompare(right.datePrimary))
  const counts = (['pending', 'confirmed', 'declined'] as BookingStatus[]).map((status) => ({ status, count: requests.filter((request) => request.status === status).length }))

  return (
    <div className="inner-page booking-page">
      <section className="inner-hero" aria-labelledby="booking-admin-title">
        <div className="shell inner-hero__content">
          <Eyebrow labels={byLanguage(bookingCopy, (c) => c.admin.eyebrow)} />
          <h1 id="booking-admin-title">{a.title}</h1>
          <p>{a.lead}</p>
        </div>
      </section>
      <WaveDivider />
      <section className="section section--foam" aria-label={a.title}>
        <div className="shell booking-shell">
          <div className="admin-toolbar">
            <p className="admin-counts">
              {counts.map(({ status, count }) => (
                <span key={status} className={`status-pill status-pill--${status}`}>{a.statuses[status]} {count}</span>
              ))}
            </p>
            <div className="admin-toolbar__actions">
              <button type="button" className="button button--dark button--small" onClick={() => commit([...sampleRequests(a.sampleName), ...requests])}>{a.seed}</button>
              {requests.length > 0 && <button type="button" className="link-button" onClick={() => commit([])}>{a.clear}</button>}
              <Link className="link-button" to="/booking">{a.toBooking}</Link>
            </div>
          </div>

          {sorted.length === 0 ? (
            <p className="booking-card admin-empty">{a.empty}</p>
          ) : (
            <div className="admin-list">
              {sorted.map((request) => {
                const plan = copy.plansSection.items[PLAN_INDEX[request.plan]]
                const total = estimate(request.plan, request.people, request.wetsuits, request.hardboards).total
                return (
                  <article className="booking-card admin-card" key={request.id}>
                    <header className="admin-card__head">
                      <div>
                        <p className="admin-card__date">
                          {formatBookingDate(request.datePrimary, language)}
                          {request.dateAlt && <small>　{a.alt} {formatBookingDate(request.dateAlt, language)}</small>}
                        </p>
                        <h2>{request.name}{request.kana && <small>（{request.kana}）</small>}</h2>
                      </div>
                      <span className={`status-pill status-pill--${request.status}`}>{a.statuses[request.status]}</span>
                    </header>
                    <dl className="surf-kv">
                      <div><dt>{b.confirm.plan}</dt><dd>{plan.name}・{request.people} {b.units.people}</dd></div>
                      <div><dt>{b.confirm.experience}</dt><dd>{b.details.experienceOptions[request.experience].label}</dd></div>
                      <div><dt>{b.confirm.rentals}</dt><dd>{rentalsText(request.wetsuits, request.hardboards, b)}{request.sizes && <><br />{request.sizes}</>}</dd></div>
                      <div>
                        <dt>{b.confirm.contact}</dt>
                        <dd><a href={`tel:${request.phone.replace(/[^\d+]/g, '')}`}>{request.phone}</a><br /><a href={`mailto:${request.email}`}>{request.email}</a></dd>
                      </div>
                      {request.note && <div><dt>{b.confirm.note}</dt><dd>{request.note}</dd></div>}
                      <div><dt>{a.estimate}</dt><dd>{yen(total)}</dd></div>
                      {request.source && <div><dt>{a.source}</dt><dd>{request.source}</dd></div>}
                      <div><dt>{a.created}</dt><dd>{formatDateTime(request.createdAt, language)}</dd></div>
                    </dl>
                    <div className="admin-actions">
                      {request.status !== 'confirmed' && <button type="button" className="button button--primary button--small" onClick={() => setStatus(request.id, 'confirmed')}>{a.confirm}</button>}
                      {request.status !== 'declined' && <button type="button" className="button button--dark button--small" onClick={() => setStatus(request.id, 'declined')}>{a.decline}</button>}
                      {request.status !== 'pending' && <button type="button" className="link-button" onClick={() => setStatus(request.id, 'pending')}>{a.reset}</button>}
                      <button type="button" className="link-button" onClick={() => remove(request.id)}>{a.remove}</button>
                    </div>
                  </article>
                )
              })}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
