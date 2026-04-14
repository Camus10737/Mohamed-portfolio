import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { createSession, COOKIE_NAME, SESSION_DURATION } from '@/lib/auth'

export async function POST(request: NextRequest) {
  const { password } = await request.json() as { password: string }

  if (!password) {
    return NextResponse.json({ error: 'Mot de passe requis' }, { status: 400 })
  }

  const hash = process.env.ADMIN_PASSWORD_HASH
  if (!hash) {
    return NextResponse.json({ error: 'Configuration manquante' }, { status: 500 })
  }

  const valid = await bcrypt.compare(password, hash)
  if (!valid) {
    return NextResponse.json({ error: 'Mot de passe incorrect' }, { status: 401 })
  }

  const token = await createSession()

  const response = NextResponse.json({ success: true })
  response.cookies.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: SESSION_DURATION,
    path: '/',
  })

  return response
}
