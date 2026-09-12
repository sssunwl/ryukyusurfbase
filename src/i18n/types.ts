/** 繁中為主、日文為輔（SPEC §3）。不做英文版，英文只放在專業用詞旁的括號裡。 */
export type Language = 'zh-TW' | 'ja-JP'

export type PriceRow = { label: string; value: string }

/** 方案內容以 Kaito 提供的收費方案為準（2026-09-12）。沒有資料的方案 prices 為空陣列，頁面顯示待補。 */
export type Plan = {
  name: string
  /** 內部識別用，畫面不顯示 */
  englishName: string
  forWhom: string
  description: string
  duration: string
  /** 首頁卡片與方案頁摘要用的價格 */
  priceSummary: string
  /** 首頁卡片的「包含」摘要 */
  includes: string
  audience: string[]
  features: string[]
  prices: PriceRow[]
  priceNote: string | null
  included: string[]
  extras: string[]
}

export type Copy = {
  /* 貫穿首頁的敘事骨架：往下滾＝完整衝一道浪。術語取自 Kaito 自己的 IG 用語。 */
  markers: Record<
    'hero' | 'plans' | 'why' | 'day' | 'coach' | 'faq' | 'booking',
    { n: string; en: string; label: string }
  >;
  meta: { title: string; description: string }
  common: {
    brand: string
    brandEn: string
    home: string
    about: string
    plans: string
    surfReport: string
    surfGuide: string
    surfPoints: string
    language: string
    openMenu: string
    closeMenu: string
    learnMore: string
    viewPlans: string
    contactInstagram: string
    pending: string
  }
  /* 各區塊的 eyebrow 是「該語言的短標籤」，畫面上顯示另一種語言當標題小字（SPEC §5）。 */
  hero: { eyebrow: string; title: string; body: string; primary: string; secondary: string; scroll: string }
  plansSection: { eyebrow: string; title: string; body: string; duration: string; price: string; included: string; items: Plan[] }
  why: { eyebrow: string; title: string; items: Array<{ title: string; body: string }> }
  day: { eyebrow: string; title: string; body: string; steps: Array<{ number: string; title: string; body: string }> }
  coach: { eyebrow: string; title: string; intro: string; link: string; placeholder: string }
  faq: { eyebrow: string; title: string; items: Array<{ question: string; answer: string }> }
  booking: { eyebrow: string; title: string; body: string; note: string; button: string; alt: string }
  footer: { locationLabel: string; location: string; seasonLabel: string; season: string; socialLabel: string; linkPending: string; copyright: string }
  audio: { on: string; off: string; unavailable: string }
  aboutPage: { eyebrow: string; title: string; lead: string; story: string; placeholder: string; back: string }
  plansPage: {
    eyebrow: string
    title: string
    lead: string
    suitable: string
    details: string
    audience: string
    features: string
    priceDetail: string
    included: string
    extras: string
    pendingBody: string
    locationTitle: string
    locationBody: string[]
    rentalTitle: string
    rentals: PriceRow[]
    rentalNotes: string[]
    policyTitle: string
    policies: string[]
    rulesTitle: string
    rules: string[]
    localTitle: string
    localRules: string[]
    bookingTitle: string
    bookingBody: string
    bookingButton: string
  }
}
