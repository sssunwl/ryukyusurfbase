import type { Copy } from './types'

export const zhTW: Copy = {
  markers: {
    hero: { n: '00', en: 'OUTSIDE', label: '海面外' },
    plans: { n: '01', en: 'PADDLE OUT', label: '划出去' },
    why: { n: '02', en: 'CHECK', label: '看浪' },
    day: { n: '03', en: 'LINE UP', label: '等浪' },
    coach: { n: '04', en: 'TAKE OFF', label: '起乘' },
    faq: { n: '05', en: 'INSIDE', label: '靠岸' },
    booking: { n: '06', en: 'KICK OUT', label: '上岸' },
  },
  meta: {
    title: '琉球衝浪基地 Ryukyu Surf Base',
    description: '沖繩衝浪體驗、衝浪導覽與多日 Surf Trip。依當日浪況找合適的浪點，提供繁體中文與日文服務。',
  },
  common: {
    brand: '琉球衝浪基地', brandEn: 'RYUKYU SURF BASE', home: '首頁', about: '關於教練', plans: '方案',
    surfReport: '衝浪情報', surfGuide: '怎麼看浪', surfPoints: '沖繩浪點', language: '語言',
    openMenu: '開啟選單', closeMenu: '關閉選單', learnMore: '了解更多', viewPlans: '查看方案', contactInstagram: 'Instagram 私訊', pending: 'TBD',
  },
  hero: {
    eyebrow: '和海斗在沖繩衝浪',
    title: '先看浪，再決定今天往哪裡走。',
    body: '我會依當天浪況，在沖繩找適合你程度的浪點。初次下水，或已經熟悉衝浪，都可以一起出發。',
    primary: '預約體驗', secondary: '先看看方案', scroll: '往下看',
  },
  plansSection: {
    eyebrow: '三種下水方式', title: '你想怎麼下水？', body: '從第一次站上板，到連續幾天跨區追浪，先從你的經驗與這趟旅程的節奏開始選。',
    duration: '時長', price: '價格', included: '包含',
    items: [
      { name: '衝浪體驗', englishName: 'SURF EXPERIENCE', forWhom: '第一次衝浪的人', description: '從你的程度出發，找適合初學者的浪況與地點。', includes: 'TBD' },
      { name: '衝浪導覽', englishName: 'SURF GUIDE', forWhom: '已經會衝、想找合適浪點的人', description: '依當日浪況移動，不把行程綁在固定海灘。', includes: 'TBD' },
      { name: 'Surf Trip', englishName: 'MULTI-DAY TRIP', forWhom: '想安排多日連續行程的人', description: '連續幾天下水，視浪況跨區移動。', includes: 'TBD' },
    ],
  },
  why: {
    eyebrow: '為什麼是海斗', title: '一起下水前，你可以先知道的事',
    items: [
      { title: '看浪況才決定去哪', body: '一早先看 2–3 個浪點，必要時開一個半小時跨島。' },
      { title: '中文溝通', body: '高中畢業後，我曾在台灣留學一年半。' },
      { title: '少人數・私人制', body: '採少人數與私人制。' },
      { title: '全程拍照錄影', body: '照片與影片會免費給你。' },
    ],
  },
  day: {
    eyebrow: '跟著浪的一天', title: '一天長什麼樣', body: '海況每天不同，所以順序清楚，時間與浪點保留彈性。',
    steps: [
      { number: '01', title: '飯店接送', body: '會合後，一起往今天可能合適的海岸前進。' },
      { number: '02', title: '看點', body: '先看浪、風向與現場狀況，再決定在哪裡下水。' },
      { number: '03', title: '下水', body: '依你的程度與當天浪況進行衝浪體驗或導覽。' },
      { number: '04', title: '咖啡廳', body: '下水後，到咖啡廳休息、聊聊今天的浪。' },
    ],
  },
  coach: {
    eyebrow: '關於海斗', title: '在沖繩長大的海斗',
    intro: '我在沖繩出生長大，也曾在台灣留學一年半。我想透過大海與衝浪，幫到同樣背負壓力的人。',
    link: '讀我的故事', placeholder: '教練照片待補',
  },
  faq: {
    eyebrow: '出發之前', title: '常見問題',
    items: [
      { question: '衝浪地點在哪裡？', answer: '不固定在同一個海灘。我會看當天的浪況、風向與你的程度，再決定合適的浪點。' },
      { question: '第一次衝浪也可以嗎？', answer: '可以。衝浪體驗是為第一次接觸衝浪的人準備，實際時長與包含項目目前為 TBD。' },
      { question: '可以用中文溝通嗎？', answer: '可以。我曾在台灣留學一年半，可用中文溝通；也提供日文服務。' },
      { question: '會有照片和影片嗎？', answer: '會。全程拍照錄影，照片與影片免費提供。' },
      { question: '價格與取消規則是什麼？', answer: '價格、時長與取消規則仍待確認，目前統一標示為 TBD。' },
    ],
  },
  booking: {
    eyebrow: '聊聊吧', title: '先告訴我，你想怎麼衝。', body: '目前請透過 Instagram 私訊詢問。日期與行程會依浪況一起確認。',
    note: '目前不會在網站收集個人資料。', button: '前往 Instagram 私訊',
  },
  footer: {
    locationLabel: '據點', location: '沖繩中部・東海岸', seasonLabel: '營業季節', season: 'TBD', socialLabel: '社群', linkPending: '連結待補',
    copyright: '琉球衝浪基地 Ryukyu Surf Base',
  },
  audio: { on: '關閉海浪聲', off: '開啟海浪聲', unavailable: '海浪音檔待補' },
  aboutPage: {
    eyebrow: '關於海斗', title: '關於教練海斗', lead: '這是我走回海裡，也開始琉球衝浪基地的故事。', placeholder: '教練照片待補', back: '回到首頁',
    story: `🌊 大家好！我是教練海斗 🌊
我在沖繩出生長大，
比起吃飯，更愛衝浪。
高中畢業後，我曾在台灣留學一年半。
回到日本後，從事「地方創生」與「創業支援」相關工作四年。
然而某一天，我罹患了憂鬱症。
在反覆休職之後，最終無法再繼續工作。
在床上虛度光陰的日子裡，
腦海中唯一浮現的念頭是：
「在死之前，至少還想再衝一次浪！」
我不想再過那種失去衝浪的生活。
如果可以重新選擇人生，
我希望透過大海與衝浪，能幫助同樣背負壓力的人。
🌴 帶著這樣的心情，
我創立了「琉球衝浪基地 Ryukyu Surf Base」。
🏄‍♀️ 不論是初學者還是有經驗的衝浪者，
我都會依照你的程度，帶你體驗最棒的沖繩海浪！`,
  },
  plansPage: {
    eyebrow: '衝浪方案', title: '三種下水方式', lead: '先依你的經驗與旅行節奏選擇。價格、時長和細節會在 Kaito 確認後補上。', suitable: '適合', details: '方案說明',
    included: '包含項目', notIncluded: '不包含項目', cancellation: '取消政策', rules: '必讀規則', pendingBody: 'TBD — 待 Kaito 提供並確認。',
  },
}
