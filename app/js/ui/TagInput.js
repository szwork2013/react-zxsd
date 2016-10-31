/**
 * Created by 1 on 2016/6/14.
 */

import React from 'react';
import ReactDOM from 'react-dom';
import JcxIconInput from 'ui/JcxIconInput';
import * as jcx from 'core/Const';

class TagInput extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            item:jcx[this.props.type],
            selectitem:this.props.items,
        }

    }

    handlerClick(i){
        let selectitem = [];
        selectitem = this.state.selectitem;
        if($.inArray(i,this.state.selectitem) > -1){
            selectitem .splice($.inArray(i,this.state.selectitem),1);
            this.setState({
                selectitem:selectitem
            })
        }else{
            selectitem.push(i);
            this.setState({
                selectitem:selectitem,
            })
        }
    }

    render(){
        let unselect = [];
        for(let i = 0;i<this.state.item.length/3;i++){
            let unselectItem = [];
            for(let j=i*3;j < (i+1)*3;j++){
                if(j>this.state.item.length-1){
                    unselectItem.push(
                        <section>
                            <span className="label" style={{padding:"0"}}></span>
                        </section>
                    )
                }else{
                    if($.inArray(j,this.state.selectitem) > -1){
                        unselectItem.push(
                            <section>
                                <span className="label active" onClick={this.handlerClick.bind(this,j)}>{this.state.item[j]}</span>
                            </section>
                        )
                    }else{
                        unselectItem.push(
                            <section>
                                <span className="label" onClick={this.handlerClick.bind(this,j)}>{this.state.item[j]}</span>
                            </section>
                        )
                    }

                }

            }
            unselect.push(
                <div id="unselect">
                    {unselectItem}
                </div>
            )
        }
        return(
            <div className="taginput-wrapper">
                <header>{this.props.hint}
                </header>
                {unselect}
                <div>
                    <JcxIconInput
                        type = "text"
                        defaultValue={this.props.other}
                        leftType = ""
                        hint = {this.props.inputHint}
                        inputStyle={this.props.inputStyle}
                    />
                </div>
            </div>
        )
    }
}

module .exports = TagInput;