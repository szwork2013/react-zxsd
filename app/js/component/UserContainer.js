/**
 * Created by 1 on 2016/10/25.
 */

import React from 'react';
import ReactDom from 'react-dom';
import { connect } from 'react-redux';
import { Table, Button, Icon, Select, Input, Upload, message, Modal } from 'antd';
import { getUserRequest,updateUserRequest, addUserRequest } from 'actions/UserAction';
import { getZhWdListRequest } from 'actions/WdAction';
import { loadingAction, loadedAction } from 'actions/MainAction';
import UserUpdateComponent from 'component/UserUpdateComponent';
import {HEADURL} from 'core/Const';
const Option = Select.Option;
const ButtonGroup = Button.Group;

class UserContainer extends React.Component{
    constructor(props){
        super(props);
        let _formData = new FormData();
        _formData.append('token',this.props.token);
        this.props.dispatch(getUserRequest(_formData));
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
    handleSX(){
        this.setState({
            selectedRowKeys : [],
        });
        let _formData = new FormData();
        _formData.append('token',this.props.token);
        for(let key in this.condition){
            _formData.append(key,this.condition[key]);
        }
        this.props.dispatch(getUserRequest(_formData));
    }
    onHandleSelect(key,value) {
        const condition = this.condition;
        if(key === 'cust_no' || key === 'name'){
            condition[key] = value.target.value;
        }else{
            condition[key] = value;
        }
        this.condition = condition;
        if(key === 'wd_zid'){//异步获取网点
            let _formData = new FormData();
            _formData.append('token',this.props.token);
            _formData.append('wd_zid',value);
            this.props.dispatch(getZhWdListRequest(_formData));
        }

    }
    handleUpdateModal(user){
        let { selectedRowKeys } = this.state;
        selectedRowKeys.splice(0,selectedRowKeys.length);
        selectedRowKeys.push(user.key);
        this.setState({
            selectedRowKeys : selectedRowKeys,
        });
        this.refs.UserUpdateComponent.showModal(user,true);
    }
    handleUpdate(user){
        let _formData = new FormData();
        _formData.append('token',this.props.token);
        for(let key in user){
            _formData.append(key,user[key]);
        }
        this.props.dispatch(updateUserRequest(_formData,this.condition));
        this.refs.UserUpdateComponent.handleCancel();
        this.setState({
            selectedRowKeys : [],
        });
    }
    handleAddModal(){
        let user = {
            name : "",
            cust_no : "",
            z_id : "",
            w_id : "",
            roleid : "",
            password : "",
            status : '1',
        }
        this.refs.UserUpdateComponent.showModal(user,false);
    }
    handleAdd(user){
        let _formData = new FormData();
        _formData.append('token',this.props.token);
        for(let key in user){
            _formData.append(key,user[key]);
        }
        this.props.dispatch(addUserRequest(_formData,this.condition));
        this.refs.UserUpdateComponent.handleCancel();
        this.setState({
            selectedRowKeys : [],
        });
    }
    /*控制上传文件类型*/
    handleCheckFile(file){
        if(file.type === 'application/vnd.ms-excel' || file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'){
            return true;
        }else{
            message.error('请上传excel文件',2);
            return false;
        }
    }

    /*监听上传文件状态变化*/
    handleFileChange(info){
        if (info.file.status !== 'uploading') {
            this.props.dispatch(loadingAction());
        }
        if (info.file.status === 'done') {
            this.props.dispatch(loadedAction());
            if(info.file.response.status == '2002'){
                let _formData = new FormData();
                _formData.append('token',this.props.token);
                for(key in this.condition){
                    _formData.append(key,this.condition[key]);
                }
                this.props.dispatch(getUserRequest(_formData));
                message.success(info.file.response.msg,2);
                this.setState({
                    selectedRowKeys : [],
                });

            }else{
                Modal.error({
                    title: '错误',
                    content:info.file.response.msg,
                    okText: 'OK',
                });
            }
        } else if (info.file.status === 'error') {
            this.props.dispatch(loadedAction());
            message.error('操作失败',2);
            //message.error(`${info.file.name} file upload failed.`);
        }
    }
    handleDownload(){
        window.location.href = `${HEADURL}Uploads/upload/zxsdv1.0.xlsx`;
    }
    render(){
        let { selectedRowKeys, sortedInfo, filteredInfo } = this.state;
        sortedInfo = sortedInfo || {};
        filteredInfo = filteredInfo || {}; const pagination = {
            total: this.props.userList.length,
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
        this.props.zhList.map((zhihang,index) => {
            zhOption.push(<Option value={zhihang.wd_zid} key={zhihang.wd_zid}>{zhihang.name}</Option>);
        });
        //网点选择列
        const wdOption = [];
        this.props.zhwdList.map((wd,index) => {
            wdOption.push(<Option value={wd.wd_nid} ket={wd.wd_nid}>{wd.label}</Option>);
        });
        const columns = [{
            title:'柜员号',
            dataIndex:'cust_no',
            key:'cust_no'
        },{
            title:'姓名',
            dataIndex:'name',
            key:'name'
        },{
            title:'网点机构号',
            dataIndex:'w_id',
            key:'w_id',
        },{
            title:'网点名称',
            dataIndex:'wd_name',
            key:'wd_name',
        },{
            title:'角色',
            dataIndex:'rolename',
            key:'rolename',
        },{
            title:'修改日期',
            dataIndex:'addtime',
            key:'addtime',
        },{
            title:'是否启用',
            dataIndex:'status',
            render : (text,record) => (
            <label className={record.status === '1' ? '启用' : '禁用'}><span></span>{record.status === '1' ? '启用' : '禁用'}</label>
        )
        },{
            title:'操作',
            dataIndex:'action',
            render: (text,record) => (
                <a>
                    <span href="#" onClick={this.handleUpdateModal.bind(this,record)}>更新</span>
                    <span className="ant-divider"></span>
                </a>
            )
        }];
        return(
            <div className="x-box user-wrapper">
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
                    <section className="search-item">
                        <label className="search-wrapper-label">柜员号</label>
                        <Input style={{width:120}} onChange={this.onHandleSelect.bind(this,"cust_no")}/>
                    </section>
                    <section className="search-item">
                        <label className="search-wrapper-label">姓名</label>
                        <Input style={{width:120}} onChange={this.onHandleSelect.bind(this,"name")}/>
                    </section>
                    <section className="serach-btn-group">
                        <Button type="primary" onClick={this.handleSX.bind(this)} icon="sousuo">
                            筛选
                        </Button>
                    </section>
                    <section className="serach-count">
                        选择了:<span>{this.state.selectedRowKeys.length}条</span> 总计:<span >{this.props.userList.length}条</span >
                        <Button type="ghost" style={{marginLeft:"12px"}} onClick = {this.handleAddModal.bind(this)} icon="plus">
                            新增用户
                        </Button>
                        <Upload
                            name = 'userExcel'
                            action = {`${HEADURL}Wxhsz.php?m=WxHSZ&c=ZxsdAPI&a=updateExcelByExcel`}
                            data = {{token:this.props.token}}
                            beforeUpload = {this.handleCheckFile.bind(this)}
                            onChange = {this.handleFileChange.bind(this)}
                            showUploadList = {false}
                        >
                            <Button type="ghost" style={{marginLeft:"12px"}}  icon="to-top">
                                Excel导入
                            </Button>
                        </Upload>
                        <Button type="ghost" style={{marginLeft:"12px"}}  icon="download" onClick={this.handleDownload.bind(this)}>
                            模板下载
                        </Button>
                    </section>
                </div>
                <Table
                    bordered     = { true }
                    loading      = { this.props.userTableLoading }
                    columns      = { columns }
                    dataSource   = { this.props.userList }
                    rowSelection = { rowSelection }
                    pagination   = {pagination}
                    onChange     = {this.handleChange.bind(this)}
                >
                </Table>
                <UserUpdateComponent ref="UserUpdateComponent"  title="更新用户信息" handleUpdate = {this.handleUpdate.bind(this)} handleAdd = {this.handleAdd.bind(this) } wdList={this.props.wdList}></UserUpdateComponent>
            </div>
        );
    }
}

function mapStateToProps( state ) {
    return {
        token: state.UserReducer.token,//校验使用
        userList: state.UserReducer.userList,
        zhList : state.UserReducer.zhList,
        zhwdList : state.WdReducer.zhwdList,
        wdList : state.UserReducer.wdList,
        userTableLoading: state.UserReducer.userTableLoading,
    }
}

module.exports = connect(mapStateToProps)(UserContainer);
