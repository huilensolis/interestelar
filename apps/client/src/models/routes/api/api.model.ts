export class ApiRouting {
  private static readonly apiUrl = 'http://localhost:3001/api'

  private static getFullPath(path: string) {
    return `${this.apiUrl}/${path}`
  }

  public static get auth() {
    const authPath = 'auth'
    return {
      signUp: this.getFullPath(`${authPath}/sign-up`),
      signIn: this.getFullPath(`${authPath}/sign-in`),
    }
  }

  public static get user() {
    const userPath = 'users'

    return {
      checkUsernameAvailability: (username: string) =>
        this.getFullPath(`${userPath}/check/username/${username}`),
      checkEmailAvailability: (email: string) =>
        this.getFullPath(`${userPath}/check/email/${email}`),
    }
  }
}
