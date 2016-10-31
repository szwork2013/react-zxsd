/**
 * Created by 1 on 2016/6/14.
 */


import React from 'react';
import ReactDOM from 'react-dom';
import JcxIconInput from 'ui/JcxIconInput';
import JcxRangeSelector from 'ui/JcxRangeSelector';
import JcxSelect from 'ui/JcxSelect';

class JcxRadio extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            select : this.props.defaultSelected,
        }
    }

    handlerChange(event){
        this.setState({
            select : event.target.value,
        })
        this.props.onChange(event.target.value);
    }

    render(){
        let content = [];
        let children
        for(let i = 0; i<this.props.items.length;i++){
            if(this.state.select == this.props.items[i].key){
                if(this.props.childType == 'text'){
                    children = <JcxIconInput
                        rootStyle = {{
                                display:this.props.children == i ? "block" : "none"
                            }}
                        hint={this.props.inputhint}
                    />;
                }else if(this.props.childType == 'range'){
                    children  = <JcxRangeSelector
                        rootStyle = {{
                            display:this.props.children == i ? "block" : "none"
                        }}
                        hint={this.props.inputhint}
                        minmax={this.props.minmax}
                        min = {this.props.min}
                        max = {this.props.max}
                        step = {this.props.step}
                        defaultValue={this.props.defaultRangeValue}
                        tipFormatter = {this.props.tipFormatter}
                        type="range"
                    />
                }else if(this.props.childType == "select"){
                    children = <JcxSelect
                        hint={this.props.inputhint}
                        type={this.props.selecttype}
                        defaultValue="1"
                        rootStyle = {{
                            display:this.props.children == i ? "block" : "none"
                        }}
                    />
                }else if(this.props.childType == 'twotext'){
                    children = <div>
                        <JcxIconInput
                            hint={this.props.inputHint[0]}
                            rootStyle = {{
                                display:this.props.children == i ? "block" : "none"
                            }}
                        />
                        <JcxIconInput
                            hint={this.props.inputHint[1]}
                            rootStyle = {{
                                display:this.props.children == i ? "block" : "none"
                            }}
                        />
                    </div>
                }
                content.push(
                    <div className="radio" style={this.props.radioStyle}>
                        <input type="radio" name={this.props.name} value={this.props.items[i].key} checked onChange={this.handlerChange.bind(this)}/>
                        <div style={{width:"100%"}}>
                            <i className="iconfont active" dangerouslySetInnerHTML = {{__html : this.props.items[i].icon.length > 1 ? this.props.items[i].icon[0] : this.props.items[i].icon[0]}} ></i>
                            <span className="active">{this.props.items[i].label}</span>
                            {children}
                        </div>
                    </div>
                )
            }else{
                content.push(
                    <div className="radio" style={this.props.radioStyle}>
                        <input type="radio" name={this.props.name} value={this.props.items[i].key} onChange={this.handlerChange.bind(this)}/>
                        <div style={{width:"100%"}}>
                            <i className="iconfont" dangerouslySetInnerHTML = {{__html : this.props.items[i].icon.length > 1 ? this.props.items[i].icon[1] : this.props.items[i].icon[0]}} ></i>
                            <span >{this.props.items[i].label}</span>
                        </div>
                    </div>
                )
            }
        }

        let style = {
            WebkitBoxOrient:this.props.orient == 'vertical' ? 'vertical' : 'horizontal',
        }

        return(
            <div className="radiogroup-wrapper" style={style}>
                <header style={this.props.headerStyle}>{this.props.hint}</header>
                {content}
            </div>
        )
    }
}

JcxRadio.defaultProps = {
    childType:'text'
}

JcxRadio.propTypes = {
    hint:React.PropTypes.string,
    name:React.PropTypes.string,
    items:React.PropTypes.object,
    defaultSelected:React.PropTypes.string,
    onChange:React.PropTypes.func,
    orient:React.PropTypes.string,
    headerStyle:React.PropTypes.object,
    radioStyle:React.PropTypes.object,
    childType:React.PropTypes.string,
    children:React.PropTypes.string,
    minmax:React.PropTypes.object,
    min:React.PropTypes.number,
    max:React.PropTypes.number,
    step:React.PropTypes.number,
    defaultRangeValue:React.PropTypes.array,
    tipFormatter:React.PropTypes.func,
}
module .exports = JcxRadio;