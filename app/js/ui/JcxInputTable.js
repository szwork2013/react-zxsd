/**
 * Created by 1 on 2016/6/13.
 */

import React from 'react';
import ReactDOM from 'react-dom';
import JcxIconInput from 'ui/JcxIconInput';
import JcxButton from 'ui/JcxButton';


class JcxInputTable extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            total:1,//总行数
            activeIndex:1,//激活行数
            list:[],
        }
    }

    componentDidUpdate(prevProps,prevState){
        this.refs.jcx.focusaa();
    }

    handlerAdd(){
        this.setState({
            total:this.state.total+1,
            activeIndex:this.state.total+1,
        })
        console.log(this.state.list);
    }

    handlerEdit(i){
        this.setState({
            activeIndex:i,
        })
    }
    handlerDelete(i){
        let list = this.state.list;
        list.splice(i,1);
        this.setState({
            total:this.state.total-1,
            activeIndex:0,
            list:list,
        })


    }

    handlerBlur(i,value){
        if(value == ""){
            return;
        }
        let list = this.state.list;
        list[i] = value;
        this.setState({
            activeIndex:0,
            list : list,
        })
    }


    render(){
        let content=[];
        for(let i = 1;i<=this.state.total;i++){
            if(i == this.state.activeIndex){
                content.push(
                    <JcxIconInput
                        type = "text"
                        leftType = "label"
                        defaultValue = {this.state.list[i]}
                        label={i+"."}
                        hint = {this.props.hint}
                        onBlur={this.handlerBlur.bind(this,i)}
                        ref="jcx"
                        labelStyle = {this.props.labelStyle}
                        inputStyle = {this.props.inputStyle}
                    />
                )
            }else{
                content.push(
                   <section >
                       <label>
                           {i+"."}
                       </label>
                       <section>{this.state.list[i]}</section>
                       <i className="iconfont" onClick={this.handlerEdit.bind(this,i)}>&#xe623;</i>
                       <i className="iconfont" onClick={this.handlerDelete.bind(this,i)}>&#xe624;</i>
                   </section>
                )
            }
        }

        return(
            <div className="inputtable-wrapper">
                <header>{this.props.hint}
                    <i className="iconfont" onClick={this.handlerAdd.bind(this)}>&#xe606;</i>
                </header>
                {content}
            </div>
        );
    }
}

module .exports = JcxInputTable;