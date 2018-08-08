import { DockPanel, Widget } from "@phosphor/widgets";
import * as React from "react";
import WrapperWidget from "../WrapperWidget";
import { createPortal } from "react-dom";
import './style/index.css';
import GameView from "../GameView";



/**
 * Create a placeholder content widget.
 */
function createContent(title: string): Widget {
    var widget = new Widget();
    widget.setFlag(Widget.Flag.DisallowLayout);
    widget.addClass('content');
    widget.addClass(title.toLowerCase());

    widget.title.label = title;
    widget.title.closable = true;
    widget.title.caption = `Long description for: ${name}`;

    return widget;
}

interface IWidgetInfo {
    component: JSX.Element;
    node: HTMLElement;
}

interface IDockState {
    widgetInfos: IWidgetInfo[];
}

export default class WorkspacePanel extends React.Component<any, IDockState> {

    elem: HTMLElement;
    dock: DockPanel;
    width: number;
    height: number;
    widgetInfos: IWidgetInfo[];

    componentWillMount() {

        this.dock = new DockPanel();

        let children = [];
        let widgetInfos = [];
        

        for (let index = 0; index < 5; index++) {
            //const element = createContent('Yellow');
            let node = document.createElement("div");

            let widget = new WrapperWidget("Widget Name", node);
            
            //children.push(widget);
            this.dock.addWidget(widget);
            widgetInfos.push({ node, component: <GameView/> });
    }

        this.setState({ ...this.state, widgetInfos });
        this.dock.id = 'main';
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

    private resize() {
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
        this.elem.style.width = strW;
        this.elem.style.height = strH;
        this.elem.style.minWidth = strW;
        this.elem.style.minHeight = strH;
    }
}

componentDidMount() {
    this.elem = document.getElementById('dock-panel');
    this.resize();

    DockPanel.attach(this.dock, this.elem);

    //Widget.attach(this.dock, this.elem);

    window.onresize = (event) => {
        this.resize();
        this.dock.update();
        //this.dock.fit();

    };
}

render() {
    return (
        //<div ref={(c) => this.elem = c}>
        <div id='dock-panel'>
            { this.state.widgetInfos.map(widgetInfo => {
                    return createPortal(widgetInfo.component, widgetInfo.node);
                })};
        </div>
    );
}

}