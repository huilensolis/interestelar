import { ApiRouting } from '@/models/routes/api/api.model'
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
}
