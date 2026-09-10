export type Language = 'zh-TW' | 'ja-JP'

export type Plan = {
  name: string
  englishName: string
  forWhom: string
  description: string
  includes: string
}

export type Copy = {
  meta: { title: string; description: string }
  common: {
    brand: string
    brandEn: string
    home: string
    about: string
    plans: string
    language: string
    openMenu: string
    closeMenu: string
    learnMore: string
    viewPlans: string
    contactInstagram: string
    pending: string
  }
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
