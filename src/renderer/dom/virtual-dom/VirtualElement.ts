import VirtualNode from "./VirtualNode";

export default class VirtualElement<Tag extends HTML.Tags> extends VirtualNode<HTML.AttributesTagMap[Tag]> implements IVirtualElement<Tag> {

    readonly tag: Tag;

    constructor(tag: Tag, attrs?: HTML.AttributesTagMap[Tag], children?: Array<IVirtualNode<any>>) {
        super(NodeType.Element, tag, attrs, children);
        this.tag = tag;
    }

  

}