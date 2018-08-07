
// import * as React from "react";
// import * as GoldenLayout from 'golden-layout';
// import registerComponents from './registerComponents';
// import './golden-layout-base.css';
// import './golden-layout-dark-theme.css';

// export interface GoldenLayoutProps { config: GoldenLayout.Config; }

// export default class GoldenLayoutContainer extends React.Component<GoldenLayoutProps> {


//     private layout: GoldenLayout;
//     private width: number = 0;
//     private height: number = 0;
//     private container: JQuery;

//     constructor(props: GoldenLayoutProps) {
//         super(props);
//         //this.setNode = this.setNode.bind(this);
        
//     }

//     private resize() {
//         let w: number, h: number;

//         if (document.documentElement && (document.documentElement.clientWidth || document.documentElement.clientHeight)) {
//             w = document.documentElement.clientWidth;
//             h = document.documentElement.clientHeight;
//         } else {
//             if (document.body && (document.body.clientWidth || document.body.clientHeight)) {
//                 w = document.body.clientWidth;
//                 h = document.body.clientHeight;
//             }
//         }

//         if (w !== this.width || h !== this.height) {
//             this.width = w;
//             this.height = h;
//             this.container.outerWidth(w - 2);
//             this.container.outerHeight(h - 64);
//             this.layout.updateSize();

//         }
//     }

//     componentDidMount() {
//         /* you can pass config as prop, or use a predefined one */
//         this.container = $('#goldenLayout');//document.getElementById("goldenLayout");
        
//         this.layout = new GoldenLayout(this.props.config, this.container);

//         this.resize();

//         /* register components or bind events to your new instance here */
//         registerComponents(this.layout);

//         this.layout.init();

//         window.addEventListener('resize', () => {

//             this.resize();
//         });
//     }


//     render() {
//         return (<div id='goldenLayout' />)
//     }
// }