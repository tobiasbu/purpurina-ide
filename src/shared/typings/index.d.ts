
export interface UserInfo {
    homeDir: string;
    userName: string;
}

export interface ICreateProject {
    projectName: string;
    location: string;
    author?: string;
}

export interface IProjectPackage {
    name: string;
    version?: string;
    thumbnail?: string;
    author?: string;
}

export interface IProjectInfo {
    projectPackage: IProjectPackage;
    error?: string;
    path: string;
}