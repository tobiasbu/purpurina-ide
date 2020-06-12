import * as React from 'react';

export interface ICheckBoxEvent {
  target: Checkbox;
  isChecked: boolean;
  isDisabled: boolean;
  nativeEvent: Event;
}

export type OnCheckBoxChange = (event: ICheckBoxEvent) => void;

interface ICheckBoxState {
  checked: boolean;
  disabled: boolean;
}

interface ICheckBoxProps {
  name?: string;
  onChange?: OnCheckBoxChange;
}

export default class Checkbox extends React.Component<
  ICheckBoxProps,
  ICheckBoxState
> {
  private checkbox;

  state = {
    checked: true,
    disabled: false,
  };

  // constructor(props) {
  //     super(props);

  //     //const checked = 'checked' in props ? props.checked : props.defaultChecked;

  //     // this.state = {
  //     //     checked,
  //     //     disabled,
  //     // };
  // }

  get checked() {
    if (!this.checkbox) {
      return null;
    }
    return this.checkbox.checked;
  }

  toggle() {
    this.setState(({ checked }) => ({
      checked: !checked,
    }));
  }

  private handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { state } = this;

    if (state.disabled) {
      return;
    }

    const { props } = this;

    this.toggle();

    if (props.onChange !== undefined) {
      props.onChange({
        nativeEvent: event.nativeEvent,
        isChecked: state.checked,
        isDisabled: state.disabled,
        target: this,
      });
    }
  };

  render() {
    const { checked, disabled } = this.state;
    const { name } = this.props;

    return (
      <label className="checkbox-container">
        <input
          className="checkbox"
          type="checkbox"
          name={name}
          disabled={disabled}
          checked={checked}
          onChange={this.handleChange}
        />
        <label className="checkbox-indicator" htmlFor="checkbox" />
      </label>
    );
  }
}
