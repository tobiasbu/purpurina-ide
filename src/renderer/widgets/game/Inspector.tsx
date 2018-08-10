import * as React from "react";
import { ReactComponentBase } from "../base/ReactComponentBase";

import './style.css';
import Checkbox from "../../components/Checkbox";

export default class Inspector extends ReactComponentBase {

    check() {

    }



    render() {
        return (
            <div id='inspector'>
                <div className='flex-container'>
                    <div className='horizotal-group'>
                        <Checkbox />
                        <input className='text-input' type='textfield'></input>
                    </div>
                </div>
                <div className='flex-container'>
                    <div className='flex-horizontal'>
                        <label className='text-label number'>X</label><input className='text-input' type='number' />
                    </div>
                    <div className='flex-horizontal'>
                        <label className='text-label number'>Y</label><input className='text-input' type='number' />
                    </div>

                </div>
            </div>)
    }

}