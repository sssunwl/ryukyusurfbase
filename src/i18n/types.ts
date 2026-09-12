export type Language = 'zh-TW' | 'ja-JP' | 'en'

export type Plan = {
  name: string
  englishName: string
  forWhom: string
  description: string
  includes: string
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
  /* 各區塊的 eyebrow 是「該語言的短標籤」，畫面上只顯示另外兩種語言（SPEC §5）。 */
  hero: { eyebrow: string; title: string; body: string; primary: string; secondary: string; scroll: string }
  plansSection: { eyebrow: string; title: string; body: string; duration: string; price: string; included: string; items: Plan[] }
  why: { eyebrow: string; title: string; items: Array<{ title: string; body: string }> }
  day: { eyebrow: string; title: string; body: string; steps: Array<{ number: string; title: string; body: string }> }
  coach: { eyebrow: string; title: string; intro: string; link: string; placeholder: string }
  faq: { eyebrow: string; title: string; items: Array<{ question: string; answer: string }> }
  booking: { eyebrow: string; title: string; body: string; note: string; button: string }
  footer: { locationLabel: string; location: string; seasonLabel: string; season: string; socialLabel: string; linkPending: string; copyright: string }
  audio: { on: string; off: string; unavailable: string }
  aboutPage: { eyebrow: string; title: string; lead: string; story: string; placeholder: string; back: string }
  plansPage: {
    eyebrow: string
    title: string
    lead: string
    suitable: string
    details: string
    included: string
    notIncluded: string
    cancellation: string
    rules: string
    pendingBody: string
  }
}
