// import * as ExplorerNodes from '@shared/types/projectExplorer';

// export default class ExplorerNode implements ExplorerNodes.INode {

//   private nodes: ExplorerNodes.INode[];
//   public readonly type: ExplorerNodes.NodeType;
//   public readonly path: string;

//   /**
//    * Get node children.
//    */
//   public get children(): ReadonlyArray<ExplorerNodes.INode> {
//     return this.children;
//   }

//   /**
//    * Constructor
//    * @param type Explorer node type
//    * @param path Path
//    */
//   constructor(type: ExplorerNodes.NodeType, path: string) {
//     this.type = type;
//     this.path = path;
//     this.nodes = [];
//   }

//   public add(node: ExplorerNodes.INode) {
//     // If the node don't have path
//     if (typeof(node.path) !== 'string') {
//       return;
//     }
//   }

//   public searchByPath(path: string) {

//   }

// }
