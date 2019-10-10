
export interface UserInfo {
  homeDir: string;
  userName: string;
}

/**
 * Purpurina package.
 */
export interface IProjectPackage {
  name: string;
  version?: string;
  thumbnail?: string;
  author?: string;
}

export interface ICreateProject {
  projectName: string;
  location: string;
  author?: string;
}

/**
 * Purpurina project data.
 */
export interface IProjectInfo {
  projectPackage: IProjectPackage;
  error?: string;
  path: string;
  index: number;
}

/**
 * Interface used to communicate between main and renderer process.
 */
export interface IMessage {
  type: number;
  payload: {};
}
