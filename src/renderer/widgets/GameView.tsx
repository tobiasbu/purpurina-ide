
import * as React from "react";
// import WidgetPropsBase from "./WidgetBase";

const style : React.CSSProperties = {
    background: 'blue'
}

export default class GameView extends React.Component {

    private width:number;
    private height:number;

    componentDidMount() {

        // this.container = $('#gameView');
        // this.container.outerWidth(this.props.glContainer.width);
        // this.container.outerHeight(this.props.glContainer.height);

        // console.log(this);

        // this.props.glContainer.on('resize', () => {
        //     this.width = this.props.glContainer.width;
        //     this.height = this.props.glContainer.height;
        //     this.container.outerWidth(this.width);
        //     this.container.outerHeight(this.height);
        // }, this);
    }

    render() {
        return(<canvas id='gameView' width={this.width} height={this.height} style={style}/>)
    }

}