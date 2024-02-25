import { ApiRouting } from '@/models/routes/api/api.model'
import axios from 'axios'

export class UserService {
  static async checkUsernameAvailability(
    username: string
  ): Promise<{ error: string | null }> {
    try {
      const { status } = await axios.get(
        ApiRouting.user.checkUsernameAvailability(username)
      )

      if (status !== 200) return { error: 'username not available' }

      return { error: null }
    } catch (error) {
      return { error: 'username not available' }
    }
  }

  static async checkGmailAvailability(
    gmail: string
  ): Promise<{ error: string | null }> {
    try {
      const { status } = await axios.get(
        ApiRouting.user.checkEmailAvailability(gmail)
      )

      if (status !== 200) return { error: 'gmail not available' }

      return { error: null }
    } catch {
      return { error: 'gmail not available' }
    }
  }
}
