// src/app/questions.ts
export type Question = {
  text: string
  options: [string, string, string]
  correct: 0 | 1 | 2
  image: string
  explanation: string
}

export const questions: readonly Question[] = [
  {
    text: 'באיזו שנה נרשם פטנט לבקבוק הקונטור האיקוני של קוקה‑קולה?',
    options: ['1915', '1935', '1955'],
    correct: 0,
    image: '/images/bottle-classic.png',
    explanation: 'פטנט הקונטור של הבקבוק נרשם בשנת 1915 על‑ידי חברת Root Glass. העיצוב הייחודי נבחר כדי לזהות את המותג גם בחשיכה או כששברים מהרצפה.'
  },
  {
    text: 'איזה משקה־קולה משולב קפה הושק ב‑2006 והופסק ב‑2008?',
    options: ['Coca‑Cola BlāK', 'Coke Energy', 'Coca‑Cola Citra'],
    correct: 0,
    image: '/images/can-classic.png',
    explanation: 'Coca‑Cola BlāK היה משקה קולה בתוספת תמצית קפה שנמכר בשווקים נבחרים. הוא לא התקבל היטב בכל המדינות והוסר מהמדפים ב‑2008.'
  },
  {
    text: 'היכן פותח ספרייט לראשונה בשנת 1959?',
    options: ['מערב גרמניה', 'ארצות הברית', 'יפן'],
    correct: 0,
    image: '/images/can-sprite.png',
    explanation: 'Sprite פותח במערב גרמניה ב‑1959 כמשקה לימון‑ליים. בשנת 1961 הושק רשמית בארה״ב תחת השם Sprite המוכר לנו.'
  },
  {
    text: 'מהו המשקה האלכוהולי הראשון של קוקה‑קולה שהושק ביפן ב‑2018?',
    options: ['Lemon‑Do', 'Fresca Mixed', 'Jack & Coke RTD'],
    correct: 0,
    image: '/images/can-zero.png',
    explanation: 'Lemon‑Do הוא משקה בסגנון ״צ׳והאי״ – לימון עם אלכוהול קל (ABV נמוך). הסדרה הושקה ביפן במגוון אחוזי אלכוהול וטעמים לימוניים.'
  },
  {
    text: 'איזו טקטיקת קידום חלוצית השיקה קוקה‑קולה כבר ב‑1887?',
    options: ['קופון לכוס קולה חינם', '1+1 על בקבוק', 'נקודות למתנות'],
    correct: 0,
    image: '/images/can-classic.png',
    explanation: 'כבר ב‑1887 חולקו שוברים לכוס קוקה‑קולה בחינם כדי להכיר את הטעם לציבור. זוהי אחת הדוגמאות המוקדמות לשיווק באמצעות קופונים.'
  },
  {
    text: 'איזו חדשנות אריזה הציגה קוקה‑קולה בשנת 1923?',
    options: ['שישיית בקבוקים (Six‑Pack)', 'פחית אלומיניום', 'בקבוק PET'],
    correct: 0,
    image: '/images/bottle-classic.png',
    explanation: 'ב‑1923 הוצג נשא הבקבוקים מסוג Six‑Pack שאיפשר לקחת שש יחידות הביתה בנוחות. המהלך הגדיל את הצריכה הביתית ואת המכירות הקמעונאיות.'
  },
  {
    text: 'היכן נשמרת כיום הנוסחה הסודית של קוקה‑קולה?',
    options: ['בכספת World of Coca‑Cola באטלנטה', 'בכספת בניו‑יורק', 'בבנק שווייצרי'],
    correct: 0,
    image: '/images/can-classic.png',
    explanation: 'הנוסחה מוצגת בכספת The Vault במוזיאון World of Coca‑Cola באטלנטה מאז 2011. המבקרים רואים את הכספת אך לא את הנוסחה עצמה.'
  },
  {
    text: 'כמה ימים החזיק ״ניו קוקה״ לפני חזרת ה‑Classic ב‑1985?',
    options: ['79 ימים', '179 ימים', '379 ימים'],
    correct: 0,
    image: '/images/can-sprite.png',
    explanation: 'הגרסה New Coke הושקה ב‑23 באפריל 1985, ו‑Coca‑Cola Classic חזרה ב‑11 ביולי – 79 ימים לאחר מכן. המהלך נתפס כטעות אסטרטגית והופסק במהירות.'
  },
  {
    text: 'איזו מילה נחשבת לעיתים למוכרת בעולם אף יותר מ‑Coca‑Cola?',
    options: ['OK', 'Love', 'Hello'],
    correct: 0,
    image: '/images/can-zero.png',
    explanation: 'המילה OK מוזכרת תדיר במחקרי תקשורת כשורשית ונפוצה כמעט בכל שפה. לכן היא נתפסת כמוכרת יותר משמות מותגים גלובליים.'
  },
  {
    text: 'באיזו משימת מעבורת ב‑1985 נבדקה לראשונה פחית קולה בחלל?',
    options: ['STS‑51‑F', 'STS‑1', 'STS‑107'],
    correct: 0,
    image: '/images/can-classic.png',
    explanation: 'במשימה STS‑51‑F (Spacelab‑2) בוצעו ניסויים במכלי משקה מוגז בתנאי מיקרו‑כבידה. הניסוי בחן איך גזים ונוזלים מתנהגים בפחית בחלל.'
  }
] as const
