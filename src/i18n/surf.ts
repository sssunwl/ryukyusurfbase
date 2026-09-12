/**
 * 衝浪情報三頁的文案（SPEC §6.3）。
 * 這個檔案受 `npm run check:forecast-words` 檢查：不得出現任何對未來時段或浪點的判斷字眼（SPEC §6.1）。
 * 「怎麼看浪」的教學文案是 Claude 撰寫的草稿，Kaito 審閱後才能正式上線。
 */
import type { Language } from './types'

type Step = { id: string; title: string; look: string; meaning: string; myth: string }
type CoastInfo = { id: 'west' | 'east' | 'south' | 'north'; name: string; faces: string; swell: string; offshore: string }

export type SurfCopy = {
  report: {
    eyebrow: string
    title: string
    lead: string
    loading: string
    unconfigured: string
    unconfiguredHint: string
    error: string
    retry: string
    tabsLabel: string
    today: string
    sections: Record<'warnings' | 'tide' | 'sun' | 'forecast' | 'week' | 'model' | 'field', string>
    west: string
    east: string
    high: string
    low: string
    hour: string
    sunrise: string
    sunset: string
    weather: string
    wind: string
    wave: string
    pop: string
    temp: string
    reliability: string
    noWarnings: string
    warningsLink: string
    issued: string
    forecastMissing: string
    weekNote: string
    weekMissing: string
    tideNote: string
    tideMissing: string
    modelOff: string
    coasts: Record<'west' | 'east' | 'south' | 'north', string>
    fieldNote: string
    original: string
    howToRead: string
    sourcesTitle: string
    sources: string[]
    disclaimer: string
    toGuide: string
    toPoints: string
  }
  guide: {
    eyebrow: string
    title: string
    lead: string
    draftNote: string
    lookLabel: string
    meaningLabel: string
    mythLabel: string
    steps: Step[]
    coastsTitle: string
    coastsBody: string
    swellLabel: string
    offshoreLabel: string
    restTitle: string
    restBody: string
    toReport: string
  }
  points: {
    eyebrow: string
    title: string
    lead: string
    facesLabel: string
    swellLabel: string
    offshoreLabel: string
    pending: string
    note: string
    fields: Record<'area' | 'type' | 'swell' | 'offshore' | 'tide' | 'level' | 'hazards' | 'etiquette', string>
    coasts: CoastInfo[]
    toReport: string
  }
}

export const surfCopy: Record<Language, SurfCopy> = {
  'zh-TW': {
    report: {
      eyebrow: '衝浪情報',
      title: '沖繩本島一週海況數據',
      lead: '潮汐、日出日落、氣象廳的預報與警報，整理在同一頁。這裡只提供數據；怎麼解讀，請看「怎麼看浪」。',
      loading: '正在讀取資料…',
      unconfigured: '資料服務尚未連線。',
      unconfiguredHint: '衝浪情報的資料服務還沒部署。先看看怎麼讀這些數據，或到 Windy 看各海岸。',
      error: '暫時無法取得資料。',
      retry: '重新整理',
      tabsLabel: '選擇日期',
      today: '今天',
      sections: { warnings: '警報・注意報', tide: '潮汐', sun: '日出・日落', forecast: '氣象廳預報', week: '週間天氣', model: '湧浪與風', field: 'Kaito 現場報告' },
      west: '西岸・那霸',
      east: '東岸・中城湾港',
      high: '滿潮',
      low: '乾潮',
      hour: '時',
      sunrise: '日出',
      sunset: '日落',
      weather: '天氣',
      wind: '風',
      wave: '浪',
      pop: '降雨機率',
      temp: '氣溫（那霸）',
      reliability: '信賴度',
      noWarnings: '沖繩本島目前沒有發布警報或注意報。',
      warningsLink: '到氣象廳看完整內容',
      issued: '沖繩氣象台 {time} 發布',
      forecastMissing: '氣象廳只發布到後天的浪與風，這一天沒有這項資料。',
      weekNote: '第 3 天以後，氣象廳的週間預報只有天氣、降雨機率與氣溫，不發布浪與風。',
      weekMissing: '這一天沒有週間預報資料。',
      tideNote: '單位 cm，以氣象廳潮位表的基準面為準。灰色區塊是日落到日出。',
      tideMissing: '這一天的潮位資料暫時無法取得。',
      modelOff: '逐時的湧浪方向、週期與陣風需要數值模型資料，這部分還在確認中。在那之前，可以用 Windy 看各海岸：',
      coasts: { west: '西岸', east: '東岸', south: '南岸', north: '北岸' },
      fieldNote: 'Kaito 看完海之後，在 Telegram 頻道寫下的現況。',
      original: '日文原文',
      howToRead: '怎麼看 →',
      sourcesTitle: '資料來源與聲明',
      sources: [
        '潮汐：氣象廳潮位表（那霸、沖繩），依原始數據繪製。',
        '天氣、風、浪、警報：氣象廳（沖繩氣象台）發布的內容，由琉球衝浪基地翻譯整理。',
        '日出日落：依天文公式計算，誤差約 1–2 分鐘。',
      ],
      disclaimer: '本頁只轉載數據與官方預報，不對任何時段或浪點做判斷。海況變化很快，下水前請再確認現場狀況、官方警報與自己的程度。',
      toGuide: '怎麼看浪',
      toPoints: '沖繩浪點',
    },
    guide: {
      eyebrow: '怎麼看浪',
      title: '自己看懂沖繩的浪',
      lead: '同一天，西岸可能很平，東岸卻有浪。照這八個步驟看數據，你會知道該注意什麼，也會更懂教練在現場看的是什麼。',
      draftNote: '教學內容為草稿，將由 Kaito 審閱。',
      lookLabel: '看什麼',
      meaningLabel: '在沖繩代表什麼',
      mythLabel: '常見誤會',
      steps: [
        { id: 'tide', title: '潮汐', look: '滿潮、乾潮的時間與潮位（cm）。', meaning: '沖繩很多浪點是珊瑚礁。潮位低的時候，礁盤離水面很近，甚至會露出來；同一個浪點，漲潮和退潮時是完全不同的樣子。', myth: '「有浪就能下水」——礁盤浪點要先看潮位，水太淺時跌倒很容易受傷。' },
        { id: 'swell-height', title: '湧浪高度', look: '氣象廳的「浪」，或數值模型的湧浪高度（公尺）。', meaning: '氣象廳發布的是沿海海域的浪高，跟你在某個浪點實際看到的浪不一定一樣，岸邊的地形會讓浪變大或變小。', myth: '「預報寫 1.5 公尺，海灘上就是 1.5 公尺」——海域的數字只是參考方向。' },
        { id: 'swell-direction', title: '湧浪方向', look: '湧浪從哪個方向來。', meaning: '湧浪要能直接打到海岸才會有浪。沖繩本島四面環海：西邊來的湧浪到西岸，東邊來的到東岸；被島擋住的那一面，就算數字不小也可能很平。', myth: '「沖繩今天浪 2 公尺」——要問的是哪一面海岸。' },
        { id: 'period', title: '週期', look: '湧浪週期（秒），也就是兩道浪之間隔多久。', meaning: '一般來說，週期越長，浪帶的能量越多、排列越整齊；週期短的多半是附近的風吹出來的風浪，比較亂。', myth: '「週期長就一定是大浪」——湧浪本身小，週期再長浪也不會大。' },
        { id: 'wind-direction', title: '風向', look: '風從哪個方向吹來。', meaning: '風從陸地吹向海（離岸風，offshore）時，浪面比較乾淨；從海吹向陸地（向岸風，onshore）時，浪面容易被吹亂。同一個風向，對西岸和東岸的效果剛好相反。', myth: '「今天風很小所以沒差」——風向決定浪面的樣子，風速決定影響有多大，兩個都要看。' },
        { id: 'wind-speed', title: '風速與陣風', look: '平均風速與陣風。', meaning: '平均風速不大、陣風卻很強的時候，海面會一陣一陣變亂，划水也比較吃力。', myth: '「平均風速低就放心」——突然的變化通常來自陣風。' },
        { id: 'spot', title: '浪點朝向與地形', look: '浪點面向哪個方向、是礁盤還是沙灘。', meaning: '把湧浪方向、風向、潮位套到浪點的朝向與地形上，才看得出那一天那個浪點大概是什麼樣子。各海岸的特性請看「沖繩浪點」。', myth: '「海很漂亮很平靜」不代表有浪；「有浪」也不代表每個人都能應付。' },
        { id: 'level', title: '自己的程度', look: '自己的經驗、體力與裝備。', meaning: '同樣的浪，對有經驗的人剛好，對第一次衝浪的人可能太大太快。不確定的時候，請和熟悉當地海況的教練一起下水。', myth: '「別人都下水了，我應該也可以」——每個人能應付的浪不一樣。' },
      ],
      coastsTitle: '沖繩本島的四面海岸',
      coastsBody: '海岸面向哪裡，就會收到從那個方向來的湧浪；風從陸地那一側吹向海，就是那面海岸的離岸風。這是通則，實際還要看每個浪點的地形。',
      swellLabel: '湧浪來向',
      offshoreLabel: '離岸風',
      restTitle: '沒有浪、颱風、高浪注意報的日子，就是休息日',
      restBody: '衝浪不是每天都能去。整個本島都沒有湧浪、颱風接近，或氣象廳發布高浪相關的警報與注意報時，把時間留給別的行程吧。',
      toReport: '看這一週的數據',
    },
    points: {
      eyebrow: '沖繩浪點',
      title: '沖繩本島的四面海岸',
      lead: '每個浪點的朝向、地形和潮位特性都不同。這頁整理各海岸的通則與浪點介紹；當天的數據請到「衝浪情報」自己對照。',
      facesLabel: '面向',
      swellLabel: '收到的湧浪',
      offshoreLabel: '離岸風',
      pending: '浪點資料整理中，會由 Kaito 確認後補上。',
      note: '浪點介紹不會跟當天數據連動，請自己對照判讀。',
      fields: { area: '區域', type: '類型', swell: '湧浪方向', offshore: '離岸風', tide: '潮位', level: '程度', hazards: '危險', etiquette: '在地禮儀' },
      coasts: [
        { id: 'west', name: '西岸', faces: '東海（東シナ海）', swell: '從西邊來的湧浪', offshore: '東風' },
        { id: 'east', name: '東岸', faces: '太平洋', swell: '從東邊來的湧浪', offshore: '西風' },
        { id: 'south', name: '南岸', faces: '南方的海', swell: '從南邊來的湧浪', offshore: '北風' },
        { id: 'north', name: '北岸', faces: '北方的海', swell: '從北邊來的湧浪', offshore: '南風' },
      ],
      toReport: '看這一週的數據',
    },
  },
  'ja-JP': {
    report: {
      eyebrow: 'サーフ情報',
      title: '沖縄本島 1週間の海況データ',
      lead: '潮汐、日の出・日の入り、気象庁の予報と警報を1ページにまとめました。ここではデータのみを掲載しています。読み方は「波の読み方」をご覧ください。',
      loading: 'データを読み込んでいます…',
      unconfigured: 'データサービスに未接続です。',
      unconfiguredHint: 'サーフ情報のデータサービスはまだ公開前です。先にデータの読み方を見るか、Windyで各海岸をご確認ください。',
      error: 'データを取得できませんでした。',
      retry: '再読み込み',
      tabsLabel: '日付を選択',
      today: '今日',
      sections: { warnings: '警報・注意報', tide: '潮汐', sun: '日の出・日の入り', forecast: '気象庁の予報', week: '週間天気', model: 'うねりと風', field: 'カイトの現地レポート' },
      west: '西海岸・那覇',
      east: '東海岸・中城湾港',
      high: '満潮',
      low: '干潮',
      hour: '時',
      sunrise: '日の出',
      sunset: '日の入り',
      weather: '天気',
      wind: '風',
      wave: '波',
      pop: '降水確率',
      temp: '気温（那覇）',
      reliability: '信頼度',
      noWarnings: '沖縄本島地方に発表中の警報・注意報はありません。',
      warningsLink: '気象庁で詳細を見る',
      issued: '沖縄気象台 {time} 発表',
      forecastMissing: '気象庁の波と風の予報は明後日までのため、この日のデータはありません。',
      weekNote: '3日目以降、気象庁の週間天気予報は天気・降水確率・気温のみで、波と風は発表されません。',
      weekMissing: 'この日の週間予報データはありません。',
      tideNote: '単位はcm、気象庁潮位表の基準面からの高さです。グレーの部分は日の入りから日の出まで。',
      tideMissing: 'この日の潮位データを取得できませんでした。',
      modelOff: '1時間ごとのうねりの向き・周期・突風には数値モデルのデータが必要なため、現在確認中です。それまではWindyで各海岸をご覧ください：',
      coasts: { west: '西海岸', east: '東海岸', south: '南海岸', north: '北海岸' },
      fieldNote: 'カイトが海を見たあとにTelegramチャンネルへ書いた現地の様子です。',
      original: '原文',
      howToRead: '読み方 →',
      sourcesTitle: 'データの出典と注意事項',
      sources: [
        '潮汐：気象庁 潮位表（那覇・沖縄）のデータをもとに作図。',
        '天気・風・波・警報：気象庁（沖縄気象台）の発表内容を、琉球サーフベースが翻訳・整理。',
        '日の出・日の入り：天文計算による値（誤差1〜2分程度）。',
      ],
      disclaimer: 'このページはデータと公式予報の転載のみで、時間帯やポイントについての判断は行いません。海況は急に変わります。海に入る前に、現地の様子、公式の警報、ご自身のレベルを必ず確認してください。',
      toGuide: '波の読み方',
      toPoints: '沖縄サーフポイント',
    },
    guide: {
      eyebrow: '波の読み方',
      title: '沖縄の波を自分で読む',
      lead: '同じ日でも、西海岸は静かで東海岸には波がある、ということがあります。8つのステップでデータを見ていくと、何に気をつければいいか、コーチが現地で何を見ているかがわかってきます。',
      draftNote: '解説は下書きです。カイトの確認後に正式公開します。',
      lookLabel: '見るもの',
      meaningLabel: '沖縄では',
      mythLabel: 'よくある誤解',
      steps: [
        { id: 'tide', title: '潮汐', look: '満潮・干潮の時刻と潮位（cm）。', meaning: '沖縄の多くのポイントはリーフです。潮位が低いとリーフが水面近くまで来て、出てしまうこともあります。同じポイントでも、満ち潮と引き潮ではまったく違う姿になります。', myth: '「波があれば入れる」——リーフのポイントはまず潮位。浅いと転んだときにケガをしやすくなります。' },
        { id: 'swell-height', title: 'うねりの高さ', look: '気象庁の「波」、または数値モデルのうねりの高さ（m）。', meaning: '気象庁が発表するのは沿岸の海域の波の高さで、特定のポイントで実際に見る波と同じとは限りません。地形によって大きくも小さくもなります。', myth: '「予報が1.5mならビーチでも1.5m」——海域の数字は目安です。' },
        { id: 'swell-direction', title: 'うねりの向き', look: 'うねりがどの方向から来るか。', meaning: 'うねりが海岸に直接届かないと波は立ちません。沖縄本島は四方を海に囲まれ、西からのうねりは西海岸へ、東からは東海岸へ届きます。島の陰になる側は、数字が大きくても静かなことがあります。', myth: '「今日の沖縄は波2m」——どの海岸の話かが大切です。' },
        { id: 'period', title: '周期', look: 'うねりの周期（秒）、つまり波と波の間隔。', meaning: '一般に、周期が長いほど波のエネルギーが大きく、きれいにそろいます。周期が短いものは近くの風で立った風波であることが多く、乱れがちです。', myth: '「周期が長ければ必ず大きい」——うねり自体が小さければ、周期が長くても波は大きくなりません。' },
        { id: 'wind-direction', title: '風向き', look: '風がどの方向から吹いているか。', meaning: '陸から海へ吹く風（オフショア）のときは波の面がきれいに、海から陸へ吹く風（オンショア）のときは乱れやすくなります。同じ風向きでも、西海岸と東海岸では効果が逆になります。', myth: '「風が弱いから関係ない」——風向きが波の面を、風速がその影響の大きさを決めます。両方を見ましょう。' },
        { id: 'wind-speed', title: '風速と突風', look: '平均風速と突風。', meaning: '平均風速が弱くても突風が強いと、海面がときどき乱れ、パドルもきつくなります。', myth: '「平均風速が低いから安心」——急な変化はたいてい突風から来ます。' },
        { id: 'spot', title: 'ポイントの向きと地形', look: 'ポイントがどちらを向いているか、リーフか砂浜か。', meaning: 'うねりの向き、風向き、潮位をポイントの向きと地形に当てはめると、その日のそのポイントの様子が見えてきます。海岸ごとの特徴は「沖縄サーフポイント」をご覧ください。', myth: '「海がきれいで穏やか」でも波があるとは限らず、「波がある」からといって誰でも入れるとは限りません。' },
        { id: 'level', title: '自分のレベル', look: '経験、体力、道具。', meaning: '同じ波でも、経験者にはちょうどよく、初めての人には大きく速すぎることがあります。迷ったら、地元の海をよく知るコーチと一緒に入りましょう。', myth: '「みんな入っているから自分も大丈夫」——対応できる波は人それぞれです。' },
      ],
      coastsTitle: '沖縄本島の4つの海岸',
      coastsBody: '海岸が向いている方向から来るうねりが届き、陸側から海へ吹く風がその海岸のオフショアになります。これは一般的な考え方で、実際には各ポイントの地形も関わります。',
      swellLabel: 'うねりの向き',
      offshoreLabel: 'オフショア',
      restTitle: '波がない日、台風の日、波浪の注意報が出ている日は休みの日',
      restBody: 'サーフィンは毎日できるものではありません。本島全体にうねりがないとき、台風が近づいているとき、気象庁から波に関する警報・注意報が出ているときは、ほかの予定を楽しみましょう。',
      toReport: '今週のデータを見る',
    },
    points: {
      eyebrow: '沖縄サーフポイント',
      title: '沖縄本島の4つの海岸',
      lead: 'ポイントごとに向き、地形、潮位の特徴は違います。このページでは海岸ごとの一般的な特徴とポイントを紹介します。当日のデータは「サーフ情報」でご自身で照らし合わせてください。',
      facesLabel: '向き',
      swellLabel: '届くうねり',
      offshoreLabel: 'オフショア',
      pending: 'ポイント情報は準備中です。カイトの確認後に掲載します。',
      note: 'ポイント紹介は当日のデータとは連動していません。ご自身で照らし合わせてください。',
      fields: { area: 'エリア', type: 'タイプ', swell: 'うねりの向き', offshore: 'オフショア', tide: '潮位', level: 'レベル', hazards: '危険', etiquette: 'ローカルルール' },
      coasts: [
        { id: 'west', name: '西海岸', faces: '東シナ海', swell: '西からのうねり', offshore: '東風' },
        { id: 'east', name: '東海岸', faces: '太平洋', swell: '東からのうねり', offshore: '西風' },
        { id: 'south', name: '南海岸', faces: '南側の海', swell: '南からのうねり', offshore: '北風' },
        { id: 'north', name: '北海岸', faces: '北側の海', swell: '北からのうねり', offshore: '南風' },
      ],
      toReport: '今週のデータを見る',
    },
  },
  en: {
    report: {
      eyebrow: 'SURF REPORT',
      title: 'Okinawa main island: a week of ocean data',
      lead: 'Tides, sunrise and sunset, and the Japan Meteorological Agency’s forecasts and warnings on one page. This page shows data only — see “Reading the Waves” for how to read it.',
      loading: 'Loading data…',
      unconfigured: 'The data service is not connected yet.',
      unconfiguredHint: 'The surf report data service has not been deployed yet. Learn how to read the data first, or check each coast on Windy.',
      error: 'Data is temporarily unavailable.',
      retry: 'Reload',
      tabsLabel: 'Choose a date',
      today: 'Today',
      sections: { warnings: 'Warnings & advisories', tide: 'Tide', sun: 'Sunrise & sunset', forecast: 'JMA forecast', week: 'Weekly weather', model: 'Swell & wind', field: 'Kaito’s field report' },
      west: 'West coast · Naha',
      east: 'East coast · Nakagusuku Bay',
      high: 'High',
      low: 'Low',
      hour: 'h',
      sunrise: 'Sunrise',
      sunset: 'Sunset',
      weather: 'Weather',
      wind: 'Wind',
      wave: 'Waves',
      pop: 'Chance of rain',
      temp: 'Temperature (Naha)',
      reliability: 'Reliability',
      noWarnings: 'No warnings or advisories are in effect for the Okinawa main island.',
      warningsLink: 'Full details on the JMA website',
      issued: 'Issued by Okinawa Meteorological Office, {time}',
      forecastMissing: 'JMA issues wave and wind forecasts only up to two days ahead, so this day has none.',
      weekNote: 'From day 3 on, the JMA weekly forecast only covers weather, chance of rain and temperature — no waves or wind.',
      weekMissing: 'No weekly forecast data for this day.',
      tideNote: 'Heights in cm above the JMA tide table datum. The grey areas are sunset to sunrise.',
      tideMissing: 'Tide data for this day is temporarily unavailable.',
      modelOff: 'Hourly swell direction, period and gusts need numerical model data, which is still being confirmed. Until then, check each coast on Windy:',
      coasts: { west: 'West', east: 'East', south: 'South', north: 'North' },
      fieldNote: 'What Kaito saw when he checked the ocean, posted to the Telegram channel.',
      original: 'Japanese original',
      howToRead: 'How to read →',
      sourcesTitle: 'Sources & notes',
      sources: [
        'Tide: JMA tide tables (Naha, Okinawa), plotted from the original data.',
        'Weather, wind, waves and warnings: published by JMA (Okinawa Meteorological Office), translated and organised by Ryukyu Surf Base.',
        'Sunrise and sunset: calculated with an astronomical formula (within about 1–2 minutes).',
      ],
      disclaimer: 'This page only republishes data and official forecasts. It makes no call about any time or surf point. Conditions change quickly — before you paddle out, check the conditions on site, official warnings and your own level.',
      toGuide: 'Reading the Waves',
      toPoints: 'Okinawa Surf Points',
    },
    guide: {
      eyebrow: 'READING THE WAVES',
      title: 'Read Okinawa’s waves yourself',
      lead: 'On the same day, the west coast can be flat while the east coast has waves. Go through the data in these eight steps and you’ll know what to watch for — and what a coach is looking at on the beach.',
      draftNote: 'This guide is a draft and will be reviewed by Kaito.',
      lookLabel: 'What to look at',
      meaningLabel: 'What it means in Okinawa',
      mythLabel: 'Common misunderstanding',
      steps: [
        { id: 'tide', title: 'Tide', look: 'The times and heights (cm) of high and low tide.', meaning: 'Many Okinawa surf points are coral reefs. At low tide the reef sits close to the surface and can even be exposed. The same point looks completely different on a rising and a falling tide.', myth: '“If there are waves, I can go in.” On a reef, check the tide first — in shallow water a fall can easily hurt.' },
        { id: 'swell-height', title: 'Swell height', look: 'JMA’s “waves”, or the model’s swell height (m).', meaning: 'JMA reports wave height for the coastal sea area. It is not necessarily what you see at a particular point — the shape of the coast can make waves bigger or smaller.', myth: '“The forecast says 1.5 m, so it’s 1.5 m at the beach.” Sea-area numbers are only a rough guide.' },
        { id: 'swell-direction', title: 'Swell direction', look: 'The direction the swell comes from.', meaning: 'Swell has to reach a coast directly to make waves. The main island has sea on every side: swell from the west reaches the west coast, swell from the east reaches the east coast. The sheltered side can be flat even when the numbers look big.', myth: '“Okinawa has 2 m waves today.” The real question is: which coast?' },
        { id: 'period', title: 'Period', look: 'The swell period in seconds — the time between waves.', meaning: 'In general, a longer period carries more energy and lines up more cleanly. Short-period waves are usually wind waves from nearby winds and tend to be messy.', myth: '“Long period means big waves.” If the swell itself is small, a long period won’t make the waves big.' },
        { id: 'wind-direction', title: 'Wind direction', look: 'The direction the wind is blowing from.', meaning: 'Wind blowing from land to sea (offshore) keeps the wave faces clean; wind from sea to land (onshore) tends to chop them up. The same wind direction has the opposite effect on the west and east coasts.', myth: '“The wind is light, so it doesn’t matter.” Direction shapes the wave face and speed decides how much — look at both.' },
        { id: 'wind-speed', title: 'Wind speed & gusts', look: 'Average wind speed and gusts.', meaning: 'When the average wind is light but gusts are strong, the surface gets choppy in bursts and paddling gets harder.', myth: '“Low average wind means no worries.” Sudden changes usually come from gusts.' },
        { id: 'spot', title: 'Point direction & terrain', look: 'Which way a point faces, and whether it’s reef or sand.', meaning: 'Put the swell direction, wind direction and tide together with a point’s direction and terrain, and you start to see what that point looks like that day. See “Okinawa Surf Points” for each coast.', myth: 'A beautiful, calm sea doesn’t mean there are waves — and waves don’t mean everyone can handle them.' },
        { id: 'level', title: 'Your own level', look: 'Your experience, fitness and gear.', meaning: 'The same waves can feel just right to an experienced surfer and too big and fast for a first-timer. When unsure, go in with a coach who knows the local ocean.', myth: '“Everyone else is out, so I’ll be fine.” The waves each person can handle are different.' },
      ],
      coastsTitle: 'The four coasts of the main island',
      coastsBody: 'A coast receives swell from the direction it faces, and wind blowing from the land side out to sea is offshore for that coast. This is the general idea; each point’s terrain matters too.',
      swellLabel: 'Swell from',
      offshoreLabel: 'Offshore wind',
      restTitle: 'No waves, a typhoon, or a high-wave advisory? It’s a rest day',
      restBody: 'Surfing isn’t possible every day. When there’s no swell anywhere on the island, a typhoon is approaching, or JMA has issued wave-related warnings or advisories, save the day for something else.',
      toReport: 'See this week’s data',
    },
    points: {
      eyebrow: 'OKINAWA SURF POINTS',
      title: 'The four coasts of the main island',
      lead: 'Every point has its own direction, terrain and tide behaviour. This page covers the general character of each coast and introduces surf points. Compare them with the day’s data on the Surf Report yourself.',
      facesLabel: 'Faces',
      swellLabel: 'Receives',
      offshoreLabel: 'Offshore wind',
      pending: 'Surf point details are being prepared and will be added once Kaito confirms them.',
      note: 'Surf point details are not linked to the day’s data. Compare them yourself.',
      fields: { area: 'Area', type: 'Type', swell: 'Swell direction', offshore: 'Offshore wind', tide: 'Tide', level: 'Level', hazards: 'Hazards', etiquette: 'Local etiquette' },
      coasts: [
        { id: 'west', name: 'West coast', faces: 'East China Sea', swell: 'Swell from the west', offshore: 'East wind' },
        { id: 'east', name: 'East coast', faces: 'Pacific Ocean', swell: 'Swell from the east', offshore: 'West wind' },
        { id: 'south', name: 'South coast', faces: 'The sea to the south', swell: 'Swell from the south', offshore: 'North wind' },
        { id: 'north', name: 'North coast', faces: 'The sea to the north', swell: 'Swell from the north', offshore: 'South wind' },
      ],
      toReport: 'See this week’s data',
    },
  },
}
