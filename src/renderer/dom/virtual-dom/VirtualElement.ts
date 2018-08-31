

export default class VirtualElement<Tag extends HTML.Tags> implements IVirtualElement<Tag> {

    readonly tag: Tag;
    readonly attrs: HTML.AttributesTagMap[Tag];
    readonly children: HyperChildren;
    readonly type = NodeType.Element;

    constructor(tag: Tag, attrs?: HTML.AttributesTagMap[Tag], children?: HyperChildren) {
        this.tag = tag;
        this.attrs = attrs;
        this.children = children;
    }


}