import { IBuilder } from "../types";
import Builder from "./Builder";
import DOOMUpdater from "./Updater";

module DOOM.Renderer {

    namespace Private {
        export const hostMap = new WeakMap<HTMLElement, Builder>();

        function replaceHTML(element: HTMLElement, content: string): HTMLElement {
            const newChild = element.cloneNode(false);
            (newChild as HTMLElement).innerHTML = content;
            const parent = element.parentNode;
            if (parent) {
                element.parentNode.replaceChild(newChild, element);
            } else {
                //console.log(document)
                document.body.replaceChild(newChild, element)
            }
            return element = newChild as HTMLElement;
        }

        export function update(oldContent: Builder, newContent: Builder, host: HTMLElement) {

            if (oldContent === newContent) {
                return host;
            }

            //c

            //if (!Builder.compare(oldContent, newContent)) {

            //const content = Builder.build(newContent);

            let newHost: HTMLElement = host;
            //return DOOMUpdater.measurePromised(() => {

      
                host.innerHTML = newContent.children.join('');
                // if (host.innerHTML.length === 0) {
                //     newHost = host;
                //     host.innerHTML = newContent.children.join('');
                // } else {
                //     newHost = replaceHTML(host, newContent.children.join(''))
                // }

                return newHost;

                //host.appendChild(content);
            

            //}


        }
    }

    export function irender(node: IBuilder | null, host: HTMLElement) {

        let oldContent = Private.hostMap.get(host);
        let newContent: Builder;

        // if (oldContent === node) { // is same reference to another builder?
        //     newContent = (node as Builder).clone();
        // } else {
        //     newContent = node as Builder;
        // }
        newContent = node as Builder;
        Private.hostMap.set(host, newContent);
        //let newContent = Private.contentToArray(node);

        const n = Private.update(oldContent, newContent, host);
        
        return n;
        // return Private.update(oldContent, newContent, host).then((n: HTMLElement) => {
        //     Private.hostMap.set(n, newContent);
        //     return n;
        // })

        // Private.update(oldContent, newContent, host).then((n: HTMLElement) => {
        //     host = n;

        // })



    }

}

export default DOOM.Renderer;