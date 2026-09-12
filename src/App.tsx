import { useEffect } from 'react'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { AudioToggle } from './components/AudioToggle'
import { Footer } from './components/Footer'
import { Header } from './components/Header'
import { AboutPage } from './pages/AboutPage'
import { HomePage } from './pages/HomePage'
import { PlansPage } from './pages/PlansPage'

function ScrollToTop() {
  const { pathname } = useLocation()
  // 一定要用大括號：箭頭函式直接回傳 scrollTo() 的結果會被 React 當成 cleanup。
  // 部分瀏覽器的 scrollTo 回傳 Promise → "destroy is not a function" → 整個 App 白屏。
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [pathname])
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
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Footer />
      <AudioToggle />
    </div>
  )
}
