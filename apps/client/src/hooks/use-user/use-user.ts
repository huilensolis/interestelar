import { SessionService } from '@/services/session/session.service'
import { type User } from '@/types/user'
import { useEffect, useState } from 'react'

export function useUser() {
  const [user, setUser] = useState<User | null>(null)

  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    async function getUser() {
      try {
        setLoading(true)
        const { user } = await SessionService.getUser()

        if (!user) return

        setUser(user)
      } catch (error) {
        //
      } finally {
        setLoading(false)
      }
    }

    if (!loading) {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      getUser()
    }
  }, [])

  return { user, loading }
}
