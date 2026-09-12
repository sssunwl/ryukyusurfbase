import { useEffect, useRef } from 'react'

// 淺色底：由後往前越來越飽和，最前面那層是淺灘的青綠。
const COLORS = ['rgba(44, 197, 180, 0.14)', 'rgba(44, 197, 180, 0.22)', 'rgba(22, 176, 170, 0.28)']

export function WaveCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const context = canvas.getContext('2d')
    if (!context) return

    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    let frame = 0
    let width = 0
    let height = 0

    const resize = () => {
      const rect = canvas.getBoundingClientRect()
      const ratio = Math.min(window.devicePixelRatio || 1, 2)
      width = rect.width
      height = rect.height
      canvas.width = Math.round(width * ratio)
      canvas.height = Math.round(height * ratio)
      context.setTransform(ratio, 0, 0, ratio, 0, 0)
    }

    const draw = (time = 0) => {
      context.clearRect(0, 0, width, height)
      const layerCount = width < 640 ? 2 : 3
      const elapsed = motionQuery.matches ? 0 : time * 0.00018

      for (let layer = 0; layer < layerCount; layer += 1) {
        const baseline = height * (0.62 + layer * 0.1)
        const amplitude = 10 + layer * 5
        const frequency = 0.008 - layer * 0.0012
        const speed = elapsed * (layer % 2 === 0 ? 1 : -0.72)

        context.beginPath()
        context.moveTo(0, height)
        context.lineTo(0, baseline)
        for (let x = 0; x <= width + 8; x += 8) {
          const y = baseline + Math.sin(x * frequency + speed + layer * 1.6) * amplitude
          context.lineTo(x, y)
        }
        context.lineTo(width, height)
        context.closePath()
        context.fillStyle = COLORS[layer]
        context.fill()
      }

      if (!motionQuery.matches) frame = window.requestAnimationFrame(draw)
    }

    const restart = () => {
      window.cancelAnimationFrame(frame)
      draw()
    }

    const handleResize = () => {
      resize()
      if (motionQuery.matches) draw()
    }

    resize()
    draw()
    window.addEventListener('resize', handleResize, { passive: true })
    motionQuery.addEventListener('change', restart)

    return () => {
      window.cancelAnimationFrame(frame)
      window.removeEventListener('resize', handleResize)
      motionQuery.removeEventListener('change', restart)
    }
  }, [])

  return <canvas ref={canvasRef} className="hero-waves" aria-hidden="true" />
}
