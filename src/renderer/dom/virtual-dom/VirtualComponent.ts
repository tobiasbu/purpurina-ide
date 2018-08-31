
export default class VirtualComponent<A extends {}, C extends IComponent<A>> implements IVirtualComponent<A, C> {
    
    private _component: C;
    readonly children: HyperChildren;
    readonly type = NodeType.Component;
    readonly attrs: A;

    get component(): C {
        return this._component;
    }

    constructor(component: C, attrs?: A, children?: HyperChildren) {
        this.attrs = attrs;
        this.children = children;
        this._component = component;
    }

}