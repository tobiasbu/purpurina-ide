import * as React from 'react';

interface IFoldoutProps {
  label?: string;
}

interface IFoldoutState {
  enable: boolean;
}

export default class Foldout extends React.Component<
  IFoldoutProps,
  IFoldoutState
> {
  private _content: HTMLElement;
  private _contentHeight: number;

  state = {
    enable: true,
  };

  componentDidMount() {
    let h = 0;

    h = this._content.offsetHeight;

    if (this._content.clientHeight > 0) {
      h = this._content.clientHeight;
    }
    this._contentHeight = h + 4;

    if (this.state.enable) {
      this._content.style.height = this._contentHeight + 'px';
    }
  }

  private onHeaderClick = () => {
    let trigger = !this.state.enable;

    if (trigger) {
      this._content.style.height = this._contentHeight + 'px';
    } else {
      this._content.style.height = '0';
    }

    this.setState({ enable: trigger });
  };

  render() {
    /*9658	25BA	 9654 25B6*/
    const { label } = this.props;

    return (
      <div className={'foldout' + (this.state.enable ? ' enable' : '')}>
        <div className="foldout-header" onClick={this.onHeaderClick}>
          <div className="foldout-arrow-container">
            <span className="foldout-arrow" />
          </div>
          <label className="foldout-label">{label}</label>
        </div>

        <div
          className="foldout-content"
          ref={(child) => {
            this._content = child;
          }}
        >
          {this.props.children}
        </div>
      </div>
    );
  }
}
