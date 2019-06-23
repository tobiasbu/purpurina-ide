
interface UserInfo {
    homeDir: string;
    userName: string;
}

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

interface IProjectInfo {
    projectPackage: IProjectPackage;
    error?: string;
    path: string;
    index: number;
}