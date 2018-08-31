import { VirtualNodeType, IVirtualElement } from "./IVirtualNode";


export default class VirtualElement<Tag extends HTML.Tags> implements IVirtualElement {

    readonly tag: Tag;
    readonly attrs: HTML.AttributesTagMap[Tag];
    readonly children: ReadonlyArray<IVirtualElement>;
    readonly type: VirtualNodeType = 'element';

    constructor(tag: Tag, attrs?: HTML.AttributesTagMap[Tag], children?: ReadonlyArray<IVirtualElement>) {
        this.tag = tag;
        this.attrs = attrs;
        this.children = children;
    }


}