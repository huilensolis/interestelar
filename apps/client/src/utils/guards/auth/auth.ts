import { ClientRouting } from '@/models/routes/client'
import { getCookie } from '@/utils/cookie/get-cookie'
import { redirect } from 'next/navigation'

export async function protectResourceFromAuthenticatedUsers() {
  try {
    const { cookie: reqCookie } = getCookie()

    if (reqCookie)
      throw new Error(
        'user is logged and this route is not avaialable to logged users'
      )
  } catch (error) {
    return redirect(ClientRouting.app().home())
  }
}
