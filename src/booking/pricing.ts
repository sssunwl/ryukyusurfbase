/**
 * 費用試算。價格來源：Kaito 提供的收費方案（2026-09-12；衝浪體驗為 2026 夏季開幕優惠）。
 * 改價格時，i18n 字典裡方案頁的價格文字也要一起改。
 */
export type PlanId = 'experience' | 'guide'

export const PLAN_IDS: PlanId[] = ['experience', 'guide']

/** 對應 i18n 字典 plansSection.items 的位置（Surf Trip 還沒有價格，不開放預約）。 */
export const PLAN_INDEX: Record<PlanId, number> = { experience: 0, guide: 1 }

export const WETSUIT_PRICE = 2000
export const HARDBOARD_PRICE = 5000

export function unitPrice(plan: PlanId, people: number) {
  if (plan === 'guide') return 13000
  if (people >= 4) return 13500
  if (people === 3) return 14000
  if (people === 2) return 14500
  return 15000
}

export function estimate(plan: PlanId, people: number, wetsuits: number, hardboards: number) {
  const unit = unitPrice(plan, people)
  const course = unit * people
  const wetsuit = wetsuits * WETSUIT_PRICE
  const hardboard = plan === 'guide' ? hardboards * HARDBOARD_PRICE : 0
  return { unit, course, wetsuit, hardboard, total: course + wetsuit + hardboard }
}

export const yen = (value: number) => `¥${value.toLocaleString('ja-JP')}`
