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
      projects: () => {
        const projectsPath = '/projects'

        return {
          home: () => `${appPath}/${projectsPath}`,
          project: (projectId: string) =>
            `${appPath}/${projectsPath}/${projectId}`,
          create: () => `${appPath}/${projectsPath}/create`,
        }
      },
    }
  }
}
