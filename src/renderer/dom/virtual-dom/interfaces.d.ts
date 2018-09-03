
declare enum NodeType {
    Element,
    Text,
    Component
}



/**
 * Components
 */

interface IComponent<A = {}> {
    render(): HyperNode;
}

/**
 * Static
 */


interface IStaticComponent<P = {}> extends IComponent<P> {

}

interface IStaticNode {

}




/**
 * Virtual elements
 */


interface IVirtualNode<A extends {}> {
    readonly children: HyperChildren;
    readonly type: NodeType;
    readonly attrs: A;
    readonly tag: string | HTML.Tags | IComponent<A>;
}

interface IVirtualElement<T extends HTML.Tags> extends IVirtualNode<HTML.AttributesTagMap[T]> {
    readonly tag: HTML.Tags;
}

interface IVirtualComponent<A extends {}, C extends IComponent<A>> extends IVirtualNode<A> {
    readonly tag: C;
    ref?:C;
}

/**
 * Hyperscript nodes
 */

//type HyperComponent<A extends {}, C extends IComponent<A>> = IVirtualComponent<A, C>;
type HyperStaticNode = IStaticNode;
type HyperChildren = ReadonlyArray<IVirtualNode<any>>
type HyperNode = IVirtualElement<any> | IVirtualComponent<any, any>;
type HyperChild = (string | HyperNode | null) | Array<string | HyperNode | null>;

/**
 * 
 */

declare namespace Hyper {
    interface Element extends IVirtualNode<any> {

    }
    interface ElementFunc {
        (): HyperNode;
    }
}