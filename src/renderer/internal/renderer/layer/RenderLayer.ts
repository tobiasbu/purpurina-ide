import List from "../../../engine/structures/List";

export default class RenderLayer {

    private _name: string;
    private _renderList: List<Renderable>;
    private __enable: boolean;
    private __isDirty: boolean;
    private __drawCalls: number;

    constructor(layerName: string) {

        this._name = layerName;

        this._renderList = new List<Renderable>(null,true);
        this.__drawCalls = 0;
        this.__enable = true;
        this.__isDirty = false;
    }

    get drawCalls() { return this.__drawCalls; }

    // Add renderable components
    add(renderer) {

        if (renderer === undefined)
            return;

        this._renderList.push(renderer);
        this.__isDirty = true;

    }

    has(renderer) {
        return this._renderList.indexOf(renderer) !== -1;
    }

    remove(renderer) {
        return this._renderList.erase(renderer);
    }

    removeAt(index) {
        return this._renderList.eraseAt(index);
    }

    at(index) {
        if (index < 0 || index >= this._renderList.size) {
            throw new Error('RenderLayer.at: Renderer at ' + index + ' does not exist in the render layer list: \"' + name + "\".");
        }
        return this._renderList.at(index);

    }

    get length() { return this._renderList.length; }
    get name() { return this._name; }
    get enable() { return this.__enable; }
    set enable(value: boolean) {
        value = !!value;

        if (value !== this.__enable) {
            //if (!value)
            //    this.reset();

            this.__enable = value;
        }
    }

}



/*
      this.__renderers.sort(

          function(a, b) {
      
            if (a.depth > b.depth) {
      
              return 1;
      
            } else if (a.depth < b.depth) {
      
              return -1;
      
            } else {
      
              if (a.z > b.z) {
                return 1;
              } else {
                return -1;
              }
      
      
            }
          });
*/