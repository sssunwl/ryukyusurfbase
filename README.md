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
- 方案：衝浪體驗、衝浪導覽的價格與內容已於 2026-09-12 補上；Surf Trip 仍是 `TBD`。
- 營業季節、取消費用金額：待 Kaito 確認（沒有接送，2026-09-12 已確認）。取消政策、參加須知、在地規則已補上；Facebook 與 Threads 連結已於 2026-09-10 補上。完整清單見 `docs/QUESTIONS.md`。

海浪聲預設靜音，不會自動播放；使用者開啟後會淡入，頁面切到背景時暫停。語言與音效偏好會保存在瀏覽器的 localStorage。所有動效在 `prefers-reduced-motion: reduce` 下停止。

## 預約系統示範（Phase 2 前導）

`/booking` 是客人端的預約流程示範，`/booking/demo-admin` 是 Kaito 端的管理畫面示範。這兩頁沒有放進主選單，直接給網址試用。

資料只存在瀏覽器的 localStorage，日期上的「已滿」是用日期算出來的假資料，送出後不會通知任何人。正式預約仍然使用 Kaito 的 Google 表單。正式版規格見 `docs/SPEC.md` §7。

## 衝浪情報 API（Phase 1.5，`worker/`）

Cloudflare Worker＋D1。它會抓氣象廳的潮位表、府縣天氣預報與警報，整理成 `GET /api/surf-report`，並用 Cron 發 Telegram 頻道報告。規格在 `docs/SPEC.md` §6。

### 本機開發

```bash
cd worker
npm install
npm run db:init:local
npm run dev
```

API 會開在 `http://localhost:8787`。前端要接上本機 API 時：

```bash
VITE_SURF_API_BASE=http://localhost:8787 npm run dev
```

本機可以手動觸發排程，例如 `curl "http://localhost:8787/__scheduled?cron=15+20+*+*+*"` 會發今天的報告。沒有設定 token 時不會真的發送，只會在 `tg_posts` 記一筆 `skipped`。

### 測試與檢查

```bash
cd worker
npm test
npm run typecheck
```

回到專案根目錄執行 `npm run check:forecast-words`，會掃描衝浪情報的文案與 TG 訊息模板，確認沒有出現判斷字眼（SPEC §6.1）。

### 上線步驟（SS 手動操作）

1. `cd worker && npx wrangler login`
2. `npx wrangler d1 create ryukyusurfbase`，把回傳的 `database_id` 填進 `wrangler.toml`
3. `npx wrangler d1 execute ryukyusurfbase --remote --file=schema.sql`
4. 建立 Telegram 公開頻道，把 `@Ryukyusurf_bot` 設成頻道管理員，再把頻道 ID（例如 `@頻道名稱`）填進 `wrangler.toml` 的 `TELEGRAM_CHANNEL_ID`
5. `npx wrangler secret put TELEGRAM_BOT_TOKEN`，接著 `npx wrangler secret put TELEGRAM_WEBHOOK_SECRET`（自己產生一串隨機字）
6. `npx wrangler deploy`
7. 在自己的終端機設定 webhook。token 不要貼進任何檔案或對話：
   `curl -X POST "https://api.telegram.org/bot<TOKEN>/setWebhook" -d "url=https://<worker 網址>/telegram/webhook" -d "secret_token=<SECRET>" -d 'allowed_updates=["channel_post","edited_channel_post"]'`
8. 到 GitHub repo → Settings → Secrets and variables → Actions → Variables，新增 `SURF_API_BASE`，值填 Worker 網址，然後重新部署預覽站

`MODEL_LAYER_ENABLED` 維持 `"false"`。要等氣象廳回覆諮詢，並且買了 Open-Meteo 商用方案，才會打開（SPEC §6.2）。目前模型數據層還沒有實作，只有功能開關和 Windy 外部連結。

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
