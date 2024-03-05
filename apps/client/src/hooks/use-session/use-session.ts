import { SessionService } from '@/services/session/session.service'

export function useSession() {
  async function signUp({
    email,
    password,
    username,
  }: {
    email: string
    password: string
    username: string
  }): Promise<{ error: Error | null }> {
    const { error } = await SessionService.signUp({ email, password, username })
    if (error) return { error }
    else return { error: null }
  }

  async function signIn({
    email,
    password,
  }: {
    email: string
    password: string
  }): Promise<{ error: Error | null }> {
    const { error } = await SessionService.signIn({ email, password })
    if (error) return { error }
    else return { error: null }
  }

  async function signOut() {
    await SessionService.signOut()
  }

  function validateSession() {}

  return { signUp, signIn, signOut, validateSession }
}
