/**
 * 預約系統示範（/booking、/booking/demo-admin）的文案。
 * 流程與欄位依 Kaito 現行的 Google 預約表單（2026-09-12）。
 */
import type { ExperienceLevel } from '../booking/storage'
import type { Language } from './types'

export type BookingCopy = {
  eyebrow: string
  title: string
  lead: string
  demoBanner: string
  demoFormLink: string
  demoBannerEnd: string
  steps: [string, string, string, string]
  next: string
  back: string
  submit: string
  units: { people: string; wetsuit: string; hardboard: string; decrease: string; increase: string }
  plan: { legend: string; peopleLabel: string; peopleHint: string }
  date: {
    legend: string
    hint: string
    primary: string
    alternate: string
    clear: string
    available: string
    full: string
    outOfRange: string
    demoLegend: string
    weekdays: string[]
    none: string
    tideNote: string
  }
  details: {
    legend: string
    name: string
    kana: string
    phone: string
    email: string
    experience: string
    experienceOptions: Record<ExperienceLevel, { label: string; desc: string }>
    wetsuit: string
    wetsuitHint: string
    sizes: string
    sizesHint: string
    hardboard: string
    hardboardHint: string
    note: string
    notePlaceholder: string
    source: string
    sourceOptions: string[]
  }
  confirm: {
    legend: string
    plan: string
    dates: string
    people: string
    contact: string
    experience: string
    rentals: string
    noRental: string
    note: string
    estimate: string
    course: string
    wetsuit: string
    hardboard: string
    total: string
    estimateNote: string
    agreeCancel: string
    agreeRules: string
    agreeLocal: string
    readRules: string
    readLocal: string
  }
  errors: { required: string; plan: string; date: string; email: string; phone: string; experience: string; sizes: string; agree: string }
  done: { title: string; body: string; demoNote: string; again: string; admin: string }
  admin: {
    eyebrow: string
    title: string
    lead: string
    empty: string
    seed: string
    clear: string
    toBooking: string
    statuses: Record<'pending' | 'confirmed' | 'declined', string>
    confirm: string
    decline: string
    reset: string
    remove: string
    created: string
    alt: string
    estimate: string
    source: string
    sampleName: string
  }
}

export const bookingCopy: Record<Language, BookingCopy> = {
  'zh-TW': {
    eyebrow: '預約衝浪',
    title: '預約衝浪',
    lead: '選方案、選日期、填資料，就能送出預約申請。我會在 24 小時內與你聯繫確認。',
    demoBanner: '這是預約系統的示範版：送出的資料只會存在你的瀏覽器，Kaito 不會收到；日期上的「已滿」也是示範資料。正式預約請使用',
    demoFormLink: 'Google 預約表單',
    demoBannerEnd: '。',
    steps: ['方案與人數', '日期', '你的資料', '確認送出'],
    next: '下一步',
    back: '上一步',
    submit: '送出預約申請',
    units: { people: '人', wetsuit: '件', hardboard: '片', decrease: '減少', increase: '增加' },
    plan: { legend: '選擇方案', peopleLabel: '參加人數', peopleHint: '衝浪體驗的每人價格依同行人數不同。' },
    date: {
      legend: '選擇日期',
      hint: '先點第一希望日期，再點第二希望日期（選填）。沖繩常因天候改期，填第二希望會比較好安排。',
      primary: '第一希望',
      alternate: '第二希望',
      clear: '取消',
      available: '可預約',
      full: '已滿',
      outOfRange: '不在預約期間',
      demoLegend: '（示範資料）',
      weekdays: ['日', '一', '二', '三', '四', '五', '六'],
      none: '尚未選擇',
      tideNote: '集合時間會依當天的滿潮時間安排，預約確認後通知。',
    },
    details: {
      legend: '你的資料',
      name: '姓名',
      kana: '拼音（選填）',
      phone: '電話號碼',
      email: '電子郵件',
      experience: '衝浪經驗',
      experienceOptions: {
        first: { label: '第一次體驗', desc: '從來沒有衝浪經驗' },
        beginner: { label: '初學者', desc: '會划水，但還不太能自己追浪' },
        intermediate: { label: '中級者', desc: '能自己追浪，並站起來直線滑行' },
        advanced: { label: '進階者', desc: '能橫向滑行、轉向' },
      },
      wetsuit: '防寒衣（wetsuit）租借',
      wetsuitHint: '每件 ¥2,000',
      sizes: '租借者的身高、體重',
      sizesHint: '例如：170cm 65kg、158cm 50kg',
      hardboard: '硬板（hard board）租借',
      hardboardHint: '每片 ¥5,000，僅限可自行潛越（duck dive）、追浪並起乘的衝浪者',
      note: '備註（選填）',
      notePlaceholder: '例如：不會游泳、受傷經歷、疾病',
      source: '你是怎麼知道我們的？（選填）',
      sourceOptions: ['SNS', '朋友推薦', 'Google 搜尋', '其他'],
    },
    confirm: {
      legend: '確認內容',
      plan: '方案',
      dates: '日期',
      people: '人數',
      contact: '聯絡方式',
      experience: '衝浪經驗',
      rentals: '租借',
      noRental: '無',
      note: '備註',
      estimate: '預估費用（當日現金支付）',
      course: '課程費用',
      wetsuit: '防寒衣',
      hardboard: '硬板',
      total: '合計',
      estimateNote: '依目前的收費方案計算（衝浪體驗為 2026 夏季開幕優惠），實際金額以 Kaito 確認為準。',
      agreeCancel: '我同意取消政策：活動 7 天前免費取消，之後需支付取消費用。',
      agreeRules: '我已閱讀並同意參加須知。',
      agreeLocal: '我同意遵守在地規則與文化尊重。',
      readRules: '查看參加須知',
      readLocal: '查看在地規則',
    },
    errors: {
      required: '請填寫這一欄。',
      plan: '請選擇方案。',
      date: '請選擇第一希望日期。',
      email: '請確認電子郵件格式。',
      phone: '請確認電話號碼。',
      experience: '請選擇衝浪經驗。',
      sizes: '租借防寒衣時，請填寫身高、體重。',
      agree: '三項都同意後才能送出。',
    },
    done: {
      title: '已送出預約申請',
      body: 'Kaito 會在 24 小時內與你聯繫確認。預約確認後，會依滿潮時間通知集合時間。',
      demoNote: '（示範）這筆申請只存在你的瀏覽器，Kaito 不會收到。',
      again: '再填一次',
      admin: '看 Kaito 端的畫面',
    },
    admin: {
      eyebrow: '預約管理',
      title: 'Kaito 的預約管理',
      lead: '示範版：這裡只會顯示這個瀏覽器送出的示範申請。正式版會用 Cloudflare Access 保護，資料存在 D1，並自動在 Google 日曆建立「待確認」事件。',
      empty: '目前沒有預約申請。',
      seed: '產生示範資料',
      clear: '清空示範資料',
      toBooking: '到預約頁',
      statuses: { pending: '待確認', confirmed: '已確認', declined: '已婉拒' },
      confirm: '確認',
      decline: '婉拒',
      reset: '改回待確認',
      remove: '刪除',
      created: '送出時間',
      alt: '第二希望',
      estimate: '預估費用',
      source: '得知管道',
      sampleName: '示範客人',
    },
  },
  'ja-JP': {
    eyebrow: 'ご予約',
    title: 'サーフィンを予約する',
    lead: 'プランと日付を選び、必要事項を入力して予約リクエストを送信してください。24時間以内に確認のご連絡をします。',
    demoBanner: 'これは予約システムのデモ版です。送信した内容はこのブラウザにだけ保存され、カイトには届きません。日付の「満員」もデモ用のデータです。実際のご予約は',
    demoFormLink: 'Google予約フォーム',
    demoBannerEnd: 'からお願いします。',
    steps: ['プランと人数', '日付', 'お客様情報', '確認・送信'],
    next: '次へ',
    back: '戻る',
    submit: '予約リクエストを送信',
    units: { people: '名', wetsuit: '着', hardboard: '本', decrease: '減らす', increase: '増やす' },
    plan: { legend: 'プランを選ぶ', peopleLabel: '参加人数', peopleHint: 'サーフィン体験は、参加人数によってお一人様の料金が変わります。' },
    date: {
      legend: '日付を選ぶ',
      hint: 'まず第1希望日、次に第2希望日（任意）をタップしてください。天候による日程変更はよくあるので、第2希望があると調整しやすくなります。',
      primary: '第1希望',
      alternate: '第2希望',
      clear: '取り消す',
      available: '予約可',
      full: '満員',
      outOfRange: '予約期間外',
      demoLegend: '（デモデータ）',
      weekdays: ['日', '月', '火', '水', '木', '金', '土'],
      none: '未選択',
      tideNote: '集合時間は当日の満潮時間に合わせて決め、予約確定後にご案内します。',
    },
    details: {
      legend: 'お客様情報',
      name: '氏名',
      kana: 'フリガナ（任意）',
      phone: '電話番号',
      email: 'メールアドレス',
      experience: 'サーフィン経験',
      experienceOptions: {
        first: { label: '初めて', desc: 'サーフィンしたことがない' },
        beginner: { label: '初心者', desc: 'パドルはできるが、波は自分で取れない' },
        intermediate: { label: '中級', desc: '自分で波を取り、立ってまっすぐ滑れる' },
        advanced: { label: '上級', desc: '横に走れる・ターンできる' },
      },
      wetsuit: 'ウェットスーツのレンタル',
      wetsuitHint: '1着 ¥2,000',
      sizes: 'レンタルする方の身長・体重',
      sizesHint: '例：170cm 65kg、158cm 50kg',
      hardboard: 'ハードボードのレンタル',
      hardboardHint: '1本 ¥5,000。ドルフィンスルー／ローリングスルー、波を取ってテイクオフができる方のみ',
      note: '特記事項（任意）',
      notePlaceholder: '例：泳げない、ケガ歴、持病など',
      source: 'どこで知りましたか？（任意）',
      sourceOptions: ['SNS', '友人・知人の紹介', 'Google検索', 'その他'],
    },
    confirm: {
      legend: '内容の確認',
      plan: 'プラン',
      dates: '日付',
      people: '人数',
      contact: '連絡先',
      experience: 'サーフィン経験',
      rentals: 'レンタル',
      noRental: 'なし',
      note: '特記事項',
      estimate: '料金の目安（当日現金払い）',
      course: 'レッスン料金',
      wetsuit: 'ウェットスーツ',
      hardboard: 'ハードボード',
      total: '合計',
      estimateNote: '現在の料金表（サーフィン体験は2026年夏季のオープン記念価格）で計算しています。実際の金額はカイトの確認をもって確定します。',
      agreeCancel: 'キャンセルポリシー（1週間前まで無料、それ以降はキャンセル料が発生）に同意します。',
      agreeRules: '注意事項を読み、同意します。',
      agreeLocal: 'ローカルルール・文化尊重を守ることに同意します。',
      readRules: '注意事項を見る',
      readLocal: 'ローカルルールを見る',
    },
    errors: {
      required: 'この項目を入力してください。',
      plan: 'プランを選んでください。',
      date: '第1希望日を選んでください。',
      email: 'メールアドレスの形式を確認してください。',
      phone: '電話番号を確認してください。',
      experience: 'サーフィン経験を選んでください。',
      sizes: 'ウェットスーツをレンタルする場合は、身長・体重を入力してください。',
      agree: '3つすべてに同意すると送信できます。',
    },
    done: {
      title: '予約リクエストを送信しました',
      body: 'カイトから24時間以内に確認のご連絡をします。予約確定後、満潮時間に合わせて集合時間をご案内します。',
      demoNote: '（デモ）このリクエストはこのブラウザにだけ保存され、カイトには届きません。',
      again: 'もう一度入力する',
      admin: 'カイト側の画面を見る',
    },
    admin: {
      eyebrow: '予約管理',
      title: 'カイトの予約管理',
      lead: 'デモ版：このブラウザから送信したデモのリクエストだけが表示されます。正式版ではCloudflare Accessで保護し、データはD1に保存、Googleカレンダーに「仮予約」の予定を自動で作成します。',
      empty: '予約リクエストはまだありません。',
      seed: 'デモデータを作成',
      clear: 'デモデータを消去',
      toBooking: '予約ページへ',
      statuses: { pending: '確認待ち', confirmed: '確定', declined: 'お断り' },
      confirm: '確定する',
      decline: 'お断りする',
      reset: '確認待ちに戻す',
      remove: '削除',
      created: '送信日時',
      alt: '第2希望',
      estimate: '料金の目安',
      source: '知ったきっかけ',
      sampleName: 'サンプル',
    },
  },
}
