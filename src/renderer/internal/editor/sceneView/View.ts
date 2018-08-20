import Renderer from "../../../engine/renderer/Renderer";
import EditorCamera from "../EditorCamera";

export default class View {

    private _renderer: Renderer;


    private _camera: EditorCamera;
    
    public get camera(): EditorCamera {
        return this._camera;
    }

    public get renderer(): Renderer {
        return this._renderer;
    }


    constructor() {

    }

}