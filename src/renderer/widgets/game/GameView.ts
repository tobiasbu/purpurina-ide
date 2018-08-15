import * as React from "react";
import WidgetBase from "../base/WidgetBase";
import { WidgetResizeEvent } from "../../typings/WidgetInterfaces";
import SystemFactory from '../../system/SystemFactory'
import SceneViewEditor from "../../internal/editor/sceneView/SceneViewEditor";


const style: React.CSSProperties = {
    backgroundColor: '#171717',
    border: '1px solid black'
}


export default class GameView extends WidgetBase {

    private _editor: SceneViewEditor;

    constructor() {
        super("Game View");

        this.title.caption = "Game View";
        this.title.label = "Game View";
        this._editor = SystemFactory.createSceneViewEditor();
        //this._renderer = this._editor.renderer as CanvasRenderer;
        //this._renderer = SystemFactory.createRenderer('2d', true) as CanvasRenderer;

        // this._canvas.style.backgroundColor = style.backgroundColor;



        this.appendChild(this._editor.renderer.canvas);
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
        // const context = this._renderer.context;
        // const width = this._renderer.canvas.width;
        // const height = this._renderer.canvas.height;

        // context.clearRect(0, 0, width, height);

        // context.fillStyle = '#000';
        // context.fillRect(0, 0, width, height);

        // const x = 100;
        // const y = 100;
        // const lw = 80; // 73
        // const th = 16; // 12
        // const tw = 24; // 17

        // // render.drawCalls = 0;     

        // context.beginPath();
        // context.moveTo(x, y);
        // context.lineTo(x + lw, y);
        // context.lineCap = 'square';
        // context.lineWidth = 1;
        // context.strokeStyle = 'white';
        // context.stroke();

        // context.beginPath();
        // context.moveTo(x + lw, y - th / 2);
        // context.lineTo(x + lw, y + th / 2);
        // context.lineTo(x + lw + tw, y);
        // context.lineWidth = 0;
        // context.strokeStyle = 'none';
        // context.fillStyle = 'white';
        // context.fill();

        // this._renderer.repaint();
    }

    onResizeEvent(resizeEvent: WidgetResizeEvent) {
        const w = resizeEvent.width;
        const h = resizeEvent.height;
        this._editor.resize(w, h);
        //this._renderer.resize(w, h);
        //this.repaint();
    }



    // render() {
    //     const w = this.state.width.toString(10) + 'px';
    //     const h = this.state.height.toString(10) + 'px';
    //     const id = this._canvas.id;
    //     return(<canvas className='gameView' id={id} width={w} height={h}/>)
    // }

}