# 後台（CMS）規格草案 — Phase 3

2026-09-13｜狀態：**A 期已完成**，正式站 ryukyusurfbase.sssuni.com 上線，`/api/content` 與前台套用機制都能運作；B 期等待開工。本檔補充 SPEC §8，兩者衝突時以本檔為準。

## SS 的決定（2026-09-12）

- **三種編輯方式都做，由 Kaito 自己選**：① 表單式 ② 區塊排版 ③ 網頁上直接點字修改
- **做簡單 Blog**：取代 SPEC 原本「不做部落格」的非目標。Blog 由 Kaito 自己寫，不做 SEO 內容農場
- **網址**：`ryukyusurfbase.sssuni.com`，網站、API、後台同一個網域。GitHub Pages 預覽站之後停用
- **第一版可編輯**：方案與價格、FAQ 與公告橫幅、照片、教練故事與自訂頁面

## 架構

- **一個 Worker `ryukyusurfbase-api`**（沿用衝浪情報的 Worker，排程與 secrets 都在上面），負責：
  - Static Assets：前台（Vite build）
  - `/api/*`：公開 API（衝浪情報、網站內容）
  - `/admin`：後台畫面
  - `/admin/api/*`：後台 API
- **跟 SPEC 技術棧的差異（2026-09-13 SS 已同意）**：前台原本定為 Cloudflare Pages，改用 Workers Static Assets。好處是網站、API、後台在同一個 Worker、同一個網域，不必處理跨網域，登入也單純。工作區裡的 songsong 已經用這個做法上線。
- **登入**：用 Cloudflare Access 保護 `/admin` 與 `/admin/api`。登入方式用 One-time PIN（寄驗證碼到 email，不必另外設定 Google OAuth），也可以改用 Google；白名單只有 Kaito 和 SS。Worker 會再驗證一次 `Cf-Access-Jwt-Assertion`，當作第二道保險。**不自己寫登入頁、不做密碼欄位**（CLAUDE.md 技術棧）。
- **資料**：內容存 D1，照片存 R2 bucket `ryukyusurfbase-media`。
- **前台讀內容**：網站啟動時抓 `/api/content`。抓取失敗就用程式內建的預設文案，確保網站永遠不會空白。

## 資料表（D1）

- `content_docs(key, zh_json, ja_json, updated_at, updated_by)`：表單式編輯的內容，key 例如 `plans`、`faq`、`announcement`、`about`、`booking_form_url`
- `pages(id, slug, kind(page|post), title_zh, title_ja, cover_media_id, blocks_json, status(draft|published), published_at, updated_at, updated_by)`：自訂頁面和 Blog 共用這張表
- `media(id, r2_key, mime, width, height, alt_zh, alt_ja, created_at, created_by)`
- `revisions(id, target_type, target_id, snapshot_json, created_at, created_by)`：每次存檔都留一份版本，可以還原

## 三種編輯方式

### ① 表單式（最先做）
- **方案**：名稱、適合對象、時長、價格表（可增刪列）、優惠說明、包含項目、加購項目、是否開放預約
- **FAQ**：新增、刪除、排序
- **公告橫幅**：文字、連結、顯示期間、開關（例如颱風停課時用）
- **教練故事**：純文字
- 每個欄位繁中與日文並排；日文可以留空，留空時前台顯示繁中

### ② 區塊排版（自訂頁面、Blog）
- **區塊種類**：標題、段落、圖片、圖文並排、清單、引言、按鈕（連到預約表單或 IG）、分隔線
- **排序**：先做上移／下移按鈕（手機比較好操作），拖拉之後再加
- **發布流程**：可以存成草稿，發布前可以預覽
- 樣式只能從網站設計系統裡選，不開放自訂顏色與字級（CLAUDE.md 規則 9–11）

### ③ 網頁上直接點字修改
- 後台有「即時編輯」模式，畫面就是前台頁面。可以編輯的文字會有外框，點一下直接改字，改完按「儲存」
- **只能改文字，不能改版面**，避免把設計改壞
- 技術做法：前台所有可編輯的文字，改成透過 `<EditableText k="…">` 讀取。一般瀏覽時輸出純文字，進入編輯模式時變成 contentEditable

## 硬性規則照舊（後台也適用）

- **不公開具體浪點、沒有接送**（CLAUDE.md 規則 14）
- **衝浪情報不下判斷**（規則 13）
- Blog 與自訂頁面存檔時，只要內文出現判斷字眼（適合、推薦、おすすめ……），或疑似浪點名稱，就跳出提醒。**只提醒、不擋存檔**，因為那是 Kaito 自己的文字；但發布前要他再確認一次
- 後台改了價格，預約系統的費用試算要跟著改：`src/booking/pricing.ts` 改成讀 `content_docs.plans`
- 預約表單網址也改成由後台設定

## 分期（每期一個 session）

| 期 | 內容 | 需要 SS 手動 |
|---|---|---|
| **A** | 網域搬家：Worker＋Static Assets 上線到 `ryukyusurfbase.sssuni.com`；content API；前台改讀內容（有預設值）；衝浪情報改走同一個網域 | —（技術棧改動已同意） |
| **B** | 後台外框＋Access＋表單式編輯（方案、FAQ、公告、教練故事）＋版本還原 | 在 Zero Trust 建立 Access 應用、填白名單 email |
| **C** | 照片（R2）＋自訂頁面與 Blog（區塊排版） | 建 R2 bucket，或重新 `wrangler login` 取得 R2 權限 |
| **D** | 即時編輯（網頁上直接點字修改） | — |

## 待確認

1. Kaito 登入後台要用哪個 email？
2. ~~前台改用 Workers Static Assets~~：2026-09-13 SS 同意。
3. ~~Blog 語言~~：繁中＋日文雙語（2026-09-13 SS 決定）。
4. 目前 wrangler 的 OAuth 權限沒有 R2。C 期開始前，要重新登入，或在 Cloudflare 後台先建好 bucket。
5. GitHub Pages 預覽站什麼時候停用？建議 A 期上線、驗證沒問題之後。
