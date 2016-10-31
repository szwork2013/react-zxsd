/**
 * Created by 1 on 2016/5/19.
 */
import React from 'react';
import ReactDOM from 'react-dom';

class JcxInput extends React.Component{
    constructor(props){
        super(props);
    }

    shouldComponentUpdate(nextProps,nextState){
        return nextProps.value !== this.props.value;
    }

    handlerChange(event){
        this.props.onChange(event.target.value);
    }

    render(){
        console.log("jcxinput");
        return(
            <input
                type={this.props.type}
                onChange={this.handlerChange.bind(this)}
                value={this.props.value}
                placeholder={this.props.hint}
                ref="jcxinput"/>
        );
    }
}

JcxInput.defaultProps={
    type:"text",
}

module .exports = JcxInput;