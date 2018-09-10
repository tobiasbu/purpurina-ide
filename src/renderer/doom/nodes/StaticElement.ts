import * as DOOM from './../types';


export default class StaticElement implements DOOM.IStaticElement {
    readonly isStatic: boolean;
    readonly ref: HTMLElement;
    readonly children: ReadonlyArray<DOOM.HyperNode>;
    readonly type: DOOM.Type;


    constructor(element: HTMLElement, children: ReadonlyArray<DOOM.HyperNode>) {
        this.ref = element;
        this.isStatic = true;
        this.children = [];
    }

}