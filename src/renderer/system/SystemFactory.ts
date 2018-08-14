import CanvasRenderer from "../internal/renderer/CanvasRenderer";
import CanvasPool from "../internal/canvas/CanvasPool";
import Renderer from "../internal/renderer/IRenderer";
import { ContextID } from "../internal/renderer/RendererProperties";
import InputManager from "../engine/input/InputManager";

export interface SceneViewEditorSystems {
    renderer: Renderer;
    input: InputManager;
}

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

    createSceneViewEditor(): SceneViewEditorSystems {
        let renderer = this.createRenderer('2d', true);
        let input = new InputManager();
        input.init({
            mouse: {
                enable: true,
                target: renderer.canvas,
            }
        },
            renderer);
        let editor: SceneViewEditorSystems = {
            input: input,
            renderer: renderer
        };
        return editor;
    }

}

const SystemFactory = new SystemCreator();

export default SystemFactory;