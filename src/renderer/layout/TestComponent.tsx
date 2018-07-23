
import * as React from "react";

interface MainLayoutProps { label: string; }


export class TestComponent extends React.Component<MainLayoutProps, {}> {

    constructor(props: MainLayoutProps) {
        super(props);
    }

    render() {
        return (<h1>{this.props.label}</h1>)
    }

}



// var TestComponent = React.createClass({
//     render: function() {
//         return (<h1>{this.props.label}</h1>)
//     }
// });

// mainLayout.registerComponent( 'test-component', MainLayout );
// mainLayout.init();