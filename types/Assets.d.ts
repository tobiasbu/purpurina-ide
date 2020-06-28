declare namespace ImportData {
  export interface FileDescriptor {
    path: string;
    type?: string | undefined;
    lastModified: number;
    size: number;
  }
  /**
   * Import files can be a `FileDescriptor` or path to file.
   */
  export type File = FileDescriptor | string;
}
