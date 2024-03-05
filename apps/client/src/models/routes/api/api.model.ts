export class ApiRouting {
  private static readonly apiUrl =
    process.env.DEPLOY_URL ?? 'https://localhost:3000/api'

  private static getFullPath(path: string) {
    return `${this.apiUrl}/${path}`
  }

  public static get auth() {
    const authPath = 'auth'
    return {
      signUp: this.getFullPath(`${authPath}/sign-up`),
      signIn: this.getFullPath(`${authPath}/sign-in`),
      signOut: this.getFullPath(`${authPath}/sign-out`),
      getUser: this.getFullPath(`${authPath}/user`),
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

  public static get project() {
    const projectPath = 'projects'

    return {
      create: this.getFullPath(`${projectPath}`),
      delete: (projectId: string) =>
        this.getFullPath(`${projectPath}/${projectId}`),
      getUserProjectList: this.getFullPath(`${projectPath}/user`),
      getById: (projectId: string) =>
        this.getFullPath(`${projectPath}/${projectId}`),
    }
  }
}
