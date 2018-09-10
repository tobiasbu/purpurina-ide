
//import * as DOOM from './index.d.ts'
import { h, s, b } from './hyperscript'
import * as DOOMTypes from './types';
import DOOMUpdater from "./lib/Updater";
import Renderer from './lib/Renderer';
import DOOMPerformance from './lib/Performance';
import { Renderer2 } from './renderer';

export namespace DOOM {

    export interface Element extends DOOMTypes.IVirtualNode<any> {

    }

    export type Type = DOOMTypes.Type;

    //export const render = Renderer.render;
    export const irender = Renderer.irender;
    export const render = Renderer2.render;

    export const updater = DOOMUpdater;

    export const perf = DOOMPerformance;

}

export default DOOM;



export {
    h, s, b
}

