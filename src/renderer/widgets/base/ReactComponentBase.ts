
import * as React from "react";
import ReactWidgetBase from "./ReactWidgetBase";

export interface WidgetState {
    width: number;
    height: number;
}

export interface WidgetProps {
    parent: ReactWidgetBase;
}



export class ReactComponentBase extends React.Component<WidgetProps, WidgetState> {

    state = {
        width: 0,
        height: 0,
    }

    constructor(props) {
        super(props);
        //this.state = initialState;
    }

    componentWillMount() {

    }


    // setState(state: WidgetState) {


    //     //this.state.width = state.width;
    // }

}

