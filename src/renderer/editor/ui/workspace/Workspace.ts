import { hyper } from 'hyperhtml';
import { DockPanel, Widget } from '@phosphor/widgets';
import { MessageLoop } from '@phosphor/messaging';

import WidgetBase from '../widgets/WidgetBase';
import WidgetFactory from '../widgets/WidgetFactory';
import dragDropImporter from './dragDropImporter';

// import { createPortal } from "react-dom";
// import './style/index.css';

// import WidgetFactory from '../WidgetFactory';
// import { DOOM } from "../../doom";

// import DOOMUpdater from "../../doom/lib/Updater";

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

// interface IWidgetInfo {
//     component: JSX.Element;
//     node: HTMLElement;
// }

/**
 * Workspace component
 */
export default class Workspace {
  private dock: DockPanel;
  private width: number;
  private height: number;
  private workspaceElement: HTMLElement;
  private widgets: any[];

  public get element(): HTMLElement {
    return this.workspaceElement;
  }

  constructor() {
    this.widgets = [];
    this.dock = new DockPanel();
    this.dock.id = 'dock-panel';
    const workspaceElement = hyper.wire()`<div id="workspace"/>` as HTMLDivElement;
    this.workspaceElement = workspaceElement;

    this.attach();

    dragDropImporter(workspaceElement, this.dock.overlay);


    // this.workspaceElement.addEventListener('dragstart', (event) => event.preventDefault());
    const consoleWidget = WidgetFactory.createConsole();
    this.dock.addWidget(consoleWidget, {
      mode: 'split-bottom',
    });
    this.widgets.push(consoleWidget);
    // const sceneView = WidgetFactory.createSceneView();
    // this.dock.addWidget(sceneView);
    // const inspector = WidgetFactory.createInspector();
    // this.dock.addWidget(inspector, { mode: 'split-right' });

    this.dock.addWidget(new WidgetBase('test', null));



    window.onresize = () => {
      this.resize();
      this.dock.update();
      // DOOMUpdater.mutate(() => {
      //   this.resize();
      //   this.dock.update();
      // });
    };
  }

  private attach() {
    MessageLoop.sendMessage(this.dock, Widget.Msg.BeforeAttach);
    this.workspaceElement.appendChild(this.dock.node);
    MessageLoop.sendMessage(this.dock, Widget.Msg.AfterAttach);
    this.resize();
    this.dock.update();
  }

  connectedCallback() {
    // DockPanel.attach(this.dock, this._node);
  }

  componentWillMount() {
    // let widgetInfos = [];
    // let widget = new SceneViewWidget();
    // this.dock.addWidget(widget);
    // let widget2 = new ReactWidgetBase('Entities', EntityList);
    // this.dock.addWidget(widget2, {mode:'split-right'});
    // let inspector = new ReactWidgetBase('Inspector', Inspector);
    // inspector.reactComponent.
    // for (let index = 0; index < 5; index++) {
    //     //const element = createContent('Yellow');
    //     //let node = document.createElement("div");
    // let widget = new ReactWidgetBase('Game View', GameView);
    // new WrapperWidget("Widget Name", node);
    //     //children.push(widget);
    //     this.dock.addWidget(widget, {mode:'split-bottom'});
    //     //widgetInfos.push({ node, component: <GameView/> });
    // }
    // this.setState({ ...this.state, widgetInfos });
    // let parent = this.dock.handleEvent.bind(this.dock);
    // const wrapper = (event: any) => {
    //     if (event.type === 'p-dragover') {
    //         event.dropAction = event.proposedAction;
    //         event.preventDefault();
    //         event.stopPropagation();
    //     } else {
    //         parent(event);
    //     }
    // }
    // this.dock.handleEvent = wrapper.bind(this.dock);
  }

  private resize() {
    let w: number;
    let h: number;

    if (
      document.documentElement &&
      (document.documentElement.clientWidth ||
        document.documentElement.clientHeight)
    ) {
      w = document.documentElement.clientWidth;
      h = document.documentElement.clientHeight;
    } else {
      if (
        document.body &&
        (document.body.clientWidth || document.body.clientHeight)
      ) {
        w = document.body.clientWidth;
        h = document.body.clientHeight;
      }
    }

    h = h - (22 + 28);

    if (w !== this.width || h !== this.height) {
      this.width = w;
      this.height = h;
      const strW = `${w.toString()}px`;
      const strH = `${h.toString()}px`;
      this.workspaceElement.style.width = strW;
      this.workspaceElement.style.height = strH;
      this.workspaceElement.style.minWidth = strW;
      this.workspaceElement.style.minHeight = strH;
    }
  }
}
