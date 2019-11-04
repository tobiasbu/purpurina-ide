import * as React from 'react';
import { floatableString } from '../internal/utils/parser';
import { Pointer } from '../internal/managers';
import { PointerMode } from '../internal/managers/pointer/PointerManager';

export interface IVector2Event {
  target?: Vector2Input;
  nativeEvent?: Event;
  value: number;
}

export type OnVector2InputChange = (event: IVector2Event) => void;

interface IVector2InputState {
  x: number | string;
  y: number | string;
  disabled: boolean;
}

interface IVector2InputProps {
  label?: string;
  onChange?: OnVector2InputChange;
}

const styleVecLabel: React.CSSProperties = {
  minWidth: '30%',
  overflow: 'hidden',
};

const styleVec: React.CSSProperties = {
  flex: 'auto',
};

export default class Vector2Input extends React.Component<IVector2InputProps, IVector2InputState> {

  state = {
    x: 0,
    y: 1,
    disabled: false,
  };

  private changeAxisTarget = null;
  private changeAxisInitialValue = null;
  private labelDown: boolean = false;
  private oldValue: string;
  private _xAxisLabel: HTMLLabelElement;
  private _xAxisInput: React.RefObject<HTMLInputElement>;
  private _yAxisInput: HTMLInputElement;

  constructor(props?: IVector2InputProps) {
    super(props);

    this.state.x = 0;
    this.state.y = 0;

    this._xAxisInput = React.createRef();
  }

  public setValues(axis: IVector2) {
        // this._xAxisInput.current.value = axis.x.toString();
    this.setState({ x: axis.x.toString() });
        // this._yAxisInput.valueAsNumber = axis.y;
  }

  private handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {

    const { state } = this;

    if (state.disabled) {
      return;
    }

    const name = event.target.name;
    const value = event.target.value;

    const parserResult = floatableString(value);

    if (parserResult.isValid) {
      if (this.props.onChange) {
          this.props.onChange({
              value: parseFloat(parserResult.value),
            });
        }
    }

    if (parserResult.value !== undefined) {
      if (name === 'x-axis') {
          this.setState({ x: parserResult.value });
        }
    }

  }

  changeAxis(delta: number): void {

    if (this.labelDown) {

      let str = (this.changeAxisTarget === 'x-axis') ? this.state.x : this.state.y;
      let value = parseFloat(str.toString());
      value = this.changeAxisInitialValue + (Math.floor(-delta) * 0.1);
            // if (focus.target.name === 'x-axis') {

      this.setState({ x: value.toFixed(4) });

      if (this.props.onChange) {
          this.props.onChange({
              value: parseFloat(this._xAxisInput.current.value),
            });
        }
            // this._xAxisInput.value = value.toString();
    }
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
      newValue = '0';
    }
    if (focus.target.name === 'x-axis') {
      this.setState({ x: newValue });
    }

    if (this.labelDown === false) {
      this._xAxisLabel.classList.remove('focus');
    }
  }

  private mouseUp = () => {
    this.labelDown = false;
    this._xAxisInput.current.classList.remove('focus');
    if (this.changeAxisInitialValue.toString() !== this._xAxisInput.current.value) {
      this._xAxisInput.current.setSelectionRange(0, this._xAxisInput.current.value.length, 'forward');
    }
        // this._xAxisLabel.classList.remove('focus')
    this._xAxisInput.current.focus();

  }

  private mouseDown = (event: React.MouseEvent<HTMLLabelElement>) => {
    if (event.button === 0) {
        if (Pointer.mode !== PointerMode.VectorAxisEditing) {

          this.changeAxisTarget = event.currentTarget.title;

          if (this.changeAxisTarget === 'x-axis') {
              this.changeAxisInitialValue = parseFloat(this.state.x.toString());
              this._xAxisInput.current.classList.add('focus');
                    // this._xAxisLabel.classList.add('focus');
              this._xAxisInput.current.focus();

            }

          Pointer.setAxisEditing(this.changeAxis, this.mouseUp, this);
          this.labelDown = true;
        }
      }

  }

  render() {
    const { label } = this.props;

    return (<div className="flex-container">

            {label ?
                <div className="flex-horizontal" style={styleVecLabel}>
                    <label className="text-label">{label}</label>
                </div>
                : null
            }
            <div className="flex-horizontal" style={styleVec}>
                <label className="text-label number" title="x-axis" ref={(child) => { this._xAxisLabel = child; }} onMouseDown={this.mouseDown}>X</label>
                <input className="text-input" name="x-axis" ref={this._xAxisInput} onChange={this.handleChange} onBlur={this.onInputBlur} onFocus={this.onInputFocus} value={this.state.x} />
                <label className="text-label number" style={{ marginLeft: '4px' }}>Y</label>
                <input className="text-input" name="y-axis" type="number" />
            </div>

        </div>);
  }

}
