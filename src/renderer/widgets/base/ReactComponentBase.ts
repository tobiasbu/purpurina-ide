
import * as React from "react";
import ReactWidgetBase from "./ReactWidgetBase";

export interface WidgetState {
    width: number;
    height: number;
}

export interface WidgetProps {
    parent: ReactWidgetBase;
}



class Base<P extends WidgetProps, S extends WidgetState> extends React.Component<P,S> {
}

export class ReactComponentBase extends Base<WidgetProps,WidgetState> {

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

