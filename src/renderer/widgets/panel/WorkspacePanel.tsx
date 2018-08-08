import { DockPanel, Widget } from "@phosphor/widgets";
import * as React from "react";
//import { createPortal } from "react-dom";
import './style/index.css';

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

// class WrapperWidget extends Widget {
//     constructor(name: string, node: HTMLElement) {
//         super({ node });
//         //this.setFlag(Widget.Flag.DisallowLayout);
//         this.title.label = name;
//     }
// }
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



export default class WorkspacePanel extends React.PureComponent<IDockProps, IDockState>  {

    elem: HTMLElement;
    dock: DockPanel;
    width: number;
    height: number;

    componentWillMount() {

        this.dock = new DockPanel();

        let children = [];

        for (let index = 0; index < 5; index++) {
            const element = createContent('Yellow');
            children.push(element);
        }

        let widgetInfos = [];
        for (let component of children) {
            //let node = document.createElement("div");
            //let widget = new WrapperWidget("Widget Name", node);
            this.dock.addWidget(component);
            //widgetInfos.push({ node, component });
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

        if (w !== this.width || h !== this.height) {
            this.width = w;
            this.height = h;
            this.elem.style.width = (w - 2).toString() + 'px';
            this.elem.style.height = (h - 64).toString() + 'px';
            this.elem.style.minWidth = (w - 2).toString() + 'px';
            this.elem.style.minHeight = (h - 64).toString() + 'px';
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
                {/* { this.state.widgetInfos.map(widgetInfo => {
                    return createPortal(widgetInfo.component, widgetInfo.node);
                })}; */}
            </div>
        );
    }

}