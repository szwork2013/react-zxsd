/**
 * Created by 1 on 2016/10/24.
 * 镇/街道管理
 */
import React from 'react';
import ReactDom from 'react-dom';
import { connect } from 'react-redux';
import { Table, Button, Icon} from 'antd';
import { getStreetListRequest, updateStreetRequest, addStreetRequest } from 'actions/StreetAction';
import StreetUpdateComponent from 'component/StreetUpdateComponent';

class StreetContainer extends React.Component{
    constructor(props){
        super(props);
        let _formData = new FormData();
        _formData.append('token',this.props.token);
        this.props.dispatch(getStreetListRequest(_formData));
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
    /*更新街道*/
    handleUpdateModal(street){
        let { selectedRowKeys } = this.state;
        selectedRowKeys.splice(0,selectedRowKeys.length);
        selectedRowKeys.push(street.key);
        this.setState({
            selectedRowKeys : selectedRowKeys,
        });
        this.refs.StreetUpdateComponent.showModal(street,true);
    }
    handleUpdate(street){
        let _formData = new FormData();
        _formData.append('token',this.props.token);
        _formData.append('id',street.id);
        _formData.append('value',street.value);
        _formData.append('label',street.label);
        _formData.append('status',street.status);
        console.log(street.status);
        this.props.dispatch(updateStreetRequest(_formData));
        this.refs.StreetUpdateComponent.handleCancel();
    }
    handleAddModal(){
        let street = {
            label : "",
            value : "",
            status : '1',
        }
        this.refs.StreetUpdateComponent.showModal(street,false);
    }
    handleAdd(street){
        let _formData = new FormData();
        _formData.append('token',this.props.token);
        _formData.append('value',street.value);
        _formData.append('label',street.label);
        this.props.dispatch(addStreetRequest(_formData));
        this.refs.StreetUpdateComponent.handleCancel();
        this.setState({
            selectedRowKeys : [],
        });
    }
    render(){
        let { selectedRowKeys, sortedInfo, filteredInfo } = this.state;
        sortedInfo = sortedInfo || {};
        filteredInfo = filteredInfo || {};
        const pagination = {
            total: this.props.streetList.length,
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
            title:'编码',
            dataIndex:'value',
            key:'value',
        },{
            title:'名称',
            dataIndex:'label',
            key:'label',
        },{
            title:'归属市',
            dataIndex:'father',
            key:'father',
        },{
            title:'是否启用',
            dataIndex:'status',
            render : (text,record) => (
                <label className={record.status === '1' ? '启用' : '禁用'}><span></span>{record.status === '1' ? '启用' : '禁用'}</label>
            )
        },{
            title:'操作',
            key:'action',
            render:(text,record)=>
                (
                    <a>
                        <span href="#" onClick={this.handleUpdateModal.bind(this,record)}>更新</span>
                    </a>
                )
        }]
        return(
            <div className="x-box street-wrapper">
                <div className="search-wrapper">
                    <section className="search-item">

                    </section>
                    <section className="serach-btn-group">
                        <Button type="primary"  onClick={this.handleAddModal.bind(this)} icon="plus">
                            新增街道
                        </Button>
                    </section>
                    <section className="serach-count">
                        选择了:<span>{this.state.selectedRowKeys.length}条</span> 总计:<span >{this.props.streetList.length}条</span >
                    </section>
                    <section className="operation-btn-group">

                     </section>
                </div>
                <Table
                    bordered     = { true }
                    loading      = { this.props.streetTableLoading }
                    columns      = { columns }
                    dataSource   = { this.props.streetList }
                    rowSelection = { rowSelection }
                    pagination   = {pagination}
                    onChange     = {this.handleChange.bind(this)}
                >

                </Table>
                <StreetUpdateComponent ref="StreetUpdateComponent"  title="街道设置" handleUpdate = {this.handleUpdate.bind(this)} handleAdd = {this.handleAdd.bind(this) }></StreetUpdateComponent>
            </div>
        )
    }
}

function mapStateToProps( state ){
    return {
        token : state.UserReducer.token,//校验使用
        streetList : state.StreetReducer.streetList,
        streetTableLoading : state.StreetReducer.streetTableLoading,
    }
}
module.exports = connect(mapStateToProps)(StreetContainer);
