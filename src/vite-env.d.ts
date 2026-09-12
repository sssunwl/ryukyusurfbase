/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** 衝浪情報 API（Worker）的網址，例如 http://localhost:8787。沒設定時頁面顯示「尚未連線」。 */
  readonly VITE_SURF_API_BASE?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
