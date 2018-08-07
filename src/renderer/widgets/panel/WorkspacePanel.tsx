import { DockPanel, Widget } from "@phosphor/widgets";
import * as React from "react";
//import { createPortal } from "react-dom";
import './DockPanel.css';

interface IWidgetInfo {
    component: JSX.Element;
    node: HTMLElement;
}

interface IDockState {
    widgetInfos: IWidgetInfo[];
}

interface IDockProps {
    children: JSX.Element[];
}

class WrapperWidget extends Widget {
    constructor(name: string, node: HTMLElement) {
        super({ node });
        //this.setFlag(Widget.Flag.DisallowLayout);
        this.title.label = name;
    }
}


export default class WorkspacePanel extends React.PureComponent<IDockProps, IDockState>  {

    elem: HTMLElement;
    dock: DockPanel;
    width:number;
    height:number;

    componentWillMount() {
        
        this.dock = new DockPanel();


        let widgetInfos = [];
        for (let component of this.props.children) {
            let node = document.createElement("div");
            let widget = new WrapperWidget("Widget Name", node);
            this.dock.addWidget(widget);
            widgetInfos.push({ node, component });
        }
        this.setState({ ...this.state, widgetInfos });
        this.dock.id = 'main';
        
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

        if (w !== this.width || h !== this.height) {
            this.width = w;
            this.height = h;
            this.elem.style.width = (w - 2).toString() + 'px';
            this.elem.style.height=  (h - 64).toString() + 'px';
            this.elem.style.minWidth = (w - 2).toString() + 'px';
            this.elem.style.minHeight =  (h - 64).toString() + 'px';
            // this.elem.style.top = '1px';
            // this.elem.style.left = '1px';
            // this.elem.style.right = '1px';
            // this.elem.style.bottom = '1px';
            //this.container.outerHeight(h - 64);
            //this.layout.updateSize();

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
                {/* {this.state.widgetInfos.map(widgetInfo => {
                    return createPortal(widgetInfo.component, widgetInfo.node);
                })} */}
            </div>
        );
    }

}