import { IVirtualNode, IVirtualElement, VirtualNode } from "../virtual-dom/IVirtualNode";
import VirtualElement from "../virtual-dom/VirtualElement";
import Component from "../reactive/Component";

export namespace h {
    export type Child = (string | IVirtualNode | null) | Array<string | IVirtualNode | null>;
}

// function isHtmlTag(tagName: string | HTML.Tags): tagName is HTML.Tags {
//     return (tagName in Tags);
// }

function scan(children: IVirtualNode[], values: h.Child[]) {
    for (let child of values) {
        // if (typeof child === 'string') {
        //   array.push(new VirtualText(child));
        // } else if (child instanceof VirtualText) {
        //   array.push(child);
        // } else 
        if (child instanceof VirtualElement) {
            children.push(child);
        }
    }
}


export function h(tag: Component): VirtualNode;
export function h<Tag extends HTML.Tags>(tag: Tag, ...children: h.Child[]): VirtualElement<Tag>;
export function h<Tag extends HTML.Tags>(tag: Tag, attrs: HTML.AttributesTagMap[Tag], ...children: h.Child[]): VirtualElement<Tag>;
export function h<Tag extends HTML.Tags>(tag: Tag): VirtualElement<Tag> {

  
    
    let attrs: HTML.AttributesTagMap[Tag];
    let children: IVirtualNode[] = [];

    const len = arguments.length;

    for (let i = 1; i < len; i++) {
        const arg = arguments[i];

        // if (typeof arg === 'string') {
        //     children.push(new VirtualText(arg));
        // } else if (arg instanceof VirtualText) {
        //     children.push(arg);
        if (arg instanceof VirtualElement) {
            children.push(arg);
        } else if (arg instanceof Array) {
            scan(children, arg);
        } else if (i === 1 && arg && typeof arg === 'object') {
            attrs = arg;
        }
    }

    if (!attrs) {
        attrs = {};
    }



    return new VirtualElement(tag as Tag, attrs, children as IVirtualElement[]);
}


// export function s(element: HTMLElement): IStaticNode {

// }