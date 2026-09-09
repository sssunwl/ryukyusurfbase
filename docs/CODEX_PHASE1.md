# 派工單 — Phase 1 前台

你是這個專案的實作者。工作目錄 /Users/sws/Sun/Claude/ryukyusurfbase。

**動工前必讀，兩份都要讀完**：`CLAUDE.md`、`docs/SPEC.md`。
參考素材（唯讀，不可 commit）：`_scraped/ig_findings.md`。

## 任務：只做 Phase 1

Phase 1 = 前台完整靜態站，可以拿給教練看。**不要碰 Phase 2 的預約 API、不要碰 Phase 3 的後台**，連骨架都不要先建。

## 範圍
1. Vite + React + TS，加 Tailwind、framer-motion。零多餘相依，不要引入 UI 元件庫。
2. i18n：繁中 + 日文。自寫 `src/i18n/` 兩個 ts 檔 + Context，**不要裝 i18next**。語言切換在 header，存 localStorage，預設繁中。
3. 依 SPEC 第 4 節做首頁全部 8 個區塊 + `/about` + `/plans`（react-router）。
4. 依 SPEC 第 5 節做視覺：Canvas 海浪動畫（hero）、SVG 波浪分隔、海浪聲開關（預設靜音、localStorage、淡入、頁面隱藏時暫停）。音檔放 `public/audio/ocean.mp3` 佔位路徑並在 README 註明要補，**不要自己去網路下載音檔**。
5. `prefers-reduced-motion: reduce` 時所有動畫靜止。
6. 照片全部用 CSS 漸層或純色 placeholder，標 `data-placeholder`。**絕對不要使用 `_scraped/` 裡的任何內容當上線素材**。
7. 手機優先 RWD。Lighthouse 行動版效能目標 90+。

## 文案規則（重要）
- 價格、時長一律寫 `TBD`，**不要自己編數字**。
- 「為什麼是他」只能用 SPEC 第 4 節那四點，不可加碼、不可誇大。
- 教練自述見本檔末附錄，**原文照抄**到 `/about`，日文版你翻譯。
- 全站不要出現「最棒」「第一」「保證」這類無根據的行銷語。語氣參考他的 IG：樸實、第一人稱、講細節。
- **憂鬱症那段只准出現在 `/about`**。首頁「關於教練」區只放一到兩句引子且不得出現憂鬱症字眼；hero、meta description、og tag 都不准用這段經歷當賣點。

## 交付
- `npm run dev` 可跑、`npm run build` 可過
- 更新 `README.md`：如何跑、待補素材清單（音檔、照片、價格）
- **不要 git commit、不要 push**，做完就停，SS 會審

SPEC 沒寫清楚的地方寫進 `docs/QUESTIONS.md`，**不要自己發明規則**。

## 附錄：教練自述原文（繁中，原文照抄不要改寫）

🌊 大家好！我是教練海斗 🌊
我在沖繩出生長大，
比起吃飯，更愛衝浪。
高中畢業後，我曾在台灣留學一年半。
回到日本後，從事「地方創生」與「創業支援」相關工作四年。
然而某一天，我罹患了憂鬱症。
在反覆休職之後，最終無法再繼續工作。
在床上虛度光陰的日子裡，
腦海中唯一浮現的念頭是：
「在死之前，至少還想再衝一次浪！」
我不想再過那種失去衝浪的生活。
如果可以重新選擇人生，
我希望透過大海與衝浪，能幫助同樣背負壓力的人。
🌴 帶著這樣的心情，
我創立了「琉球衝浪基地 Ryukyu Surf Base」。
🏄‍♀️ 不論是初學者還是有經驗的衝浪者，
我都會依照你的程度，帶你體驗最棒的沖繩海浪！
