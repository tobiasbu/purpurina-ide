
export enum NodeType {
  Root,
  Directory,
  File,
}

export interface INode {
  readonly path: string;
  readonly type: NodeType;
  children: ReadonlyArray<INode>;
}

export interface RootNode extends INode {

}

export interface DirectoryNode extends INode {
  type: NodeType.Directory;
}

export interface FileNode {
  type: NodeType.File;
  extension: string;
  name: string;
}
