/**
 * Created by 1 on 2016/6/16.
 */

import React from 'react';
import ReactDOM from 'react-dom';

class JcxDialogTable extends React.Component{
    constructor(props){
        super(props);
    }

    handlerAdd(){
        this.props.onAdd();
    }

    render(){
        let headerWrapper;
        let headers = [];
        for(let i = 0;i < this.props.header.length; i++){
            headers.push(
                <section style={this.props.headerWidth[i]}>{this.props.header[i]}</section>
            );
        }
        headerWrapper = <header>{headers}</header>;

        let contentWrapper = [];
        let contents = [];
        console.log(this.props.items);
        for(let i = 0; i < this.props.items.length;i++){
            for(let j = 0; j < this.props.column.length;j++){
                console.log("i"+i);
                console.log(this.props.items[i][this.props.column[j]]);
                contents.push(
                    <section style={this.props.headerWidth[j]}>{this.props.items[i][this.props.column[j]]}</section>
                );
            }
            contentWrapper.push(<div className="row">{contents}</div>);
            contents = [];
        }

        return(
            <div className="dialogtable-wrapper">
               < header>{this.props.hint}
                    <i className="iconfont" onClick={this.handlerAdd.bind(this)}>&#xe606;</i>
                </header>
                <div className="dialog-table">
                    {headerWrapper}
                    {contentWrapper}
                </div>
            </div>
        )
    }
}

module.exports = JcxDialogTable;
