import { cookieName } from '@/models/cookie'
import { cookies } from 'next/headers'

export function getCookie(): { cookie: string | null } {
  const cookieStore = cookies()

  const cookie = cookieStore.get(cookieName)

  if (!cookie) return { cookie: null }

  return { cookie: `${cookie.name}=${cookie.value}` }
}
