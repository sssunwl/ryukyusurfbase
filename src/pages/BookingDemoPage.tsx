import { useMemo, useRef, useState, type HTMLAttributes } from 'react'
import { Link } from 'react-router-dom'
import { Eyebrow } from '../components/Eyebrow'
import { WaveDivider } from '../components/WaveDivider'
import { bookableRange, demoStatus, monthCells, monthsBetween } from '../booking/dates'
import { formatBookingDate, formatMonth, rentalsText } from '../booking/format'
import { estimate, HARDBOARD_PRICE, PLAN_IDS, PLAN_INDEX, WETSUIT_PRICE, yen, type PlanId } from '../booking/pricing'
import { addRequest, EXPERIENCE_LEVELS, newRequestId, type BookingRequest, type ExperienceLevel } from '../booking/storage'
import { bookingCopy, type BookingCopy } from '../i18n/booking'
import { byLanguage } from '../i18n/dictionaries'
import { useLanguage } from '../i18n/LanguageContext'
import type { Language } from '../i18n/types'
import { BOOKING_FORM_URL } from '../links'

/** 只是輸入框的上限，不是每團人數規定（每團人數待 Kaito 確認）。 */
const MAX_PEOPLE = 20

type FormState = {
  plan: PlanId | null
  people: number
  datePrimary: string | null
  dateAlt: string | null
  name: string
  kana: string
  phone: string
  email: string
  experience: ExperienceLevel | null
  wetsuits: number
  sizes: string
  hardboards: number
  note: string
  source: string
  agreeCancel: boolean
  agreeRules: boolean
  agreeLocal: boolean
}

type Errors = Partial<Record<keyof FormState | 'agree', string>>

const INITIAL: FormState = {
  plan: null, people: 1, datePrimary: null, dateAlt: null, name: '', kana: '', phone: '', email: '', experience: null,
  wetsuits: 0, sizes: '', hardboards: 0, note: '', source: '', agreeCancel: false, agreeRules: false, agreeLocal: false,
}

/**
 * 預約系統示範（客人端）。流程：方案與人數 → 日期 → 資料 → 確認送出。
 * 示範版資料只存在瀏覽器，日期狀態是假資料；正式版規格見 SPEC §7。
 */
export function BookingDemoPage() {
  const { language, copy } = useLanguage()
  const b = bookingCopy[language]
  const [step, setStep] = useState(0)
  const [form, setForm] = useState<FormState>(INITIAL)
  const [errors, setErrors] = useState<Errors>({})
  const [done, setDone] = useState<BookingRequest | null>(null)
  const topRef = useRef<HTMLDivElement>(null)

  const update = (patch: Partial<FormState>) => {
    setForm((current) => ({ ...current, ...patch }))
    setErrors((current) => {
      const next = { ...current }
      for (const key of Object.keys(patch)) delete next[key as keyof Errors]
      if ('agreeCancel' in patch || 'agreeRules' in patch || 'agreeLocal' in patch) delete next.agree
      return next
    })
  }

  const setPeople = (people: number) =>
    update({ people, wetsuits: Math.min(form.wetsuits, people), hardboards: Math.min(form.hardboards, people) })

  const setPlan = (plan: PlanId) => update({ plan, hardboards: plan === 'guide' ? form.hardboards : 0 })

  const pickDate = (date: string) => {
    if (form.datePrimary === date) update({ datePrimary: form.dateAlt, dateAlt: null })
    else if (form.dateAlt === date) update({ dateAlt: null })
    else if (!form.datePrimary) update({ datePrimary: date })
    else update({ dateAlt: date })
  }

  const validate = (target: number) => {
    const next: Errors = {}
    if (target === 0 && !form.plan) next.plan = b.errors.plan
    if (target === 1 && !form.datePrimary) next.datePrimary = b.errors.date
    if (target === 2) {
      if (!form.name.trim()) next.name = b.errors.required
      if (!/^\+?[\d\s()-]{8,}$/.test(form.phone.trim())) next.phone = b.errors.phone
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) next.email = b.errors.email
      if (!form.experience) next.experience = b.errors.experience
      if (form.wetsuits > 0 && !form.sizes.trim()) next.sizes = b.errors.sizes
    }
    if (target === 3 && !(form.agreeCancel && form.agreeRules && form.agreeLocal)) next.agree = b.errors.agree
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const scrollToTop = () => topRef.current?.scrollIntoView({ block: 'start' })

  const goNext = () => {
    if (!validate(step)) return
    setStep((current) => current + 1)
    scrollToTop()
  }

  const goBack = () => {
    setStep((current) => Math.max(0, current - 1))
    scrollToTop()
  }

  const submit = () => {
    if (!validate(3) || !form.plan || !form.datePrimary || !form.experience) return
    const request: BookingRequest = {
      id: newRequestId(),
      createdAt: new Date().toISOString(),
      plan: form.plan,
      datePrimary: form.datePrimary,
      dateAlt: form.dateAlt,
      people: form.people,
      name: form.name.trim(),
      kana: form.kana.trim(),
      phone: form.phone.trim(),
      email: form.email.trim(),
      experience: form.experience,
      wetsuits: form.wetsuits,
      sizes: form.wetsuits > 0 ? form.sizes.trim() : '',
      hardboards: form.plan === 'guide' ? form.hardboards : 0,
      note: form.note.trim(),
      source: form.source,
      status: 'pending',
    }
    addRequest(request)
    setDone(request)
    scrollToTop()
  }

  const restart = () => {
    setForm(INITIAL)
    setErrors({})
    setStep(0)
    setDone(null)
    scrollToTop()
  }

  const planName = (plan: PlanId) => copy.plansSection.items[PLAN_INDEX[plan]].name

  return (
    <div className="inner-page booking-page">
      <section className="inner-hero" aria-labelledby="booking-title">
        <div className="shell inner-hero__content">
          <Eyebrow labels={byLanguage(bookingCopy, (c) => c.eyebrow)} />
          <h1 id="booking-title">{b.title}</h1>
          <p>{b.lead}</p>
        </div>
      </section>
      <WaveDivider />
      <section className="section section--foam" aria-label={b.title}>
        <div className="shell booking-shell" ref={topRef}>
          <p className="demo-banner">
            {b.demoBanner}
            <a href={BOOKING_FORM_URL} target="_blank" rel="noreferrer">{b.demoFormLink}</a>
            {b.demoBannerEnd}
          </p>

          {done ? (
            <div className="booking-card booking-done" role="status">
              <Eyebrow labels={byLanguage(bookingCopy, (c) => c.done.title)} />
              <h2>{b.done.title}</h2>
              <p>{b.done.body}</p>
              <dl className="surf-kv booking-done__summary">
                <div><dt>{b.confirm.plan}</dt><dd>{planName(done.plan)}</dd></div>
                <div><dt>{b.date.primary}</dt><dd>{formatBookingDate(done.datePrimary, language)}</dd></div>
                {done.dateAlt && <div><dt>{b.date.alternate}</dt><dd>{formatBookingDate(done.dateAlt, language)}</dd></div>}
                <div><dt>{b.confirm.people}</dt><dd>{done.people} {b.units.people}</dd></div>
              </dl>
              <p className="booking-demo-note">{b.done.demoNote}</p>
              <div className="booking-actions booking-actions--center">
                <button type="button" className="link-button" onClick={restart}>{b.done.again}</button>
                <Link className="button button--dark" to="/booking/demo-admin">{b.done.admin}</Link>
              </div>
            </div>
          ) : (
            <>
              <ol className="booking-steps">
                {b.steps.map((label, index) => (
                  <li key={label} aria-current={index === step ? 'step' : undefined} className={index < step ? 'is-done' : undefined}>
                    <span>0{index + 1}</span>{label}
                  </li>
                ))}
              </ol>

              <div className="booking-card">
                {step === 0 && (
                  <fieldset>
                    <legend>{b.plan.legend}</legend>
                    <div className="choice-grid choice-grid--2">
                      {PLAN_IDS.map((id) => {
                        const item = copy.plansSection.items[PLAN_INDEX[id]]
                        return (
                          <label className="choice" key={id}>
                            <input type="radio" name="plan" value={id} checked={form.plan === id} onChange={() => setPlan(id)} />
                            <strong>{item.name}</strong>
                            <span>{item.forWhom}</span>
                            <small>{item.priceSummary}・{item.duration}</small>
                          </label>
                        )
                      })}
                    </div>
                    {errors.plan && <p className="field-error" role="alert">{errors.plan}</p>}
                    <div className="field">
                      <span className="field__label" id="booking-people-label">{b.plan.peopleLabel}</span>
                      <Stepper value={form.people} min={1} max={MAX_PEOPLE} unit={b.units.people} onChange={setPeople} labelledBy="booking-people-label" b={b} />
                      <p className="field__hint">{b.plan.peopleHint}</p>
                    </div>
                  </fieldset>
                )}

                {step === 1 && (
                  <fieldset>
                    <legend>{b.date.legend}</legend>
                    <p className="booking-hint">{b.date.hint}</p>
                    <div className="date-chips">
                      <DateChip label={b.date.primary} date={form.datePrimary} language={language} b={b} onClear={() => update({ datePrimary: form.dateAlt, dateAlt: null })} tone="primary" />
                      <DateChip label={b.date.alternate} date={form.dateAlt} language={language} b={b} onClear={() => update({ dateAlt: null })} tone="alt" />
                    </div>
                    <Calendar primary={form.datePrimary} alt={form.dateAlt} onPick={pickDate} language={language} b={b} />
                    {errors.datePrimary && <p className="field-error" role="alert">{errors.datePrimary}</p>}
                    <p className="booking-hint booking-hint--after">{b.date.tideNote}</p>
                  </fieldset>
                )}

                {step === 2 && (
                  <fieldset>
                    <legend>{b.details.legend}</legend>
                    <TextField id="name" label={b.details.name} value={form.name} onChange={(name) => update({ name })} error={errors.name} autoComplete="name" />
                    <TextField id="kana" label={b.details.kana} value={form.kana} onChange={(kana) => update({ kana })} autoComplete="off" />
                    <TextField id="phone" type="tel" label={b.details.phone} value={form.phone} onChange={(phone) => update({ phone })} error={errors.phone} autoComplete="tel" inputMode="tel" />
                    <TextField id="email" type="email" label={b.details.email} value={form.email} onChange={(email) => update({ email })} error={errors.email} autoComplete="email" inputMode="email" />

                    <div className="field">
                      <span className="field__label">{b.details.experience}</span>
                      <div className="choice-grid choice-grid--2">
                        {EXPERIENCE_LEVELS.map((level) => (
                          <label className="choice" key={level}>
                            <input type="radio" name="experience" value={level} checked={form.experience === level} onChange={() => update({ experience: level })} />
                            <strong>{b.details.experienceOptions[level].label}</strong>
                            <span>{b.details.experienceOptions[level].desc}</span>
                          </label>
                        ))}
                      </div>
                      {errors.experience && <p className="field-error" role="alert">{errors.experience}</p>}
                    </div>

                    <div className="field">
                      <span className="field__label" id="booking-wetsuit-label">{b.details.wetsuit}</span>
                      <Stepper value={form.wetsuits} min={0} max={form.people} unit={b.units.wetsuit} onChange={(wetsuits) => update({ wetsuits })} labelledBy="booking-wetsuit-label" b={b} />
                      <p className="field__hint">{b.details.wetsuitHint}</p>
                    </div>
                    {form.wetsuits > 0 && (
                      <TextField id="sizes" label={b.details.sizes} hint={b.details.sizesHint} value={form.sizes} onChange={(sizes) => update({ sizes })} error={errors.sizes} autoComplete="off" />
                    )}

                    {form.plan === 'guide' && (
                      <div className="field">
                        <span className="field__label" id="booking-hardboard-label">{b.details.hardboard}</span>
                        <Stepper value={form.hardboards} min={0} max={form.people} unit={b.units.hardboard} onChange={(hardboards) => update({ hardboards })} labelledBy="booking-hardboard-label" b={b} />
                        <p className="field__hint">{b.details.hardboardHint}</p>
                      </div>
                    )}

                    <TextField id="note" label={b.details.note} placeholder={b.details.notePlaceholder} value={form.note} onChange={(note) => update({ note })} multiline />

                    <div className="field">
                      <span className="field__label">{b.details.source}</span>
                      <div className="chip-options">
                        {b.details.sourceOptions.map((option) => (
                          <label className="chip-option" key={option}>
                            <input type="radio" name="source" value={option} checked={form.source === option} onChange={() => update({ source: option })} />
                            <span>{option}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </fieldset>
                )}

                {step === 3 && form.plan && form.datePrimary && form.experience && (
                  <fieldset>
                    <legend>{b.confirm.legend}</legend>
                    <dl className="surf-kv">
                      <div><dt>{b.confirm.plan}</dt><dd>{planName(form.plan)}</dd></div>
                      <div>
                        <dt>{b.confirm.dates}</dt>
                        <dd>
                          {b.date.primary}　{formatBookingDate(form.datePrimary, language)}
                          {form.dateAlt && <><br />{b.date.alternate}　{formatBookingDate(form.dateAlt, language)}</>}
                        </dd>
                      </div>
                      <div><dt>{b.confirm.people}</dt><dd>{form.people} {b.units.people}</dd></div>
                      <div>
                        <dt>{b.confirm.contact}</dt>
                        <dd>{form.name}{form.kana && `（${form.kana}）`}<br />{form.phone}<br />{form.email}</dd>
                      </div>
                      <div><dt>{b.confirm.experience}</dt><dd>{b.details.experienceOptions[form.experience].label}</dd></div>
                      <div><dt>{b.confirm.rentals}</dt><dd>{rentalsText(form.wetsuits, form.plan === 'guide' ? form.hardboards : 0, b)}{form.wetsuits > 0 && <><br />{form.sizes}</>}</dd></div>
                      {form.note && <div><dt>{b.confirm.note}</dt><dd>{form.note}</dd></div>}
                    </dl>

                    <Estimate plan={form.plan} people={form.people} wetsuits={form.wetsuits} hardboards={form.hardboards} b={b} />

                    <div className="booking-agreements">
                      <label className="agree">
                        <input type="checkbox" checked={form.agreeCancel} onChange={(event) => update({ agreeCancel: event.target.checked })} />
                        <span>{b.confirm.agreeCancel}</span>
                      </label>
                      <label className="agree">
                        <input type="checkbox" checked={form.agreeRules} onChange={(event) => update({ agreeRules: event.target.checked })} />
                        <span>{b.confirm.agreeRules}</span>
                      </label>
                      <details className="booking-details">
                        <summary>{b.confirm.readRules}</summary>
                        <ul className="plan-list">{copy.plansPage.rules.map((rule) => <li key={rule}>{rule}</li>)}</ul>
                      </details>
                      <label className="agree">
                        <input type="checkbox" checked={form.agreeLocal} onChange={(event) => update({ agreeLocal: event.target.checked })} />
                        <span>{b.confirm.agreeLocal}</span>
                      </label>
                      <details className="booking-details">
                        <summary>{b.confirm.readLocal}</summary>
                        <ul className="plan-list">{copy.plansPage.localRules.map((rule) => <li key={rule}>{rule}</li>)}</ul>
                      </details>
                      {errors.agree && <p className="field-error" role="alert">{errors.agree}</p>}
                    </div>
                  </fieldset>
                )}

                <div className="booking-actions">
                  {step > 0 ? <button type="button" className="link-button" onClick={goBack}>← {b.back}</button> : <span />}
                  {step < 3 ? (
                    <button type="button" className="button button--primary" onClick={goNext}>{b.next}</button>
                  ) : (
                    <button type="button" className="button button--primary" onClick={submit}>{b.submit}</button>
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  )
}

function Stepper({ value, min, max, unit, onChange, labelledBy, b }: {
  value: number; min: number; max: number; unit: string; onChange: (value: number) => void; labelledBy: string; b: BookingCopy
}) {
  return (
    <div className="stepper" role="group" aria-labelledby={labelledBy}>
      <button type="button" onClick={() => onChange(value - 1)} disabled={value <= min} aria-label={b.units.decrease}>−</button>
      <output aria-live="polite">{value} {unit}</output>
      <button type="button" onClick={() => onChange(value + 1)} disabled={value >= max} aria-label={b.units.increase}>+</button>
    </div>
  )
}

function TextField({ id, label, value, onChange, error, hint, placeholder, type = 'text', autoComplete, inputMode, multiline = false }: {
  id: string
  label: string
  value: string
  onChange: (value: string) => void
  error?: string
  hint?: string
  placeholder?: string
  type?: 'text' | 'tel' | 'email'
  autoComplete?: string
  inputMode?: HTMLAttributes<HTMLInputElement>['inputMode']
  multiline?: boolean
}) {
  const inputId = `booking-${id}`
  const describedBy = [hint && `${inputId}-hint`, error && `${inputId}-error`].filter(Boolean).join(' ') || undefined
  return (
    <div className="field">
      <label htmlFor={inputId}>{label}</label>
      {multiline ? (
        <textarea id={inputId} value={value} placeholder={placeholder} onChange={(event) => onChange(event.target.value)} aria-invalid={!!error} aria-describedby={describedBy} />
      ) : (
        <input id={inputId} type={type} value={value} placeholder={placeholder} autoComplete={autoComplete} inputMode={inputMode} onChange={(event) => onChange(event.target.value)} aria-invalid={!!error} aria-describedby={describedBy} />
      )}
      {hint && <p className="field__hint" id={`${inputId}-hint`}>{hint}</p>}
      {error && <p className="field-error" id={`${inputId}-error`}>{error}</p>}
    </div>
  )
}

function DateChip({ label, date, language, b, onClear, tone }: {
  label: string; date: string | null; language: Language; b: BookingCopy; onClear: () => void; tone: 'primary' | 'alt'
}) {
  return (
    <span className={`date-chip date-chip--${tone}${date ? '' : ' is-empty'}`}>
      <span>{label}</span>
      <b>{date ? formatBookingDate(date, language) : b.date.none}</b>
      {date && <button type="button" onClick={onClear} aria-label={`${label} ${b.date.clear}`}>×</button>}
    </span>
  )
}

function Calendar({ primary, alt, onPick, language, b }: {
  primary: string | null; alt: string | null; onPick: (date: string) => void; language: Language; b: BookingCopy
}) {
  const { first, last } = useMemo(() => bookableRange(), [])
  const months = useMemo(() => monthsBetween(first, last), [first, last])

  return (
    <>
      <div className="calendar">
        {months.map(({ year, month }) => (
          <div className="calendar__month" key={`${year}-${month}`}>
            <h3>{formatMonth(year, month, language)}</h3>
            <div className="calendar__grid">
              {b.date.weekdays.map((weekday) => <span className="calendar__weekday" key={weekday} aria-hidden="true">{weekday}</span>)}
              {monthCells(year, month).map((date, index) => {
                if (!date) return <span key={`blank-${index}`} aria-hidden="true" />
                const inRange = date >= first && date <= last
                const full = inRange && demoStatus(date) === 'full'
                const isPrimary = date === primary
                const isAlt = date === alt
                const status = !inRange ? b.date.outOfRange : full ? b.date.full : b.date.available
                const selected = isPrimary ? ` ${b.date.primary}` : isAlt ? ` ${b.date.alternate}` : ''
                const className = ['calendar__day', full && 'is-full', isPrimary && 'is-primary', isAlt && 'is-alt'].filter(Boolean).join(' ')
                return (
                  <button
                    key={date}
                    type="button"
                    className={className}
                    disabled={!inRange || full}
                    aria-pressed={isPrimary || isAlt}
                    aria-label={`${formatBookingDate(date, language)} ${status}${selected}`}
                    onClick={() => onPick(date)}
                  >
                    {Number(date.slice(8))}
                  </button>
                )
              })}
            </div>
          </div>
        ))}
      </div>
      <p className="calendar-legend">
        <span><i />{b.date.available}</span>
        <span><i className="is-full" />{b.date.full}{b.date.demoLegend}</span>
        <span><i className="is-primary" />{b.date.primary}</span>
        <span><i className="is-alt" />{b.date.alternate}</span>
      </p>
    </>
  )
}

function Estimate({ plan, people, wetsuits, hardboards, b }: { plan: PlanId; people: number; wetsuits: number; hardboards: number; b: BookingCopy }) {
  const result = estimate(plan, people, wetsuits, hardboards)
  return (
    <div className="booking-estimate">
      <h3>{b.confirm.estimate}</h3>
      <dl className="price-list">
        <div><dt>{b.confirm.course}（{yen(result.unit)} × {people}）</dt><dd>{yen(result.course)}</dd></div>
        {result.wetsuit > 0 && <div><dt>{b.confirm.wetsuit}（{yen(WETSUIT_PRICE)} × {wetsuits}）</dt><dd>{yen(result.wetsuit)}</dd></div>}
        {result.hardboard > 0 && <div><dt>{b.confirm.hardboard}（{yen(HARDBOARD_PRICE)} × {hardboards}）</dt><dd>{yen(result.hardboard)}</dd></div>}
        <div className="price-list__total"><dt>{b.confirm.total}</dt><dd>{yen(result.total)}</dd></div>
      </dl>
      <p className="field__hint">{b.confirm.estimateNote}</p>
    </div>
  )
}
