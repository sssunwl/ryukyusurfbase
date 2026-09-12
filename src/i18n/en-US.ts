import type { Copy } from './types'

export const enUS: Copy = {
  markers: {
    hero: { n: '00', en: 'OUTSIDE', label: 'past the break' },
    plans: { n: '01', en: 'PADDLE OUT', label: 'heading out' },
    why: { n: '02', en: 'CHECK', label: 'reading the waves' },
    day: { n: '03', en: 'LINE UP', label: 'waiting for a set' },
    coach: { n: '04', en: 'TAKE OFF', label: 'catching one' },
    faq: { n: '05', en: 'INSIDE', label: 'near the shore' },
    booking: { n: '06', en: 'KICK OUT', label: 'back on the beach' },
  },
  meta: {
    title: 'Ryukyu Surf Base | Surfing in Okinawa',
    description: 'Surf experiences, surf guiding and multi-day surf trips in Okinawa. The spot is chosen from the day’s waves. Guidance in Chinese and Japanese.',
  },
  common: {
    brand: 'Ryukyu Surf Base', brandEn: 'RYUKYU SURF BASE', home: 'Home', about: 'About Kaito', plans: 'Plans',
    surfReport: 'Surf Report', surfGuide: 'Reading the Waves', surfPoints: 'Okinawa Surf Points', language: 'Language',
    openMenu: 'Open menu', closeMenu: 'Close menu', learnMore: 'Learn more', viewPlans: 'View plans', contactInstagram: 'Message on Instagram', pending: 'TBD',
  },
  hero: {
    eyebrow: 'SURF WITH KAITO IN OKINAWA',
    title: 'Check the waves first. Then decide where to go.',
    body: 'I read the day’s conditions and find a spot in Okinawa that fits your level. Whether it’s your first time or you already surf, we head out together.',
    primary: 'Book a session', secondary: 'See the plans', scroll: 'Scroll',
  },
  plansSection: {
    eyebrow: 'THREE WAYS TO SURF', title: 'How do you want to surf?',
    body: 'From standing up on a board for the first time to chasing waves across the island for several days, start with your experience and the pace of your trip.',
    duration: 'Duration', price: 'Price', included: 'Included',
    items: [
      { name: 'Surf Experience', englishName: 'SURF EXPERIENCE', forWhom: 'First-time surfers', description: 'We start from your level and look for beginner-friendly waves and spots.', includes: 'TBD' },
      { name: 'Surf Guide', englishName: 'SURF GUIDE', forWhom: 'Surfers looking for the right spot', description: 'We move with the day’s conditions instead of sticking to one beach.', includes: 'TBD' },
      { name: 'Surf Trip', englishName: 'MULTI-DAY TRIP', forWhom: 'Anyone planning several days in a row', description: 'Several days in the water, moving between areas as the waves change.', includes: 'TBD' },
    ],
  },
  why: {
    eyebrow: 'WHY KAITO', title: 'Good to know before we paddle out',
    items: [
      { title: 'The waves decide where we go', body: 'Early in the morning I check 2–3 spots, and drive up to an hour and a half across the island when needed.' },
      { title: 'We can talk in Chinese', body: 'After high school, I studied in Taiwan for a year and a half.' },
      { title: 'Small groups, private sessions', body: 'Sessions are small-group or private.' },
      { title: 'Photos and video of your session', body: 'You get the photos and videos for free.' },
    ],
  },
  day: {
    eyebrow: 'A DAY WITH THE SWELL', title: 'What a day looks like', body: 'The ocean changes every day, so the order stays simple while the timing and the spot stay flexible.',
    steps: [
      { number: '01', title: 'Hotel pickup', body: 'After we meet, we head toward the coast that looks promising that day.' },
      { number: '02', title: 'Spot check', body: 'We look at the waves, the wind and the conditions on site before choosing where to paddle out.' },
      { number: '03', title: 'Surf', body: 'A surf experience or guided session, matched to your level and the day’s waves.' },
      { number: '04', title: 'Café', body: 'After the session, we rest at a café and talk about the waves.' },
    ],
  },
  coach: {
    eyebrow: 'ABOUT KAITO', title: 'Kaito, raised in Okinawa',
    intro: 'I was born and raised in Okinawa and studied in Taiwan for a year and a half. Through the ocean and surfing, I want to help people who carry the same kind of pressure.',
    link: 'Read my story', placeholder: 'Coach photo coming soon',
  },
  faq: {
    eyebrow: 'BEFORE YOU GO', title: 'FAQ',
    items: [
      { question: 'Where do we surf?', answer: 'Not always at the same beach. I look at the day’s waves, the wind direction and your level before choosing a spot.' },
      { question: 'Can I join if it’s my first time?', answer: 'Yes. The Surf Experience is made for people trying surfing for the first time. The duration and what’s included are still TBD.' },
      { question: 'Can we talk in Chinese?', answer: 'Yes. I studied in Taiwan for a year and a half and can communicate in Chinese. Guidance is also available in Japanese.' },
      { question: 'Will there be photos and video?', answer: 'Yes. I take photos and video during the session and share them for free.' },
      { question: 'What about prices and cancellations?', answer: 'Prices, durations and the cancellation policy are still being confirmed, so they are shown as TBD for now.' },
    ],
  },
  booking: {
    eyebrow: 'LET’S TALK', title: 'Tell me how you want to surf.', body: 'For now, please send a message on Instagram. We’ll confirm the date and plan together, depending on the waves.',
    note: 'This site does not collect personal information at the moment.', button: 'Message on Instagram',
  },
  footer: {
    locationLabel: 'Base', location: 'Central Okinawa · East coast', seasonLabel: 'Season', season: 'TBD', socialLabel: 'Social', linkPending: 'Link coming soon',
    copyright: 'Ryukyu Surf Base',
  },
  audio: { on: 'Turn off ocean sound', off: 'Turn on ocean sound', unavailable: 'Ocean sound coming soon' },
  aboutPage: {
    eyebrow: 'ABOUT KAITO', title: 'About Coach Kaito', lead: 'The story of how I went back to the ocean and started Ryukyu Surf Base.', placeholder: 'Coach photo coming soon', back: 'Back to home',
    // TODO: Kaito 審閱英文譯稿後才能正式上線（SPEC §4、§10）
    story: `🌊 Hi everyone! I’m Kaito, your surf coach 🌊
I was born and raised in Okinawa,
and I love surfing even more than eating.
After high school, I studied in Taiwan for a year and a half.
Back in Japan, I spent four years working in regional revitalization and startup support.
Then one day, I was diagnosed with depression.
After taking leave again and again, I could no longer keep working.
Lying in bed day after day,
the only thought that came to mind was:
“Before I die, I want to surf just one more time!”
I didn’t want to go back to a life without surfing.
If I could choose my life again,
I wanted to use the ocean and surfing to help people carrying the same kind of pressure.
🌴 With that in mind,
I started Ryukyu Surf Base.
🏄‍♀️ Beginner or experienced,
I’ll match your level and show you the best of Okinawa’s waves!`,
  },
  plansPage: {
    eyebrow: 'SURF PLANS', title: 'Three ways to surf', lead: 'Choose based on your experience and the pace of your trip. Prices, durations and details will be added once Kaito confirms them.', suitable: 'For', details: 'About this plan',
    included: 'Included', notIncluded: 'Not included', cancellation: 'Cancellation policy', rules: 'Before you join', pendingBody: 'TBD — waiting for Kaito to provide and confirm.',
  },
}
