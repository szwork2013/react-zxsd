/**
 * Created by 1 on 2016/5/19.
 */
import React from 'react';
import ReactDOM from 'react-dom';


class JcxButton extends React.Component{
    render(){
        return(
                <button
                    className={this.props.className}
                    status={this.props.status}
                    disabled={this.props.disabled}
                    onClick={this.props.onClick}
                    type={this.props.type}
                    style={this.props.buttonStyle}
                >
                    <i className="iconfont"  style={{marginRight:'0.635rem',fontSize:'1rem',display:this.props.icon == "" ? "none" : "show"}} dangerouslySetInnerHTML={{__html:this.props.icon}}></i>
                    {this.props.text}
                </button>
        )
    }
}
JcxButton.defaultProps={
    icon : "",
}

JcxButton.propsType = {
    className:React.PropTypes.string,
    status:React.PropTypes.string,
    disabled:React.PropTypes.any,
    onClick:React.PropTypes.func,
    type:React.PropTypes.string,
    buttonStyle:React.PropTypes.object,
    text:React.PropTypes.string,
    icon:React.PropTypes.string,
}

module.exports = JcxButton;
