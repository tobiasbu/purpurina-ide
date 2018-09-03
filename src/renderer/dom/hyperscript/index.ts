import VirtualElement from "../virtual-dom/VirtualElement";
import { Tags } from "./htmlTags";
import VirtualComponent from "../virtual-dom/VirtualComponent";

function isHtmlTag(tagName: string | HTML.Tags): tagName is HTML.Tags {
    return (tagName in Tags);
}

function scan(children: IVirtualNode<any>[], values: HyperChild[]) {
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


export function h(tag: IComponent): HyperNode;
export function h<Tag extends HTML.Tags>(tag: Tag, ...children: HyperChild[]): HyperNode
export function h<Tag extends HTML.Tags>(tag: Tag, attrs: HTML.AttributesTagMap[Tag], ...children: HyperChild[]): HyperNode;
export function h<Tag extends HTML.Tags>(tag: Tag): HyperNode {



    let attrs: HTML.AttributesTagMap[Tag];
    let children: HyperNode[] = [];

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

    if (typeof tag === 'object') {
        return new VirtualComponent(tag as IComponent<any>, attrs, children);
    } else {
        return new VirtualElement(tag as Tag, attrs, children);
    }
}

export namespace h {
    export function b() {

    }
}

export function s(element: HTMLElement | HyperNode | IComponent) {
    
    // if (element instanceof HTMLElement) {
    //     return new StaticNode(element);
    // }

    throw new Error();

}