export class ClientRouting {
  constructor() {}

  public static auth() {
    const authPath = '/auth'

    return {
      signUp: () => `${authPath}/sign-up`,
      signIn: () => `${authPath}/sign-in`,
    }
  }

  public static app() {
    const appPath = '/app'

    return {
      home: () => `${appPath}/`,
    }
  }

  public static projects() {
    const projectsPath = '/app/projects'
    return {
      home: () => `${projectsPath}`,
      project: (projectId: string) => `${projectsPath}/${projectId}`,
      create: () => `${projectsPath}/create`,
      members: () => `${projectsPath}/members`,
      settings: () => `${projectsPath}/settings`,
    }
  }
}
