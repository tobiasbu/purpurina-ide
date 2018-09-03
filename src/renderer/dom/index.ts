import { applyAttributes } from "./element-utils";


/**
 * Global class for DOM manipulation
 */
class DOMManipulator {

    private _body: HTMLBodyElement;

    public get body(): HTMLBodyElement {
        return this._body;
    }

    constructor() {
        this._body = document.getElementsByTagName("BODY")[0] as HTMLBodyElement;

    }

    createElement<K extends HTML.Tags>(tagName: K, attr?: HTML.AttributesTagMap[K]): HTMLElementTagNameMap[K] {
        let node = document.createElement(tagName);

        applyAttributes(node, attr);

        return node;
    }


    //render<A,C extends IComponent<A>>(element: HyperComponent<A,C>, host: Element | null)
    render(element: HyperNode, host: Element | null): void {

        if (!host) {
            host = this._body;
        }

        // if (element instanceof HTMLElement) {
        //     host.appendChild(element);
        //     console.warn("You are appending a non virtual node.")
        //     return;
        // }

    }

}

const DOM = new DOMManipulator();

export default DOM;
//DOM.createElement('input', {type:'number', style:{webkitTransformStyle:}} )



