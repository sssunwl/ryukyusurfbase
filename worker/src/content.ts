/** `GET /api/content`：後台存的網站內容覆寫（docs/ADMIN_SPEC.md）。 */
import type { ContentResponse } from '../../shared/content'
import type { Env } from './env'

type Row = { key: string; zh_json: string | null; ja_json: string | null; updated_at: string }

function parse(text: string | null): unknown {
  if (!text) return null
  try {
    return JSON.parse(text)
  } catch {
    return null
  }
}

export async function listContent(env: Env): Promise<ContentResponse> {
  const { results } = await env.DB.prepare('SELECT key, zh_json, ja_json, updated_at FROM content_docs').all<Row>()
  const docs: ContentResponse['docs'] = {}
  for (const row of results) docs[row.key] = { zh: parse(row.zh_json), ja: parse(row.ja_json), updatedAt: row.updated_at }
  return { docs }
}
