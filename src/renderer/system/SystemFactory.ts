import CanvasRenderer from "../internal/renderer/CanvasRenderer";
import CanvasPool from "../internal/canvas/CanvasPool";
import IRenderer from "../internal/renderer/IRenderer";
import { ContextID } from "../internal/renderer/RendererProperties";

class SystemCreator {

    createRenderer(contextID: ContextID, doubleBuffer: boolean): IRenderer {

        let domCanvas = CanvasPool.create();
        let canvasBuffer;
        let renderer:IRenderer;

        if (doubleBuffer) {
            canvasBuffer = CanvasPool.create();
        }

        if (contextID === '2d') {
            renderer = new CanvasRenderer(domCanvas, canvasBuffer);
        }

        return renderer;

    }

}

const SystemFactory = new SystemCreator();

export default SystemFactory;