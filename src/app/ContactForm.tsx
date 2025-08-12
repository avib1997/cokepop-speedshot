'use client'

import React, { useRef } from 'react'
import emailjs from 'emailjs-com'
import styles from './page.module.scss' // משתמשים באותו SCSS כדי לשמור לוק

export default function ContactForm() {
  const form = useRef<HTMLFormElement>(null)

  const sendEmail = (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.current) return

    emailjs
      .sendForm(
        'service_i77wi5q', // ← החלף לשירות שלך
        'template_gxz00ik', // ← החלף לתבנית שלך
        form.current,
        'hO3mRGe148VPmSC_J' // ← Public Key שלך
      )
      .then(() => {
        alert('💌 ההודעה נשלחה בהצלחה!')
        form.current?.reset()
      })
      .catch(() => {
        alert('❌ שליחה נכשלה, נסה שוב.')
      })
  }

  return (
    <div className={styles.contactContainer} dir="rtl">
      <h3 className={styles.contactTitle}>בואו נבנה משחק שמייצר תוצאות</h3>
      <p className={styles.contactLead}>משחק מותאם אישית שמגביר חשיפה, מעורבות וזכירות. השאירו פרטים ונחזור אליכם ממש מהר.</p>

      <form ref={form} onSubmit={sendEmail} className={styles.contactForm}>
        <input name="name" type="text" placeholder="שם מלא" required />
        <input name="phone" type="tel" placeholder="מספר טלפון" required />
        <input name="email" type="email" placeholder="אימייל" required />
        <textarea name="message" rows={4} placeholder="מה הרעיון שלכם או איך נוכל לעזור?" required />

        <input
          type="hidden"
          name="time"
          value={new Date().toLocaleString('he-IL', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
          })}
        />

        <button type="submit" className={styles.contactSubmit}>
          שלח הודעה ✉️
        </button>
        <p className={styles.whatsappNote}>
          או שלחו וואטסאפ: <strong>054-566-5166</strong>
        </p>
      </form>
    </div>
  )
}
