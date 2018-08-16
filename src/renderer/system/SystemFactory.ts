import CanvasRenderer from "../engine/renderer/CanvasRenderer";
import CanvasPool from "../engine/renderer/canvas/CanvasPool";
import { ContextID } from "../engine/renderer/RendererProperties";
import SceneViewEditor from "../internal/editor/sceneView/SceneViewEditor";
import Renderer from "../engine/renderer/Renderer";


class SystemCreator {

    createRenderer(contextID: ContextID, doubleBuffer: boolean): Renderer | CanvasRenderer {

        let domCanvas = CanvasPool.create();
        let canvasBuffer;
        let renderer: Renderer;

        if (doubleBuffer) {
            canvasBuffer = CanvasPool.create();
        }

        if (contextID === '2d') {
            renderer = new CanvasRenderer(domCanvas, canvasBuffer);
        }

        return renderer;

    }

    createSceneViewEditor(): SceneViewEditor {
        let renderer = this.createRenderer('2d', true);
        // let input = new InputManager();
        // input.init({
        //     mouse: {
        //         enable: true,
        //         target: renderer.canvas,
        //     }
        // },
        //     renderer);
        let editor = new SceneViewEditor(renderer);

        return editor;
    }

}

const SystemFactory = new SystemCreator();

export default SystemFactory;