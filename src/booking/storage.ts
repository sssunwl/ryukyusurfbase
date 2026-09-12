import { addDays, jstToday } from './dates'
import type { PlanId } from './pricing'

export type ExperienceLevel = 'first' | 'beginner' | 'intermediate' | 'advanced'
export const EXPERIENCE_LEVELS: ExperienceLevel[] = ['first', 'beginner', 'intermediate', 'advanced']

export type BookingStatus = 'pending' | 'confirmed' | 'declined'

/** 欄位依 Kaito 現行的 Google 預約表單（2026-09-12）。 */
export type BookingRequest = {
  id: string
  createdAt: string
  plan: PlanId
  datePrimary: string
  dateAlt: string | null
  people: number
  name: string
  kana: string
  phone: string
  email: string
  experience: ExperienceLevel
  wetsuits: number
  sizes: string
  hardboards: number
  note: string
  source: string
  status: BookingStatus
}

/** 示範版只存在這個瀏覽器；正式版改為 POST /api/bookings 寫進 D1（SPEC §7）。 */
const STORAGE_KEY = 'ryukyu-booking-demo'

export function loadRequests(): BookingRequest[] {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    const parsed: unknown = raw ? JSON.parse(raw) : []
    return Array.isArray(parsed) ? (parsed as BookingRequest[]) : []
  } catch {
    return []
  }
}

export function saveRequests(requests: BookingRequest[]) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(requests))
  } catch {
    // IG 內建瀏覽器等環境可能禁用 localStorage，只在本次畫面生效
  }
}

export function addRequest(request: BookingRequest) {
  saveRequests([request, ...loadRequests()])
}

export function newRequestId() {
  return `demo-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`
}

/** Kaito 端示範畫面用的假申請，名稱明確標示為示範。 */
export function sampleRequests(namePrefix: string): BookingRequest[] {
  const today = jstToday()
  const base = { kana: '', phone: '090-0000-0000', email: 'demo@example.com', note: '', source: 'SNS', createdAt: new Date().toISOString() }
  return [
    { ...base, id: newRequestId(), name: `${namePrefix} A`, plan: 'experience', datePrimary: addDays(today, 5), dateAlt: addDays(today, 6), people: 2, experience: 'first', wetsuits: 2, sizes: '165cm 55kg / 178cm 70kg', hardboards: 0, status: 'pending' },
    { ...base, id: newRequestId(), name: `${namePrefix} B`, plan: 'guide', datePrimary: addDays(today, 9), dateAlt: null, people: 1, experience: 'intermediate', wetsuits: 0, sizes: '', hardboards: 1, status: 'confirmed' },
    { ...base, id: newRequestId(), name: `${namePrefix} C`, plan: 'experience', datePrimary: addDays(today, 14), dateAlt: addDays(today, 16), people: 4, experience: 'beginner', wetsuits: 0, sizes: '', hardboards: 0, source: 'Google', status: 'pending' },
  ]
}
