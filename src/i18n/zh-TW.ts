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
    surfReport: '衝浪情報', surfGuide: '怎麼看浪', surfPoints: '沖繩四面海岸', language: '語言',
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
      {
        name: '衝浪體驗', englishName: 'SURF EXPERIENCE',
        forWhom: '第一次衝浪、還無法穩定自己追浪起乘的人',
        description: '教練全程陪同並協助推浪，讓你有更多機會追到浪、成功站起來。',
        duration: '約 2～2.5 小時',
        priceSummary: '每人 ¥13,500～¥15,000',
        includes: '軟板・腳繩・礁石鞋',
        audience: ['第一次衝浪的人', '還無法穩定自己追浪、起乘（take off）的衝浪者', '想在沖繩的大海放鬆身心的人'],
        features: [
          '教練全程陪同。',
          '教練會協助推浪，讓你有更多機會追到浪，也有更多機會成功站起來，盡情享受衝浪的樂趣。',
          '依照每位客人的經驗、體力及當天海況，安排最適合的體驗方式。',
        ],
        prices: [
          { label: '1 人', value: '¥15,000' },
          { label: '2 人同行', value: '每人 ¥14,500' },
          { label: '3 人同行', value: '每人 ¥14,000' },
          { label: '4 人以上', value: '每人 ¥13,500' },
        ],
        priceNote: '開幕優惠（2026 夏季限定）。夏季是衝浪旺季，若你事先同意，當天可能會和其他客人一起參加團體課程，敬請見諒與配合。',
        included: ['軟板（soft board）', '腳繩（leash）', '礁石鞋（reef boots）'],
        extras: ['防寒衣（wetsuit）租借 ¥2,000'],
      },
      {
        name: '衝浪導覽', englishName: 'SURF GUIDE',
        forWhom: '已能自行追浪並完成起乘的衝浪者',
        description: '帶你前往當天的浪點，介紹當地衝浪文化、規則與浪點地形。',
        duration: '約 2～2.5 小時',
        priceSummary: '每位 ¥13,000',
        includes: '浪點導覽與陪同',
        audience: ['已能自行追浪並完成起乘的衝浪者', '想挑戰礁盤浪點（reef break）的人', '想體驗沖繩不同浪點的人'],
        features: [
          '帶你前往當天最佳浪點。',
          '依照風向、浪況及潮汐安排最適合的衝浪點。',
          '介紹當地衝浪文化、規則及浪點地形。',
          '讓你更安心享受沖繩的礁盤浪點（reef break）。',
          '以陪同及路線建議為主，不包含初學者教學及推浪服務。',
        ],
        prices: [{ label: '每位', value: '¥13,000' }],
        priceNote: null,
        included: [],
        extras: ['硬板（hard board）租借 ¥5,000', '防寒衣（wetsuit）租借 ¥2,000'],
      },
      {
        name: 'Surf Trip', englishName: 'MULTI-DAY TRIP',
        forWhom: '想安排多日連續行程的人',
        description: '連續幾天下水，視浪況跨區移動。',
        duration: 'TBD', priceSummary: 'TBD', includes: 'TBD',
        audience: [], features: [], prices: [], priceNote: null, included: [], extras: [],
      },
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
      { number: '01', title: '集合', body: '預約確認後，我會依滿潮時間通知集合時間。會合後，一起往今天可能合適的海岸前進。' },
      { number: '02', title: '看點（spot check）', body: '先看浪、風向與現場狀況，再決定在哪裡下水。' },
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
      { question: '衝浪地點在哪裡？', answer: '主要在沖繩中部（宇流麻市）一帶，但不固定在同一個海灘。我會看當天的浪況、風向、潮汐與你的程度，再決定合適的浪點。' },
      { question: '第一次衝浪也可以嗎？', answer: '可以。衝浪體驗就是為第一次衝浪的人準備的，約 2～2.5 小時，教練全程陪同並協助推浪。' },
      { question: '可以用中文溝通嗎？', answer: '可以。我曾在台灣留學一年半，可用中文溝通；也提供日文服務。' },
      { question: '會有照片和影片嗎？', answer: '會。全程拍照錄影，照片與影片免費提供。' },
      { question: '價格與取消規則是什麼？', answer: '衝浪體驗每人 ¥13,500～¥15,000（2026 夏季開幕優惠，依同行人數），衝浪導覽每位 ¥13,000。當日現金支付；活動 7 天前免費取消，之後需支付取消費用。' },
      { question: '集合時間怎麼決定？', answer: '沖繩的浪多數在珊瑚礁上形成，大約只能在滿潮前後 4 小時內衝浪。預約確認後，我會依滿潮時間通知集合時間。' },
      { question: '可以租防寒衣嗎？', answer: '可以，防寒衣（wetsuit）租借 ¥2,000。預約時請提供身高、體重，我會準備合適的尺寸。' },
    ],
  },
  booking: {
    eyebrow: '聊聊吧', title: '先告訴我，你想怎麼衝。', body: '填寫預約表單後，我會在 24 小時內與你聯繫確認。付款方式為當日現金支付。',
    note: '預約表單使用 Google 表單。', button: '填寫預約表單', alt: '或透過 Instagram 私訊詢問',
  },
  footer: {
    locationLabel: '據點', location: '沖繩中部・宇流麻市', seasonLabel: '營業季節', season: 'TBD', socialLabel: '社群', linkPending: '連結待補',
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
    eyebrow: '衝浪方案', title: '三種下水方式', lead: '先依你的經驗與旅行節奏選擇。實際衝浪地點與集合時間，會依當天的風向、浪況與潮汐安排。',
    suitable: '適合', details: '方案說明', audience: '適合對象', features: '內容', priceDetail: '價格', included: '包含', extras: '加購',
    pendingBody: 'TBD — 待 Kaito 提供並確認。',
    locationTitle: '活動地點',
    locationBody: ['主要在沖繩中部（宇流麻市）活動。', '實際衝浪地點會依照當天的風向、浪況及潮汐，安排前往合適的浪點。'],
    rentalTitle: '裝備租借',
    rentals: [
      { label: '軟板（soft board）', value: '已包含於課程費用' },
      { label: '礁石鞋（reef boots）', value: '已包含於課程費用' },
      { label: '防寒衣（wetsuit）', value: '¥2,000' },
      { label: '硬板（hard board）', value: '¥5,000' },
    ],
    rentalNotes: [
      '硬板僅提供給具備基本衝浪能力（可自行潛越（duck dive）／烏龜翻（turtle roll）、控制衝浪板、追浪及起乘）的衝浪者租借。',
      '如需租借防寒衣，請在預約時提供身高、體重，我會協助準備合適的尺寸。',
    ],
    policyTitle: '付款與取消',
    policies: [
      '付款方式為當日現金支付。',
      '取消政策：活動 7 天前免費取消，之後需支付取消費用。',
      '若有身體狀況或受傷病史，請務必事先告知。',
      '沖繩的浪多數在珊瑚礁上形成，大約只能在滿潮前後 4 小時內衝浪。我會依滿潮時間安排行程，並在預約確認後通知集合時間。',
    ],
    rulesTitle: '參加須知',
    rules: [
      '活動中請遵守教練的指示。',
      '請勿打鬧或進行任何危險行為。',
      '這些活動具有潛在風險，包括跌倒、受傷、溺水，甚至死亡等狀況。',
      '若有身體不適或感到不舒服，請立即告知教練。',
      '請妥善使用租借裝備，若有損壞須負責賠償。',
      '若因天候或海況，主辦方有權更改、延後或中止活動。',
      '主辦方會在官方網站、SNS 等公開場合使用活動照片。',
    ],
    localTitle: '在地規則與文化尊重',
    localRules: [
      '在整趟行程中，請勿開啟定位追蹤功能，也請勿以任何形式向他人公開衝浪點的任何資訊。',
      '請勿在海上或衝浪點自行拍照或錄影，只有教練拍攝的照片可以分享。',
      '海上以當地衝浪者為優先，請遵守順序與禮儀。勿與他人爭搶浪，並避免碰撞或爭執。',
      '海洋與自然是當地居民生活的一部分，請懷著尊重的心參加活動。垃圾請自行帶走，一起維護環境。',
    ],
    bookingTitle: '預約方式',
    bookingBody: '填寫預約表單後，我會在 24 小時內與你聯繫確認，完成預約。',
    bookingButton: '填寫預約表單',
  },
}
