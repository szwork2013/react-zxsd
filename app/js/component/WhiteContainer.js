/**
 * Created by 1 on 2016/9/28.
 */
import React from 'react';
import ReactDom from 'react-dom';

class WhiteContainer extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        let vheight = this.props.height+"px";
        return(
            <div className="lite-space" style={{height:vheight}}>

            </div>
        )
    }
}
module .exports = WhiteContainer;