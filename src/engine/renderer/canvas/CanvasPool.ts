import List from '../../structures/List';
// import UUID from '../../../internal/utils/UUID';
// import { ICanvasContainer } from '../../typings/ICanvasContainer';


// based in pixi
class CanvasPoolManager {

    private _list: List<ICanvasContainer>;

    constructor() {
        this._list = new List<ICanvasContainer>();
    }

    create(width?: number, height?: number): HTMLCanvasElement  {

        let canvasContainer: ICanvasContainer = this.firstFree();
        let canvas: HTMLCanvasElement;

        if (width === undefined)
            width = 100;

        if (!height === undefined)
            height = 100;

        // no parent found
        if (canvasContainer === null) {

            canvasContainer = {
                // parent: gameParent,
                canvas: document.createElement('canvas'),
                initialWidth: width,
                initialHeight: height,
                id: 'abc',
                using: true,

            };

            this._list.push(canvasContainer);


            canvas = canvasContainer.canvas;
            canvas.id = canvasContainer.id;

        } else {

            // canvasContainer.parent = gameParent;
            canvas = canvasContainer.canvas;
        }

        canvas.width = width;
        canvas.height = height;


        return canvas;
    }

    // filter(gameParent) { // functional programming

    //     var list = scintilla.CanvasList.list;

    //     return list.parent === gameParent;

    // }

    firstFree(): ICanvasContainer {

        this._list.each(function (canvas: ICanvasContainer) {
            if (!canvas.using) {
                return canvas;
            }
            return undefined;
        });

        return null;
    }

    remove(parent) {

        let list = this._list;

        for (let i = 0; i < list.length; i++) {
            if (list[i].parent === parent) {
                list[i].parent = null;
            }
        }

    }

    clear() {
        /// TODO
    }

}

const CanvasPool = new CanvasPoolManager();

Object.seal(CanvasPool);

export default CanvasPool;