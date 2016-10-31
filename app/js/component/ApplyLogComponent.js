/**
 * Created by 1 on 2016/10/28.
 */

import React from 'react';
import ReactDom from 'react-dom';
import { connect } from 'react-redux';
import { Table } from 'antd';

class ApplyLogComponent extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        const columns = [{
            title:'操作内容',
            dataIndex:'code',
            key:'code',
            className:'center',
        },{
            title:'操作人员',
            dataIndex:'handleid',
            key:'handleid',
            className:'center'
        },{
            title:'操作时间',
            dataIndex:'addtime',
            key:'addtime',
            className:'center'
        }];
        return(
            <div className="log-wrapper">
                <Table
                    dataSource = {this.props.logList}
                    columns = {columns}
                >
                </Table>
            </div>
        );
    }
}
function mapStateToProps(state){
    return {
        token : state.UserReducer.token,
        logList : state.LogReducer.logList,
    }
}
module .exports = connect(mapStateToProps)(ApplyLogComponent);