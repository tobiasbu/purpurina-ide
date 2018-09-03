import VirtualNode from "./VirtualNode";

export default class VirtualComponent<A extends {}, C extends IComponent<A>> extends VirtualNode<A> implements IVirtualComponent<A, C> {
    
    ref?: C;
    readonly tag: C;

    constructor(component: C, attrs?: A, children?: Array<HyperNode>) {
        super(NodeType.Component, component, attrs, children);
    }

 

}