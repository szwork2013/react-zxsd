/**
 * Created by 1 on 2016/6/20.
 */

import React from 'react';
import ReactDOM from 'react-dom';
import * as jcx from 'core/Const';
import { Cascader } from 'antd';

class JcxCascaderSelect extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <div className="cascaderselect-wrapper" style={this.props.rootStyle}>
                <label style={this.props.labelStyle}>{this.props.label}</label>
                <Cascader
                    options={jcx[this.props.data]}
                    style = {this.props.inputStyle}
                    placeholder={this.props.hint}
                    popupClassName = "cascaderdialog"
                    allowClear = {false}
                />
            </div>
        );
    }
}

JcxCascaderSelect.propTypes = {
    label:React.PropTypes.string,
    rootStyle:React.PropTypes.object,
    labelStyle:React.PropTypes.object,
    inputStyle:React.PropTypes.object,
    data:React.PropTypes.string,
}

module .exports = JcxCascaderSelect;