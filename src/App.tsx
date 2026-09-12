import { useEffect } from 'react'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { AudioToggle } from './components/AudioToggle'
import { Footer } from './components/Footer'
import { Header } from './components/Header'
import { AboutPage } from './pages/AboutPage'
import { BookingAdminDemoPage } from './pages/BookingAdminDemoPage'
import { BookingDemoPage } from './pages/BookingDemoPage'
import { HomePage } from './pages/HomePage'
import { PlansPage } from './pages/PlansPage'
import { SurfGuidePage } from './pages/SurfGuidePage'
import { SurfPointsPage } from './pages/SurfPointsPage'
import { SurfReportPage } from './pages/SurfReportPage'

function ScrollToTop() {
  const { pathname, hash } = useLocation()
  // 一定要用大括號：箭頭函式直接回傳 scrollTo() 的結果會被 React 當成 cleanup。
  // 部分瀏覽器的 scrollTo 回傳 Promise → "destroy is not a function" → 整個 App 白屏。
  // 帶 #錨點 時交給頁面自己捲動（例如 /surf-guide#tide），否則會被捲回頁首。
  useEffect(() => {
    if (!hash) window.scrollTo({ top: 0, behavior: 'instant' })
  }, [pathname, hash])
  return null
}

export default function App() {
  return (
    <div className="app-shell">
      <ScrollToTop />
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/plans" element={<PlansPage />} />
          <Route path="/surf-report" element={<SurfReportPage />} />
          <Route path="/surf-guide" element={<SurfGuidePage />} />
          <Route path="/surf-points" element={<SurfPointsPage />} />
          {/* 預約系統示範：不放進主選單，直接給網址試用（SPEC §7） */}
          <Route path="/booking" element={<BookingDemoPage />} />
          <Route path="/booking/demo-admin" element={<BookingAdminDemoPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Footer />
      <AudioToggle />
    </div>
  )
}
