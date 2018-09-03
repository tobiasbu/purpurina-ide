
export default class VirtualNode<A> implements IVirtualNode<A> {

    private _children: Array<HyperNode>;
    
    readonly type: NodeType;
    readonly attrs: A;
    readonly tag: HTML.Tags | IComponent<A>;

    public get children(): ReadonlyArray<HyperNode> {
        return this._children;
    }

    constructor(type: NodeType, tag: HTML.Tags | IComponent<A>, attrs: A, children: Array<HyperNode>) {
        this.tag = tag;
        this.type = type;
        this.attrs = attrs;
        this._children = children;
    }

 


}