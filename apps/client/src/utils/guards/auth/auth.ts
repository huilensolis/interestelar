import { cookieName } from '@/models/cookie'
import { ClientRouting } from '@/models/routes/client'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export async function protectResourceFromAuthenticatedUsers() {
  const cookieStore = cookies()

  try {
    const reqCookie = cookieStore.get(cookieName)

    if (reqCookie)
      throw new Error(
        'user is logged and this route is not avaialable to logged users'
      )
  } catch (error) {
    return redirect(ClientRouting.app().home())
  }
}
