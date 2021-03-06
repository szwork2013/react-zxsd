/**
 * Created by 1 on 2016/10/8.
 */
import React from 'react';
import ReactDom from 'react-dom';
import { connect } from 'react-redux';
import { Table,Icon,Select,Button, message,DatePicker } from 'antd';
import { getDKApplyListRequest} from 'actions/index';
import { getApplyLogListRequest } from 'actions/LogAction';
import { getZhWdListRequest } from 'actions/WdAction';
import ApplyImproveComponent from 'component/ApplyImproveComponent'
const Option = Select.Option;
const RangePicker = DatePicker.RangePicker;

class QcenterContainer extends React.Component{
    constructor(props){
        super(props);
        let _formData = new FormData();
        _formData.append('token',this.props.token);
        this.props.dispatch(getDKApplyListRequest(_formData));
        this.condition = {};
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
    }/*控制表格过滤*/
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
        this.props.dispatch(getDKApplyListRequest(_formData));
    }
    dateChange(dates, dateStrings){
        this.condition['addtime'] = dateStrings;
    }
    /*完善资料确认*/
    handleWSConfirm(value){
        let _formData = new FormData();
        _formData.append('token',this.props.token);
        for(let key in value){
            _formData.append(key,value[key]);
        }
        this.props.dispatch(doUpdateApply(_formData,this.condition));
        this.refs.ApplyImproveComponent.handleCancel();
        this.setState({
            selectedRowKeys : [],
        });
    }
    /*查看详细modal*/
    handleViewDetail(selectedKeys,record){
        if(selectedKeys instanceof Array && selectedKeys.length === 0){
            message.error('至少选择一项操作件！',2);
            return;
        }
        //如果只选择一条 改变前端选择框样式，使用this.state.selectedRowKeys来控制选中的数据id
        if(typeof selectedKeys === 'string'){
            let { selectedRowKeys } = this.state;
            selectedRowKeys.splice(0,selectedRowKeys.length);
            selectedRowKeys.push(selectedKeys);
            this.setState({
                selectedRowKeys : selectedRowKeys,
            });
        }
        //获取操作日志
        let _formData = new FormData();
        _formData.append('token',this.props.token);
        _formData.append('apply_id',record.id);
        this.props.dispatch(getApplyLogListRequest(_formData));

        this.refs.ApplyImproveComponent.showModal(record,false);
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
    render(){
        let prodOptions = [];
        this.props.prodList.map((obj,index) => {
            prodOptions.push(<Option value={obj.label}>{obj.label}</Option>)
        });
        let { selectedRowKeys, sortedInfo, filteredInfo } = this.state;
        sortedInfo = sortedInfo || {};
        filteredInfo = filteredInfo || {};
        const pagination = {
            total: this.props.dkApplyList.length,
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
        /*表头*/
        const columns = [{
            title:'贷款种类',
            dataIndex:'prod',
            key:'prod',
        },{
            title:'姓名',
            dataIndex:'username',
            key:'username',
        },{
            title:'手机号',
            dataIndex:'phone',
            key:'phone',
        },{
            title:'身份证',
            dataIndex:'certno',
            key:'certno',
        },{
            title:'期限(年)',
            dataIndex:'qx',
            key:'qx',
            sorter: (a, b) => a.qx - b.qx,
            sortOrder: sortedInfo.columnKey === 'qx' && sortedInfo.order,
        },{
            title:'金额(万)',
            dataIndex:'money',
            key:'money',
            sorter: (a, b) => a.money - b.money,
            sortOrder: sortedInfo.columnKey === 'money' && sortedInfo.order,
        },{
            title:'意向网点',
            dataIndex:'wd',
            key:'wd',
        },{
            title:'申请日期',
            dataIndex:'addtime',
            key:'addtime',
        },{
            title:'状态',
            dataIndex:'state',
            key:'state',
            render: (text,record) => (<label className={record.state}><span></span>{text}</label>)
        },{
            title:'操作',
            key:'action',
            render: (text,record) =>
                (<a>
                    <span href="#" onClick={this.handleViewDetail.bind(this,record.key,record)}>查看</span>
                </a>),
        }];
        return(
            <div className="x-box sdsl-wrapper">
                <div className="search-wrapper">
                    <section className="search-item">
                        <label className="search-wrapper-label">贷款种类</label>
                        <Select defaultValue="" style={{ width: 120 }} onSelect={this.onHandleSelect.bind(this,"prod")}>
                            <Option value="">全部</Option>
                            {prodOptions}
                        </Select>
                    </section>
                    <section className="search-item">
                        <label className="search-wrapper-label">贷款状态</label>
                        <Select defaultValue="全部" style={{ width: 120 }} onSelect={this.onHandleSelect.bind(this,"state")}>
                            <Option value="">全部</Option>
                            <Option value="未受理">未受理</Option>
                            <Option value="受理中">受理中</Option>
                            <Option value="受理成功">受理成功</Option>
                            <Option value="拒绝受理">拒绝受理</Option>
                        </Select>
                    </section>
                    <section className="search-item">
                        <label className="search-wrapper-label">申请日期</label>
                        <RangePicker style={{ width:"200" }} onChange={this.dateChange.bind(this)}/>
                    </section>

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
                        选择了:<span>{this.state.selectedRowKeys.length}条</span> 总计:<span >{this.props.dkApplyList.length}条</span >
                    </section>
                </div>
                <Table
                    bordered     = { true }
                    loading      = { this.props.applyTableLoading }
                    columns      = { columns }
                    dataSource   = { this.props.dkApplyList }
                    rowSelection = { rowSelection }
                    pagination   = {pagination}
                    onChange     = {this.handleChange.bind(this)}
                >

                </Table>
                <ApplyImproveComponent
                    ref="ApplyImproveComponent"
                    title="客户资料"
                    handleWSConfirm={this.handleWSConfirm.bind(this)}
                    prodList = {this.props.prodList}
                    qxList = {this.props.qxList}
                    regionList = {this.props.regionList}
                >
                </ApplyImproveComponent>
            </div>
        );
    }
}
function mapStateToProps(state){
    return {
        token : state.UserReducer.token,
        dkApplyList : state.SdslReducer.dkApplyList,
        applyTableLoading : state.SdslReducer.applyTableLoading,
        wdList : state.SdslReducer.wdList,
        prodList : state.SdslReducer.prodList,
        qxList : state.SdslReducer.qxList,
        reasonList : state.SdslReducer.reasonList,
        regionList : state.SdslReducer.regionList,
        zhwdList : state.WdReducer.zhwdList,
        zhList : state.SdslReducer.zhList,
    }
}

module .exports = connect(mapStateToProps)(QcenterContainer);