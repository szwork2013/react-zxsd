/**
 * Created by 1 on 2016/5/23.
 */
import React from 'react';
import ReactDOM from 'react-dom';

class JcxTextarea extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            length:this.props.defaultValue.length,
        }
    }

    handlerChange(event){
        this.setState({
            length:event.target.value.length,
        })
        this.props.onChange(event.target.value);
    }
    render(){

        return(
           <div className="textarea-wrapper" style={this.props.rootStyle}>
               <textarea
                   placeholder={this.props.hint}
                   defaultValue ={this.props.defaultValue}
                   onChange={this.handlerChange.bind(this)}
                   disabled={this.props.disabled}
                   style={this.props.inputStyle}
                   ref="jcxtextarea"
               >
               </textarea>
               <section style={this.props.tagStyle}>{this.state.length}/1000</section>
           </div>
        );
    }
}


JcxTextarea.defaultProps = {
    defaultValue:"",
}

JcxTextarea.propTypes = {
    hint:React.PropTypes.string,
    defaultValue:React.PropTypes.string,
    onChange:React.PropTypes.func,
    inputStyle:React.PropTypes.object,
    rootStyle:React.PropTypes.object,
    tagStyle:React.PropTypes.object,
    disabled:React.PropTypes.bool,
}

module .exports = JcxTextarea;