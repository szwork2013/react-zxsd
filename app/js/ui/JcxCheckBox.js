/**
 * Created by 1 on 2016/6/15.
 */

import React from 'react';
import ReactDOM from 'react-dom';

class  JcxCheckBox extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            select : this.props.defaultValue,
        }
    }

    handlerChange(i,event){
        let select = this.state.select;
        if($.inArray(event.target.value,this.state.select) < 0){
            select.push(event.target.value);
            this.setState({
                select : select,
            })
        }else{
            select.splice($.inArray(event.target.value,this.state.select),1);
            this.setState({
                select : select,
            })
        }
    }

    render(){
        let content = [];
        for(let i = 0; i<this.props.items.length/2;i++) {
            let checkboxs = [];
            let x = ( i + 1 )*2 > this.props.items.length ? this.props.items.length : ( i + 1 )*2;
            for (let j = i * 2; j < x; j++) {
                if($.inArray(this.props.items[j].key,this.state.select) > -1){
                    checkboxs.push(
                        <div className="checkbox checked">
                            <span className="checkbox-outer" >
                                <span className="checkbox-inner">
                                    <i className="iconfont">&#xe629;</i>
                                </span>
                            </span>
                            <input type="checkbox"
                                   name={this.props.name}
                                   value={this.props.items[j].key}
                                   checked
                                   onChange = {this.handlerChange.bind(this,j)}
                            />
                            <span>{this.props.items[j].value}</span>
                        </div>
                    );
                }else{
                    checkboxs.push(
                        <div className="checkbox">
                            <span className="checkbox-outer" >
                                <span className="checkbox-inner">
                                </span>
                            </span>
                            <input type="checkbox"
                                   name={this.props.name}
                                   onChange = {this.handlerChange.bind(this,j)}
                                   value={this.props.items[j].key}
                            />
                            <span>{this.props.items[j].value}</span>
                        </div>
                    );
                }

            }
            content.push(
                <div className="checkbox-row">
                    {checkboxs}
                </div>
            );
        }
        return(
            <div className="checkbox-wrapper">
                <header>{this.props.hint}</header>
                {content}
            </div>
        )
    }
}

JcxCheckBox.defaultProps = {
    defaultValue:[],
    item : [],
}

module .exports = JcxCheckBox;