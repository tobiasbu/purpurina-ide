import hyper, { Component } from "hyperhtml";

export interface ScrollContainerOptions {
    width: number,
    height: number,
}

interface ScrollAxis {

}

let nativeScrollBarWidth = 17;



/// TODO
export default class ScrollContainer<T extends Component> extends Component {

    private _component: T;
    private _offsetElement: HTMLElement;
    private _maskElement: HTMLElement;
    private _contentElement: HTMLElement;

    private _isRtl: boolean;

    private options: ScrollContainerOptions;

    public get component(): T {
        return this._component;
    }

    constructor(component: T, options?: ScrollContainerOptions) {
        super();
        this._component = component;

        this.init();
    }

    private init() {
        this._offsetElement = hyper()`<div class='scrollcontainer-offset'/>`
        this._maskElement = hyper()`<div class='scrollcontainer-mask'/>`
        this._contentElement = hyper()`
            <div class= 'scrollcontainer-content'>
                ${this._component}
            </div>
        `

        this._maskElement.appendChild(this._offsetElement);
        this._offsetElement.appendChild(this._contentElement);

        this.hideNativeScroll(); 
    }

    private hideNativeScroll() {
        this._offsetElement.style['right'] = `-${nativeScrollBarWidth}px`;
        this._offsetElement.style.bottom = `-${nativeScrollBarWidth}px`;
    }

    render() {
        return hyper.wire(this)`
        <div data-scrollcontainer style="width:100%; height:480px">
            <div class='scrollcontainer-wrapper' >
                ${this._maskElement}
            </div>
        </div>
        `
    }

}