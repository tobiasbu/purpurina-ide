import * as React from "react";
import ReactComponentBase from "../base/ReactComponentBase";


export default class EntityList extends ReactComponentBase {

    render() {
        return (
        <div id='entityList'>
            <input className='text-input' type='textfield' defaultValue='Search...'/>
            <ul>
                <li>asdasd</li>
            </ul>
        </div>
        );
    }

}
