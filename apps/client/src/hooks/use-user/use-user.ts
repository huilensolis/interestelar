import { UserService } from '@/services/user'

export function useUser() {
  async function checkUsernameAvailability(
    username: string
  ): Promise<{ error: string | null }> {
    const { error } = await UserService.checkUsernameAvailability(username)

    if (error) return { error }

    return { error: null }
  }

  async function checkGmailAvailability(
    gmail: string
  ): Promise<{ error: string | null }> {
    const { error } = await UserService.checkGmailAvailability(gmail)

    if (error) return { error }

    return { error: null }
  }

  return { checkUsernameAvailability, checkGmailAvailability }
}
