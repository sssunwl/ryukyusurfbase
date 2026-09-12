/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** API（Worker）的網址。正式站與本機開發留空（同網域／Vite proxy），GitHub Pages 預覽站帶入 workers.dev 網址。 */
  readonly VITE_API_BASE?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
