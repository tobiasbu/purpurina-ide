
import * as React from "react";
import * as GoldenLayout from 'golden-layout';
import registerComponents from './registerComponents';

export interface GoldenLayoutProps { config: GoldenLayout.Config; }

export default class GoldenLayoutContainer extends React.Component<GoldenLayoutProps> {

    
    private layout: GoldenLayout;

    constructor(props: GoldenLayoutProps) {
        super(props);
        //this.setNode = this.setNode.bind(this);

    }
    componentDidMount() {
        /* you can pass config as prop, or use a predefined one */
        //let container = document.getElementById("goldenLayout");
        this.layout = new GoldenLayout(this.props.config);

        /* register components or bind events to your new instance here */
        registerComponents(this.layout);
        
        this.layout.init();

        window.addEventListener('resize', () => {
            this.layout.updateSize();
        });
    }

    render() {
        return (<div id='goldenLayout'/>)
    }
}