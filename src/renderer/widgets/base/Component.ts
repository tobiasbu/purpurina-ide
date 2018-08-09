
import * as React from "react";

export interface WidgetState {
    width: number;
    height: number;
}


export class ComponentBase<P = {}> extends React.Component<P, WidgetState> {

    state = {
        width: 0,
        height: 0,
    }

    constructor(props, initialState?: WidgetState) {
        super(props);
        //this.state = initialState;
    }

    componentWillMount() {

    }


    // setState(state: WidgetState) {


    //     //this.state.width = state.width;
    // }

}

