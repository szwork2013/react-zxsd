/**
 * Created by 1 on 2016/5/19.
 */

import React from 'react';
import ReactDOM from 'react-dom';
import * as jcx from 'core/Const';


class JcxSelect extends React.Component{
    constructor(props){
        super(props);
        this.options = [];
        for(let i=0;i<jcx[this.props.type].length;i++){
            let key = jcx[this.props.type][i].key;
            let value = jcx[this.props.type][i].value;
            let option = <option value={key} key={i}>{value}</option>
            this.options.push(option);
        }
        this.state = {
            value : this.props.defalutValue,
            focus : false,
        }
    }

    handlerFocus(){
        this.setState({
            focus:true
        })
    }

    handlerBlur(){
        this.setState({
            focus:false
        })
    }

    handlerChange(event){
        this.setState({
            value : event.target.value
        })
        this.props.onSelect(event.target.value);
    }

    render(){
        let value ;
        for(let i = 0;i<jcx[this.props.type].length;i++){
            if(this.state.value == jcx[this.props.type][i].key){
                value = jcx[this.props.type][i].value;
            }
        }
        return(
            <div className={this.state.focus ? "select-wrapper focus" : "select-wrapper blur"} style={this.props.rootStyle}>
                <label className={this.props.label == "" ? "hidden" : "show"} style={this.props.labelStyle}>{this.props.label}</label>
                <select
                     ref="select"
                     defaultValue = {this.props.defaultValue}
                     onChange={this.handlerChange.bind(this)}
                     onFocus = {this.handlerFocus.bind(this)}
                     onBlur = {this.handlerBlur.bind(this)}
                >
                    {this.options}
                </select>
                <input type="text"
                       placeholder={this.props.hint}
                       value={value}
                       refs="text"
                       readOnly="true"
                />
                <i className={this.state.focus ? "iconfont focus" : "iconfont"}>&#xe62a;</i>
            </div>
        );
    }
}
JcxSelect.defaultProps = {
    defaultValue : "1",
    label:"",
}

JcxSelect.propsType = {
    type:React.PropTypes.string,//静态字符数组类型
    hint:React.PropTypes.hint,
    defaultValue:React.PropTypes.string,
    onSelect:React.PropTypes.func,
    rootStyle:React.PropTypes.object,
    labelStyle:React.PropTypes.object,
}

module .exports = JcxSelect;