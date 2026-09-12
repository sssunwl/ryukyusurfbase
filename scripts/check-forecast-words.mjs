#!/usr/bin/env node
/**
 * 衝浪情報的法規防呆（SPEC §6.1、CLAUDE.md 規則 13）：
 * 網站文案與 Telegram 訊息模板不得出現對未來時段或浪點的判斷字眼。
 * 只掃衝浪情報相關的檔案；首頁與方案頁描述的是 Kaito 的服務，不在這個檢查範圍。
 */
import { readdirSync, readFileSync, statSync } from 'node:fs'
import { join, relative } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = fileURLToPath(new URL('..', import.meta.url))

const TARGETS = [
  'src/i18n/surf.ts',
  'src/pages/SurfReportPage.tsx',
  'src/pages/SurfGuidePage.tsx',
  'src/pages/SurfPointsPage.tsx',
  'src/components/surf',
  'src/surf',
  'shared',
  'worker/src',
]

const FORBIDDEN = /適合|不適合|建議|推薦|おすすめ|オススメ|recommend|rating|score|⭐|★/gi

/**
 * 允許清單：必須逐字列出檔案、完整的那一行文字，以及理由。
 * 目前是空的——教學文案刻意改寫，避開了所有禁用字眼。
 */
const ALLOWED = [
  // { file: 'src/i18n/surf.ts', line: '…完整的一行…', reason: '…為什麼這不是判斷…' },
]

function collect(path) {
  const absolute = join(ROOT, path)
  let stats
  try {
    stats = statSync(absolute)
  } catch {
    return []
  }
  if (stats.isFile()) return [absolute]
  return readdirSync(absolute).flatMap((name) => collect(join(path, name)))
}

const files = TARGETS.flatMap(collect).filter((file) => /\.(ts|tsx|mjs|js)$/.test(file))
const problems = []

for (const file of files) {
  const relativePath = relative(ROOT, file)
  readFileSync(file, 'utf8').split('\n').forEach((line, index) => {
    const matches = line.match(FORBIDDEN)
    if (!matches) return
    const allowed = ALLOWED.some((entry) => entry.file === relativePath && entry.line === line.trim())
    if (!allowed) problems.push(`${relativePath}:${index + 1}  [${[...new Set(matches)].join(', ')}]  ${line.trim().slice(0, 120)}`)
  })
}

if (problems.length) {
  console.error('❌ 衝浪情報出現判斷字眼（SPEC §6.1）：\n')
  for (const problem of problems) console.error(`  ${problem}`)
  console.error('\n請改寫成「原樣呈現數據＋通則解說」。確定不是判斷時，才加進 ALLOWED 並寫明理由。')
  process.exit(1)
}

console.log(`✓ check:forecast-words 通過（掃描 ${files.length} 個檔案）`)
