import { NextRequest, NextResponse } from 'next/server'

function unauthorized() {
  return new Response('Auth required', { status: 401, headers: { 'WWW-Authenticate': 'Basic realm="Admin"' } })
}
export function middleware(req: NextRequest) {
  if (!req.nextUrl.pathname.startsWith('/admin')) return NextResponse.next()
  const auth = req.headers.get('authorization')
  if (!auth?.startsWith('Basic ')) return unauthorized()
  const [, b64] = auth.split(' ')
  const [user, pass] = Buffer.from(b64, 'base64').toString().split(':')
  if (user === process.env.ADMIN_USER && pass === process.env.ADMIN_PASS) return NextResponse.next()
  return unauthorized()
}
export const config = { matcher: ['/admin/:path*'] }
