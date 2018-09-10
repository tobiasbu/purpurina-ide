import { DockPanel, Widget } from "@phosphor/widgets";
import {MessageLoop} from '@phosphor/messaging'

//import { createPortal } from "react-dom";
import './style/index.css';

import WidgetFactory from '../WidgetFactory';
import { DOOM } from "../../doom";
import { hyper } from "hyperhtml";
import DOOMUpdater from "../../doom/lib/Updater";


// /**
//  * Create a placeholder content widget.
//  */
// function createContent(title: string): Widget {
//     var widget = new Widget();
//     widget.setFlag(Widget.Flag.DisallowLayout);
//     widget.addClass('content');
//     widget.addClass(title.toLowerCase());

//     widget.title.label = title;
//     widget.title.closable = true;
//     widget.title.caption = `Long description for: ${name}`;

//     return widget;
// }

interface IWidgetInfo {
    component: JSX.Element;
    node: HTMLElement;
}



export default class WorkspacePanel  {

    elem: HTMLElement;
    dock: DockPanel;
    width: number;
    height: number;
    widgetInfos: IWidgetInfo[];
    private _node: HTMLElement;

    public get node(): HTMLElement {
        return this._node;
    }


    constructor() {
 
        this.dock = new DockPanel();

       // this._node = document.createElement('div');
        //this._node.id = 'dock-panel';

        this._node = hyper.wire()`<div id ='dock-panel'/>`

        this.attach();

        this.dock.id = 'main';
        const sceneView = WidgetFactory.createSceneView();
        this.dock.addWidget(sceneView);
        const inspector = WidgetFactory.createInspector();
        this.dock.addWidget(inspector, { mode: 'split-right' });



        window.onresize = (event) => {
            DOOMUpdater.mutate(() => {
            this.resize();
            this.dock.update();
            });
        };
    }

    private attach() {
        MessageLoop.sendMessage(this.dock, Widget.Msg.BeforeAttach)
        this._node.appendChild(this.dock.node);
        MessageLoop.sendMessage(this.dock, Widget.Msg.AfterAttach);
        this.resize();
        this.dock.update();
    }

    connectedCallback() {
        //DockPanel.attach(this.dock, this._node);
        //console.log("hau")
    }

    componentWillMount() {


        //let widgetInfos = [];
        //let widget = new SceneViewWidget(); 
        //this.dock.addWidget(widget);
        //let widget2 = new ReactWidgetBase('Entities', EntityList); 
        //this.dock.addWidget(widget2, {mode:'split-right'});
        //let inspector = new ReactWidgetBase('Inspector', Inspector);




        //inspector.reactComponent.




        // for (let index = 0; index < 5; index++) {
        //     //const element = createContent('Yellow');
        //     //let node = document.createElement("div");

        //     let widget = new ReactWidgetBase('Game View', GameView); //new WrapperWidget("Widget Name", node);

        //     //children.push(widget);
        //     this.dock.addWidget(widget, {mode:'split-bottom'});
        //     //widgetInfos.push({ node, component: <GameView/> });
        // }

        //this.setState({ ...this.state, widgetInfos });

        //let parent = this.dock.handleEvent.bind(this.dock);

        // const wrapper = (event: any) => {
        //     if (event.type === 'p-dragover') {
        //         event.dropAction = event.proposedAction;
        //         event.preventDefault();
        //         event.stopPropagation();
        //     } else {
        //         parent(event);
        //     }
        // }

        //this.dock.handleEvent = wrapper.bind(this.dock);


    }

    resize() {
        let w: number, h: number;

        if (document.documentElement && (document.documentElement.clientWidth || document.documentElement.clientHeight)) {
            w = document.documentElement.clientWidth;
            h = document.documentElement.clientHeight;
        } else {
            if (document.body && (document.body.clientWidth || document.body.clientHeight)) {
                w = document.body.clientWidth;
                h = document.body.clientHeight;
            }
        }

        h = h - (22 + 28);

        if (w !== this.width || h !== this.height) {
            this.width = w;
            this.height = h;
            const strW = w.toString() + 'px';
            const strH = h.toString() + 'px';
                this._node.style.width = strW;
                this._node.style.height = strH;
                this._node.style.minWidth = strW;
                this._node.style.minHeight = strH;
            
        }
    }

    // componentDidMount() {
    //     this.elem = document.getElementById('dock-panel');



    //     DockPanel.attach(this.dock, this.elem);

    //     this.resize();
    //     this.dock.update();

    //     window.onresize = (event) => {
    //         this.resize();
    //         this.dock.update();
    //         //this.dock.fit();

    //     };
    // }

   

}

/*

        <div id='dock-panel'>
            { this.state.widgetInfos.map(widgetInfo => {
                    return createPortal(widgetInfo.component, widgetInfo.node);
                })}
        </div>
*/