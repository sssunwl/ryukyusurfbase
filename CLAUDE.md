# ryukyusurfbase — 琉球衝浪基地官網

沖繩衝浪教練 Kaito（海斗）的官網 + 預約系統。客戶專案，SS 開發，教練是唯一使用者兼老闆。

## 現在的狀態（2026-09-09）

產品規格與 Phase 1 前台派工單已完成，技術棧、雙語、動效／音效、素材版權邊界，以及 Phase 2 預約與 Google Calendar 架構均已定案。Phase 1 尚未開始實作；下一步依 `docs/CODEX_PHASE1.md` 建立可供 Kaito 驗收的靜態前台，價格、時長、音檔與正式照片維持待補，不得自行編造或取用 `_scraped/` 素材上線。完成 Phase 1 驗收後，才向 Kaito 確認方案、接送範圍、取消政策、保險／登記、網域與是否公開個人經歷，再進入預約系統。

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

## 技術棧（已定案，不得更換）
- 前端 Vite + React + TS + Tailwind + Motion
- 後端 Cloudflare Workers + D1
- 部署 Cloudflare Pages（前台）/ Workers（API），先掛 `ryukyusurfbase.sssuni.com`
- 後台 `/admin` 由 **Cloudflare Access** 保護，**不自己寫登入頁、不做密碼欄位**
- Google Calendar 走 **Service Account**（freebusy 讀 + events 寫），**不做 OAuth 流程**

## 分工
Claude 規劃與審查，Codex 實作。Codex 動工前先讀 `docs/SPEC.md` 全文。
