import {  IBuilder } from "../types";

interface BuilderChildPayload {
    readonly index: number;
    readonly events: HTML.EventAttrs
}

export default class Builder implements IBuilder {
    private _children: string[];
   

    private _childrenAttrs: BuilderChildPayload[];
    


    tag: string;
    parent: any;


    public get childrenAttrs(): ReadonlyArray<BuilderChildPayload> {
        return this._childrenAttrs;
    }

    public get children(): ReadonlyArray<string> {
        return this._children;
    }


    constructor(tag: string) {
        this.tag = tag;
        this._children = [];
        this._childrenAttrs = [];
    }

    addPure(html: string, events?: HTML.EventAttrs): this {

        if (html) {
            const index = this._children.push(html) - 1;
            if (events) {
                this._childrenAttrs.push({ index, events });
            }
        }

        return this;
    }

    clear(): this {
        this._children = [];
        this._childrenAttrs = [];
        return this;
    }

    clone() {
        const b = new Builder('a');
        b._children = this._children.slice(0);
        b._childrenAttrs = this._childrenAttrs.slice(0);
        return b;
    }

    static build(builder: Builder): HTMLElement {

        const element = document.createElement(builder.tag);
        element.innerHTML = builder._children.join('');

        for (let i = 0; i < builder._childrenAttrs.length; i++) {
            const attrs = builder._childrenAttrs[i];
            const child = element.children[attrs.index];
            for (const e in attrs.events) {
                child[e] = attrs.events[e];
            }
        }

        return element;
    }



    static compare(a: Builder, b: Builder): boolean {

        if (a === undefined) {
            return false;
        }

        if (a._children === b._children) {
            return true;
        }

        return false;

    }

}