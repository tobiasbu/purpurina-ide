


export const enum Type {
    Element,
    StaticElement,
    Text,
    Component
}



export interface IComponent<A = {}> {
    render(): HyperNode;
}

// interface IStaticComponent<P = {}> extends IComponent<P> {

// }

export interface IBaseNode<A extends {}> {
    readonly children: HyperChildren;
    readonly type: Type;
    readonly ref: HTMLElement | IComponent<A>;
    readonly isStatic: boolean;
    // readonly attrs: A;
    // readonly tag: string | HTML.Tags | IComponent<A>;
    // readonly ref: HTMLElement | IComponent<A>;
}

export interface IStaticElement extends IBaseNode<any> {
    readonly ref: HTMLElement;
}


export interface IVirtualNode<A extends {}> extends IBaseNode<A> {
    // readonly children: HyperChildren;
    // readonly type: Type;
    readonly attrs: A;
    readonly tag: string | HTML.Tags | IComponent<A>;
    //readonly ref: HTMLElement | IComponent<A>;
}

export interface IVirtualElement<T extends HTML.Tags> extends IVirtualNode<HTML.Attributes.TagMap[T]> {
    readonly tag: HTML.Tags;
    readonly ref: HTMLElement;
    toString():string;
}

export interface IVirtualComponent<A, C extends IComponent<A>> extends IVirtualNode<A> {
    readonly tag: C;
    readonly ref: C;
}

export interface Renderer {
    //function render<A = {}>(node: DOOM.IVirtualNode<A> | ReadonlyArray<DOOM.IVirtualNode<any>> | null, host: HTMLElement) {
    (): void;
}

// /**
//  * Hyperscript nodes
//  */

//type HyperComponent<A extends {}, C extends IComponent<A>> = IVirtualComponent<A, C>;
export type HyperStaticNode = IStaticElement;
export type HyperVirtualNode = IVirtualElement<any> | IVirtualComponent<any, any>;
export type HyperNode = HyperVirtualNode;// | HyperStaticNode;
export type HyperChildren = ReadonlyArray<HyperNode>
export type HyperChild = (string | HyperNode | null) | Array<string | HyperNode | null>;

export interface IBuilder {
    readonly parent;
    readonly children;
    /**
     * Appends pure HTML tag
     * @param html Pure HTML nodes as strings
     * @param events Events to bind to this node
     */
    addPure(html: string, events?: HTML.EventAttrs): this;

    clear(): this;

    //virtual<Tag extends HTML.Tags>(tag: Tag, attrs?: HTML.Attributes.TagMap[Tag]): IVirtualNode<HTML.Attributes.TagMap[Tag]>
}

/**
 * 
 */

export namespace Hyper {
    export interface Element extends IVirtualNode<any> {

    }
    export interface ElementFunc {
        (): HyperNode;
    }
}






