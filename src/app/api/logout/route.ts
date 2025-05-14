import { NextResponse } from 'next/server'

export async function POST() {
  const response = NextResponse.json({ message: 'Logged out' })

  response.headers.set(
    'Set-Cookie',
    'user=; Path=/; Max-Age=0; HttpOnly; SameSite=Lax'
  )

  return response
}
