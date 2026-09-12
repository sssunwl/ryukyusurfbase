/**
 * API 網址：
 * - 正式站（ryukyusurfbase.sssuni.com）：網站與 API 在同一個 Worker，留空＝同網域
 * - GitHub Pages 預覽站：build 時帶入 Worker 的 workers.dev 網址（repo 變數 SURF_API_BASE）
 * - 本機開發：留空，由 Vite proxy 把 /api 轉到 wrangler dev（localhost:8787）
 */
export const API_BASE = (import.meta.env.VITE_API_BASE ?? '').replace(/\/$/, '')
