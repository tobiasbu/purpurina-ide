import * as DOOM from './../types';
import VirtualElement from "../nodes/VirtualElement";
import VirtualComponent from "../nodes/VirtualComponent";
import { Tags } from "./htmlTags";
import StaticElement from "../nodes/StaticElement";
import Builder from '../lib/Builder';


function isHtmlTag(tagName: string | HTML.Tags): tagName is HTML.Tags {
    return (tagName in Tags);
}

function scan(children: DOOM.HyperNode[], values: DOOM.HyperChild[]) {
    for (let child of values) {
        // if (typeof child === 'string') {
        //   array.push(new VirtualText(child));
        // } else if (child instanceof VirtualText) {
        //   array.push(child);
        // } else 
        if (child instanceof VirtualElement) {
            children.push(child);
        }
        // } else if (child instanceof StaticElement) {
        //     children.push(child);
        // }
    }
}


export function h(tag: DOOM.IComponent): DOOM.IVirtualComponent<any, any>;
export function h<Tag extends HTML.Tags>(tag: Tag, ...children: DOOM.HyperChild[]): DOOM.IVirtualElement<Tag>
export function h<Tag extends HTML.Tags>(tag: Tag, attrs: HTML.Attributes.TagMap[Tag], ...children: DOOM.HyperChild[]): DOOM.IVirtualElement<Tag>;
export function h<Tag extends HTML.Tags>(tag: Tag): DOOM.HyperVirtualNode {



    let attrs: HTML.Attributes.TagMap[Tag];
    let children: DOOM.HyperNode[] = [];

    const len = arguments.length;

    for (let i = 1; i < len; i++) {
        const arg = arguments[i];

        // if (typeof arg === 'string') {
        //     children.push(new VirtualText(arg));
        // } else if (arg instanceof VirtualText) {
        //     children.push(arg);


        if (arg instanceof VirtualElement) {
            children.push(arg);
        } else if (arg instanceof StaticElement) {
            //children.push(arg as DOOM.IStaticElement);
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
        return new VirtualComponent(tag as DOOM.IComponent<any>, attrs, children);
    } else {
        return new VirtualElement(tag as Tag, attrs, children);
    }
}

export function b<Tag extends HTML.Tags>(tag:Tag, attrs?: HTML.Attributes.TagMap[Tag]): DOOM.IBuilder {
    return new Builder(tag);
}

export function s(element: HTMLElement): DOOM.HyperStaticNode {

    let children: DOOM.HyperNode[] = [];

    if (element instanceof HTMLElement) {
        return new StaticElement(element, children);
    }

    throw new Error();

}