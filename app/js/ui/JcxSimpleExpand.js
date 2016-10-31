/**
 * Created by 1 on 2016/6/19.
 */

import React from 'react';
import ReactDOM from 'react-dom';

import ic_expanded from 'img/ic_expanded.png';

class JcxSimpleExpand extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            slide : false,
        }
    }

    handlerExpand(){
        this.setState({
            slide:!this.state.slide,
        })
        $("#jcxsimpleexpand").slideToggle();
    }

    render(){
        return(
            <div className="expand-panel" onClick={this.handlerExpand.bind(this)}>
                <section className="expand-tip1">
                    <figure className={this.state.slide ? "up" : "down"}><img src={ic_expanded}/></figure>
                    <section>{this.props.hint}</section>
                </section>
            </div>
        );
    }
}

module .exports = JcxSimpleExpand;