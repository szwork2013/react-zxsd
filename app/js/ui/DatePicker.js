/**
 * Created by 1 on 2016/5/18.
 */
import React from 'react';
import ReactDOM from 'react-dom';

class DatePicker extends React.Component{
    constructor(props){
        super(props);
        if(this.props.range){
            this.state = {
                begin : this.props.defaultValue[0],
                end : this.props.defaultValue[1],
                focus : false
            }
        }else{
            this.state = {
                value : this.props.defaultValue,
                focus : false
            }
        }

    }
    handlerBeginChange(event){
        this.setState({
            begin : event.target.value,
        })
    }
    handlerEndChange(event){
        this.setState({
            end : event.target.value,
        })
    }
    handlerChange(event){
        this.setState({
            value : event.target.value,
        })
    }
    handlerFocus(){
        this.setState({
            focus : true,
        })
    }
    handlerBlur(){
        this.setState({
            focus : false,
        })
    }
    render(){
        let rangeContent;
        let content = [];
        if(this.props.range){//范围选择
            content.push(
                <div className="datepicker" style={this.props.inputStyle}>
                    <input type={this.props.type}
                           onChange={this.handlerBeginChange.bind(this)}
                           name="begin"
                           ref="begin"
                           defaultValue ={this.props.rangeDefaultValue.length > 0 ? this.props.rangeDefaultValue[0] : ""}
                           onFocus = {this.handlerFocus.bind(this)}
                           onBlur = {this.handlerBlur.bind(this)}
                    />
                    <input placeholder={this.state.begin != "" && this.state.begin != undefined ? this.state.begin : this.props.rangeHint[0]} readOnly/>
                </div>
            );
            content.push(
                <section>至</section>
            );
            content.push(
                <div className="datepicker" style={this.props.inputStyle}>
                    <input type={this.props.type}
                           onChange={this.handlerEndChange.bind(this)}
                           name="end"
                           ref="end"
                           defaultValue ={this.props.rangeDefaultValue.length > 0 ? this.props.rangeDefaultValue[1] : ""}/>
                    <input placeholder={this.state.end != "" && this.state.end != undefined  ? this.state.end : this.props.rangeHint[1]} readOnly/>
                </div>
            );
            rangeContent = <div className="range-datepicker">{content}</div>
        }else {
            content.push(
                <div className="datepicker" style={this.props.inputStyle}>
                    <input type={this.props.type}
                           onChange={this.handlerChange.bind(this)}
                           ref="date"
                           defaultValue={this.props.defaultValue}
                           onFocus = {this.handlerFocus.bind(this)}
                           onBlur = {this.handlerBlur.bind(this)}
                    />
                    <input placeholder={this.state.value != "" ? this.state.value : this.props.hint} readOnly/>
                </div>
            )
            rangeContent = content;
        }
        return(
            <div className={this.state.focus ? "datepicker-wrapper focus" : "datepicker-wrapper blur"} style={this.props.rootStyle}>
                <header style={this.props.headerStyle}>{this.props.header}</header>
                {rangeContent}
            </div>
        );
    }
}

DatePicker.defaultProps = {
    defaultValue : "",
    rangeDefaultValue : [],
}

DatePicker.propTypes = {
    type : React.PropTypes.string,
    rootStyle : React.PropTypes.object,
    headerStyle : React.PropTypes.object,
    inputStyle : React.PropTypes.object,
}
module.exports = DatePicker;