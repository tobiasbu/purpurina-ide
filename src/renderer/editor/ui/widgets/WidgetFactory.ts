import SceneViewWidget from '../panels/SceneViewWidget';
// import ReactWidgetBase from './base/ReactWidgetBase';
// import ReactComponentBase from './base/ReactComponentBase';
import Inspector from '../panels/Inspector';
import SystemFactory from '../../system/SystemFactory';
import { Events, Selection } from '../../internal/managers';

// function createReactWidget<T extends typeof ReactComponentBase>(widget: T, name: string) {
//   return new ReactWidgetBase(name, widget);
// }

module WidgetFactory {

  export function createInspector(): ReactWidgetBase<typeof Inspector> {
    const inspector = createReactWidget(Inspector, 'Inspector');

    Events.on('selectionchange', () => {
      inspector.reactComponent.inspect(Selection.activeEntity);
    });

    return inspector;
  }

  export function createSceneView(): SceneViewWidget {
    const sceneView = SystemFactory.createSceneViewEditor();
    const widget = new SceneViewWidget(sceneView);
    return widget;
  }
}

export default WidgetFactory;
