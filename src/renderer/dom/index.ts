

export function applyAttributes() {

}

/**
 * Global class for DOM manipulation
 */
class DOMManipulator {

    private _body: HTMLElement;

    public get body(): HTMLElement {
        return this._body;
    }

    constructor() {
        this._body = document.getElementsByTagName("BODY")[0] as HTMLElement;
    }

    create<K extends keyof HTMLElementTagNameMap>(tagName: K, attr?: HTMLAttributesTagMap[K]): HTMLElementTagNameMap[K] {
        let node = document.createElement(tagName);

        if (attr !== undefined) {
            for (const iterator in attr) {
                const value = attr[iterator];

                if (typeof (value) !== 'string') {
                    node.setAttribute(iterator, value.toString());
                } else {
                    node.setAttribute(iterator, value);
                }


            }
        }

        return node;
    }
}

const DOM = new DOMManipulator();

