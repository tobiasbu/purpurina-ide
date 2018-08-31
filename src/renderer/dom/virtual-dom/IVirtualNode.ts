
export type VirtualNodeType = 'element' | 'text' | 'component';

export interface IVirtualNode {

    readonly tag: HTML.Tags | string;
    readonly children: ReadonlyArray<IVirtualNode>;
    readonly type: VirtualNodeType;
    //readonly parent;
}

export interface IVirtualElement extends IVirtualNode {
    readonly attrs: HTML.Attributes;
}

export interface IVirtualComponent extends IVirtualNode {
    readonly component;
}

export type VirtualNode = IVirtualComponent | IVirtualElement;
