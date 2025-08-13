'use client'

import React, { useState, useEffect, useCallback, useRef } from 'react'
import Image from 'next/image'
import styles from './page.module.scss'
import { questions } from './questions'
import ContactForm from './ContactForm' // ← חדש
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'

type Bubble = {
  id: number
  isLogo: boolean
  left: number
  size: number
  dur: number
  dly?: number
  popping?: 'good' | 'bad'
  cx?: number
  cy?: number
  seed: number
}

type CSSVarStyle = React.CSSProperties & {
  '--size'?: string
  '--dur'?: string
  '--delay'?: string
  '--seed'?: string
  '--popDur'?: string
  '--cx'?: string
  '--cy'?: string
}

function Home() {
  const MIN_RED = 7
  const MAX_BLACK = 5
  const redSpawnedRef = useRef(0)
  const blackSpawnedRef = useRef(0)
  const [showIntro, setShowIntro] = useState(true)
  const [started, setStarted] = useState(false)
  const [qIdx, setQIdx] = useState(0)
  const [score, setScore] = useState(0)
  const [coinFlash, setCoinFlash] = useState(false)

  const [bubbleMode, setBubbleMode] = useState(false)
  const [bubbles, setBubbles] = useState<Bubble[]>([])

  // בונוס: רק אדומות נספרות; בונוס פעם אחת בסבב אחרי 5
  const [redHits, setRedHits] = useState(0)
  const [bonusGiven, setBonusGiven] = useState(false)

  const [usedBubbleChance, setUsedBubbleChance] = useState(false)
  const [finished, setFinished] = useState(false)
  const [timerKey, setTimerKey] = useState(0)
  const [feedbackMode, setFeedbackMode] = useState(false)
  const [isAnswerCorrect, setIsAnswerCorrect] = useState<boolean | null>(null)
  const [showContact, setShowContact] = useState(false) // ← חדש

  const nextIdRef = useRef(0)

  // גלילה לראש הדף
  const scrollTop = (smooth = false) => {
    const el = document.scrollingElement || document.documentElement
    el.scrollTo({ top: 0, left: 0, behavior: smooth ? 'smooth' : 'auto' })
  }

  // בכל מעבר מצב משמעותי – קופצים לראש
  useEffect(() => {
    // smooth כשאתה רוצה קפיצה רכה; שנה ל-auto אם מעדיף מיידי
    scrollTop(true)
  }, [qIdx, feedbackMode, bubbleMode, finished, started])

  const search = useSearchParams()
  useEffect(() => {
    if (search.get('skipIntro') === '1') setShowIntro(false)
  }, [search])

  useEffect(() => {
    const t = setTimeout(() => setShowIntro(false), 4000)
    return () => clearTimeout(t)
  }, [])

  const wowCoin = () => {
    setCoinFlash(true)
    setTimeout(() => setCoinFlash(false), 600)
  }

  const nextQuestion = useCallback(() => {
    if (qIdx + 1 === questions.length) {
      setFinished(true)
    } else {
      setQIdx((i) => i + 1)
      setTimerKey((k) => k + 1)
      setBubbleMode(false)
      setFeedbackMode(false)
      setIsAnswerCorrect(null)
      setUsedBubbleChance(false)
    }
  }, [qIdx])

  // סבב הבועות: נולדות ברצף מהתחתית עד סוף 10 שניות
  useEffect(() => {
    if (!bubbleMode) return

    setRedHits(0)
    setBonusGiven(false)
    setBubbles([])
    redSpawnedRef.current = 0
    blackSpawnedRef.current = 0

    const MAX_ONSCREEN = 6 // מקס' בועות על המסך
    const SPAWN_EVERY_MS = 420 // כל כמה זמן מולידים בועה
    const ROUND_MS = 10000 // משך הסבב (10s)

    const spawnOne = () => {
      setBubbles((prev) => {
        if (prev.length >= MAX_ONSCREEN) return prev

        const id = nextIdRef.current++
        const size = Math.floor(Math.random() * 19) + 50 // ~50..68px
        const base = 4.2,
          extra = 3.8
        const sizeFactor = size / 68
        const dur = base + Math.random() * extra + sizeFactor * 1.0 // ~4.2..9.0s
        const left = Math.random() * 82 + 4 // 4%..86%

        let isLogo: boolean
        if (blackSpawnedRef.current >= MAX_BLACK) {
          isLogo = true
        } else if (redSpawnedRef.current < MIN_RED) {
          isLogo = true
        } else {
          isLogo = Math.random() < 0.7
        }

        const b: Bubble = {
          id,
          isLogo,
          left,
          size,
          dur,
          dly: 0, // מתחילה מיד מהתחתית
          seed: Math.random()
        }

        if (isLogo) redSpawnedRef.current++
        else blackSpawnedRef.current++

        // הסרה אוטומטית כשהבועה סיימה לטפס
        setTimeout(() => {
          setBubbles((cur) => cur.filter((x) => x.id !== b.id))
        }, dur * 1000 + 80)

        return [...prev, b]
      })
    }

    // "חימום" ראשוני קטן
    const warm = Math.floor(Math.random() * 3) + 2
    for (let i = 0; i < warm; i++) spawnOne()

    const iv = setInterval(spawnOne, SPAWN_EVERY_MS)
    const end = setTimeout(() => {
      clearInterval(iv)
      nextQuestion()
    }, ROUND_MS)

    return () => {
      clearInterval(iv)
      clearTimeout(end)
    }
  }, [bubbleMode, nextQuestion])

  // טיימר 5 שניות לשאלת קוויז (מחוץ לאתגר הבועות)
  useEffect(() => {
    if (!started || bubbleMode || feedbackMode) return
    const t = setTimeout(() => {
      setIsAnswerCorrect(false)
      setFeedbackMode(true)
    }, 10000)
    return () => clearTimeout(t)
  }, [started, qIdx, bubbleMode, feedbackMode])

  const handleBubbleClick = (b: Bubble, e: React.MouseEvent<HTMLButtonElement>) => {
    if (b.popping) return

    const el = e.currentTarget as HTMLButtonElement
    const rect = el.getBoundingClientRect()
    const cx = ((e.clientX - rect.left) / rect.width) * 100
    const cy = ((e.clientY - rect.top) / rect.height) * 100
    const kind: 'good' | 'bad' = b.isLogo ? 'good' : 'bad'

    // מקפיאים את מצב האנימציה והמיקום כדי שלא "יקפוץ"
    const cs = window.getComputedStyle(el)
    el.style.animationPlayState = 'paused'
    el.style.transition = 'none'

    // מפעילים אנימציית פופ על המעטפת הפנימית ומסמנים סוג
    setBubbles((prev) => prev.map((x) => (x.id === b.id ? { ...x, popping: kind, cx, cy } : x)))

    // מסירים אחרי ~0.4s (אורך הפופ)
    setTimeout(() => {
      setBubbles((prev) => prev.filter((x) => x.id !== b.id))
    }, 400)

    // רק אדומות נספרות, בונוס פעם אחת אחרי 5
    if (kind === 'good') {
      setRedHits((prev) => {
        const next = prev + 1
        if (next >= 5 && !bonusGiven) {
          setBonusGiven(true)
          setScore((s) => s + 1) // מטבע בונוס
          wowCoin()
        }
        return next
      })
    }
  }

  const popBubble = (b: Bubble, el: HTMLButtonElement, cx: number, cy: number) => {
    if (b.popping) return
    // לעצור את האנימציה בלי bottom (זה שובש במובייל)
    el.style.animationPlayState = 'paused'
    el.style.transition = 'none'

    const kind: 'good' | 'bad' = b.isLogo ? 'good' : 'bad'
    setBubbles((prev) => prev.map((x) => (x.id === b.id ? { ...x, popping: kind, cx, cy } : x)))
    setTimeout(() => setBubbles((prev) => prev.filter((x) => x.id !== b.id)), 400)

    if (kind === 'good') {
      setRedHits((prev) => {
        const next = prev + 1
        if (next >= 5 && !bonusGiven) {
          setBonusGiven(true)
          setScore((s) => s + 1)
          wowCoin()
        }
        return next
      })
    }
  }

  const handleBubblePointer = (b: Bubble, e: React.PointerEvent<HTMLButtonElement>) => {
    const el = e.currentTarget
    const r = el.getBoundingClientRect()
    popBubble(b, el, ((e.clientX - r.left) / r.width) * 100, ((e.clientY - r.top) / r.height) * 100)
  }

  const handleBubbleTouch = (b: Bubble, e: React.TouchEvent<HTMLButtonElement>) => {
    const t = e.touches[0] || e.changedTouches[0]
    const el = e.currentTarget
    const r = el.getBoundingClientRect()
    popBubble(b, el, ((t.clientX - r.left) / r.width) * 100, ((t.clientY - r.top) / r.height) * 100)
  }

  const handleAnswer = (correct: boolean) => {
    setIsAnswerCorrect(correct)
    setFeedbackMode(true)
    if (correct) {
      setScore((s) => s + 1)
      wowCoin()
    }
  }

  const playAgain = React.useCallback(() => {
    // לא לחזור לאינטרו
    setShowIntro(false)

    // חזרה למסך ההתחלתי (Hero)
    setStarted(false)
    setFinished(false)
    setFeedbackMode(false)
    setBubbleMode(false)
    setShowContact(false)

    // אפסים לוגיים/מונים
    setQIdx(0)
    setScore(0)
    setCoinFlash(false)
    setRedHits(0)
    setBonusGiven(false)
    setUsedBubbleChance(false)
    setIsAnswerCorrect(null)
    setBubbles([])

    // לאתחל מפתחות/מזהים לאנימציות
    setTimerKey((k) => k + 1)
    nextIdRef.current = 0

    // אופציונלי: לגלול לראש העמוד
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
  }, [])

  if (showIntro)
    return (
      <div className={styles.intro}>
        <div className={styles.sparkles} aria-hidden />
        <div className={styles.redShards} aria-hidden />
        <div className={styles.redSweep} aria-hidden />
        <div className={styles.beams} aria-hidden />
        <div className={styles.pulseRing} aria-hidden />
        <div className={styles.lensFlare} aria-hidden />
        <div className={styles.introCore}>
          <Image src="/images/coke-logo.png" alt="Coca-Cola" width={240} height={110} className={styles.introLogo} priority />
          <h1 className={styles.introTitle}>
            <span className={styles.wordA}>CokePop</span> <span className={styles.wordB}>SpeedShot</span>
          </h1>
        </div>
        <button className={styles.skipIntro} onClick={() => setShowIntro(false)} aria-label="דלג">
          דלג
        </button>
      </div>
    )

  if (!started)
    return (
      <div className={`${styles.container} ${styles.start}`}>
        <div className={styles.redShards} aria-hidden />
        <div className={styles.hero}>
          <div className={styles.fizzField}>
            {Array.from({ length: 14 }).map((_, i) => (
              <span key={i} className={styles.fizzDot} style={{ '--d': `${i}` } as React.CSSProperties} />
            ))}
          </div>
          <Image src="/images/cheers-bottles.png" alt="" width={900} height={900} className={styles.heroBg} priority />
          <div className={styles.heroContent}>
            <Image src="/images/coke-logo.png" alt="Coca-Cola" width={196} height={96} className={styles.logoHero} priority />
            <h1 className={styles.title}>CokePop SpeedShot</h1>
            <p className={styles.tagline}>קוויז בזק של 5 שניות — תפוסו מטבעות, שברו שיאים, שתפו חברים.</p>
            <div className={styles.chips} dir="rtl">
              <span className={styles.chip}>
                <span className={styles.num} dir="ltr">
                  5
                </span>
                <span className={styles.txt}>שניות לשאלה</span>
                <span aria-hidden="true">⚡</span>
              </span>
              <span className={styles.chip}>
                <span className={styles.num} dir="ltr">
                  3
                </span>
                <span className={styles.txt}>אפשרויות</span>
                <span aria-hidden="true">🎯</span>
              </span>
              <span className={styles.chip}>
                <span className={styles.txt}>בונוס בועות</span>
                <span aria-hidden="true">🫧</span>
              </span>
            </div>
            <button
              className={styles.startButton}
              onClick={() => {
                setStarted(true)
                setTimerKey((k) => k + 1)
              }}
            >
              התחל
            </button>
          </div>
        </div>
      </div>
    )

  if (finished)
    return (
      <div className={styles.container}>
        <div className={styles.redShards} aria-hidden />
        <h2 className={styles.summary}>
          סיימת! צברת <span className={styles.summaryCoins}>{score} 🪙</span>
        </h2>

        <div className={styles.ctaWrapper}>
          <p className={styles.ctaHeadline}>
            רוצה משחק שמשפר חינוך, מהירות וחדות?
            <br />
            <strong>דבר איתי – נבנה משהו מדהים יחד!</strong>
          </p>

          <div className={styles.ctaButtons}>
            <button className={styles.startButton} onClick={playAgain}>
              שחק שוב
            </button>

            <Link href="/contact" className={styles.contactBtn}>
              דבר איתי <br /> נבנה משהו יחד!
            </Link>
          </div>
        </div>

        {showContact && (
          <div className={styles.modalOverlay} onClick={() => setShowContact(false)}>
            <div className={styles.modal} role="dialog" aria-modal="true" onClick={(e) => e.stopPropagation()}>
              <button className={styles.modalClose} onClick={() => setShowContact(false)} aria-label="סגור">
                ×
              </button>
              <ContactForm />
            </div>
          </div>
        )}
      </div>
    )

  if (bubbleMode)
    return (
      <div className={styles.container}>
        <div className={styles.redShards} aria-hidden />
        <div className={styles.hud}>
          <div className={styles.progress}>
            שאלה {qIdx + 1} / {questions.length}
          </div>
          <div className={`${styles.coins} ${coinFlash ? styles.coinsFlash : ''}`}>🪙 {score}</div>
        </div>

        {/* טיימר בועות 10 שניות */}
        <div className={styles.bubbleTimerWrap}>
          <div className={styles.bubbleTimerBar} aria-hidden />
        </div>

        <div className={styles.bubbleContainer}>
          <Image className={styles.fizz} src="/images/fizz.png" alt="" width={800} height={300} />

          {/* אינטרו קצר בעברית — נעלם בעדינות */}
          <div className={styles.bubbleIntro} aria-hidden>
            פוצצו כמה שיותר בועות אדומות{' '}
          </div>

          {bubbles.map((b) => {
            const styleObj: CSSVarStyle = {
              left: `${b.left}%`,
              '--size': `${b.size}px`,
              '--dur': `${b.dur}s`,
              '--delay': `${b.dly ?? 0}s`,
              '--popDur': '420ms',
              '--cx': `${b.cx ?? 50}%`,
              '--cy': `${b.cy ?? 50}%`,
              '--seed': String(b.seed)
            }
            return (
              <button
                key={b.id}
                className={[styles.bubble, b.isLogo ? styles.logo : styles.noLogo, b.popping === 'good' ? styles.popGood : '', b.popping === 'bad' ? styles.popBad : ''].join(' ')}
                style={styleObj}
                onPointerDown={(e) => handleBubblePointer(b, e)}
                onTouchStart={(e) => handleBubbleTouch(b, e)} // גיבוי ל-iOS ישנים
                onClick={(e) => e.preventDefault()} // למנוע "ghost click"
                type="button"
                aria-label={b.isLogo ? 'Coca-Cola bubble' : 'neutral bubble'}
              >
                <span className={styles.bubbleInner}>
                  {b.isLogo && (
                    <span className={styles.logoWrap}>
                      <Image src="/images/coke-logo.png" alt="" width={Math.round(b.size * 0.7)} height={Math.round(b.size * 0.7)} />
                    </span>
                  )}
                  <span className={styles.ripple} aria-hidden />
                  <span className={styles.coinBurst} aria-hidden />
                  <span className={styles.redFlash} aria-hidden />
                  <span className={styles.glassShards} aria-hidden />
                </span>
              </button>
            )
          })}
        </div>
      </div>
    )

  const q = questions[qIdx]
  if (feedbackMode)
    return (
      <div className={styles.container}>
        <div className={styles.redShards} aria-hidden />
        <div className={styles.hud}>
          <div className={styles.progress}>
            שאלה {qIdx + 1} / {questions.length}
          </div>
          <div className={`${styles.coins} ${coinFlash ? styles.coinsFlash : ''}`}>🪙 {score}</div>
        </div>
        <h2 className={styles.question}>{isAnswerCorrect ? 'תשובה נכונה!' : 'תשובה לא נכונה'}</h2>
        <p className={styles.explanation}>{q.explanation}</p>

        {(() => {
          const raw = q.optionImgs?.[0] ?? q.image
          if (!raw) return null
          const safeSrc = raw.includes('&') ? raw.replace(/&/g, '%26') : raw
          const isRemote = /^https?:\/\//.test(safeSrc)

          return (
            <div className={styles.answerMediaCard}>
              <Image src={safeSrc} alt="" width={960} height={540} className={styles.answerImage} priority unoptimized={isRemote} />
            </div>
          )
        })()}
        {isAnswerCorrect ? (
          <button className={styles.startButton} onClick={nextQuestion}>
            המשך לשאלה הבאה
          </button>
        ) : (
          <div className={styles.wrongButtons}>
            <button
              className={styles.startButton}
              onClick={() => {
                if (!usedBubbleChance) {
                  setBubbleMode(true)
                  setUsedBubbleChance(true)
                }
              }}
              disabled={usedBubbleChance}
              aria-disabled={usedBubbleChance}
              title={usedBubbleChance ? 'כבר השתמשת באתגר הבועות לשאלה זו' : undefined}
            >
              נסה להשיג מטבעות באתגר הבועות
            </button>
            <button className={styles.startButton} onClick={nextQuestion}>
              דלג לשאלה הבאה
            </button>
          </div>
        )}
      </div>
    )

  return (
    <div className={styles.container}>
      <div className={styles.redShards} aria-hidden />

      <div className={styles.hud}>
        <div className={styles.progress}>
          שאלה {qIdx + 1} / {questions.length}
        </div>
        <div className={`${styles.coins} ${coinFlash ? styles.coinsFlash : ''}`}>🪙 {score}</div>
      </div>
      <div key={timerKey} className={styles.timerWrap}>
        <div className={styles.timerBar} />
      </div>
      <h2 className={styles.question}>{q.text}</h2>
      <div className={styles.options}>
        {q.options.map((opt, i) => (
          <button key={i} className={styles.optionButton} onClick={() => handleAnswer(i === q.correct)}>
            <span className={styles.badge}>
              <Image src={i === 0 ? '/images/can-classic.png' : i === 1 ? '/images/can-zero.png' : '/images/can-sprite.png'} alt="" width={40} height={40} />
            </span>
            <span className={styles.optText}>{opt}</span>
          </button>
        ))}
      </div>
      <div className={styles.cokeRibbon} aria-hidden>
        <Image src="/images/coke_ribbon1.png" alt="" fill className={styles.cokeRibbonImg} priority />
      </div>
    </div>
  )
}
export default function Page() {
  return (
    <Suspense fallback={null}>
      <Home />
    </Suspense>
  )
}
