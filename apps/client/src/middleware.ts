import { NextResponse, type NextRequest } from 'next/server'
import { ClientRouting } from './models/routes/client'
import { SessionService } from './services/session/session.service'
import { getCookie } from './utils/cookie/get-cookie'

export async function middleware(request: NextRequest) {
  const requestUrl = new URL(request.url)
  try {
    const { cookie } = getCookie()

    if (!cookie) throw new Error('No cookie found')

    const { isSessionValid } =
      await SessionService.validateSessionOnEdgeRuntime({
        cookie,
      })

    if (!isSessionValid) throw new Error('Invalid session')
  } catch (error) {
    console.log('no cookies found in request, redirecting to sign in')
    return NextResponse.redirect(
      `${requestUrl.origin}${ClientRouting.auth().signIn()}`
    )
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: '/app/:path*',
}
