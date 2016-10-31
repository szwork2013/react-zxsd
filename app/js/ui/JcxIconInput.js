
/**
 * Created by 1 on 2016/5/19.
 */
import React from 'react';
import ReactDOM from 'react-dom';

class JcxIconInput extends React.Component{
    constructor(props){
        super(props);
        this.state={
            focus:false,
            length:0,
        }
    }

    shouldComponentUpdate(nextProps,nextState){
        return nextProps.value !== this.props.value || nextState !=this.state;
    }

    handlerChange(event){
        this.setState({
            length:event.target.value.length,
        })
        this.props.onChange(event.target.value);
    }
    handlerFocus(){
        this.setState({
            focus:true,
        });
        this.props.onFocus();
    }
    handlerBlur(event){
        this.setState({
            focus:false
        })
        this.props.onBlur(event.target.value);
    }

    handlerClear(){
        $(ReactDOM.findDOMNode(this.refs.jcxinput)).val("");
        $(ReactDOM.findDOMNode(this.refs.jcxinput)).focus();
        this.setState({
            length:0,
        })
    }

    focusaa(){
        $(ReactDOM.findDOMNode(this.refs.jcxinput)).focus();
    }
    getValue(){
        return $("#"+this.props.id).val();
    }
    render(){
        let leftobj = "";
        if(this.props.leftType == "icon"){
            leftobj = <i className={this.state.focus ? "iconfont focus" : "iconfont"} dangerouslySetInnerHTML={{__html:this.props.leftIcon}}></i>;
        }else if(this.props.leftType == "label") {
            leftobj = <label style={this.props.labelStyle}>{this.props.label}</label>;
        }else {
            leftobj = "";
        }
        let rightobj = "";
        if(this.props.rightIcon == "clear"){
            rightobj =  <i className={this.state.length > 0  ? "iconfont" : "iconfont hide" } dangerouslySetInnerHTML={{__html:"&#xe610;"}} onClick={this.handlerClear.bind(this)} style={this.props.rightIconStyle}></i>;
        }else if(this.props.rightIcon == "hidden"){
            rightobj =  <i className="iconfont" dangerouslySetInnerHTML={{__html:"&#xe61f;"}} style={this.props.rightIconStyle}></i>;
        }else if(this.props.rightIcon == 'search'){
            rightobj =  <i className="iconfont" dangerouslySetInnerHTML={{__html:"&#xe60e;"}} style={this.props.rightIconStyle}></i>;
        } else {
            rightobj = <i style={this.props.rightIconStyle}>{this.props.rightText}</i>;
        }
        return(
            <section className={this.state.focus ? "input-wrapper focus" : "input-wrapper blur"} style={this.props.rootStyle}>
                {leftobj}
                <input
                    id={this.props.id}
                    type={this.props.type}
                    defaultValue={this.props.defaultValue}
                    onChange={this.handlerChange.bind(this)}
                    onFocus={this.handlerFocus.bind(this)}
                    onBlur={this.handlerBlur.bind(this)}
                    placeholder={this.props.hint}
                    disabled={this.props.disabled}
                    readOnly={this.props.readOnly}
                    style={this.props.inputStyle}
                    max={30}
                    ref="jcxinput"/>
                {this.props.children}
                {rightobj}
            </section>
        );
    }
}

JcxIconInput.defaultProps={
    type:"text",
    leftType:"",
    disabled:false,
}

JcxIconInput.propTypes = {
    type:React.PropTypes.string,
    defaultValue:React.PropTypes.any,
    leftType:React.PropTypes.string,
    leftIcon:React.PropTypes.string,
    label:React.PropTypes.string,
    value:React.PropTypes.string,
    hint:React.PropTypes.string,
    onChange:React.PropTypes.func,
    onFocus:React.PropTypes.func,
    onBlur:React.PropTypes.func,
    disabled:React.PropTypes.bool,
    name:React.PropTypes.string,
    rootStyle:React.PropTypes.object,
    labelStyle:React.PropTypes.object,
    inputStyle:React.PropTypes.object,
    rightIconStyle:React.PropTypes.object,
}



module .exports = JcxIconInput;

