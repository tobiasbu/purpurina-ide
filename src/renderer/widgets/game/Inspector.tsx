import * as React from "react";
import { ReactComponentBase, WidgetState, WidgetProps } from "../base/ReactComponentBase";

import './style.css';
import Checkbox, { ICheckBoxEvent } from "../../components/Checkbox";
import { connect } from "react-redux";

const styleVecLabel = {
    minWidth: '20%'
}

const styleVec:React.CSSProperties = {
    flex:'auto'
}

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
                <div className='flex-container'>
                    <div className='flex-horizontal' style={styleVecLabel}>
                        <label className='text-label'>Position</label>
                    </div>
                    <div className='flex-horizontal' style={styleVec}>
                        <label className='text-label number'>X</label><input className='text-input' type='number' />
                    
                        <label className='text-label number'>Y</label><input className='text-input' type='number' />
                    </div>

                </div>
            </div>)
    }

}


//export default connect(,mapDispatchToProps)(Inspector);