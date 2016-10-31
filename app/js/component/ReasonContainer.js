/**
 * Created by 1 on 2016/10/24.
 */

import React from 'react';
import ReactDom from 'react-dom';
import { connect } from 'react-redux';
import { Table, Button, Icon} from 'antd';
import { getReasonListRequest, updateReasonRequest, addReasonRequest } from 'actions/ReasonAction';
import ReasonUpdateComponent from 'component/ReasonUpdateComponent';

class ReasonContainer extends React.Component{
    constructor(props){
        super(props);
        let _formData = new FormData();
        _formData.append('token',this.props.token);
        this.props.dispatch(getReasonListRequest(_formData));
        this.state = {
            selectedRowKeys : [],//选中列key
            filteredInfo     : null,//字段过滤信息
            sortedInfo       : null,//排序过滤信息
        }
    }
    /*控制选中列*/
    onSelectChange(selectedRowKeys) {//选中列
        //console.log('selectedRowKeys changed: ', selectedRowKeys);
        this.setState({ selectedRowKeys });
    }
    /*控制表格过滤*/
    handleChange(pagination, filters, sorter){
        //console.log('Various parameters', pagination, filters, sorter);
        this.setState({
            filteredInfo : filters,
            sortedInfo   : sorter,
        });
    }
    handleUpdateModal(reason){
        let { selectedRowKeys } = this.state;
        selectedRowKeys.splice(0,selectedRowKeys.length);
        selectedRowKeys.push(reason.key);
        this.setState({
            selectedRowKeys : selectedRowKeys,
        });
        this.refs.ReasonUpdateComponent.showModal(reason,true);
    }
    handleUpdate(reason){
        console.log(reason);
        let _formData = new FormData();
        _formData.append('token',this.props.token);
        _formData.append('id',reason.id);
        _formData.append('content',reason.content);
        _formData.append('status',reason.status);
        this.props.dispatch(updateReasonRequest(_formData));
        this.refs.ReasonUpdateComponent.handleCancel();
    }
    handleAddModal(){
            let reason = {
            content : "",
            status : '1',
        }
        this.refs.ReasonUpdateComponent.showModal(reason,false);
    }
    handleAdd(reason){
        let _formData = new FormData();
        _formData.append('token',this.props.token);
        _formData.append('content',reason.content);
        _formData.append('status',reason.status);
        this.props.dispatch(addReasonRequest(_formData));
        this.refs.ReasonUpdateComponent.handleCancel();
        this.setState({
            selectedRowKeys : [],
        });
    }
    render(){
        let { selectedRowKeys, sortedInfo, filteredInfo } = this.state;
        sortedInfo = sortedInfo || {};
        filteredInfo = filteredInfo || {};
        const pagination = {
            total: this.props.reasonList.length,
            showSizeChanger: true,
            onShowSizeChange(current, pageSize) {
                //console.log('Current: ', current, '; PageSize: ', pageSize);
            },
            onChange(current) {
                //console.log('Current: ', current);
            },
        };
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange.bind(this),
        };
        const columns = [{
            title:'ID',
            dataIndex:'id',
            key:'id',
        },{
            title:'内容',
            dataIndex:'content',
            key:'content',
        },{
            title:'是否启用',
            dataIndex:'status',
            render : (text,record) => (
                <label className={record.status === '1' ? '启用' : '禁用'}><span></span>{record.status === '1' ? '启用' : '禁用'}</label>
            )

        },{
            title:'操作',
            dataIndex:'action',
            render : (text,record) => (
                <a>
                    <span href="#" onClick={this.handleUpdateModal.bind(this,record)}>更新</span>
                </a>
            )
        }]
        return (
            <div className="x-box reason-wrapper">
                <div className="search-wrapper">
                    <section className="search-item">

                    </section>
                    <section className="serach-btn-group">
                        <Button type="primary"  onClick={this.handleAddModal.bind(this)} icon="plus">
                            新增原因
                        </Button>
                    </section>
                    <section className="serach-count">
                        选择了:<span>{this.state.selectedRowKeys.length}条</span> 总计:<span >{this.props.reasonList.length}条</span >
                    </section>
                    <section className="operation-btn-group">

                    </section>
                </div>
                <Table
                    bordered     = { true }
                    loading      = { this.props.reasonTableLoading }
                    columns      = { columns }
                    dataSource   = { this.props.reasonList }
                    rowSelection = { rowSelection }
                    pagination   = {pagination}
                    onChange     = {this.handleChange.bind(this)}
                >

                </Table>
                <ReasonUpdateComponent ref="ReasonUpdateComponent" title="原因设置" handleUpdate = {this.handleUpdate.bind(this)} handleAdd = {this.handleAdd.bind(this) }></ReasonUpdateComponent>
            </div>
        );
    }
}

function mapStateToProps( state ){
    return {
        token : state.UserReducer.token,//校验使用
        reasonList : state.ReasonReducer.reasonList,
        reasonTableLoading : state.ReasonReducer.reasonTableLoading,
    }
}
module.exports = connect(mapStateToProps)(ReasonContainer);

