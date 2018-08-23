import * as React from "react";
import { ReactComponentBase, WidgetState, WidgetProps } from "../base/ReactComponentBase";

import './style.css';
import Checkbox, { ICheckBoxEvent } from "../../components/Checkbox";
import { connect } from "react-redux";
import Vector2Input from "../../components/Vector2Input";
import Foldout from "../../components/Foldout";


interface InspectorState extends WidgetState {
    activeFlag: string;
}

export default class Inspector extends ReactComponentBase {

    private activeFlag = 'true';

    // state = {
    //     activeFlag: 'true'
    // }

    active(event:ICheckBoxEvent) {
        let activeFlag:string;
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
                        <Checkbox onChange={this.active}/>
                        <input className='text-input' type='textfield'></input>
                    </div>
                </div>
                <Foldout label='Transform'>
                    <Vector2Input label='Position'/>
                </Foldout>
            </div>)
    }

}




//export default connect(,mapDispatchToProps)(Inspector);