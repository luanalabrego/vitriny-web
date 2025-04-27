// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  // rotas públicas (sem exigir autenticação)
  const publicPaths = [
    '/login',
    '/registro',
    '/api/auth/login',
    '/api/auth/logout',
    '/api/auth/me',
    '/api/testFirebase',    // libera seu endpoint de teste
  ]

  // deixa passar sem checar token
  if (
    publicPaths.some((p) => pathname.startsWith(p)) ||
    pathname.startsWith('/_next') ||
    pathname.startsWith('/favicon.ico')
  ) {
    return NextResponse.next()
  }

  // para todas as outras rotas, verifica cookie "token"
  const token = req.cookies.get('token')?.value
  if (!token) {
    // redireciona para /login
    return NextResponse.redirect(new URL('/login', req.url))
  }

  return NextResponse.next()
}

export const config = {
  // aplica para tudo, exceto assets do Next e sua rota pública
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}
