import * as React from "react";
import { WidgetState, WidgetProps } from "../base/ReactComponentBase";


import Checkbox, { ICheckBoxEvent } from "../../components/Checkbox";

import Entity from "../../../engine/entity/Entity";
import Transform2D from './Transform2D';


interface InspectorState extends WidgetState {
    activeFlag: string;
}

// interface InspectorProps extends WidgetProps {
//     x: number;
// }

export default class Inspector extends React.Component<WidgetProps, InspectorState> {

    private activeFlag = 'true';
    private _refTransfom2D: React.RefObject<Transform2D>;

    state = {
        width: 0,
        height: 0,
        activeFlag: 'true',
    }

    constructor(props) {
        super(props);

        this._refTransfom2D = React.createRef();
    }

    inspect(entity: Entity) {
        
        this._refTransfom2D.current.inspect(entity);
        
    }

    active(event: ICheckBoxEvent) {
        let activeFlag: string;
        if (event.isChecked) {
            activeFlag = 'true';
        } else {
            activeFlag = 'false';
        }


        //this.setState({activeFlag});
    }

    render() {
        return (
            <div id='inspector' className={this.activeFlag}>
                <div className='flex-container'>
                    <div className='horizotal-group'>
                        <Checkbox onChange={this.active} />
                        <input className='text-input' type='textfield' ></input>
                    </div>
                </div>
                <Transform2D ref={this._refTransfom2D}/>
            </div>)
    }

}




//export default connect(,mapDispatchToProps)(Inspector);