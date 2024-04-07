export class ApiRouting {
  private static readonly apiUrl =
    process.env.DEPLOY_URL ?? 'https://localhost:3000/api'

  private static getFullPath(path: string) {
    return `${this.apiUrl}/${path}`
  }

  public static get auth() {
    const path = 'auth'
    return {
      signUp: this.getFullPath(`${path}/sign-up`),
      signIn: this.getFullPath(`${path}/sign-in`),
      signOut: this.getFullPath(`${path}/sign-out`),
      getUser: this.getFullPath(`${path}/user`),
      checkSession: this.getFullPath(`${path}/check-session`),
    }
  }

  public static get user() {
    const path = 'users'

    return {
      checkUsernameAvailability: (username: string) =>
        this.getFullPath(`${path}/check/username/${username}`),
      checkEmailAvailability: (email: string) =>
        this.getFullPath(`${path}/check/email/${email}`),
      getManyByUsername: (username: string) =>
        this.getFullPath(`${path}/${username}`),
      getSingleById: (username: string) =>
        this.getFullPath(`${path}/${username}`),
    }
  }

  public static get project() {
    const path = 'projects'

    return {
      create: this.getFullPath(`${path}`),
      delete: (projectId: string) => this.getFullPath(`${path}/${projectId}`),
      getAll: this.getFullPath(`${path}/user`),
      getById: (projectId: string) =>
        this.getFullPath(`${path}/user/${projectId}`),
      editDetailsById: (projectId: string) =>
        this.getFullPath(`${path}/${projectId}`),
    }
  }

  public static get projectMembers() {
    const path = 'projects/collaborations/invitations'

    return {
      invite: () => this.getFullPath(`${path}/send`),
      joinProjectByInvitation: (projectId: string) =>
        this.getFullPath(`${path}/join/${projectId}`),
      getUserInvitationList: () => this.getFullPath(`${path}`),
    }
  }
}
