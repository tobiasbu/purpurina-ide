import { IComponent, HyperNode } from "../types";

abstract class Component<A = {}> implements IComponent<A> {
    readonly attrs: A;
    constructor(attrs?: A) {
        this.attrs = attrs;
    }
    abstract render(): HyperNode;
    postRender?(): void;
    preRender?(): void;
}


export default Component;
