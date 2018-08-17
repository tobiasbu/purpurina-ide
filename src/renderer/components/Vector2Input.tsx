
import * as React from "react";
import Manager from "../manager";
import { Editing } from "../manager/Editing";
import MathUtils from "../engine/math/MathUtils";

export interface IVector2Event {
    target: Vector2Input;
    isChecked: boolean;
    isDisabled: boolean;
    nativeEvent: Event;
};

export type OnVector2InputChange = (event: IVector2Event) => void;

interface IVector2InputState {
    x: number | string;
    y: number | string;
    disabled: boolean;
}

interface IVector2InputProps {
    label?: string
    onChange?: OnVector2InputChange;
}

const styleVecLabel = {
    minWidth: '20%'
}

const styleVec: React.CSSProperties = {
    flex: 'auto'
}

const FLOAT_REGEX = /[+-]?([0-9]+([.][0-9]*)?|[.][0-9]+)/;

export default class Vector2Input extends React.Component<IVector2InputProps, IVector2InputState> {


    state = {
        x: 0,
        y: 1,
        disabled: false
    }

    private changeAxisTarget = null;
    private changeAxisInitialValue = null;
    private labelDown: boolean = false;
    private _xAxisLabel: HTMLLabelElement;
    private _xAxisInput: HTMLInputElement;
    private _yAxisInput: HTMLInputElement;

    private handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {

        const { state } = this;

        if (state.disabled) {
            return;
        }

        const name = event.target.name;
        let value = event.target.value;

        //let value = event.target.valueAsNumber;
        let newValue: string;

        console.log(value)

        if (value.length > 0) {

            const nonDigits = /([^.\d]+)/g.test(value);

            if (nonDigits) {
                console.log('yes')
                const isNegative = value[0] === '-';
                newValue = value.replace(/([^.\d]+)/g, '');
                if (isNegative) {
                    newValue = '-' + newValue;
                }
                if (newValue.length === 0) {
                    newValue = '0';
                } else {
                    newValue = (parseFloat(newValue)).toString();
                }
            } else {
                const float = FLOAT_REGEX.exec(value);
                if (float && float.length > 0) {
                    newValue = float[0];//parseFloat(float[0]).toString();

                } else {
                    newValue = value;
                }
            }
        } else {
            newValue = ''
        }

        if (newValue !== undefined) {
            console.log('new value: ' + newValue)
            if (name === 'x-axis') {
                this.setState({ x: newValue });
            }
        }


        // if (value.length > 0) {

        //     const isFine = FLOAT_REGEX.exec(value);


        //     if (isFine.length > 0) {

        //         const number = parseFloat(isFine[0]);
        //         if (name === 'x-axis') {
        //             this.setState({ x: number.toString() });
        //         }
        //     }
        // } else {
        //     if (name === 'x-axis') {
        //         this.setState({ x: '' });
        //     }
        // }

    }

    private onInputFocus = (event: React.FocusEvent<HTMLInputElement>) => {
        this._xAxisLabel.classList.add('focus');

    }

    private onInputBlur = (focus) => {

        const value = focus.target.value;
        let newValue;
        if (value.length > 0) {
            newValue = parseFloat(value);
        } else {
            newValue = '0'
        }
        if (focus.target.name === 'x-axis') {
            this.setState({ x: newValue });
        }

        if (this.labelDown === false) {
            this._xAxisLabel.classList.remove('focus');
        }
    }

    private mouseDown = (event: React.MouseEvent<HTMLLabelElement>) => {
        if (event.button === 0) {
            if (Manager.input.mode !== Editing.AxisLabel) {
                this.changeAxisTarget = event.currentTarget.title;

                if (this.changeAxisTarget === 'x-axis') {
                    this.changeAxisInitialValue = parseFloat(this.state.x.toString());
                    this._xAxisInput.classList.add('focus');
                    //this._xAxisLabel.classList.add('focus');
                    this._xAxisInput.focus();

                }

                Manager.input.setAxisEditing(this.changeAxis, this.mouseUp, this)
                this.labelDown = true;
            }
        }

    }


    changeAxis(delta: number): void {

        if (this.labelDown) {

            let str = (this.changeAxisTarget === 'x-axis') ? this.state.x : this.state.y;
            let value = parseFloat(str.toString());
            value = this.changeAxisInitialValue + (Math.floor(-delta) * 0.1);
            //if (focus.target.name === 'x-axis') {


            this.setState({ x: value.toFixed(4) });

            //this._xAxisInput.value = value.toString();
        }
        //}
    }



    private mouseUp = (event: React.MouseEvent<HTMLLabelElement>) => {
        this.labelDown = false;
        this._xAxisInput.classList.remove('focus');
        this._xAxisInput.setSelectionRange(0, this._xAxisInput.value.length, "forward");
        //this._xAxisLabel.classList.remove('focus')
        this._xAxisInput.focus();
    }


    render() {
        const { label } = this.props;

        return (<div className='flex-container'>

            {label ?
                <div className='flex-horizontal' style={styleVecLabel}>
                    <label className='text-label'>{label}</label>
                </div>
                : null
            }
            <div className='flex-horizontal' style={styleVec}>
                <label className='text-label number' title='x-axis' ref={(child) => { this._xAxisLabel = child; }} onMouseDown={this.mouseDown}>X</label>
                <input className='text-input' name='x-axis' ref={(child) => { this._xAxisInput = child; }} onChange={this.handleChange} onBlur={this.onInputBlur} onFocus={this.onInputFocus} value={this.state.x} />
                <label className='text-label number' style={{ marginLeft: '4px' }}>Y</label>
                <input className='text-input' name='y-axis' type='number' />
            </div>

        </div>)
    }

}