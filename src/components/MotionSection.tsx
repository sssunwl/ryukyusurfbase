import { motion, useInView, useReducedMotion, type HTMLMotionProps } from 'framer-motion'
import { useEffect, useRef, useState, type ReactNode } from 'react'

type Props = HTMLMotionProps<'section'> & { children: ReactNode }

/**
 * 進場動畫容器。
 *
 * 保險機制的理由：客人幾乎都從 IG 私訊點連結進來，跑的是 Instagram 內建瀏覽器，
 * 那類環境的 IntersectionObserver 不一定可靠。一旦它失效，只靠 whileInView 的作法
 * 會讓整頁內容永久停在 opacity:0——寧可不要動畫，也不能讓客人看到空白頁。
 */
let observerBroken = false

export function MotionSection({ children, ...props }: Props) {
  const reduceMotion = useReducedMotion()
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.14 })
  const [forced, setForced] = useState(observerBroken)

  useEffect(() => {
    if (forced || inView) return
    const timer = window.setTimeout(() => {
      const el = ref.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      // 已經在視窗裡卻沒被回報 → 判定觀察器不可靠，之後所有區塊一律直接顯示
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        observerBroken = true
        setForced(true)
      }
    }, 900)
    return () => window.clearTimeout(timer)
  }, [forced, inView])

  const visible = reduceMotion || inView || forced

  return (
    <motion.section
      ref={ref}
      initial={reduceMotion ? false : { opacity: 0, y: 28 }}
      animate={visible ? { opacity: 1, y: 0 } : undefined}
      transition={reduceMotion ? { duration: 0 } : { duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      {...props}
    >
      {children}
    </motion.section>
  )
}
