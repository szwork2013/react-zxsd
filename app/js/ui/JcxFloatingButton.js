/**
 * Created by 1 on 2016/5/26.
 */

import React from 'react';
import ReactDOM from 'react-dom';
import ReactADD from 'react-addons';

class JcxFloatingButton extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            floating:this.props.floating,
        }
    }
    componentWillReceiveProps(nextProps){
        this.setState({
            floating:nextProps.floating,
        })
    }
    render(){
        let type = this.props.type
        let cx = ReactADD.classSet;
        let className;
        if(type=='up'){
            className = cx({
                'floatbutton-wrapper' : true,
                'animated' :true,
                'fadeInUp' : this.state.floating,
                'fadeOutDown' : !this.state.floating,
            })
        }
        return(
            <div className={className} onClick={this.props.onClick}>
                <i className="iconfont" dangerouslySetInnerHTML={{__html:this.props.icon}}></i>
            </div>
        );
    }
}

module .exports = JcxFloatingButton;