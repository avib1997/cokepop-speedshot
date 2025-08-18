export type Question = {
  text: string
  options: [string, string, string]
  correct: 0 | 1 | 2
  image: string
  explanation: string
  optionImgs?: string[]
}

export const questions: readonly Question[] = [
  {
    text: 'באיזו שנה נרשם פטנט לבקבוק הקונטור האיקוני של קוקה-קולה?',
    options: ['1915', '1935', '1955'],
    correct: 0,
    image: '/images/bottle-classic.png',
    explanation: 'פטנט הקונטור של הבקבוק נרשם בשנת 1915 על-ידי חברת רוּט גלאס. העיצוב הייחודי נבחר כדי לזהות את המותג גם בחשיכה או כשהבקבוק נשבר.',
    optionImgs: ['/imgQ&A/q1.jpg']
  },
  {
    text: 'איזה משקה קולה משולב קפה הושק ב-2006 והופסק ב-2008?',
    options: ['קוקה-קולה בלאק', 'קוקה-קולה אנרג׳י', 'קוקה-קולה סיטרה'],
    correct: 0,
    image: '/images/can-classic.png',
    explanation: 'קוקה-קולה בלאק היה קולה בתוספת תמצית קפה שנמכר בשווקים נבחרים והוסר מהמדפים ב-2008.',
    optionImgs: ['/imgQ&A/q2.jpg']
  },
  {
    text: 'היכן פותח ספרייט לראשונה בשנת 1959?',
    options: ['מערב גרמניה', 'ארצות הברית', 'יפן'],
    correct: 0,
    image: '/images/can-sprite.png',
    explanation: 'ספרייט פותח במערב גרמניה ב-1959 כמשקה לימון-ליים, והושק רשמית בארה״ב ב-1961.',
    optionImgs: ['/imgQ&A/q3.jpg']
  },
  {
    text: 'מהו המשקה האלכוהולי הראשון של קוקה-קולה שהושק ביפן ב-2018?',
    options: ['למון-דו', 'פרסקה מיקס', 'ג׳ק וקולה – מוכן לשתייה'],
    correct: 0,
    image: '/images/can-zero.png',
    explanation: 'למון-דו הוא משקה לימוני בסגנון צ׳והאי עם אחוז אלכוהול נמוך, שהושק ביפן במגוון טעמים.',
    optionImgs: ['/imgQ&A/q4.jpg']
  },
  {
    text: 'איזו טקטיקת קידום חלוצית השיקה קוקה-קולה כבר ב-1887?',
    options: ['קופון לכוס קולה חינם', 'מבצע 1+1 על בקבוק', 'נקודות למתנות'],
    correct: 0,
    image: '/images/can-classic.png',
    explanation: 'כבר ב-1887 חולקו שוברים לכוס קוקה-קולה בחינם כדי להכיר את הטעם לציבור.',
    optionImgs: ['/imgQ&A/q5.jpg']
  },
  {
    text: 'איזו חדשנות אריזה הוצגה בשנת 1923?',
    options: ['שישיית בקבוקים (סיקס-פאק)', 'פחית אלומיניום', 'בקבוק פלסטיק'],
    correct: 0,
    image: '/images/bottle-classic.png',
    explanation: 'ב-1923 הושקה שישיית הבקבוקים שהקלה לקחת משקאות לבית והגדילה את הקניות.',
    optionImgs: ['/imgQ&A/q6.jpg']
  },
  {
    text: 'היכן נשמרת כיום הנוסחה הסודית של קוקה-קולה?',
    options: ['בכספת מוזיאון העולם של קוקה-קולה באטלנטה', 'בכספת בניו-יורק', 'בבנק שווייצרי'],
    correct: 0,
    image: '/images/can-classic.png',
    explanation: 'הנוסחה מוצגת בכספת מיוחדת במוזיאון העולם של קוקה-קולה באטלנטה מאז 2011.',
    optionImgs: ['/imgQ&A/q7.jpg']
  },
  {
    text: 'כמה ימים החזיק ״ניו קוקה״ לפני חזרת הקלאסיק ב-1985?',
    options: ['79 ימים', '179 ימים', '379 ימים'],
    correct: 0,
    image: '/images/can-sprite.png',
    explanation: '״ניו קוקה״ הושקה ב-23 באפריל 1985 ו״קוקה-קולה קלאסיק״ חזרה ב-11 ביולי – 79 ימים לאחר מכן.',
    optionImgs: ['/imgQ&A/q8.jpg']
  },
  {
    text: 'איזו מילה נחשבת לעיתים למוכרת בעולם אף יותר מקוקה-קולה?',
    options: ['אוקיי', 'אהבה', 'שלום'],
    correct: 0,
    image: '/images/can-zero.png',
    explanation: 'המילה ״אוקיי״ נחשבת לנפוצה מאוד ברחבי העולם ולעיתים מזוהה יותר משמות מותגים גלובליים.',
    optionImgs: ['/imgQ&A/q9.jpg']
  },
  {
    text: 'באיזו משימת מעבורת ב-1985 נבדקה לראשונה פחית קולה בחלל?',
    options: ['אס-טי-אס-51-F', 'אס-טי-אס-1', 'אס-טי-אס-107'],
    correct: 0,
    image: '/images/can-classic.png',
    explanation: 'במשימה אס-טי-אס-51-F בוצעו ניסויים במכלי משקה מוגז בתנאי מיקרו-כבידה.',
    optionImgs: ['/imgQ&A/q10.jpg']
  }
] as const
