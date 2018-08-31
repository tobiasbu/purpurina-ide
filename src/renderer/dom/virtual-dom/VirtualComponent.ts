import { IVirtualNode, VirtualNodeType } from "./IVirtualNode";
import Component from "../reactive/Component";

export default class VirtualComponent implements IVirtualNode {

    private _component: Component;

    readonly tag: string;
    readonly children: ReadonlyArray<IVirtualNode>;
    readonly type: VirtualNodeType = 'component';
    readonly attrs: HTML.Attributes;

    constructor(component: Component, tag: string, attrs?: any, children?: ReadonlyArray<IVirtualNode>) {
        this.tag = tag;
        this.attrs = attrs;
        this.children = children;
        this._component = component;
    }

}