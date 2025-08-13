'use client'
import React from 'react'
import { useAudio } from './AudioProvider'

export default function MuteButton() {
  const audio = useAudio()
  if (!audio) return null
  return (
    <button className="muteBtn" onClick={audio.toggleMute} aria-label={audio.muted ? 'הפעל קול' : 'השתק'}>
      {audio.muted ? '🔇' : '🔊'}
    </button>
  )
}
