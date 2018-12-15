
import * as React from "react";
import { IReactWidgetBase } from "./IReactWidgetBase";

export interface WidgetState {
    width: number;
    height: number;
}

export interface WidgetProps {
    parent: IReactWidgetBase;
}



class Base<P extends WidgetProps, S extends WidgetState> extends React.Component<P, S> {

   
}

export default class ReactComponentBase extends Base<WidgetProps, WidgetState> {

    state = {
        width: 0,
        height: 0
    }

    constructor(props) {
        super(props);
    }

}

