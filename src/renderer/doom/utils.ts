import { applyAttributes } from "./element-utils";


export module DOOM.Utils {

    export const raf = window.requestAnimationFrame
        || window.webkitRequestAnimationFrame
        || window['mozRequestAnimationFrame']
        || window['msRequestAnimationFrame']
        || function (cb) { return setTimeout(cb, 16); };

    export function getMouseWheelEventName(): string {
        let prefix = "";

        if (window.addEventListener) {
            //_addEventListener = "addEventListener";
        } else {
            //_addEventListener = "attachEvent";
            prefix = "on";
        }

        const support = "onwheel" in document.createElement("div") ? "wheel" : // Modern browsers support "wheel"
            document.onmousewheel !== undefined ? "mousewheel" : // Webkit and IE support at least "mousewheel"
                "DOMMouseScroll"; // let's assume that remaining browsers are older Firefox

        return prefix + support;
    }

    export namespace DOM {
        export function createElement<T extends HTML.Tags>(tagName: T, attr?: HTML.Attributes.TagMap[T]): HTMLElementTagNameMap[T] {
            let node = document.createElement(tagName);
    
            applyAttributes(node, attr);
    
            return node;
        }
    }



}