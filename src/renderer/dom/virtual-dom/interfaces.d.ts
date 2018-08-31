
declare enum NodeType {
    Element,
    Text,
    Component
}




/**
 * Components
 */

interface IComponent<A = {}> {
    readonly attrs: A;
}

/**
 * Static
 */


interface IStaticComponent<P = {}> extends IComponent<P> {

}

interface IStaticNode {

}

type StaticNode = IStaticNode;


/**
 * Virtual elements
 */

interface IVirtualNode<A extends {}> {
    readonly children: HyperChildren;
    readonly type: NodeType;
    readonly attrs: A;
}

interface IVirtualElement<T extends HTML.Tags> extends IVirtualNode<HTML.AttributesTagMap[T]> {
    readonly tag: HTML.Tags | string;
}

interface IVirtualComponent<A extends {}, C extends IComponent<A>> extends IVirtualNode<A> {
    readonly attrs: A;
    readonly component: C;
}

/**
 * Hyperscript nodes
 */

type HyperChildren = ReadonlyArray<IVirtualNode<any>>
type HyperNode = IVirtualElement<any> | IVirtualComponent<any, any>;
type HyperChild = (string | HyperNode | null) | Array<string | HyperNode | null>;
