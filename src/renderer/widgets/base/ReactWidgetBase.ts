import * as React from "react";
import * as ReactDOM from "react-dom";
import { Widget } from "@phosphor/widgets";
import { Message } from "@phosphor/messaging";

import { ReactComponentBase } from "./ReactComponentBase";


export default class ReactWidgetBase extends Widget {

    private _wrapperElement: HTMLElement;
    private _reactClass: any;
    private _reactElement: React.ComponentElement<{}, React.Component<{}, React.ComponentState, any>>
    private _reactComponent: React.Component;
    private _width: number;
    private _height: number;
    private _originalComponentWillUpdate: <P, S>(nextProps: Readonly<P>, nextState: Readonly<S>, nextContext: any) => void;

    constructor(name: string, reactClass: ReactComponentBase | any) {
        super();
        //this.setFlag(Widget.Flag.DisallowLayout);
        this.title.label = name;
        this.title.closable = true;
        this.title.caption = name;
        this._reactClass = reactClass;

        this._wrapperElement = document.createElement('div');
        this._wrapperElement.className = 'p-Widget-wrapper';

        this.node.appendChild(this._wrapperElement);

    }

    // get component(): any {

    protected onUpdate<P, S>(nextProps: Readonly<P>, nextState: Readonly<S>, nextContext: any) {

    }

    protected onAfterAttach(msg: Message): void {
        //this._component.subscribe(() => this.update());
        //this._originalComponentWillUpdate();

        //this._width =  this._wrapperElement.offsetWidth || this._wrapperElement.clientWidth;
        //this._height = this._wrapperElement.offsetHeight || this._wrapperElement.clientHeight;



        //console.log(this.node.clientWidth)
        //this.onUpdateRequest(Widget.Msg.UpdateRequest);
        this.update();
    }


    protected onUpdateRequest(msg: Message): void {

        const host = this.node.firstChild as Element;
        const ReactElement = React.createElement(this._reactClass, { parent: this });
        this._reactElement = ReactElement;
        this._reactComponent = ReactDOM.render(ReactElement, host);
        this._reactComponent.setState({ width: this._width, height: this._height })

        //this._originalComponentWillUpdate = this._reactComponent.componentWillUpdate;
        //this._reactComponent.componentWillUpdate = this.onUpdate.bind(this);

    }

    protected onResize(msg: Widget.ResizeMessage) {

        //const computed = window.getComputedStyle(this._wrapperElement);
        //const paddingHorizontal = parseFloat(computed.paddingLeft.replace('px','')) + parseFloat(computed.paddingRight.replace('px','')); //.getPropertyValue('padding'); //.replace('px',','); //.split(',');
        //const paddingVertical = parseFloat(computed.paddingBottom.replace('px','')) + parseFloat(computed.paddingTop.replace('px',''));

        this._width = msg.width - 10;
        this._height = msg.height - 10;

        if (this._reactComponent !== undefined) {
            this._reactComponent.setState({
                width: Math.round(this._width),
                height: Math.round(this._height)
            })

            if (this._originalComponentWillUpdate !== undefined) {
            }
        }

    }


}