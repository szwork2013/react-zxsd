/**
 * Created by 1 on 2016/10/20.
 * 网点管理
 */

import React from 'react';
import ReactDom from 'react-dom';
import { connect } from 'react-redux';
import { Table, Button, Icon, Select} from 'antd';
import { getWdListRequest, getZhWdListRequest, updateWdRequest, addWdRequest } from 'actions/WdAction';
import WdUpdateComponent from 'component/WdUpdateComponent';
const Option = Select.Option;

class WdContainer extends React.Component{
    constructor(props){
        super(props);
        let _formData = new FormData();
        _formData.append('token',this.props.token);
        this.props.dispatch(getWdListRequest(_formData));
        this.condition = {};//查询条件
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
    /*控制条件选择框选择*/
    onHandleSelect(key,value) {
        const condition = this.condition;
        condition[key] = value;
        this.condition = condition;
        if(key === 'wd_zid'){//异步获取网点
            let _formData = new FormData();
            _formData.append('token',this.props.token);
            _formData.append('wd_zid',value);
            this.props.dispatch(getZhWdListRequest(_formData));
        }

    }
    /*筛选操作*/
    handleSX(){
        this.setState({
            selectedRowKeys : [],
        });
        let _formData = new FormData();
        _formData.append('token',this.props.token);
        for(let key in this.condition){
            _formData.append(key,this.condition[key]);
        }
        this.props.dispatch(getWdListRequest(_formData));
    }
    /*更新网点modal*/
    handleUpdateModal(wd){
        let { selectedRowKeys } = this.state;
        selectedRowKeys.splice(0,selectedRowKeys.length);
        selectedRowKeys.push(wd.key);
        this.setState({
            selectedRowKeys : selectedRowKeys,
        });
        this.refs.WdUpdateComponent.showModal(wd,true);
    }
    handleUpdate(wd){
        let _formData = new FormData();
        _formData.append('token',this.props.token);
        _formData.append('wd_nid',wd.wd_nid);
        _formData.append('label',wd.label);
        _formData.append('value',wd.value);
        console.log(this.condition);
        this.props.dispatch(updateWdRequest(_formData,this.condition));
        this.refs.WdUpdateComponent.handleCancel();
        this.setState({
            selectedRowKeys : [],
        });
    }
    /*新增网点操作*/
    handleAddModal(){
        let wd = {
            label : "",
            wd_nid : "",
            wd_zid : "",
        }
        this.refs.WdUpdateComponent.showModal(wd,false);
    }
    handleAdd(wd){
        let _formData = new FormData();
        _formData.append('token',this.props.token);
        _formData.append('wd_nid',wd.wd_nid);
        _formData.append('label',wd.label);
        _formData.append('wd_zid',wd.wd_zid);
        _formData.append('wd_zhihang',wd.wd_zhihang);
        this.props.dispatch(addWdRequest(_formData,this.condition));
        this.refs.WdUpdateComponent.handleCancel();
        this.setState({
            selectedRowKeys : [],
        });
    }
    /*撤并网点操作*/
    handleUpdateAndDelete(){

    }
    render(){
        let { selectedRowKeys, sortedInfo, filteredInfo } = this.state;
        sortedInfo = sortedInfo || {};
        filteredInfo = filteredInfo || {};
        const pagination = {
            total: this.props.wdList.length,
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
        //支行选择列
        const zhOption = [];
        this.props.zhiList.map((zhihang,index) => {
             zhOption.push(<Option value={zhihang.wd_zid} key={zhihang.wd_zid}>{zhihang.name}</Option>);
        });
        //网点选择列
        const wdOption = [];
        this.props.zhwdList.map((wd,index) => {
            wdOption.push(<Option value={wd.wd_nid} ket={wd.wd_nid}>{wd.label}</Option>);
        });
        const columns = [{
            title:'网点名称',
            dataIndex:'label',
            key:'label',
        },{
            title:'网点机构号',
            dataIndex:'wd_nid',
            key:'wd_nid',
        },{
            title:'所属支行',
            dataIndex:'wd_zhihang',
            key:'wd_zhihang',
        },{
            title:'支行机构号',
            dataIndex:'wd_zid',
            key:'wd_zid',
        },{
            title:'网点地址',
            dataIndex:'wd_wadd',
            key:'wd_wadd',
        },{
            title:'操作',
            key:'action',
            render:(text,record) =>
                (
                    <a>
                        <span href="#" onClick={this.handleUpdateModal.bind(this,record)}>更新</span>
                    </a>
                )
        }];
        return(
            <div className="x-box wd-wrapper">
                <div className="search-wrapper">
                    <section className="search-item">
                        <label className="search-wrapper-label">支行</label>
                        <Select defaultValue="" style={{ width: 120 }} onSelect={this.onHandleSelect.bind(this,"wd_zid")}>
                            <Option value="">全部</Option>
                            {zhOption}
                        </Select>
                    </section>
                    <section className="search-item">
                        <label className="search-wrapper-label">网点</label>
                        <Select defaultValue="" style={{ width: 120 }} onSelect={this.onHandleSelect.bind(this,"wd_nid")}>
                            <Option value="">全部</Option>
                            {wdOption}
                        </Select>
                    </section>
                    <section className="serach-btn-group">
                        <Button type="primary" onClick={this.handleSX.bind(this)}  icon="sousuo">
                            筛选
                        </Button>
                    </section>
                    <section className="serach-count">
                        选择了:<span>{this.state.selectedRowKeys.length}条</span> 总计:<span >{this.props.wdList.length}条</span >
                        <Button type="ghost" style={{marginLeft:"12px"}} onClick = {this.handleAddModal.bind(this)} icon="plus">
                            新增网点
                        </Button>
                        <Button type="primary" style={{marginLeft:"12px"}}>
                            撤并网点
                        </Button>
                    </section>
                    <section className="operation-btn-group">

                    </section>
                </div>
                <Table
                    bordered     = { true }
                    loading      = { this.props.wdTableLoading }
                    columns      = { columns }
                    dataSource   = { this.props.wdList }
                    rowSelection = { rowSelection }
                    pagination   = {pagination}
                    onChange     = {this.handleChange.bind(this)}
                >

                </Table>
                <WdUpdateComponent ref="WdUpdateComponent"  title="更新网点信息" handleUpdate = {this.handleUpdate.bind(this)} handleAdd = {this.handleAdd.bind(this) } zhihang = {zhOption}></WdUpdateComponent>
            </div>
        );
    }
}

function mapStateToProps( state ){
    return {
        token : state.UserReducer.token,//校验使用
        wdList : state.WdReducer.wdList,
        zhiList :state.WdReducer.zhiList,
        zhwdList : state.WdReducer.zhwdList,
        wdTableLoading : state.WdReducer.wdTableLoading,
    }
}
module .exports = connect(mapStateToProps)(WdContainer);