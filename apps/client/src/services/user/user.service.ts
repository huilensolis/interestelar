import axios from 'axios'

import { ApiRouting } from '@/models/routes/api/api.model'
import { type User } from '@/types/user'

export class UserService {
  static async getUsersByUsernameIlike({
    username,
    cookie,
    limit = 4,
  }: {
    username: string
    cookie?: string
    limit?: number
  }): Promise<{ users: User[] }> {
    try {
      const { data, status } = await axios.get(
        ApiRouting.user.getManyByUsername(username),
        {
          headers: {
            ...(cookie && { Cookie: cookie }),
          },
          withCredentials: true,
        }
      )

      if (status !== 200) throw new Error('No users found')

      if (data.length > limit) {
        return { users: data.slice(0, limit) }
      }

      return { users: data }
    } catch (error) {
      return { users: [] }
    }
  }
}
