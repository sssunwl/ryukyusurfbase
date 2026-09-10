import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// GitHub Pages 預覽站走子路徑 /ryukyusurfbase/，正式站（Cloudflare Pages + 自訂網域）走根路徑。
// 用 `vite build --mode ghpages` 切換，本機開發與正式 build 不受影響。
export default defineConfig(({ mode }) => ({
  base: mode === 'ghpages' ? '/ryukyusurfbase/' : '/',
  plugins: [react()],
}))
