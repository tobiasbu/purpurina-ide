import * as React from "react";
import WidgetBase from "../base/WidgetBase";
import CanvasPool from '../../internal/canvas/CanvasPool'
import { WidgetResizeEvent } from "../../typings/widgetinterfaces";
import IRenderer from './../../internal/renderer/IRenderer';
import SystemFactory from '../../system/SystemFactory'


const style: React.CSSProperties = {
    backgroundColor: '#171717',
    border: '1px solid black'
}


export default class GameView extends WidgetBase {


    private _canvas: HTMLCanvasElement;
    private _renderer: IRenderer;


    constructor() {
        super("Game View");

        this.title.caption = "Game View";
        this.title.label = "Game View";
        this._renderer = SystemFactory.createRenderer('2d', true);

        // this._canvas.style.backgroundColor = style.backgroundColor;
        
      

        this.appendChild(this._renderer.canvas);
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

    onAfterAttach() {

       

       

        
    }

    repaint() {
        const context = this._renderer.context as CanvasRenderingContext2D;
        const width = this._renderer.canvas.width;
        const height = this._renderer.canvas.height;

        context.clearRect(0, 0, width, height);
    
        context.fillStyle = '#000';  
        context.fillRect(0, 0, width, height);
    
        const x = 100;
        const y = 100;
        const lw = 80; // 73
        const th = 16; // 12
        const tw = 24; // 17

        // render.drawCalls = 0;     

        context.beginPath();
        context.moveTo(x,y);
        context.lineCap = 'square';
        context.lineWidth = 2;
        context.strokeStyle = 'white';
        context.lineTo(x + lw,y);
        context.stroke();

        context.beginPath();
        context.lineWidth = 0;
        context.strokeStyle = 'none';
        context.fillStyle = 'white';
        context.moveTo(x + lw,y - th / 2);
        context.lineTo(x + lw,y + th / 2);
        context.lineTo(x + lw + tw,y);
        context.fill();

        this._renderer.repaint();
    }

    onResizeEvent(resizeEvent: WidgetResizeEvent) {
        const w = resizeEvent.width;
        const h = resizeEvent.height;
        this._renderer.resize(w,h);
        this.repaint();
    }



    // render() {
    //     const w = this.state.width.toString(10) + 'px';
    //     const h = this.state.height.toString(10) + 'px';
    //     const id = this._canvas.id;
    //     return(<canvas className='gameView' id={id} width={w} height={h}/>)
    // }

}