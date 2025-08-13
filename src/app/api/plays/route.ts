import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

type PlayPayload = { correctAnswers: number; score: number }

function isPlayPayload(x: unknown): x is PlayPayload {
  if (typeof x !== 'object' || x === null) return false
  const obj = x as Record<string, unknown>
  const correct = obj['correctAnswers']
  const score = obj['score']
  const isNum = (v: unknown): v is number => typeof v === 'number' && Number.isFinite(v)
  return isNum(correct) && isNum(score)
}

export async function POST(req: Request) {
  const body = (await req.json().catch(() => null)) as unknown
  if (!isPlayPayload(body)) {
    return NextResponse.json({ ok: false, error: 'Bad payload' }, { status: 400 })
  }

  const row = await prisma.play.create({
    data: { correctAnswers: body.correctAnswers, score: body.score }
  })
  return NextResponse.json({ ok: true, id: row.id })
}

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'
