import * as ExplorerNodes from '@shared/types/projectExplorer';

export default class ProjectExplorer  {

  private children: ExplorerNodes.INode[];
  public readonly type: ExplorerNodes.NodeType = ExplorerNodes.NodeType.Root;
  public readonly projectPath: string;

  constructor(projectPath: string) {
    this.projectPath = projectPath;
  }

}
