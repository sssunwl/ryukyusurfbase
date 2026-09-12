export interface Env {
  DB: D1Database
  /** 前台頁面（Vite build 的 dist），由 Workers Static Assets 提供 */
  ASSETS: Fetcher
  ALLOWED_ORIGINS: string
  SITE_URL: string
  TELEGRAM_CHANNEL_ID: string
  /** 只有 SS 能改成 "true"（SPEC §6.2） */
  MODEL_LAYER_ENABLED: string
  /** secrets：用 `wrangler secret put` 設定，絕不寫進 repo */
  TELEGRAM_BOT_TOKEN?: string
  TELEGRAM_WEBHOOK_SECRET?: string
}
