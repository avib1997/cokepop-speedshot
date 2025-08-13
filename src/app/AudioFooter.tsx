// app/AudioFooter.tsx
'use client'

import { useEffect, useRef, useState } from 'react'

export default function AudioFooter() {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [muted, setMuted] = useState(true)

  // לנסות לנגן מיד במיוט ולהסיר מיוט בלחיצה ראשונה
  useEffect(() => {
    const a = audioRef.current
    if (!a) return
    a.loop = true
    a.muted = true
    a.volume = 0.6
    a.play().catch(() => {}) // פרה־לוד במיוט

    const enable = () => {
      const el = audioRef.current
      if (!el) return
      setMuted(false)
      el.muted = false
      el.play().catch(() => {})
    }
    window.addEventListener('pointerdown', enable, { once: true })
    window.addEventListener('keydown', enable, { once: true })
    return () => {
      window.removeEventListener('pointerdown', enable)
      window.removeEventListener('keydown', enable)
    }
  }, [])

  return (
    <footer className="siteFooter">
      <a href="https://brotechstudio.com" target="_blank" rel="noopener noreferrer" className="brandLink">
        <img src="/images/BroTechLogoF.png" alt="" width={40} height={40} className="brandLogo" />
        BroTech
      </a>

      <audio ref={audioRef} src="/audio/bg.mp3" preload="auto" playsInline />

      <button
        className="muteBtn"
        onClick={() => {
          const a = audioRef.current
          if (!a) return
          const next = !muted
          setMuted(next)
          a.muted = next
          if (!next) a.play().catch(() => {})
        }}
        aria-label={muted ? 'הפעל קול' : 'השתק'}
      >
        {muted ? '🔇' : '🔊'}
      </button>
    </footer>
  )
}
