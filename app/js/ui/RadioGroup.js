/**
 * Created by 1 on 2016/5/19.
 */
import React from 'react';
import ReactDOM from 'react-dom';
import {RadioButton, RadioButtonGroup} from 'material-ui';
import * as jcx from 'core/Const';


class RadioGroup extends React.Component{
    constructor(props){
        super(props);
        this.radiobuttons = [];
        for(let i=0;i<jcx[this.props.type].length;i++){
            let value = jcx[this.props.type][i].value;
            let label = jcx[this.props.type][i].label;
            let radiobutton =  <RadioButton
                                    key={value}
                                    value={value}
                                    label={label}
                                    iconStyle={{
                                                    fill:'#07bc84'
                                                }}
                                    labelStyle={{
                                                    color:'#333'
                                                }}
                                    style={{
                                                    float:'left',
                                                    width:'50%',
                                                }}
                                />
            this.radiobuttons.push(radiobutton);
        }
    }

    shouldComponentUpdate(nextProps,nextState){
        return nextProps.value !== this.props.value;
    }

    handlerChange(event,value){
        this.props.onChange(value);
    }
    render(){
        return(
            <div className="radio-container">
                <header>{this.props.hint}</header>
                <section>
                    <RadioButtonGroup name="shipSpeed"
                                        defaultSelected={this.props.value}
                                        style={{marginLeft:'36px'}}
                                        labelPosition="left"
                                        onChange={this.handlerChange.bind(this)}
                    >
                        {this.radiobuttons}
                    </RadioButtonGroup>
                </section>
            </div>
        );
    }
}

module .exports = RadioGroup;











