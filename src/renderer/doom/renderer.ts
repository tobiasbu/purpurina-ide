import * as DOOM from './types';
import ArrayUtils from "../../engine/utils/ArrayUtils";
import VirtualNode from "./nodes/VirtualNode";
import { applyAttributes, updateAttrs } from "./element-utils";
import { Tags } from "./hyperscript/htmlTags";



export namespace Renderer2 {

    export function createElement<A, C extends DOOM.IComponent<A>>(node: DOOM.IVirtualComponent<A, C>): HTMLElement
    export function createElement<Tag extends HTML.Tags>(node: DOOM.IVirtualElement<Tag>): HTMLElement
    export function createElement(node: DOOM.HyperNode): HTMLElement | Text {

        let element: HTMLElement;

        if (node.isStatic === false) {

            if (Private.isHTMLTag(node)) {

                element = document.createElement(node.tag);

                applyAttributes(element as HTMLElement, node.attrs);

                (node as VirtualNode<any>).setRef(element);
            }
        } else {
            element = node.ref as HTMLElement;
        }

        for (let i = 0; i < node.children.length; i++) {
            element.appendChild(createElement(node.children[i] as DOOM.HyperVirtualNode));
        }

        return element;

    }

    namespace Private {

        type KeyMap = {
            [key: string]: { vNode: DOOM.HyperNode, element: HTMLElement };
        };

        export const hostMap = new WeakMap<HTMLElement, ReadonlyArray<DOOM.HyperNode>>();

        export function contentToArray(value: DOOM.HyperNode | ReadonlyArray<DOOM.HyperNode> | null): ReadonlyArray<DOOM.HyperNode> {
            if (!value) {
                return [];
            }
            if (value instanceof Array) {
                return value as ReadonlyArray<DOOM.HyperNode>;
            }
            return [value as DOOM.HyperNode];
        }



        function collectKeys(host: HTMLElement, content: ReadonlyArray<DOOM.HyperVirtualNode>): KeyMap {
            let node = host.firstChild;
            let keyMap: KeyMap = Object.create(null);
            for (let vNode of content) {
                if (vNode.type === DOOM.Type.Element && vNode.attrs.key) {
                    keyMap[vNode.attrs.key] = { vNode, element: node as HTMLElement };
                }
                node = node!.nextSibling;
            }
            return keyMap;
        }


        export function update(oldContent: ReadonlyArray<DOOM.HyperNode>, newContent: ReadonlyArray<DOOM.HyperNode>, host: HTMLElement) {
            if (oldContent === newContent) {
                return;
            }

            // Collect the old keyed elems into a mapping.
            let oldKeyed = collectKeys(host, oldContent);

            // Create a copy of the old content which can be modified in-place.
            let oldCopy = oldContent.slice();

            // Update the host with the new content. The diff always proceeds
            // forward and never modifies a previously visited index. The old
            // copy array is modified in-place to reflect the changes made to
            // the host children. This causes the stale nodes to be pushed to
            // the end of the host node and removed at the end of the loop.
            let currElem = host.firstChild;
            let newCount = newContent.length;
            for (let i = 0; i < newCount; ++i) {

                const content = newContent[i];

                // If the old content is exhausted, create a new node.
                if (i >= oldCopy.length) {

                    if (content.isStatic === true) {

                        host.appendChild(content.ref as HTMLElement)
                    } else {
                        host.appendChild(createElement(content as DOOM.HyperVirtualNode));
                    }
                    continue;
                }

                // Lookup the old and new virtual nodes.
                let oldVNode = oldCopy[i];
                let newVNode = newContent[i];

                // If both elements are identical, there is nothing to do.
                if (oldVNode === newVNode) {
                    currElem = currElem!.nextSibling;
                    continue;
                }

                // Handle the simplest case of in-place text update first.
                // if (oldVNode.type === NodeType.Text && newVNode.type ===  NodeType.Text) {
                //     currElem!.textContent = newVNode.content;
                //     currElem = currElem!.nextSibling;
                //     continue;
                // }

                // If the old or new node is a text node, the other node is now
                // known to be an element node, so create and insert a new node.
                // if (oldVNode.type === 'text' || newVNode.type === 'text') {
                //     ArrayExt.insert(oldCopy, i, newVNode);
                //     host.insertBefore(createDOMNode(newVNode), currElem);
                //     continue;
                // }

                // At this point, both nodes are known to be element nodes.
                // If the new elem is keyed, move an old keyed elem to the proper
                // location before proceeding with the diff. The search can start
                // at the current index, since the unmatched old keyed elems are
                // pushed forward in the old copy array.
                let newKey = newVNode.attrs.key;
                if (newKey && newKey in oldKeyed) {
                    let pair = oldKeyed[newKey];
                    if (pair.vNode !== oldVNode) {
                        ArrayUtils.move(oldCopy, oldCopy.indexOf(pair.vNode, i + 1), i);
                        host.insertBefore(pair.element, currElem);
                        oldVNode = pair.vNode;
                        currElem = pair.element;
                    }
                }

                // If both elements are identical, there is nothing to do.
                if (oldVNode === newVNode) {
                    currElem = currElem!.nextSibling;
                    continue;
                }

                // If the old elem is keyed and does not match the new elem key,
                // create a new node. This is necessary since the old keyed elem
                // may be matched at a later point in the diff.
                let oldKey = oldVNode.attrs.key;
                if (oldKey && oldKey !== newKey) {
                    ArrayUtils.insert(oldCopy, i, newVNode);
                    host.insertBefore(createElement(newVNode as DOOM.HyperVirtualNode), currElem);
                    continue;
                }

                // If the tags are different, create a new node.
                if (oldVNode.tag !== newVNode.tag) {
                    ArrayUtils.insert(oldCopy, i, newVNode);

                    host.insertBefore(createElement(newVNode as DOOM.HyperVirtualNode), currElem);
                    continue;
                }

                // At this point, the element can be updated in-place.
                // Update the element attributes.
                updateAttrs(oldVNode.attrs, newVNode.attrs, currElem as HTMLElement);

                // Update the element content.
                update(oldVNode.children, newVNode.children, currElem as HTMLElement);

                // Step to the next sibling element.
                currElem = currElem!.nextSibling;
            }

            // Dispose of the old nodes pushed to the end of the host.
            for (let i = oldCopy.length - newCount; i > 0; --i) {
                host.removeChild(host.lastChild!);
            }

        }



        export function isHTMLTag(node: DOOM.HyperVirtualNode): node is DOOM.IVirtualElement<any> {
            return (node && typeof node.tag === 'string' && node.tag in Tags);
        }
    }



    export function render<A = {}>(node: DOOM.HyperNode | ReadonlyArray<DOOM.HyperNode> | null, host: HTMLElement) {
        let oldContent = Private.hostMap.get(host) || [];
        let newContent = Private.contentToArray(node);
        Private.hostMap.set(host, newContent);
        Private.update(oldContent, newContent, host);
    }

}


