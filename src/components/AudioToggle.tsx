import { useCallback, useEffect, useRef, useState } from 'react'
import { useLanguage } from '../i18n/LanguageContext'

const AUDIO_KEY = 'ryukyu-surf-ocean-sound'

type AudioGraph = {
  audio: HTMLAudioElement
  context: AudioContext
  gain: GainNode
}

export function AudioToggle() {
  const { copy } = useLanguage()
  const [enabled, setEnabled] = useState(() => window.localStorage.getItem(AUDIO_KEY) === 'on')
  const [unavailable, setUnavailable] = useState(false)
  const graphRef = useRef<AudioGraph | null>(null)
  const startedRef = useRef(false)

  const getGraph = useCallback(() => {
    if (graphRef.current) return graphRef.current
    const audio = new Audio('/audio/ocean.mp3')
    audio.loop = true
    audio.preload = 'none'
    const context = new AudioContext()
    const gain = context.createGain()
    const source = context.createMediaElementSource(audio)
    gain.gain.value = 0
    source.connect(gain).connect(context.destination)
    graphRef.current = { audio, context, gain }
    return graphRef.current
  }, [])

  const fadeIn = useCallback(async () => {
    try {
      const { audio, context, gain } = getGraph()
      await context.resume()
      gain.gain.cancelScheduledValues(context.currentTime)
      gain.gain.setValueAtTime(0, context.currentTime)
      await audio.play()
      startedRef.current = true
      gain.gain.linearRampToValueAtTime(0.78, context.currentTime + 1.5)
    } catch {
      setUnavailable(true)
      setEnabled(false)
      window.localStorage.setItem(AUDIO_KEY, 'off')
    }
  }, [getGraph])

  const fadeOut = useCallback(() => {
    const graph = graphRef.current
    if (!graph) return
    const { audio, context, gain } = graph
    gain.gain.cancelScheduledValues(context.currentTime)
    gain.gain.setValueAtTime(gain.gain.value, context.currentTime)
    gain.gain.linearRampToValueAtTime(0, context.currentTime + 0.25)
    window.setTimeout(() => audio.pause(), 280)
  }, [])

  const toggle = () => {
    const next = !enabled
    setUnavailable(false)
    setEnabled(next)
    window.localStorage.setItem(AUDIO_KEY, next ? 'on' : 'off')
    if (next) void fadeIn()
    else fadeOut()
  }

  useEffect(() => {
    const handleFirstInteraction = () => {
      if (enabled && !startedRef.current) void fadeIn()
    }
    window.addEventListener('pointerdown', handleFirstInteraction, { once: true })
    window.addEventListener('keydown', handleFirstInteraction, { once: true })
    return () => {
      window.removeEventListener('pointerdown', handleFirstInteraction)
      window.removeEventListener('keydown', handleFirstInteraction)
    }
  }, [enabled, fadeIn])

  useEffect(() => {
    const handleVisibility = () => {
      const graph = graphRef.current
      if (!graph || !startedRef.current) return
      if (document.hidden) {
        graph.gain.gain.cancelScheduledValues(graph.context.currentTime)
        graph.gain.gain.value = 0
        graph.audio.pause()
      } else if (enabled) {
        void fadeIn()
      }
    }
    document.addEventListener('visibilitychange', handleVisibility)
    return () => document.removeEventListener('visibilitychange', handleVisibility)
  }, [enabled, fadeIn])

  useEffect(() => () => {
    const graph = graphRef.current
    if (!graph) return
    graph.audio.pause()
    void graph.context.close()
    graphRef.current = null
  }, [])

  return (
    <button
      type="button"
      className={`audio-toggle ${enabled ? 'audio-toggle--on' : ''}`}
      onClick={toggle}
      aria-pressed={enabled}
      aria-label={unavailable ? copy.audio.unavailable : enabled ? copy.audio.on : copy.audio.off}
      title={unavailable ? copy.audio.unavailable : undefined}
    >
      <span className="audio-toggle__icon" aria-hidden="true">
        {enabled ? <SoundOnIcon /> : <SoundOffIcon />}
      </span>
      <span>{unavailable ? copy.audio.unavailable : enabled ? copy.audio.on : copy.audio.off}</span>
    </button>
  )
}

function SoundOnIcon() {
  return <svg viewBox="0 0 24 24"><path d="M4 10v4h4l5 4V6L8 10H4Zm12-1.5a5 5 0 0 1 0 7M18.5 6a9 9 0 0 1 0 12" /></svg>
}

function SoundOffIcon() {
  return <svg viewBox="0 0 24 24"><path d="M4 10v4h4l5 4V6L8 10H4Zm12-1 5 5m0-5-5 5" /></svg>
}
