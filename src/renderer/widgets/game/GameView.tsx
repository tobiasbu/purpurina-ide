import * as React from "react";
import {ComponentBase} from "../base/Component";



const style : React.CSSProperties = {
    background: '#171717',
    border: '1px solid black'
}


export default class GameView extends ComponentBase {


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
        const w = this.state.width.toString(10) + 'px';
        const h = this.state.height.toString(10) + 'px';
        return(<canvas className='gameView' width={w} height={h} style={style}/>)
    }

}