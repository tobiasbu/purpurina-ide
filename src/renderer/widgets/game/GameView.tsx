import * as React from "react";
import WidgetBase from "../base/WidgetBase";
import CanvasPool from '../../internal/canvas/CanvasPool'
import { WidgetResizeEvent } from "../../typings/widgetinterfaces";


const style : React.CSSProperties = {
    backgroundColor: '#171717',
    border: '1px solid black'
}


export default class GameView extends WidgetBase {


    private _canvas: HTMLCanvasElement;

    

    constructor() {
        super("Game View");
        
        this.title.caption = "Game View";
        this.title.label = "Game View";
        this._canvas = CanvasPool.create();

        this.appendChild(this._canvas);

        this._canvas.style.backgroundColor = style.backgroundColor;
        //this.props.parent.node.appendChild(this._canvas);
        // this.container = $('#gameView');
        // this.container.outerWidth(this.props.glContainer.width);
        // this.container.outerHeight(this.props.glContainer.height);

        // console.log(this);

        // this.props.glContainer.on('resize', () => {
        //     this.width = this.props.glContainer.width;
        //     this.height = this.props.glContainer.height;
        //     this.container.outerWidth(this.width);
        //     this.container.outerHeight(this.height);
        // }, this);
    }

    onResizeEvent(resizeEvent: WidgetResizeEvent) {
        const w = resizeEvent.width;
        const h = resizeEvent.height;
        this._canvas.width = w;
        this._canvas.height = h;
    }

 

    // render() {
    //     const w = this.state.width.toString(10) + 'px';
    //     const h = this.state.height.toString(10) + 'px';
    //     const id = this._canvas.id;
    //     return(<canvas className='gameView' id={id} width={w} height={h}/>)
    // }

}