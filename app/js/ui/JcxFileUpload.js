/**
 * Created by 1 on 2016/6/20.
 */

import React from 'react';
import ReactDOM from 'react-dom';

class JcxFileUpload extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <div className="fileupload-wrapper" style={this.props.rootStyle}>
                <section><i className="iconfont">&#xe606;</i></section>
                <label>{this.props.label}</label>
            </div>
        )
    }
}

JcxFileUpload.propsType = {
    label:React.PropTypes.string,
    rootStyle:React.PropTypes.object,
}

module .exports = JcxFileUpload;