/**
 * 氣象廳府縣預報的「風」「浪」文字翻譯（SPEC §6.2）。
 * 原文用全形空白（U+3000）分隔固定片語，例如「東の風　後　北東の風」「１．５メートル　後　２メートル　うねり　を伴う」。
 * 逐片語查表翻譯；只要有一個片語查不到，該語言就回傳 null，前端改顯示日文原文——寧可不翻，也不要猜。
 */
import type { Tri } from '../../shared/surf'

const DIRECTIONS: Record<string, [zh: string, en: string]> = {
  北: ['北', 'N'], 北北東: ['北北東', 'NNE'], 北東: ['東北', 'NE'], 東北東: ['東北東', 'ENE'],
  東: ['東', 'E'], 東南東: ['東南東', 'ESE'], 南東: ['東南', 'SE'], 南南東: ['南南東', 'SSE'],
  南: ['南', 'S'], 南南西: ['南南西', 'SSW'], 南西: ['西南', 'SW'], 西南西: ['西南西', 'WSW'],
  西: ['西', 'W'], 西北西: ['西北西', 'WNW'], 北西: ['西北', 'NW'], 北北西: ['北北西', 'NNW'],
}

const WORDS: Record<string, [zh: string, en: string]> = {
  後: ['後轉', 'then'],
  やや強く: ['稍強', 'fairly strong'],
  強く: ['強', 'strong'],
  非常に強く: ['非常強', 'very strong'],
  海上: ['海上', 'at sea'],
  では: ['', ''],
  陸上: ['陸上', 'on land'],
  所により: ['局部', 'locally'],
  一時: ['短暫', 'briefly'],
  時々: ['時而', 'at times'],
  朝: ['早上', 'in the morning'],
  昼前: ['上午', 'before noon'],
  昼過ぎ: ['午後', 'in the afternoon'],
  夕方: ['傍晚', 'in the evening'],
  夜: ['夜間', 'at night'],
  夜遅く: ['深夜', 'late at night'],
  明け方: ['清晨', 'around dawn'],
  から: ['起', 'from'],
  うねり: ['湧浪', 'swell'],
  やや高く: ['稍高', 'fairly high'],
  高く: ['高', 'high'],
}

function normalize(text: string) {
  return text.replace(/[０-９．]/g, (char) => String.fromCharCode(char.charCodeAt(0) - 0xfee0))
}

function translateToken(token: string, lang: 0 | 1): string | null {
  const wind = token.match(/^(.+)の風$/)
  if (wind && DIRECTIONS[wind[1]]) return lang === 0 ? `${DIRECTIONS[wind[1]][0]}風` : `${DIRECTIONS[wind[1]][1]} wind`
  const metres = token.match(/^(\d+(?:\.\d+)?)メートル$/)
  if (metres) return lang === 0 ? `${metres[1]} 公尺` : `${metres[1]} m`
  if (token in WORDS) return WORDS[token][lang]
  return null
}

function translate(original: string, lang: 0 | 1): string | null {
  const tokens = normalize(original).split('　').map((token) => token.trim()).filter(Boolean)
  const out: string[] = []
  for (let index = 0; index < tokens.length; index += 1) {
    // 「うねり　を伴う」是一組：中文要倒過來說「伴有湧浪」
    if (tokens[index] === 'うねり' && tokens[index + 1] === 'を伴う') {
      out.push(lang === 0 ? '伴有湧浪' : 'with swell')
      index += 1
      continue
    }
    const word = translateToken(tokens[index], lang)
    if (word === null) return null
    if (word) out.push(word)
  }
  return out.join(lang === 0 ? '，' : ' ').replace(/，(後轉|起)，?/g, '$1')
}

export function translatePhrase(original: string | undefined): Tri | null {
  if (!original) return null
  // 日文原文也把全形數字轉半形：「１．５」在部分字型會顯示得像「1・5」
  return { 'ja-JP': normalize(original).replace(/　/g, ' '), 'zh-TW': translate(original, 0), en: translate(original, 1) }
}
