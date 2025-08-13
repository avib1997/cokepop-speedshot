// src/app/admin/page.tsx
import { prisma } from '@/lib/prisma'
import styles from './admin.module.scss'

export const dynamic = 'force-dynamic'

// טיפוס שורה בלי Play/any
type Row = Awaited<ReturnType<typeof prisma.play.findMany>>[number]

export default async function AdminPage() {
  const agg = await prisma.play.aggregate({
    _count: true,
    _sum: { correctAnswers: true, score: true }
  })

  const rows: Row[] = await prisma.play.findMany({
    orderBy: { id: 'desc' },
    take: 100
  })

  const totalPlays = agg._count
  const totalCorrect = agg._sum.correctAnswers ?? 0
  const totalScore = agg._sum.score ?? 0

  return (
    <main className={styles.admin}>
      <header className={styles.header}>
        <h1>דשבורד</h1>
      </header>

      <section className={styles.kpis}>
        <Card title="מס' משחקים">{totalPlays}</Card>
        <Card title="סה״כ תשובות נכונות">{totalCorrect}</Card>
        <Card title="סה״כ ניקוד">{totalScore}</Card>
      </section>

      <h2 className={styles.sectionTitle}>100 המשחקים האחרונים</h2>
      <div className={styles.cards}>
        {rows.length === 0 ? (
          <div className={styles.empty}>אין נתונים עדיין</div>
        ) : (
          rows.map((r) => (
            <article key={r.id} className={styles.rowCard}>
              <header className={styles.rowHead}>
                <span className={styles.rowId}>{r.id}</span>
                <time className={styles.rowDate} dateTime={new Date(r.createdAt).toISOString()} dir="ltr">
                  {new Date(r.createdAt).toLocaleDateString('he-IL')}
                  <br />
                  {new Date(r.createdAt).toLocaleTimeString('he-IL')}
                </time>
              </header>

              <div className={styles.rowStats}>
                <div className={styles.statPill}>
                  <span className={styles.statLabel}>נכונות</span>
                  <span className={styles.statValue}>{r.correctAnswers}</span>
                </div>
                <div className={styles.statPill}>
                  <span className={styles.statLabel}>ניקוד</span>
                  <span className={styles.statValue}>{r.score}</span>
                </div>
              </div>
            </article>
          ))
        )}
      </div>
    </main>
  )
}

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className={styles.card}>
      <div className={styles.cardLabel}>{title}</div>
      <div className={styles.cardValue}>{children}</div>
    </div>
  )
}
