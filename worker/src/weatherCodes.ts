/**
 * 氣象廳天氣代碼表（weatherCodes）。
 * 日文與英文是氣象廳官方寫法，2026-09-12 取自 https://www.jma.go.jp/bosai/forecast/ 頁面的
 * `Forecast.Const.TELOPS`（英文原樣保留，含官方的拼字錯誤）。
 * 中文由日文短標籤依固定規則轉換；規則轉換不完整（還殘留假名）時回傳 null，前端改顯示日文。
 */
import type { Tri } from '../../shared/surf'

export const WEATHER_CODES: Record<string, [ja: string, en: string]> = {
  '100': ['晴', 'CLEAR'], '101': ['晴時々曇', 'PARTLY CLOUDY'], '102': ['晴一時雨', 'CLEAR, OCCASIONAL SCATTERED SHOWERS'],
  '103': ['晴時々雨', 'CLEAR, FREQUENT SCATTERED SHOWERS'], '104': ['晴一時雪', 'CLEAR, SNOW FLURRIES'], '105': ['晴時々雪', 'CLEAR, FREQUENT SNOW FLURRIES'],
  '106': ['晴一時雨か雪', 'CLEAR, OCCASIONAL SCATTERED SHOWERS OR SNOW FLURRIES'], '107': ['晴時々雨か雪', 'CLEAR, FREQUENT SCATTERED SHOWERS OR SNOW FLURRIES'],
  '108': ['晴一時雨か雷雨', 'CLEAR, OCCASIONAL SCATTERED SHOWERS AND/OR THUNDER'], '110': ['晴後時々曇', 'CLEAR, PARTLY CLOUDY LATER'],
  '111': ['晴後曇', 'CLEAR, CLOUDY LATER'], '112': ['晴後一時雨', 'CLEAR, OCCASIONAL SCATTERED SHOWERS LATER'], '113': ['晴後時々雨', 'CLEAR, FREQUENT SCATTERED SHOWERS LATER'],
  '114': ['晴後雨', 'CLEAR,RAIN LATER'], '115': ['晴後一時雪', 'CLEAR, OCCASIONAL SNOW FLURRIES LATER'], '116': ['晴後時々雪', 'CLEAR, FREQUENT SNOW FLURRIES LATER'],
  '117': ['晴後雪', 'CLEAR,SNOW LATER'], '118': ['晴後雨か雪', 'CLEAR, RAIN OR SNOW LATER'], '119': ['晴後雨か雷雨', 'CLEAR, RAIN AND/OR THUNDER LATER'],
  '120': ['晴朝夕一時雨', 'OCCASIONAL SCATTERED SHOWERS IN THE MORNING AND EVENING, CLEAR DURING THE DAY'],
  '121': ['晴朝の内一時雨', 'OCCASIONAL SCATTERED SHOWERS IN THE MORNING, CLEAR DURING THE DAY'], '122': ['晴夕方一時雨', 'CLEAR, OCCASIONAL SCATTERED SHOWERS IN THE EVENING'],
  '123': ['晴山沿い雷雨', 'CLEAR IN THE PLAINS, RAIN AND THUNDER NEAR MOUTAINOUS AREAS'], '124': ['晴山沿い雪', 'CLEAR IN THE PLAINS, SNOW NEAR MOUTAINOUS AREAS'],
  '125': ['晴午後は雷雨', 'CLEAR, RAIN AND THUNDER IN THE AFTERNOON'], '126': ['晴昼頃から雨', 'CLEAR, RAIN IN THE AFTERNOON'], '127': ['晴夕方から雨', 'CLEAR, RAIN IN THE EVENING'],
  '128': ['晴夜は雨', 'CLEAR, RAIN IN THE NIGHT'], '130': ['朝の内霧後晴', 'FOG IN THE MORNING, CLEAR LATER'], '131': ['晴明け方霧', 'FOG AROUND DAWN, CLEAR LATER'],
  '132': ['晴朝夕曇', 'CLOUDY IN THE MORNING AND EVENING, CLEAR DURING THE DAY'], '140': ['晴時々雨で雷を伴う', 'CLEAR, FREQUENT SCATTERED SHOWERS AND THUNDER'],
  '160': ['晴一時雪か雨', 'CLEAR, SNOW FLURRIES OR OCCASIONAL SCATTERED SHOWERS'], '170': ['晴時々雪か雨', 'CLEAR, FREQUENT SNOW FLURRIES OR SCATTERED SHOWERS'],
  '181': ['晴後雪か雨', 'CLEAR, SNOW OR RAIN LATER'], '200': ['曇', 'CLOUDY'], '201': ['曇時々晴', 'MOSTLY CLOUDY'], '202': ['曇一時雨', 'CLOUDY, OCCASIONAL SCATTERED SHOWERS'],
  '203': ['曇時々雨', 'CLOUDY, FREQUENT SCATTERED SHOWERS'], '204': ['曇一時雪', 'CLOUDY, OCCASIONAL SNOW FLURRIES'], '205': ['曇時々雪', 'CLOUDY FREQUENT SNOW FLURRIES'],
  '206': ['曇一時雨か雪', 'CLOUDY, OCCASIONAL SCATTERED SHOWERS OR SNOW FLURRIES'], '207': ['曇時々雨か雪', 'CLOUDY, FREQUENT SCCATERED SHOWERS OR SNOW FLURRIES'],
  '208': ['曇一時雨か雷雨', 'CLOUDY, OCCASIONAL SCATTERED SHOWERS AND/OR THUNDER'], '209': ['霧', 'FOG'], '210': ['曇後時々晴', 'CLOUDY, PARTLY CLOUDY LATER'],
  '211': ['曇後晴', 'CLOUDY, CLEAR LATER'], '212': ['曇後一時雨', 'CLOUDY, OCCASIONAL SCATTERED SHOWERS LATER'], '213': ['曇後時々雨', 'CLOUDY, FREQUENT SCATTERED SHOWERS LATER'],
  '214': ['曇後雨', 'CLOUDY, RAIN LATER'], '215': ['曇後一時雪', 'CLOUDY, SNOW FLURRIES LATER'], '216': ['曇後時々雪', 'CLOUDY, FREQUENT SNOW FLURRIES LATER'],
  '217': ['曇後雪', 'CLOUDY, SNOW LATER'], '218': ['曇後雨か雪', 'CLOUDY, RAIN OR SNOW LATER'], '219': ['曇後雨か雷雨', 'CLOUDY, RAIN AND/OR THUNDER LATER'],
  '220': ['曇朝夕一時雨', 'OCCASIONAL SCCATERED SHOWERS IN THE MORNING AND EVENING, CLOUDY DURING THE DAY'],
  '221': ['曇朝の内一時雨', 'CLOUDY OCCASIONAL SCCATERED SHOWERS IN THE MORNING'], '222': ['曇夕方一時雨', 'CLOUDY, OCCASIONAL SCCATERED SHOWERS IN THE EVENING'],
  '223': ['曇日中時々晴', 'CLOUDY IN THE MORNING AND EVENING, PARTLY CLOUDY DURING THE DAY,'], '224': ['曇昼頃から雨', 'CLOUDY, RAIN IN THE AFTERNOON'],
  '225': ['曇夕方から雨', 'CLOUDY, RAIN IN THE EVENING'], '226': ['曇夜は雨', 'CLOUDY, RAIN IN THE NIGHT'], '228': ['曇昼頃から雪', 'CLOUDY, SNOW IN THE AFTERNOON'],
  '229': ['曇夕方から雪', 'CLOUDY, SNOW IN THE EVENING'], '230': ['曇夜は雪', 'CLOUDY, SNOW IN THE NIGHT'], '231': ['曇海上海岸は霧か霧雨', 'CLOUDY, FOG OR DRIZZLING ON THE SEA AND NEAR SEASHORE'],
  '240': ['曇時々雨で雷を伴う', 'CLOUDY, FREQUENT SCCATERED SHOWERS AND THUNDER'], '250': ['曇時々雪で雷を伴う', 'CLOUDY, FREQUENT SNOW AND THUNDER'],
  '260': ['曇一時雪か雨', 'CLOUDY, SNOW FLURRIES OR OCCASIONAL SCATTERED SHOWERS'], '270': ['曇時々雪か雨', 'CLOUDY, FREQUENT SNOW FLURRIES OR SCATTERED SHOWERS'],
  '281': ['曇後雪か雨', 'CLOUDY, SNOW OR RAIN LATER'], '300': ['雨', 'RAIN'], '301': ['雨時々晴', 'RAIN, PARTLY CLOUDY'], '302': ['雨時々止む', 'SHOWERS THROUGHOUT THE DAY'],
  '303': ['雨時々雪', 'RAIN,FREQUENT SNOW FLURRIES'], '304': ['雨か雪', 'RAINORSNOW'], '306': ['大雨', 'HEAVYRAIN'], '308': ['雨で暴風を伴う', 'RAINSTORM'],
  '309': ['雨一時雪', 'RAIN,OCCASIONAL SNOW'], '311': ['雨後晴', 'RAIN,CLEAR LATER'], '313': ['雨後曇', 'RAIN,CLOUDY LATER'], '314': ['雨後時々雪', 'RAIN, FREQUENT SNOW FLURRIES LATER'],
  '315': ['雨後雪', 'RAIN,SNOW LATER'], '316': ['雨か雪後晴', 'RAIN OR SNOW, CLEAR LATER'], '317': ['雨か雪後曇', 'RAIN OR SNOW, CLOUDY LATER'],
  '320': ['朝の内雨後晴', 'RAIN IN THE MORNING, CLEAR LATER'], '321': ['朝の内雨後曇', 'RAIN IN THE MORNING, CLOUDY LATER'],
  '322': ['雨朝晩一時雪', 'OCCASIONAL SNOW IN THE MORNING AND EVENING, RAIN DURING THE DAY'], '323': ['雨昼頃から晴', 'RAIN, CLEAR IN THE AFTERNOON'],
  '324': ['雨夕方から晴', 'RAIN, CLEAR IN THE EVENING'], '325': ['雨夜は晴', 'RAIN, CLEAR IN THE NIGHT'], '326': ['雨夕方から雪', 'RAIN, SNOW IN THE EVENING'],
  '327': ['雨夜は雪', 'RAIN,SNOW IN THE NIGHT'], '328': ['雨一時強く降る', 'RAIN, EXPECT OCCASIONAL HEAVY RAINFALL'], '329': ['雨一時みぞれ', 'RAIN, OCCASIONAL SLEET'],
  '340': ['雪か雨', 'SNOWORRAIN'], '350': ['雨で雷を伴う', 'RAIN AND THUNDER'], '361': ['雪か雨後晴', 'SNOW OR RAIN, CLEAR LATER'], '371': ['雪か雨後曇', 'SNOW OR RAIN, CLOUDY LATER'],
  '400': ['雪', 'SNOW'], '401': ['雪時々晴', 'SNOW, FREQUENT CLEAR'], '402': ['雪時々止む', 'SNOWTHROUGHOUT THE DAY'], '403': ['雪時々雨', 'SNOW,FREQUENT SCCATERED SHOWERS'],
  '405': ['大雪', 'HEAVYSNOW'], '406': ['風雪強い', 'SNOWSTORM'], '407': ['暴風雪', 'HEAVYSNOWSTORM'], '409': ['雪一時雨', 'SNOW, OCCASIONAL SCCATERED SHOWERS'],
  '411': ['雪後晴', 'SNOW,CLEAR LATER'], '413': ['雪後曇', 'SNOW,CLOUDY LATER'], '414': ['雪後雨', 'SNOW,RAIN LATER'], '420': ['朝の内雪後晴', 'SNOW IN THE MORNING, CLEAR LATER'],
  '421': ['朝の内雪後曇', 'SNOW IN THE MORNING, CLOUDY LATER'], '422': ['雪昼頃から雨', 'SNOW, RAIN IN THE AFTERNOON'], '423': ['雪夕方から雨', 'SNOW, RAIN IN THE EVENING'],
  '425': ['雪一時強く降る', 'SNOW, EXPECT OCCASIONAL HEAVY SNOWFALL'], '426': ['雪後みぞれ', 'SNOW, SLEET LATER'], '427': ['雪一時みぞれ', 'SNOW, OCCASIONAL SLEET'],
  '450': ['雪で雷を伴う', 'SNOW AND THUNDER'],
}

/** 日文短標籤 → 繁中。長的片語先換，避免被短的規則拆開。 */
const ZH_RULES: Array<[string, string]> = [
  ['雨で暴風を伴う', '暴風雨'], ['で雷を伴う', '並伴有雷'], ['海上海岸は', '海上與海岸'], ['一時強く降る', '短暫強降雨'],
  ['朝の内', '早上'], ['明け方', '清晨'], ['昼頃から', '中午起'], ['夕方から', '傍晚起'], ['午後は', '午後'], ['夜は', '夜間'],
  ['山沿い', '山區'], ['朝夕', '早晚'], ['朝晩', '早晚'], ['日中', '白天'], ['夕方', '傍晚'],
  ['時々止む', '時停'], ['時々', '時'], ['一時', '短暫'], ['後', '轉'], ['か', '或'],
  ['風雪強い', '強風雪'], ['暴風雪', '暴風雪'], ['みぞれ', '雨夾雪'], ['霧雨', '毛毛雨'], ['雷雨', '雷雨'],
  ['曇', '多雲'],
]

const KANA = /[぀-ヿ]/

export function weatherCodeLabel(code: string | undefined): Tri | null {
  if (!code) return null
  const entry = WEATHER_CODES[code]
  if (!entry) return null
  const [ja, en] = entry
  let zh = ja
  for (const [from, to] of ZH_RULES) zh = zh.split(from).join(to)
  return { 'ja-JP': ja, 'zh-TW': KANA.test(zh) ? null : zh, en: titleCase(en) }
}

/** 官方英文是全大寫，轉成一般大小寫比較好讀；缺空白的（例如 RAINORSNOW）保持原樣。 */
function titleCase(text: string) {
  const lower = text.toLowerCase().replace(/,(?=\S)/g, ', ')
  return lower.charAt(0).toUpperCase() + lower.slice(1)
}
