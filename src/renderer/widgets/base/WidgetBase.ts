import { Widget } from "@phosphor/widgets";
import { Message } from "@phosphor/messaging";
import { WidgetResizeEvent } from "../../typings/widgetinterfaces";


export default abstract class WidgetBase extends Widget {

    private _wrapperElement: HTMLElement;
    private _width: number;

    private _height: number;

    public get height(): number {
        return this._height;
    }
    public get width(): number {
        return this._width;
    }

    constructor(name: string) {
        super();
        //this.setFlag(Widget.Flag.DisallowLayout);
        this.title.label = name;
        this.title.closable = true;
        this.title.caption = name;

        this._wrapperElement = document.createElement('div');
        this._wrapperElement.className = 'p-Widget-wrapper';

        this.node.appendChild(this._wrapperElement);


    }

    appendChild(child: HTMLElement) {
        this._wrapperElement.appendChild(child);
    }

    protected onAfterAttach(_msg: Message): void {
        this.update();
    }


    protected onResize(msg: Widget.ResizeMessage) {

        //const computed = window.getComputedStyle(this._wrapperElement);
        //const paddingHorizontal = parseFloat(computed.paddingLeft.replace('px','')) + parseFloat(computed.paddingRight.replace('px','')); //.getPropertyValue('padding'); //.replace('px',','); //.split(',');
        //const paddingVertical = parseFloat(computed.paddingBottom.replace('px','')) + parseFloat(computed.paddingTop.replace('px',''));

        
         this._width = msg.width - 8;
         this._height = msg.height - 8;

        // rect.x = clientRect.left + window.pageXOffset - document.documentElement.clientLeft;
        // rect.y = clientRect.top + window.pageYOffset - document.documentElement.clientTop;
        this.onResizeEvent({
            width: Math.round(this._width),
            height: Math.round(this._height)
        })

    }

    abstract onResizeEvent(resizeEvent: WidgetResizeEvent);


}