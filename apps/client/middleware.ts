import type { NextRequest } from 'next/server'

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  // check the cookies token
  // if it is valid, we continue, if not, we redirect to login
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: '/app/:path*',
}
