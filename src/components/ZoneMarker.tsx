type Props = { n: string; en: string; label: string; tone?: 'light' | 'dark' }

/**
 * 區塊標記。首頁每個段落掛在同一條敘事軸上：往下滾＝完整衝一道浪。
 * 參考 DiveInOut 用「深度」串起全站的做法，這裡用衝浪流程術語。
 */
export function ZoneMarker({ n, en, label, tone = 'light' }: Props) {
  return (
    <div className={`zone-marker${tone === 'dark' ? ' zone-marker--dark' : ''}`} aria-hidden="true">
      <b>{n}</b>
      <i />
      <span>
        {en} <em>/ {label}</em>
      </span>
    </div>
  )
}
