'use client'
import React, { createContext, useContext, useRef, useState, useCallback } from 'react'

type AudioAPI = {
  start: () => void
  toggleMute: () => void
  muted: boolean
  ref: React.MutableRefObject<HTMLAudioElement | null>
}

const AudioCtx = createContext<AudioAPI | null>(null)
export const useAudio = () => useContext(AudioCtx)

export default function AudioProvider({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLAudioElement | null>(null)
  const [muted, setMuted] = useState<boolean>(true) // בהתחלה במיוט

  const start = useCallback(() => {
    const el = ref.current
    if (!el) return
    el.currentTime = 0
    el.muted = false
    setMuted(false)
    void el.play().catch(() => {})
  }, [])

  const toggleMute = useCallback(() => {
    const el = ref.current
    if (!el) return
    const next = !muted
    el.muted = next
    setMuted(next)
    if (!next && el.paused) void el.play().catch(() => {})
  }, [muted])

  return (
    <AudioCtx.Provider value={{ start, toggleMute, muted, ref }}>
      {children}
      <audio ref={ref} src="/audio/bg.mp3" preload="auto" loop playsInline />
    </AudioCtx.Provider>
  )
}
