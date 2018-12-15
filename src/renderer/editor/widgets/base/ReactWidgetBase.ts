import * as React from "react";
import * as ReactDOM from "react-dom";
import { Widget } from "@phosphor/widgets";
import { Message } from "@phosphor/messaging";
import { IReactWidgetBase } from "./IReactWidgetBase";
import ReactComponentBase, { WidgetProps } from "./ReactComponentBase";



export default class ReactWidgetBase<U extends typeof ReactComponentBase> 
extends Widget implements IReactWidgetBase {

    private _wrapperElement: HTMLElement;
    private _reactClass: U;
    private _reactComponent: InstanceType<U>;
    private _reactElement: React.ReactElement<WidgetProps>;
    private _width: number;
    private _height: number;
    

    private _originalComponentWillUpdate: <P, S>(nextProps: Readonly<P>, nextState: Readonly<S>, nextContext: any) => void;

    public get height(): number {
        return this._height;
    }

    public get width(): number {
        return this._width;
    }

    public get reactComponent(): InstanceType<U> {
        return this._reactComponent;
    }

    public get reactElement() : React.ReactElement<WidgetProps> {
        return this._reactElement;
    }

    constructor(name: string, reactClass: U) {
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


    // function createElement<P, T extends Component<P, ComponentState>, C extends ComponentClass<P>>(
    //     type: ClassType<P, T, C>,
    //     props?: ClassAttributes<T> & P | null,
    //     ...children: ReactNode[]): CElement<P, T>;

    protected onUpdateRequest(_msg: Message): void {


        const host = this.node.firstChild as Element;
        const ReactElement = React.createElement<WidgetProps>(this._reactClass, { parent: this });

        const ReactComponent = ReactDOM.render(ReactElement, host) as InstanceType<U>;
        ReactComponent.setState({ width: this._width, height: this._height })

        this._reactComponent = ReactComponent;
        this._reactElement = ReactElement;

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