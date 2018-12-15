import * as DOOM from './../types';
import VirtualNode from "./VirtualNode";


export default class VirtualComponent<A extends {}, C extends DOOM.IComponent<A>> extends VirtualNode<A> implements DOOM.IVirtualComponent<A, C> {
    
    readonly tag: C;

    public get ref(): C {
        return this._ref as C;
    }

    constructor(component: C, attrs?: A, children?: Array<DOOM.HyperNode>) {
        super(DOOM.Type.Component, component, attrs, children);
    }

 

}