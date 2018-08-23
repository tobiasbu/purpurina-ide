import * as React from "react";

interface IFoldoutProps {
    label?: string
}

interface IFoldoutState {
    enable: boolean;
}

const style: React.CSSProperties  = {
    overflow: 'hidden'
}



const headerStyle: React.CSSProperties  = {
    height: '20px',
    padding:'3px 0',
   color:'#aaa',
   verticalAlign:'middle',
   marginBottom: '3px',
   fontWeight: 'bold'
}


export default class Foldout extends React.Component<IFoldoutProps, IFoldoutState> {

    state = {
        enable: true
    };

    private onHeaderClick = () => {
        let trigger = !this.state.enable;
        this.setState({enable:trigger});
    }

    render() {
        /*9658	25BA	 9654*/
        const { label } = this.props;

        return (
            <div className='foldout'>
                <div className='foldout-header' onClick={this.onHeaderClick} style={headerStyle}>
                    <span style={{marginRight:'20px'}}>&#9654;</span><label>{label}</label>
                </div>

                <div className={'foldout-content' + ((this.state.enable) ? ' enable' : '')} style={style}>
                {this.props.children}
            </div>
            </div >
        )
    }

}