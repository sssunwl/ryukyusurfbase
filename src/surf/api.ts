import { useEffect, useState } from 'react'
import type { SurfReport, Tri } from '../../shared/surf'
import type { Language } from '../i18n/types'
import { API_BASE } from '../lib/apiBase'

export type ReportState =
  | { status: 'loading' }
  | { status: 'error' }
  | { status: 'ready'; report: SurfReport }

export function useSurfReport(): ReportState {
  const [state, setState] = useState<ReportState>({ status: 'loading' })

  useEffect(() => {
    const controller = new AbortController()
    fetch(`${API_BASE}/api/surf-report?days=7`, { signal: controller.signal })
      .then((response) => {
        if (!response.ok) throw new Error(`HTTP ${response.status}`)
        return response.json() as Promise<SurfReport>
      })
      .then((report) => setState({ status: 'ready', report }))
      .catch(() => {
        if (!controller.signal.aborted) setState({ status: 'error' })
      })
    return () => controller.abort()
  }, [])

  return state
}

/** 取目前語言的翻譯；翻不出來時退回日文原文，並標記 isOriginal 讓畫面註明。 */
export function pickTri(value: Tri | null, language: Language) {
  if (!value) return null
  const translated = value[language]
  return translated ? { text: translated, isOriginal: false } : { text: value['ja-JP'], isOriginal: language !== 'ja-JP' }
}

/** 代表各海岸的外海座標，只用來開 Windy 地圖，不代表浪點位置。 */
export const COAST_WINDY: Array<{ id: 'west' | 'east' | 'south' | 'north'; url: string }> = [
  { id: 'west', url: 'https://www.windy.com/?waves,26.33,127.70,10' },
  { id: 'east', url: 'https://www.windy.com/?waves,26.30,127.95,10' },
  { id: 'south', url: 'https://www.windy.com/?waves,26.05,127.72,10' },
  { id: 'north', url: 'https://www.windy.com/?waves,26.83,128.20,10' },
]
