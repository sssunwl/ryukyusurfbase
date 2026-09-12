# ryukyusurfbase — 琉球衝浪基地官網

沖繩衝浪教練 Kaito（海斗）的官網 + 預約系統。客戶專案，SS 開發，教練是唯一使用者兼老闆。

## 現在的狀態（2026-09-11）

Phase 1 靜態前台已完成，並部署到預覽站 https://sssunwl.github.io/ryukyusurfbase/ （push `main` 會自動部署，已設 noindex）。2026-09-10 做過一輪「去 AI 感」改造並換上正式 logo；2026-09-11 SS 定案把整站改成**淺色海島風**，細節見 SPEC §5。正式站 Cloudflare Pages 尚未設定。

目前在等 Kaito 驗收，並提供：價格與時長、接送範圍、取消政策、正式照片、海浪音檔，以及他是否同意 `/about` 的經歷上線（完整清單在 `docs/QUESTIONS.md`）。價格、時長、音檔、照片在他提供前一律維持待補，不得自行編造，也不得拿 `_scraped/` 的素材上線。Phase 1 驗收前不進 Phase 2。

## 唯一真相來源
`docs/SPEC.md`。任何實作疑問先查 SPEC；SPEC 沒寫的不要自行發明，回報給 SS 決定。

## 硬性規則（違反即為錯誤）
1. **repo 是 public**。任何金鑰、service account JSON、教練個資、客人預約資料，一律不得進 repo。憑證放 `~/.config/ryukyusurfbase/`，雲端放 Cloudflare secrets。
2. `_scraped/` 與 `_assets_raw/` 已 gitignore，**永遠不要 commit**（IG 內容版權屬教練）。
3. 網站**不做 IG feed 牆**。素材是人工挑選重寫過的，不是鏡像 IG。
4. 海浪聲**預設靜音**，必須有明顯開關，且開關狀態記在 localStorage。絕不自動播放。
5. 所有動畫尊重 `prefers-reduced-motion`。海浪背景用 Canvas/SVG，**不准用影片背景**。
6. 語言：**繁體中文為主、日文為輔**。i18n 從第一天就做（不是之後再補）。英文屬 Phase 3，先預留結構。
7. 未經 SS 確認，不得新增 SPEC 以外的頁面、方案、價格或任何看起來像事實的數字。價格未定案前一律用 `TBD` 佔位，不要編。

8. **憂鬱症那段只准出現在 `/about`**。首頁「關於教練」區只放一到兩句引子（不得提及憂鬱症字眼），hero、SEO description、og:description、方案卡、FAQ 一律不得使用這段經歷做賣點。SS 已與客戶確認此為定案。

9. **設計禁區**（2026-09-10 改造後定案，不得回退）：字級一律用 `src/styles.css` 的 `--t-*` token，不准在元件裡寫死數值；不用 Inter；不用「三張並排卡片」的功能區；不用淡網格底、發光圓球、裝飾性圓圈這類 SaaS 模板裝飾；hero 只有一顆主按鈕，第二動作用文字連結。首頁七個區塊掛在 `ZoneMarker` 的衝浪流程軸上（00 OUTSIDE ~ 06 KICK OUT），新增區塊要一併給編號。
10. **中文標題排版**：`line-height` 不得低於 1.05、`letter-spacing` 不得低於 -0.01em。緊行距與負字距是拉丁字母的技巧，套到方塊字會讓字黏在一起並溢出容器（已實際踩過）。
11. **配色**（2026-09-11 SS 定案，不得改回深海藍底）：預設淺色，調性是開心、活潑、健康、沖繩海島。顏色一律用 `src/styles.css` `:root` 的色彩 token，不要在元件裡寫死色碼。亮青綠 `--lagoon` 與珊瑚 `--coral` 放在淺底上當小字對比不夠，小字要改用 `--lagoon-ink`／`--coral-ink`。
12. `useEffect` 的箭頭函式**不得直接回傳運算式**（例如 `() => window.scrollTo(...)`），一律用大括號包起來。部分瀏覽器的 `scrollTo` 會回傳 Promise，React 把它當成 cleanup 呼叫就會整頁白屏（2026-09-11 實際踩過）。

## 技術棧（已定案，不得更換）
- 前端 Vite + React + TS + Tailwind + Motion
- 後端 Cloudflare Workers + D1
- 部署 Cloudflare Pages（前台）/ Workers（API），先掛 `ryukyusurfbase.sssuni.com`
- 後台 `/admin` 由 **Cloudflare Access** 保護，**不自己寫登入頁、不做密碼欄位**
- Google Calendar 走 **Service Account**（freebusy 讀 + events 寫），**不做 OAuth 流程**

## 分工
Claude 規劃與審查，Codex 實作。Codex 動工前先讀 `docs/SPEC.md` 全文。
