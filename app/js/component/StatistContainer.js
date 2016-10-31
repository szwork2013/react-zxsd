/**
 * Created by 1 on 2016/10/31.
 */
import React from 'react';
import ReactDom from 'react-dom';
import { connect } from 'react-redux';
import { Table, Button, Icon, Select,DatePicker} from 'antd';
import { getZhWdListRequest } from 'actions/WdAction';
import { getStatistListRequest, doExcelOutputRequest } from 'actions/StatistAction';
import { HEADURL } from 'core/Const';

const Option = Select.Option;
const RangePicker = DatePicker.RangePicker;

class StatistContainer extends React.Component{
    constructor(props){
        super(props);
        let _formData = new FormData();
        _formData.append('token',this.props.token);
        this.props.dispatch(getStatistListRequest(_formData));
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
    }
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
    dateChange(dates, dateStrings){
        this.condition['addtime'] = dateStrings;
    }
    handleSX(){
        this.setState({
            selectedRowKeys : [],
        });
        let _formData = new FormData();
        _formData.append('token',this.props.token);
        console.log(this.condition);
        for(let key in this.condition){
            _formData.append(key,this.condition[key]);
        }
        this.props.dispatch(getStatistListRequest(_formData));
    }
    handleExport(){
        this.setState({
            selectedRowKeys : [],
        });
        let _formData = new FormData();
        _formData.append('token',this.props.token);
        console.log(this.condition);
        for(let key in this.condition){
            _formData.append(key,this.condition[key]);
        }
        this.props.dispatch(doExcelOutputRequest(_formData));
        //console.log(this.condition['wd_nid']);
        //window.location.href = `${HEADURL}Wxhsz.php?m=WxHSZ&c=ZxsdAPI&a=exportexcel&wd_zid=${this.condition['wd_zid']}&wd_nid=${this.condition['wd_nid']}&addtime=${this.condition['addtime']}"`;
    }
    render(){
        let { selectedRowKeys, sortedInfo, filteredInfo } = this.state;
        sortedInfo = sortedInfo || {};
        filteredInfo = filteredInfo || {}; const pagination = {
            total: this.props.statistList.length,
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
            title:'网点机构号',
            key:'wd_nid',
            dataIndex:'wd_nid',
        },{
            title:'网点名称',
            key:'label',
            dataIndex:'label',
        },{
            title:'未受理',
            children : [{
                title:'户数（人）',
                key:'num1',
                dataIndex:'num1'
            },{
                title:'金额（万）',
                key:'money1',
                dataIndex:'money1'
            }],
        },{
            title:'受理中',
            children : [{
                title:'户数（人）',
                key:'num2',
                dataIndex:'num2'
            },{
                title:'金额（万）',
                key:'money2',
                dataIndex:'money2'
            }],
        },{
            title:'受理成功',
            children : [{
                title:'户数（人）',
                key:'num3',
                dataIndex:'num3'
            },{
                title:'金额（万）',
                key:'money3',
                dataIndex:'money3'
            }],
        },{
            title:'拒绝受理',
            children : [{
                title:'户数（人）',
                key:'num4',
                dataIndex:'num4'
            },{
                title:'金额（万）',
                key:'money4',
                dataIndex:'money4'
            }],
        }];
        return(
            <div className="x-box statist-wrapper">
                <div className="search-wrapper">
                    <section className="search-item">
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
                            <label className="search-wrapper-label">申请日期</label>
                            <RangePicker style={{ width:"200" }} onChange={this.dateChange.bind(this)}/>
                        </section>
                    </section>
                    <section className="serach-btn-group">
                        <Button type="primary" onClick={this.handleSX.bind(this)}  icon="sousuo">
                            筛选
                        </Button>
                    </section>
                    <section className="serach-count">
                        选择了:<span>{this.state.selectedRowKeys.length}条</span> 总计:<span >{this.props.statistList.length}条</span >

                        <Button type="ghost" style={{marginLeft:"12px"}} onClick={this.handleExport.bind(this)}>
                            Excel导出
                        </Button>
                    </section>
                </div>
                <Table
                    bordered     = { true }
                    loading      = { this.props.statistTableLoading }
                    columns      = { columns }
                    dataSource   = { this.props.statistList }
                    rowSelection = { rowSelection }
                    pagination   = {pagination}
                >

                </Table>
            </div>
        );
    }
}
function mapStateToProps(state){
    return {
        token : state.UserReducer.token,
        statistList : state.StatistReducer.statistList,
        statistTableLoading : state.StatistReducer.statistTableLoading,
        zhList : state.StatistReducer.zhList,
        zhwdList : state.WdReducer.zhwdList,
    }
}
module .exports = connect(mapStateToProps)(StatistContainer);