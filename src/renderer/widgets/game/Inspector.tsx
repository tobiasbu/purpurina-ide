import * as React from "react";
import { ComponentBase } from "../base/Component";

import './style.css';

export default class Inspector extends ComponentBase {

    render() {
        return (
            <div className='flex-wrapper'>
                <label>X</label><input type='number' />
                <label>Y</label><input type='number' />
            </div>)
    }

}