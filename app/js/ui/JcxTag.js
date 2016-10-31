/**
 * Created by 1 on 2016/6/27.
 */

import React from 'react';
import ReactDOM from 'react-dom';
import ReactADD from 'react-addons';

class JcxTag extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        const style = {
            backgroundColor:this.props.color,
        }
        return(
            <label className="tag-wrapper" style={style}>{this.props.text}</label>
        )
    }
}

module .exports = JcxTag