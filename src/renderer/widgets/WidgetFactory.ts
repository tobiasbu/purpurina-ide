import SceneViewWidget from "./game/SceneViewWidget";
import ReactWidgetBase from './base/ReactWidgetBase';
import ReactComponentBase from './base/ReactComponentBase';
import Inspector from './inspector/Inspector';
//import EntityList from '../game/EntityList';
import SystemFactory from "../system/SystemFactory";
import Manager from "../manager";



function createReactWidget<T extends typeof ReactComponentBase>(widget: T, name: string) {
    return new ReactWidgetBase(name, widget);
}

module WidgetFactory {

    export function createInspector(): ReactWidgetBase<typeof Inspector> {
        const inspector = createReactWidget(Inspector, 'Inspector');

        Manager.on('selectionchange', () => {

            inspector.reactComponent.inspect(Manager.selection.activeEntity)

           
        })

        return inspector;
    }

    export function createSceneView():SceneViewWidget {
        const sceneView = SystemFactory.createSceneViewEditor();
        const widget = new SceneViewWidget(sceneView);
        return widget;
    }


}

export default WidgetFactory;