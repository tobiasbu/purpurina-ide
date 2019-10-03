

  interface UserInfo {
    homeDir: string;
    userName: string;
  }

  /**
   * Purpurina package.
   */
  interface IProjectPackage {
    name: string;
    version?: string;
    thumbnail?: string;
    author?: string;
  }

  interface ICreateProject {
    projectName: string;
    location: string;
    author?: string;
  }

  /**
   * Purpurina project data.
   */
  interface IProjectInfo {
    projectPackage: IProjectPackage;
    error?: string;
    path: string;
    index: number;
  }

  /**
   * Interface used to communicate between main and renderer process.
   */
  interface IMessage {
    type: number;
    payload: {};
  }

