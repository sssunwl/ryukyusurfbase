import { describe, expect, it } from 'vitest'
import { applyContent, deepMerge } from '../../shared/content'

const base = {
  hero: { title: '先看浪', primary: '預約體驗' },
  plansSection: {
    title: '你想怎麼下水？',
    items: [
      { name: '衝浪體驗', priceNote: '開幕優惠' as string | null, prices: [{ label: '1 人', value: '¥15,000' }], audience: ['第一次衝浪的人'] },
      { name: 'Surf Trip', priceNote: null as string | null, prices: [] as Array<{ label: string; value: string }>, audience: [] as string[] },
    ],
  },
  markers: { hero: { n: '00' } },
}

describe('deepMerge', () => {
  it('覆寫純值、忽略不認得的欄位與型別不對的值', () => {
    const merged = deepMerge(base.hero, { title: '新標題', unknown: 'x', primary: 123 })
    expect(merged).toEqual({ title: '新標題', primary: '預約體驗' })
  })

  it('陣列整批取代，缺的欄位用預設內容補齊', () => {
    const merged = deepMerge(base.plansSection.items, [{ name: '新方案' }])
    expect(merged).toHaveLength(1)
    expect(merged[0].name).toBe('新方案')
    expect(merged[0].prices).toEqual([{ label: '1 人', value: '¥15,000' }])
  })

  it('預設是空陣列時，只接受扁平的項目（例如價格列）', () => {
    const trip = base.plansSection.items[1]
    expect(deepMerge(trip.prices, [{ label: '3 天', value: '¥60,000' }])).toEqual([{ label: '3 天', value: '¥60,000' }])
    expect(deepMerge(trip.audience, ['想連續衝好幾天的人'])).toEqual(['想連續衝好幾天的人'])
    expect(deepMerge(trip.prices, [{ label: '3 天', value: { nested: true } }])).toEqual([])
  })

  it('預設是 null 的欄位接受字串', () => {
    expect(deepMerge(base.plansSection.items[1].priceNote, '限定優惠')).toBe('限定優惠')
    expect(deepMerge(base.plansSection.items[1].priceNote, 5)).toBeNull()
  })

  it('patch 形狀完全不對時保留預設', () => {
    expect(deepMerge(base.plansSection, 'broken')).toBe(base.plansSection)
    expect(deepMerge(base.plansSection.items, { not: 'array' })).toBe(base.plansSection.items)
  })
})

describe('applyContent', () => {
  it('沒有後台資料時回傳原本的文案', () => {
    expect(applyContent(base, undefined, 'zh')).toBe(base)
  })

  it('日文留空時退回繁中；不可編輯的區塊不套用', () => {
    const docs = {
      hero: { zh: { title: '颱風停課' }, ja: null, updatedAt: '2026-09-13T00:00:00+09:00' },
      markers: { zh: { hero: { n: '99' } }, ja: null, updatedAt: '2026-09-13T00:00:00+09:00' },
    }
    expect(applyContent(base, docs, 'ja').hero.title).toBe('颱風停課')
    expect(applyContent(base, docs, 'zh').markers.hero.n).toBe('00')
  })
})
