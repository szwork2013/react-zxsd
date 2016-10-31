/**
 * Created by 1 on 2016/6/12.
 */


import React from 'react';
import ReactDOM from 'react-dom';
import ReactADD from 'react-addons';
import {circleTab} from 'ui/UIConst';


class CircleTabs extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        let content=[];
        let text=[];
        for(let i = 1;i<= this.props.totalIndex; i++){
            if(i <=  this.props.activeIndex){
                content.push(
                    <figure>
                        <img src={circleTab.active[i-1]}/>
                    </figure>
                )
                if(this.props.activeIndex == i){
                    text.push(<section className="active current">{this.props.texts[i-1]}</section>)
                }else{
                    text.push(<section className="active">{this.props.texts[i-1]}</section>)
                }
            }else{
                content.push(
                    <figure>
                        <img src={circleTab.unactive[i-1]}/>
                    </figure>
                )
                text.push(<section >{this.props.texts[i-1]}</section>)
            }
            if(this.props.totalIndex>1 && i<this.props.totalIndex && this.props.activeIndex>i){
                content.push(
                    <div className="active">
                        <section></section>
                    </div>
                );
            }
            if(this.props.totalIndex>1 && i<this.props.totalIndex && this.props.activeIndex<=i){
                content.push(
                    <div>
                        <section></section>
                    </div>
                );
            }

        }
        var cx = ReactADD.classSet;
        var textClassName = cx({
            'circle-tab-text':true,
             'normal':this.props.type=='normal',
        });
        return(
            <div style={this.props.rootStyle}>
                <div className={this.props.type == 'circle' ? "circle-tab" : "hide" } style={this.props.imgStyle}>
                    {content}
                </div>
                <div className={textClassName} style={this.props.textStyle}>
                    {text}
                </div>
            </div>

        )
    }
}

CircleTabs.propTypes = {
    type:React.PropTypes.string,
    rootStyle:React.PropTypes.object,
    imgStyle:React.PropTypes.object,
    textStyle:React.PropTypes.object,
}

module .exports = CircleTabs;