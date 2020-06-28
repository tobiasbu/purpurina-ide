declare namespace Project {
  /**
   * Purpurina project creation metadata.
   */
  export interface Create {
    projectName: string;
    location: string;
    author?: string;
  }
  /**
   * Purpurina project package.
   */
  export interface Package {
    name: string;
    version?: string;
    thumbnail?: string;
    author?: string;
  }

  /**
   * Purpurina project metadata.
   */
  export interface Metadata {
    projectPackage: Package;
    path: string;
    error?: string;
    index?: number;
  }
}
