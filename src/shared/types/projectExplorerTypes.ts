
namespace ProjectExplorer {

  export enum NodeType {
    Root,
    Directory,
    File,
  }

  export interface INode {
    path: string;
    children: INode[];
    type: NodeType;
  }

  export interface RootNode extends INode {
    type: NodeType.Root;
  }

  export interface FileNode {
    type: NodeType.File;
    extension: string;
    name: string;
  }

}

export default ProjectExplorer;
