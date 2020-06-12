// eslint-disable-next-line
export type AnyCallback = (...args: any) => any;

export interface UserInfo {
  homeDir: string;
  userName: string;
}

/**
 * Purpurina package.
 */
export interface ProjectPackage {
  name: string;
  version?: string;
  thumbnail?: string;
  author?: string;
}

export interface CreateProject {
  projectName: string;
  location: string;
  author?: string;
}

/**
 * Purpurina project data.
 */
export interface ProjectInfo {
  projectPackage: ProjectPackage;
  error?: string;
  path: string;
  index: number;
}

/**
 * Interface used to communicate between main and renderer process.
 */
export interface Message {
  type: number;
  payload: {};
}
