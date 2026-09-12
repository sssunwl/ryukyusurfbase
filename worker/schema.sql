-- 衝浪情報 D1 schema（SPEC §6.5）。所有時間都是 JST 的 ISO 字串。

CREATE TABLE IF NOT EXISTS jma_forecasts (
  office TEXT NOT NULL,
  report_datetime TEXT NOT NULL,
  payload_json TEXT NOT NULL,
  fetched_at TEXT NOT NULL,
  PRIMARY KEY (office, report_datetime)
);

CREATE TABLE IF NOT EXISTS jma_warnings (
  office TEXT NOT NULL,
  report_datetime TEXT NOT NULL,
  payload_json TEXT NOT NULL,
  fetched_at TEXT NOT NULL,
  PRIMARY KEY (office, report_datetime)
);

CREATE TABLE IF NOT EXISTS tides (
  station TEXT NOT NULL,
  date TEXT NOT NULL,
  hourly_json TEXT NOT NULL,
  highs_json TEXT NOT NULL,
  lows_json TEXT NOT NULL,
  fetched_at TEXT NOT NULL,
  PRIMARY KEY (station, date)
);

CREATE TABLE IF NOT EXISTS field_reports (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  posted_at TEXT NOT NULL,
  text TEXT NOT NULL,
  tg_message_id INTEGER NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS tg_posts (
  kind TEXT NOT NULL,          -- today | tomorrow
  target_date TEXT NOT NULL,
  message_id INTEGER,
  sent_at TEXT NOT NULL,
  status TEXT NOT NULL,        -- sent | failed | skipped
  detail TEXT,
  PRIMARY KEY (kind, target_date)
);

-- 後台可編輯的網站內容（docs/ADMIN_SPEC.md）。key 對應前台 i18n 區塊，例如 plansSection、faq。
CREATE TABLE IF NOT EXISTS content_docs (
  key TEXT PRIMARY KEY,
  zh_json TEXT,
  ja_json TEXT,
  updated_at TEXT NOT NULL,
  updated_by TEXT
);
