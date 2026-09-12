import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// GitHub Pages 預覽站走子路徑 /ryukyusurfbase/，正式站（Worker Static Assets＋ryukyusurfbase.sssuni.com）走根路徑。
// 用 `vite build --mode ghpages` 切換，本機開發與正式 build 不受影響。
export default defineConfig(({ mode }) => ({
  base: mode === 'ghpages' ? '/ryukyusurfbase/' : '/',
  plugins: [react()],
  // 本機開發：/api 轉到 worker 的 wrangler dev（cd worker && npm run dev）
  server: { proxy: { '/api': 'http://localhost:8787' } },
}))
