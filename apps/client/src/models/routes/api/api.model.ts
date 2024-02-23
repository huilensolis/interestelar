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
}
