/**
 * Created by 1 on 2016/6/15.
 */

import React from 'react';
import ReactDOM from 'react-dom';

import { Slider } from 'antd';



class JcxRangeSelector extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            val : this.props.defaultValue,
            value:this.props.tipFormatter(this.props.defaultValue),
        }
    }

    componentWillReceiveProps(nextProps){
        this.setState({
            val : nextProps.defaultValue,
            value:this.props.tipFormatter(nextProps.defaultValue),
        });
    }
    handlerChange(value){
        this.setState({
            val : value,
            value:this.props.tipFormatter(value),
        });
    }

    render(){
        let slide ;
        if(this.props.type == "range"){
            slide =
            <Slider
                range
                marks={this.props.minmax}
                min={this.props.min}
                max={this.props.max}
                tipFormatter={this.props.tipFormatter}
                step={this.props.step}
                defaultValue={this.props.defaultValue}
                onChange = {this.handlerChange.bind(this)}
                disabled = {this.props.disabled }
                value = {this.state.val}
                ref="slider"
            />
        }else{
            slide =
            <Slider
                marks={this.props.minmax}
                min={this.props.min}
                max={this.props.max}
                tipFormatter={this.props.tipFormatter}
                step={this.props.step}
                defaultValue={this.props.defaultValue}
                onChange = {this.handlerChange.bind(this)}
                disabled = {this.props.disabled }
                value = {this.state.val}
                style={{
                    display:"none"
                }}
                ref="slider"
            />
        }
        return(
            <div className="rangeselector-wrapper" style={this.props.rootStyle}>
                <header style={this.props.headerStyle}>
                    <section style={this.props.hintStyle}>{this.props.hint}</section>
                    <section style={this.props.valueStyle}>{this.state.value}</section>
                </header>
                {slide}
            </div>
        )
    }
}



module .exports = JcxRangeSelector;