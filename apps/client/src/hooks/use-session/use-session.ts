import { SessionService } from '@/services/session/session.service'
import { type User } from '@/types/user'

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

  async function getUser(): Promise<{ user: User | null }> {
    const { user } = await SessionService.getUser()

    return { user }
  }

  async function checkUsernameAvailability(
    username: string
  ): Promise<{ error: string | null }> {
    const { error } = await SessionService.checkUsernameAvailability(username)

    if (error) return { error }

    return { error: null }
  }

  async function checkGmailAvailability(
    gmail: string
  ): Promise<{ error: string | null }> {
    const { error } = await SessionService.checkGmailAvailability(gmail)

    if (error) return { error }

    return { error: null }
  }

  return {
    signUp,
    signIn,
    signOut,
    validateSession,
    getUser,
    checkUsernameAvailability,
    checkGmailAvailability,
  }
}
