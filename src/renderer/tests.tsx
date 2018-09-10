import * as React from "react";
import * as ReactDOM from "react-dom";
import DOOM, { h, b } from "./doom";
import { HyperNode } from "./doom/types";
import hyperHTML from 'hyperhtml';

const AsyncFunction = (async () => { }).constructor;
//type AsyncFunction = async () => void;

function isAsync(asyncFn: any) {
    return asyncFn instanceof AsyncFunction;
}

var styles = [
    'background: linear-gradient(#D33106, #571402)'
    , 'border: 1px solid #3E0E02'
    , 'color: white'
    , 'display: block'
    , 'text-shadow: 0 1px 0 rgba(0, 0, 0, 0.3)'
    , 'box-shadow: 0 1px 0 rgba(255, 255, 255, 0.4) inset, 0 5px 3px -5px rgba(0, 0, 0, 0.5), 0 -13px 5px -10px rgba(255, 255, 255, 0.4) inset'
    , 'line-height: 30px'
    , 'text-align: center'
    , 'font-weight: bold'
].join(';');



let rootNode = document.getElementById('root');

interface UnitTest {
    readonly description: string;
    exec(): void;
    after(fn: () => void);
}

const ISOK = '\u2713'
const ISNOTOK = '\u274C'; //'&#10060;'

class TestRunner {

    private errors: { from: string, e: Error }[];
    private testList: UnitTest[];


    constructor() {
        this.testList = [];
        this.errors = [];
    }

    add(unitTest: UnitTest) {
        this.testList.push(unitTest);
    }

    private appendError(from: UnitTest, e: Error) {
        this.errors.push({ from: from.description, e })
    }

    private logErrors() {
        console.log('Errors:')
        for (let i = 0; i < this.errors.length; i++) {
            console.error(ISNOTOK + ' ' + this.errors[i].from + ':\n', this.errors[i].e)
        }
    }

    run() {
        console.log('%c Tests Cases: DOM Nodes Creation', styles)
        let e;
        this.testList.forEach(element => {
            e = element.exec();
            if (e) {
                this.appendError(element, e);
            }
        });

        if (this.errors.length > 0) {
            this.logErrors();
        }
    }

}

const Runner = new TestRunner();

const t = function (description: string, fn: () => void): UnitTest {

    let exec = function (this: UnitTest): Error {
        let error: Error;
        let time = performance.now();
        let finished: string;

        try {

            fn();

        } catch (e) {
            error = e;
        }
        time = (performance.now() - time);

        let result: string;
        if (error) {
            result = ISNOTOK;
        } else {
            result = ISOK;
        }

        finished = this.description + ': \t' + time.toString() + 'ms \t%c' + result;
        console.log(finished, 'font-family:\u2400')

        if ((this as any).afterFn) {
            (this as any).afterFn();
        }

        return error;

    };

    let test: UnitTest = {
        description: description,
        exec: exec,
        after: null
    }

    let after = function (this: UnitTest, fn: () => void) {
        (this as any).afterFn = fn;
    }

    test.after = after.bind(test);


    Runner.add(test);

    return test;




};


const clear = () => {

    for (let i = 0; i < rootNode.children.length; i++) {
        rootNode.removeChild(rootNode.children[i]);
    }
}
let perf: number, perf2: number;

t('ReactElement array', async () => {


    const list: React.ReactElement<any>[] = [];
    for (let i = 0; i < 10000; i++) {
        //const li = React.createElement('li', {key:i, className:'toolbar'});
        //const li = <li></li>
        list.push(<li key={i}></li>);
    }

    const appNode = <ul>{list}</ul>

    perf = performance.now();
    await ReactDOM.render(appNode, rootNode, () => {
        perf = performance.now() - perf;
    });



}).after(() => {
    console.log('%c   - React render time: ' + perf + 'ms', 'color:#888');
    ReactDOM.unmountComponentAtNode(rootNode);
});

t('React.createElement', async () => {


    const list: React.ReactElement<any>[] = [];
    for (let i = 0; i < 10000; i++) {
        const li = React.createElement('li', { key: i });
        list.push(li);
    }

    const appNode = <ul>{list}</ul>

    perf = performance.now();
    await ReactDOM.render(appNode, rootNode, () => {
        perf = performance.now() - perf;
    });


}).after(() => {
    console.log('%c   - React change tree time: ' + perf + 'ms', 'color:#888');
    ReactDOM.unmountComponentAtNode(rootNode);
});


// t('Document Fragment', () => {

//     docFrag = document.createDocumentFragment();

//     for (let i = 0; i < 10000; i++) {
//         docFrag.appendChild(document.createElement('li'));
//     }

//     rootNode.appendChild(docFrag);


// }).after(() => 
// {
//     clear();

// }

// );

t('set innerHTML', () => {
    const parent = document.createElement('ul');
    let html: any[] = [];
    for (let i = 0; i < 10000; i++) {
        html.push('<li>' + i + '</li>');
    }
    parent.innerHTML = html.join('');

    rootNode.appendChild(parent);
}).after(clear);

t('append by createElement', () => {

    const parent = document.createElement('ul');

    for (let i = 0; i < 10000; i++) {
        parent.appendChild(document.createElement('li'));
    }

    rootNode.appendChild(parent);


}).after(clear);

t('custom virtual dom', () => {
    let ul: HyperNode[] = [];

    for (let i = 0; i < 10000; i++) {
        const li = h('li');
        ul.push(li);
    }
    const root = h('div', { id: 'app' }, ul);
    let time0 = performance.now();
    DOOM.render(root, rootNode);
    perf2 = performance.now() - time0;
    let ul2: HyperNode[] = [];

    for (let i = 0; i < 10000; i++) {
        const li = h('li', { class: 'toolbar' });
        ul2.push(li);
    }
    const root2 = h('div', { id: 'app' }, ul2);
    let time = performance.now();
    DOOM.render(root2, rootNode);
    perf = performance.now() - time;


}).after(() => {
    clear();
    console.log('%c   - Appending time: ' + perf2 + 'ms', 'color:#888');
    console.log('%c   - Changing tree time: ' + perf + 'ms', 'color:#888');
});

let perf3 = 0, perf4, perf5;

t('custom virtual dom - using innerHTML', () => {



    let bu = b('ul');

    for (let i = 0; i < 10000; i++) {
        bu.addPure('<li></li>')
    }

    let time1 = performance.now();
    rootNode = DOOM.irender(bu, rootNode)
    perf3 = performance.now() - time1;

    let bu2 = b('div');

    for (let i = 0; i < 10000; i++) {
        bu2.addPure('<div class=toolbar><li>ASDASD</li></div>');
    }

    let time2 = performance.now();
    DOOM.irender(bu2, rootNode);
    perf4 = performance.now() - time2;

    let bu3 = b('a');

    for (let i = 0; i < 10000; i++) {
        bu3.addPure('<a><div>' + i + '</div></a>');
    }

    let time3 = performance.now();
    DOOM.irender(bu3, rootNode);
    perf5 = performance.now() - time3;




}).after(() => {
    console.log('%c   - Appending time: ' + perf3 + 'ms', 'color:#888');
    console.log('%c   - Changing tree time: ' + perf4 + 'ms', 'color:#888');
    console.log('%c   - Changing tree again time: ' + perf5 + 'ms', 'color:#888');
    clear();
    rootNode.innerHTML = ';'
});


t('hyperHTML', () => {
    let li: any[] = [];
  
    for (let i = 0; i < 10000; i++) {
        li.push(hyperHTML`<li class=toolbar></li>`);
    }
    let time1 = performance.now();
    const wire =
        hyperHTML.bind(rootNode)`<ul>${
            [li]
            }</ul>`
    perf = performance.now() - time1;
    
    time1 = performance.now();
    hyperHTML.bind(rootNode)``
    perf2 = performance.now() - time1;
}).after(() => {
    console.log('%c   - Appending time: ' + perf + 'ms', 'color:#888');
    console.log('%c   - Changing tree time: ' + perf2 + 'ms', 'color:#888');
    clear();
}) 

Runner.run();



/**
 * TEST #1
 */
// 
// const ul:Array<DOOM.Element> = [];





// const root = h('div', {id:'app'},ul); 

// DOOM.render(root, rootNode)


/**
 * TEST #2 - 13~20ms
 */

// const parent = document.createDocumentFragment();

// for (let i = 0; i <10000; i++) {
//     parent.appendChild(document.createElement('li'));
// }

// rootNode.appendChild(parent);



/**
 * TEST #5 ~14-16ms
 */

// const parent = document.createElement('ul');
// let str = '';

// for (let i = 0; i < 10000; i++) {
//     str += '<li>' +i + '</li>'

// }

// parent.innerHTML = str;

// rootNode.appendChild(parent);

/**
 * TEST #6 : FASTER ~13-18ms
 */
// const parent = document.createElement('ul');
//  let html: any[] = [];
//  for (let i = 0; i <10000; i++) {
//     html.push('<li>' + i + '</li>');
// }
// parent.innerHTML = html.join('');

// rootNode.appendChild(parent);

/*
* TEST #7 ~5-10ms
*/

// const parent = DOM.createElement('ul');
// let html:string[] = [] ;
// let li = h('li').toString()

// for (let i = 0; i < 5000; i++) {
//     html.push(li);

// }
// parent.innerHTML = html;
// rootNode.appendChild(parent);






// let li:string[] = [] ;
// let list = ``;
// for (let i = 0; i < 5000; i++) {
//     list=`<li class=toolbar></li>`
// }

// const wire = 
// hyperHTML.bind(rootNode)`<ul>${
//    [list]
// }</ul>`



// setInterval(() => {
//     time = performance.now();


//     //parent.innerHTML = '<a></a>'
//     // hyperHTML.bind(rootNode)`<ul>
//     //     <a></a>
//     // </ul>`

//     /** 6 avg ~8 replace */

//     // let html: string[] = [];
//     // let max =  Math.random() * 100;

//     // for (let i = 0; i < max; i++) {

//     //     html.push('<li>' + i + '</li>');

//     // }

//     // const newChild = parent.cloneNode(false);
//     // (newChild as HTMLElement).innerHTML = html.join('');
//     // parent.parentNode.replaceChild(newChild, parent);
//     // parent = newChild as HTMLElement;
//     // parent.onmousedown = test;

//     /** 6 avg=5~8ms - bit faster */
//     // let newRoot = DOM.createElement('ul') as HTMLElement;
//     // newRoot.innerHTML = html.join(''); //'<a>' + Math.random() * 100 + '</a>'
//     // rootNode.removeChild(parent);
//     // rootNode.appendChild(newRoot);
//     // parent = newRoot


//     /** 5-6 ~ 7 */
//     // let newRoot = DOM.createElement('a') as HTMLElement;
//     // newRoot.innerText = (Math.random() * 100).toString();
//     // parent.parentNode.replaceChild(newRoot, parent);
//     // parent = newRoot

//     /** change directly is slow - 17-19ms */
//     //parent.innerHTML = '<a>'  + Math.random() * 100 + '</a>'

//     //ReactDOM.render(<ul><a>{Math.random() * 100}</a></ul>, rootNode);


//     //parent = rootNode.replaceChild(newChild, parent)
//     let now = performance.now();
//     console.log(now - time + 'ms');

// }, 600)


// // import { Provider } from "react-redux";

// // // import './index.css';
// // import store from './state/store';
// // import App from './App';
// // //import registerServiceWorker from './registerServiceWorker';

// let rootNode = document.getElementById('root');

// //const toolbar = DOM.createElement('div', { class: 'toolbar' });
// //const statusbar = DOM.createElement('div', { class: 'statusbar' });
// //const dockpanel = new DockPanel();
// //dockpanel.id = 'main';









// let lastSelect = null;

// function test(m: MouseEvent) {
//     time = performance.now();


//     if (m.button === 0) {


//         DOOM.updater.mutate(() => {

//             const index = Math.floor((parent.scrollTop + m.clientY) / 15);
//             const current = parent.children[index];
//             if (lastSelect !== current) {


//                 if (lastSelect) {
//                     lastSelect.style.backgroundColor = '';
//                 }

//                 lastSelect = current;
//                 //console.log(Math.floor(m.clientY / 15));
//                 //const text = parent.children[index].textContent;

//                 lastSelect.style.backgroundColor = 'midnightblue';
//                 let now = performance.now();
//                 console.log(now - time + 'ms');
//             }

//         })
//     }


//     // ='<li style=\"color:blue\">'+text+'</li>'

// }

// let html: any[] = [];

// const builder = b('div');



// for (let i = 0; i < 30; i++) {

//     //html.push('<li>' + i + '</li>');
//     builder.addPure('<li>' + i + '</li>')
// }

// builder.addPure('<li>Test</li>', {onmousedown:()=>{console.log('hello')}})
// //html.push([['<li>Teste</li>']])

// DOOM.render(builder, rootNode);

// let timer;
// timer = setTimeout(()=> {
//     DOOM.perf.start();
//     builder.clear();

//     for (let i = 0; i < 500; i++) {
//         builder.addPure('<li>' + 'AHUAHU' + '</li>')
//     }

//     DOOM.render(builder, rootNode).then((n) => {
//         rootNode = n;
        
//         timer = setTimeout(()=> {
//             DOOM.perf.start();
//             const bu = b('div');
//             bu.addPure('a');
//             DOOM.render(bu, rootNode).then(()=>{
//                 console.log( DOOM.perf.stop() + 'ms');
//             })
//         }, 5000)
        
//     })
    
   
//     //timer.unref();
//     console.log( DOOM.perf.stop() + 'ms');
// }, 5000)

// let container = DOM.createElement('div', { class: 'container' })
// let content = DOM.createElement('div', { class: 'content' })
// let parent = DOM.createElement('ul') as HTMLElement;
// parent.style.height = '200px';
// parent.style.overflow = 'auto';
// parent.className = 'container'
// parent.innerHTML = html.join('');

// parent.onmousedown = test;

// const scroll = DOM.createElement('div', { class: 'scroll-container' });


// function hideNativeScroll() {

//     const scrollbarWidth = scrollbarWidth();

//     //this.isRtl ? 'paddingLeft' : 'paddingRight'

//     const style: HTML.InlineStyle = {
//         paddingLeft: scrollbarWidth + 'px',
//         marginBottom: scrollbarWidth * 2 + 'px',
//         paddingBottom: scrollbarWidth
//     };


//     // [
//     //     this.isRtl ? 'paddingLeft' : 'paddingRight'
//     //   ] = `${this.scrollbarWidth || this.offsetSize}px`;
//     //   this.scrollContentEl.style.marginBottom = `-${this.scrollbarWidth * 2 ||
//     //     this.offsetSize}px`;
//     //   this.contentEl.style.paddingBottom = `${this.scrollbarWidth ||
//     //     this.offsetSize}px`;

//     //   if (this.scrollbarWidth !== 0) {
//     //     this.contentEl.style[this.isRtl ? 'marginLeft' : 'marginRight'] = `-${
//     //       this.scrollbarWidth
//     //     }px`;

// }

// const thumb = DOM.createElement('div', { class: 'thumb' });
// rootNode.style.overflowY = 'hidden'
// container.style.paddingRight = '17px';
// container.style.marginBottom = '-34px';

// container.style.overflowX = 'hidden'// !important;';
// container.style.minWidth = '100%' // !important';
// container.style.boxSizing = 'content-box'

// content.style.paddingBottom = '17px'
// content.style.marginRight = '-17px'
// content.style.overflowY = 'hidden'
// content.style.minHeight = '100%'
// scroll.appendChild(thumb);
// rootNode.appendChild(scroll)
// rootNode.style.overflow = 'hidden';
// rootNode.style.height = '200px'
// let c;
// parent.onscroll = (s: UIEvent) => {

//     //console.log(parent.scrollTop + ' ' + parent.scrollHeight)
//     //const s = (window.pageYOffset || document.documentElement.scrollTop)  - (document.documentElement.clientTop || 0);
//     DOOM.updater.measure(() => {
//         //const t = parent.scrollTop / parent.scrollHeight;
//         //will be the position. 
//         var b = parent.scrollHeight - parent.clientHeight;
//         //will be the maximum value for scrollTop.
//         c = parent.scrollTop / b;
//     })

//     DOOM.updater.mutate(() => {
//         const sc = MathUtils.lerp(0, 200 - 16, c);
//         thumb.style.top = sc + 'px';
//     })

