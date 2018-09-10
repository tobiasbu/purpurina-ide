import * as DOOM from './../types';
import VirtualNode from "./VirtualNode";


export default class VirtualElement<Tag extends HTML.Tags> extends VirtualNode<HTML.Attributes.TagMap[Tag]> implements DOOM.IVirtualElement<Tag> {

    readonly tag: Tag;

    public get ref(): HTMLElement {
        return this._ref as HTMLElement;
    }

    constructor(tag: Tag, attrs?: HTML.Attributes.TagMap[Tag], children?: Array<DOOM.HyperNode>) {
        super(DOOM.Type.Element, tag, attrs, children);
        this.tag = tag;
    }

    toString(): string {

        let attrs: string = ' ';


        if (this.attrs) {
            for (const name in this.attrs) {
                const value = this.attrs[name];
                //if (typeof value === 'string')
                attrs = attrs.concat(name).concat('=').concat(value.toString());
                //attrs =attrs + name + '=' + value;
            }
        }

        /**faster */
        let tag = '<'.concat(this.tag).concat(attrs).concat('></').concat(this.tag).concat('>')
       //let tag = '<' + this.tag + attrs + '>' + '</ ' + this.tag + '>'


        return tag;

    }

}