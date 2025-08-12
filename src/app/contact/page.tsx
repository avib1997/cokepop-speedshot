'use client'

import React, { useRef } from 'react'
import emailjs from 'emailjs-com'
import styles from '../page.module.scss'
import Link from 'next/link'

export default function ContactPage() {
  const formRef = useRef<HTMLFormElement>(null)

  const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!formRef.current) return
    emailjs
      .sendForm('service_i77wi5q', 'template_gxz00ik', formRef.current, 'hO3mRGe148VPmSC_J')
      .then(() => {
        alert('💌 ההודעה נשלחה בהצלחה!')
        formRef.current?.reset()
      })
      .catch(() => {
        alert('❌ שליחה נכשלה, נסה שוב.')
      })
  }

  const timeValue = new Date().toLocaleString('he-IL', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })

  return (
    <div className={styles.contactPage} dir="rtl">
      <div className={styles.redShards} aria-hidden />
      <div className={styles.contactCard}>
        {/* C — ריבון הצעה */}
        <div className={styles.ribbon}>
          <span>ייעוץ וקונספט חינם 🎁</span>
        </div>

        {/* A — כותרת “ניאון” קצרה */}
        <h2 className={styles.ctaHeadline}>רוצה לקדם את העסק שלך בדרך שאף אחד לא שוכח?</h2>
        <p className={styles.ctaParagraph}>
          דמיין לקוחות <strong>משחקים, נהנים – וזוכרים את המותג שלך לנצח.</strong>
          <br />
          בין אם אתה סופר שכונתי, חנות טמבור, רשת קמעונאית או עסק קטן עם חלום גדול
          <br />
          <br />
          <strong>משחק מותאם אישית</strong> הוא הכלי המושלם להכניס עניין, להגביר חשיפה ולהשאיר חותם.
        </p>

        {/* A — צ'יפים מהירים */}
        <div className={styles.chips}>
          <span className={styles.chip}>
            ✨ <span className={styles.txt}>מעורבות אמיתית</span>
          </span>
          <span className={styles.chip}>
            🎯 <span className={styles.txt}>לידים חכמים</span>
          </span>
          <span className={styles.chip}>
            📈 <span className={styles.txt}>מותאם לקמפיין</span>
          </span>
        </div>

        <p className={styles.ctaParagraph}>
          משחקים שיווקיים יוצרים <strong>מעורבות רגשית, סקרנות, וחיבור ישיר למותג שלך</strong> –
          <br />
          <strong>מילדים ועד מבוגרים, מכל תחום, בכל רמת קושי.</strong>
          <br />
          זה לא רק משחק. <strong>זה מנוע שיווקי. זה בידור. זה ויראלי.</strong>
        </p>

        {/* B — צ'קליסט תכל'ס */}
        <ul className={styles.checklist}>
          <li>הקמה מהירה: 7–14 ימים</li>
          <li>חיבור ל־CRM/מייל ושמירת לידים</li>
          <li>מותאם לנייד, רשתות ועמודי נחיתה</li>
        </ul>

        {/* B — פס נתונים/מדדים */}
        <div className={styles.metricsBar}>
          <div className={styles.metric}>
            <div className={styles.kpi}>+78%</div>
            <div className={styles.kpiLabel}>זמן מסך</div>
          </div>
          <div className={styles.metric}>
            <div className={styles.kpi}>×3</div>
            <div className={styles.kpiLabel}>זכירות</div>
          </div>
          <div className={styles.metric}>
            <div className={styles.kpi}>92%</div>
            <div className={styles.kpiLabel}>“זה כיף!”</div>
          </div>
        </div>

        {/* C — ציטוט לקוח */}
        <blockquote className={styles.testimonial}>
          <p>“המשחק הביא תנועה ולידים חמים כבר בשבוע הראשון — קליל, ממותג, וממיר.”</p>
          <cite>— שירן, רשת קמעונאית</cite>
        </blockquote>

        {/* CTA קצר וברור */}
        <p className={styles.ctaCallend}>
          השאר פרטים
          <br />
          ונבנה יחד חוויה
          <br />
          שהעסק שלך עוד לא חווה.
        </p>

        {/* טופס יצירת קשר */}
        <form ref={formRef} onSubmit={sendEmail} className={styles.contactForm} dir="rtl" autoComplete="on">
          <input name="name" type="text" inputMode="text" autoComplete="name" placeholder="שם מלא" required />
          <input name="phone" type="tel" inputMode="tel" autoComplete="tel" placeholder="מספר טלפון" required />
          <input name="email" type="email" inputMode="email" autoComplete="email" placeholder="אימייל" required />
          <textarea name="message" rows={4} placeholder="מה הרעיון שלך או איך נוכל לעזור?" required />
          <input type="hidden" name="time" value={timeValue} />
          <button type="submit" className={styles.contactSubmit}>
            שלח הודעה
          </button>
        </form>

        {/* וואטסאפ */}
        <p className={styles.whatsappNote}>
          או שלח הודעה ישר לוואטסאפ
          <br />
          054-566-5166
        </p>
      </div>
      <div className={styles.backToGameWrap}>
        <Link href="/?skipIntro=1" className={`${styles.startButton} ${styles.backToGame}`}>
          חזור לשחק ולצבור מטבעות
        </Link>
      </div>
    </div>
  )
}
