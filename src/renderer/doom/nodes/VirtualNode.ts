import * as DOOM from './../types';



export default class VirtualNode<A> implements DOOM.IVirtualNode<A> {
  

    protected _ref: HTMLElement | DOOM.IComponent<A>;
    private _children: Array<DOOM.HyperNode>;

    readonly isStatic: boolean;
    readonly type: DOOM.Type;
    readonly attrs: A;
    readonly tag: HTML.Tags | DOOM.IComponent<A>;

    public get children(): ReadonlyArray<DOOM.HyperNode> {
        return this._children;
    }

    public get ref(): HTMLElement | DOOM.IComponent<A> {
        return this._ref;
    }
    
    public setRef(value: HTMLElement | DOOM.IComponent<A>) {
        this._ref = value;
    }


    constructor(type: DOOM.Type, tag: HTML.Tags | DOOM.IComponent<A>, attrs: A, children: Array<DOOM.HyperNode>) {
        this.tag = tag;
        this.type = type;
        this.attrs = attrs;
        this._children = children;
        this.isStatic = false;
    }

}





