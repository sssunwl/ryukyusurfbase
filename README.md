# 琉球衝浪基地 Ryukyu Surf Base

Phase 1 靜態前台。使用 Vite、React、TypeScript、Tailwind CSS 與 Framer Motion，包含繁體中文／日文切換、首頁、教練故事與方案頁。本階段沒有預約 API，也沒有後台。

## 本機執行

需求：Node.js 20 以上、npm。

```bash
npm install
npm run dev
```

終端機會顯示本機網址，預設通常是 `http://localhost:5173`。

## 建置

```bash
npm run build
npm run preview
```

正式輸出會產生在 `dist/`。

## 待補素材與資料

- `public/audio/ocean.mp3`：請補 20–30 秒、可無縫循環且小於 400KB 的海浪聲 MP3。目前只有佔位檔，不含音訊內容。
- **品牌 Logo**：已於 2026-09-10 換上 Kaito 的正式 logo（`public/logo.png`）。若之後拿到 SVG 原檔，可以再換上以提高清晰度。
- 正式照片：Hero 橫幅、首頁教練照、`/about` 教練照；請提供原檔後輸出 WebP 與三段響應式尺寸。現階段全部使用標有 `data-placeholder` 的 CSS 漸層。
- 三個方案的價格、時長、包含與不包含項目：目前全部顯示 `TBD`。
- 取消政策、必讀規則、接送範圍、營業季節：待 Kaito 確認。（Facebook 與 Threads 連結已於 2026-09-10 補上）

海浪聲預設靜音，不會自動播放；使用者開啟後會淡入，頁面切到背景時暫停。語言與音效偏好會保存在瀏覽器的 localStorage。所有動效在 `prefers-reduced-motion: reduce` 下停止。

## 部署

兩個目標，用 vite 的 `--mode` 區分 base path：

| 用途 | 指令 | base | 網址 |
|---|---|---|---|
| 預覽站（給 Kaito 看） | `npm run build -- --mode ghpages` | `/ryukyusurfbase/` | https://sssunwl.github.io/ryukyusurfbase/ |
| 正式站 | `npm run build` | `/` | ryukyusurfbase.sssuni.com（Cloudflare Pages，未設定） |

預覽站由 `.github/workflows/deploy-preview.yml` 在推上 `main` 時自動部署，並在 build 後做兩件事：

1. 注入 `<meta name="robots" content="noindex, nofollow">` 與 `robots.txt`，避免半成品被搜尋引擎索引
2. 把 `index.html` 複製成 `404.html`，補上 GitHub Pages 缺少的 SPA fallback（否則直接開 `/about` 會 404）

這兩步**只發生在 GitHub Pages 的 workflow 裡**，正式站 build 不受影響，所以不會有「上線忘了拿掉 noindex」的問題。

首次啟用需在 GitHub repo → Settings → Pages → Source 選 **GitHub Actions**。
