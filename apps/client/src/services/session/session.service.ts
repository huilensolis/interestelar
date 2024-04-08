import { ApiRouting } from '@/models/routes/api/api.model'
import { type User } from '@/types/user'
import axios from 'axios'

export class SessionService {
  static async signIn({
    email,
    password,
  }: {
    email: string
    password: string
  }): Promise<{ error: Error | null }> {
    const { status } = await axios.post(ApiRouting.auth.signIn, {
      email,
      password,
    })

    if (status === 201) return { error: null }
    else return { error: new Error('error signing in') }
  }

  static async signUp({
    email,
    username,
    password,
  }: {
    email: string
    username: string
    password: string
  }): Promise<{ error: Error | null }> {
    const { status } = await axios.post(ApiRouting.auth.signUp, {
      email,
      username,
      password,
    })

    if (status === 201) return { error: null }
    else return { error: new Error('error signing up') }
  }

  static async signOut(): Promise<void> {
    try {
      const { status } = await axios.post(ApiRouting.auth.signOut)

      if (status !== 201) throw new Error('error signing out')
    } catch (error) {
      console.log(error)
    }
  }

  static async getUser(): Promise<{ user: User | null }> {
    try {
      const { status, data } = await axios.get(ApiRouting.auth.getUser)

      if (status !== 200 || !data)
        throw new Error('error fetching current user')

      return { user: data }
    } catch (error) {
      return { user: null }
    }
  }

  static async validateSessionOnEdgeRuntime({
    cookie = undefined,
  }: {
    cookie?: string
  }): Promise<{ isSessionValid: boolean }> {
    try {
      const { status } = await fetch(ApiRouting.auth.checkSession, {
        headers: cookie ? { Cookie: cookie } : {},
      })

      if (status !== 200) throw new Error('error validating session')

      return { isSessionValid: true }
    } catch (error) {
      console.log(error)
      return { isSessionValid: false }
    }
  }

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
