# 琉球衝浪基地 Ryukyu Surf Base — 產品規格

版本 0.1｜2026-09-09｜狀態：Phase 1 可施工，Phase 2/3 待價格與規則確認

---

## 0. 一句話

讓從台灣、香港飛來沖繩的華語旅客，能在網站上看懂 Kaito 在賣什麼、相信他、然後直接送出預約——而不是只能在 IG 私訊。

## 1. 背景

Kaito（海斗）是沖繩出生長大的衝浪教練，2025-08-19 開設「琉球衝浪基地」，高中畢業後在台灣留學一年半，中文可溝通。曾罹患憂鬱症、離職，靠「死之前還想再衝一次浪」的念頭重新回到海裡，開業初衷是「透過大海與衝浪，幫助同樣背負壓力的人」。

目前所有客源都在 IG（769 粉絲），預約靠私訊。回頭客比例高。

**這個故事是網站最強的資產，但要克制地講**：放在獨立的「關於教練」頁完整說，首頁只給一到兩句引子。不要把憂鬱症當行銷賣點鋪滿全站。

## 2. 目標與非目標

**目標**
- 一個有品牌感、看得出「他真的懂沖繩的海」的官網
- 訪客能自助送出預約申請（Phase 2）
- 預約自動落進 Kaito 的 Google Calendar，他不必再手動記
- 他能自己改內容、看預約，不必找 SS（Phase 3）

**非目標（明確不做）**
- 線上付款 — 短期一律現場收款
- IG feed 自動同步牆
- 會員系統、登入、多教練排班
- 部落格／SEO 內容農場
- 電商賣板／賣周邊

## 3. 使用者

| 角色 | 情境 | 需要 |
|---|---|---|
| 台/港旅客（主） | 排沖繩行程時搜到，或從 IG bio 點進來 | 快速判斷：適不適合我、多少錢、怎麼約、他可信嗎 |
| 日本本地客 | 少數 | 同上，日文介面 |
| Kaito（管理者） | 手機為主，常在海邊 | 看今天有誰、改期、改內容。介面要能單手用 |

**語言**：繁中（預設）／日文。語言切換在 header，選擇記 localStorage。英文 Phase 3。

## 4. 資訊架構

單頁滾動 + 少數子頁。

### 首頁 `/`
1. **Hero** — 全幅海面，Canvas 波浪動畫，標語 + 兩顆 CTA（「預約體驗」「先看看方案」）。右下角海浪聲開關（預設關）
2. **他在賣什麼**（三張卡）
   - 衝浪體驗 — 第一次衝浪的人
   - 衝浪導覽 — 已經會衝、想找好浪點的人
   - Surf Trip — 多日連續行程，跨區追浪
   每張：對象／時長 TBD／價格 TBD／含什麼
3. **為什麼是他**（四點，全部有 IG 貼文佐證，不可加碼）
   - 看浪況才決定去哪：一早先看 2–3 個浪點，必要時開一個半小時跨島
   - 中文溝通：台灣留學一年半
   - 少人數・私人制
   - 全程拍照錄影，免費給你
4. **一天長什麼樣**（時間軸：飯店接送 → 看點 → 下水 → 咖啡廳）
5. **關於教練**（三句引子 + 連到 `/about`）— 引子只講「沖繩長大、台灣留學一年半、想用海幫到人」，**不得出現憂鬱症字眼**，那段全文只在 `/about`。已定案。
6. **常見問題**（手風琴）
7. **預約區**（Phase 1 先放 IG 私訊按鈕，Phase 2 換成表單）
8. Footer：IG / FB / Threads、據點沖繩中部東海岸、營業季節說明

### `/about` 教練故事
Kaito 自述全文（繁中／日文），照片。這頁的語氣要安靜、不販賣。

### `/plans` 方案細節
三個方案的完整說明、含與不含、取消政策、必讀規則。內容待 Kaito 提供。

### `/booking` 預約（Phase 2）
### `/admin` 後台（Phase 3，Cloudflare Access 保護）

## 5. 視覺與動效

- **色**（2026-09-11 SS 改定，取代原本的深海藍底）：**淺色為預設**，調性是開心、活潑、健康、沖繩海島。白沙 `#fff8ec` 為底，沖繩淺灘青綠 `#2cc5b4` 為主色，扶桑花珊瑚 `#ff7657` 只給主按鈕，紅瓦色 `#c2462c` 用在編號點綴，文字用 logo 的深藍 `#12394a`。整頁只留 footer 一塊深色收尾。小字一律用深色版本（`--lagoon-ink` / `--coral-ink`），亮色只給大面積色塊，確保對比 ≥ 4.5。仍然避開一般潛水站愛用的飽和天藍。token 定義在 `src/styles.css` 的 `:root`。舊的深色版本在 commit `b3d2d3b`
- **字**：繁中 Noto Sans TC，日文 Noto Sans JP，數字/英文用一套 grotesque。標題重、內文輕，對比要拉開
- **海浪動畫**：Canvas 疊 2–3 層 sine 波，低振幅慢速；hero 之外的區塊分隔用靜態 SVG 波浪。手機降到 2 層。`prefers-reduced-motion: reduce` 時完全靜止
- **海浪聲**：單一 20–30 秒無縫 loop mp3（< 400KB），Web Audio API，開啟時 1.5 秒淡入。**預設靜音**，開關固定在右下，狀態存 localStorage。頁面切到背景時自動暫停
- **照片**：橫幅用 Kaito 原檔，WebP + 尺寸切三段。**Phase 1 用 placeholder，不得使用 `_scraped/` 裡的 IG 壓縮圖上線**

## 6. 預約系統（Phase 2）

### 流程
1. 訪客選方案 → 選日期（日曆只顯示未來 60 天）
2. 前端呼叫 `GET /api/availability?from=&to=` → Worker 用 Service Account 讀 Kaito 日曆 freebusy → 回傳每日狀態（可約／已滿／不開放）
3. 填表：姓名、聯絡方式（LINE ID 或 IG 帳號或 email，至少一）、人數、衝浪經驗（無／有幾次／常衝）、住宿地點（判斷接送）、身高體重（配板）、備註
4. 勾選同意：取消政策 + 免責聲明
5. 送出 → `POST /api/bookings` → 寫 D1，狀態 `pending`
6. Worker 在 Kaito 日曆建立 **tentative** 事件，標題 `[待確認] 方案 / 姓名 / 人數`
7. 通知 Kaito（Phase 2 先用 email；LINE Notify 已停止服務，若要 IM 推播走 Telegram Bot）
8. Kaito 在後台或直接回覆確認 → 狀態轉 `confirmed`，日曆事件轉 confirmed

### 關鍵設計約束（來自他的實際作業方式，不可簡化掉）
- **時間是浮動的**：他要看當天浪況才決定幾點、去哪。所以預約**只選日期與時段（上午／下午／整日）**，不選精確時間，不選地點。地點欄位在網站上明講「當天依浪況決定」
- **天候改期是常態**：表單必須讓客人填備選日期（最多 2 個），且取消政策要顯眼
- 預約是**申請**不是確認。全站文案用「送出預約申請」，成功頁明講「Kaito 會在 24 小時內回覆」

### D1 資料表 `bookings`
`id, created_at, plan, date_primary, date_alt1, date_alt2, slot(am|pm|full), party_size, contact_type, contact_value, name, experience, accommodation, height_cm, weight_kg, note, status(pending|confirmed|rejected|cancelled|done), gcal_event_id, admin_note`

### Google Calendar 串接
- **Service Account**，Kaito 把日曆「共用」給 service account email 並給「變更活動」權限
- 需要的 scope：`calendar.events`、`calendar.readonly`
- 憑證：`~/.config/ryukyusurfbase/gcal-service-account.json`（本機）＋ `wrangler secret` （雲端）。**絕不進 repo**
- Worker 端自簽 JWT 換 access token（Workers 不能用 googleapis SDK，用 `jose` 或手刻 WebCrypto RS256）

## 7. 後台（Phase 3）

`/admin`，Cloudflare Access（Google 登入，白名單 Kaito + SS 兩個 email）。手機優先。

- **預約管理**：今天／本週／全部；一鍵確認、拒絕、改期；顯示客人聯絡方式可一鍵複製
- **內容管理**：方案（名稱／價格／時長／含什麼）、FAQ、公告橫幅、照片上傳（R2）
- 內容存 D1，前台 SSR 或 build 時抓；不做即時預覽

## 8. 分期

| Phase | 內容 | 產出 |
|---|---|---|
| **1** | 前台完整靜態站（繁中＋日文、動畫、音效、假資料方案、CTA 導到 IG 私訊） | 可以拿給 Kaito 看的網站 |
| **2** | 預約表單 + D1 + Google Calendar + 通知 | 能收單 |
| **3** | 後台 CMS + 預約管理 | 交給他自己營運 |

Phase 1 未經 SS 驗收，不得開始 Phase 2。

## 9. 必須向 Kaito 確認（Phase 1 之後）

1. 三個方案的價格、時長、含什麼（板／防寒衣／保險／接送／照片）
2. 接送範圍（那霸？恩納？多遠要加錢）
3. 每團最多幾人
4. 取消／改期政策（IG「⚠️必讀規則」Highlight 裡有，未登入看不到，請他截圖或匯出）
5. 有無旅行業／體驗業登記、保險方案（法遵，寫進頁尾）
6. 淡旺季與公休
7. 他要用哪個網域（先用 `ryukyusurfbase.sssuni.com`，之後轉他自己的）
8. 照片原檔（請他跑 Meta「下載你的資訊」，選 IG + Threads、JSON 格式）
9. `/about` 放他的憂鬱症經歷全文，最終仍要他本人點頭（他 IG 已公開講過，但網站是另一個場合）。位置已定案在 `/about`，不再討論的是「放哪」，要確認的只是「他同不同意上網站」。
