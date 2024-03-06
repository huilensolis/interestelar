import { cookies } from 'next/headers'
import { NextResponse, type NextRequest } from 'next/server'
import { cookieName } from './models/cookie'
import { ClientRouting } from './models/routes/client'
import { SessionService } from './services/session/session.service'

export async function middleware(request: NextRequest) {
  const requestUrl = new URL(request.url)
  try {
    const cookieStore = cookies()

    const cookie = cookieStore.get(cookieName)

    if (!cookie) throw new Error('No cookie received')

    const { isSessionValid } =
      await SessionService.validateSessionOnEdgeRuntime({
        cookie: `${cookie.name}=${cookie.value}`,
      })

    if (!isSessionValid) throw new Error('Invalid session')
  } catch (error) {
    console.log('no cookies found in request, redirecting to sign in')
    console.log(error)
    return NextResponse.redirect(
      `${requestUrl.origin}${ClientRouting.auth().signIn()}`
    )
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: '/app/:path*',
}
