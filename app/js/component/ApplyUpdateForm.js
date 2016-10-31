/**
 * Created by 1 on 2016/10/27.
 */

import React from 'react';
import ReactDom from 'react-dom';
import {Row,Col, Form, Input, Select, Cascader, Radio } from 'antd';
const FormItem = Form.Item;
const createForm = Form.create;
const Option = Select.Option;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

const guarantee = [{
    value:'1',
    label:'信用',
},{
    value:'2',
    label:'担保',
},{
    value:'3',
    label:'抵质押',
}]
class ApplyUpdateForm extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        const { getFieldDecorator,setFieldsValue,getFieldsValue } = this.props.form;
        const formItemLayout = {
            labelCol: { span: 7 },
            wrapperCol: { span: 12 },
        };
        let prodOptions = [];
        this.props.prodList.map(( obj,index )=>{
            prodOptions.push(<Option value={obj.value} key={index}>{obj.label}</Option>);
        });
        let qxOptions = [];
        this.props.qxList.map(( obj,index )=>{
            qxOptions.push(<Option value={obj.value} key={index}>{`${obj.label}年`}</Option>);
        });
        return(
            <Form horizontal >
                <Row gutter={24}>
                    <Col sm={12}>
                        <FormItem
                            id="label"
                            label="客户姓名"
                            {...formItemLayout}
                        >
                            {getFieldDecorator('username',{
                                rules: [
                                    { required: true, message: '请填写客户姓名' },
                                ],
                            })(
                                <Input id="label" placeholder="请填写客户姓名"  disabled={this.props.optype}/>
                            )}
                        </FormItem>
                        <FormItem
                            id="phone"
                            label="手机号码"
                            {...formItemLayout}
                        >
                            {getFieldDecorator('phone',{
                                rules: [
                                    { required: true, message: '请填写手机号码' },
                                ],
                            })(
                                <Input id="wd_nid" placeholder="请填写手机号码" disabled={this.props.optype}/>
                            )}
                        </FormItem>
                        <FormItem
                            id="phone"
                            label="身份证"
                            {...formItemLayout}
                        >
                            {getFieldDecorator('certno',{
                                rules: [
                                    { required: true, message: '请填写身份证' },
                                ],
                            })(
                                <Input id="certno" placeholder="请填写身份证" disabled={this.props.optype}/>
                            )}
                        </FormItem>
                        <FormItem
                            id="region"
                            label="镇/街道"
                            {...formItemLayout}
                        >
                            {getFieldDecorator('region',{
                                rules: [
                                    { required: true,type:'array', message: '请填写镇/街道' },
                                ],
                            })(
                                <Cascader options={this.props.regionList} disabled={this.props.optype}></Cascader>
                            )}
                        </FormItem>
                        <FormItem
                            id="addr"
                            label="详细地址"
                            {...formItemLayout}
                        >
                            {getFieldDecorator('addr',{
                                rules: [
                                    { required: true, message: '请填写详细地址' },
                                ],
                            })(
                                <Input id="addr" placeholder="请填写详细地址" disabled={this.props.optype}/>
                            )}
                        </FormItem>
                        <FormItem
                            id="type"
                            label="贷款种类"
                            {...formItemLayout}
                        >
                            {getFieldDecorator('type',{

                                rules: [
                                    { required: true, message: '请填写贷款种类' },
                                ],
                            })(
                                <Select placeholder="请选择贷款种类" disabled={this.props.optype}>
                                    {prodOptions}
                                </Select>
                            )}
                        </FormItem>
                        <FormItem
                            id="type"
                            label="贷款期限"
                            {...formItemLayout}
                        >
                            {getFieldDecorator('qx',{
                                rules: [
                                    { required: true, message: '请填写贷款期限' },
                                ],
                            })(
                                <Select placeholder="请选择贷款期限" disabled={this.props.optype}>
                                    {qxOptions}
                                </Select>
                            )}
                        </FormItem>
                        <FormItem
                            id="money"
                            label="贷款金额"
                            {...formItemLayout}
                        >
                            {getFieldDecorator('money',{
                                rules: [
                                    { required: true, message: '请填写贷款金额' },
                                ],
                            })(
                                <Input id="qx" placeholder="请填写贷款金额" addonAfter="万" disabled={this.props.optype}/>
                            )}
                        </FormItem>
                    </Col>
                    <Col sm={12}>
                        <FormItem
                            id="contract"
                            label="贷款合同号"
                            {...formItemLayout}
                        >
                            {getFieldDecorator('contract',{
                                rules: [
                                    { required: true, message: '请填写贷款合同号' },
                                ],
                            })(
                                <Input id="contract" placeholder="请填写贷款合同号" disabled={this.props.optype}/>
                            )}
                        </FormItem>
                        <FormItem
                            id="guarantee"
                            label="担保方式"
                            {...formItemLayout}
                        >
                            {getFieldDecorator('guarantee',{
                                rules: [
                                    { required: true, message: '请选择担保方式' },
                                ],
                            })(
                                <RadioGroup disabled={this.props.optype}>
                                    <RadioButton value="1">信用</RadioButton>
                                    <RadioButton value="2">担保</RadioButton>
                                    <RadioButton value="3">抵质押</RadioButton>
                                </RadioGroup>
                            )}
                        </FormItem>
                        <FormItem
                            id="cust_no"
                            label="办理柜员号"
                            {...formItemLayout}
                        >
                            {getFieldDecorator('cust_no',{
                                rules: [
                                    { required: true,type:'string',len:7, message: '请填写办理柜员号(7位数)' },
                                ],
                            })(
                                <Input id="cust_no" placeholder="请填写办理柜员号" disabled={this.props.optype}/>
                            )}
                        </FormItem>
                    </Col>
                </Row>
            </Form>
        );
    }
}

module.exports = createForm({
    mapPropsToFields(props) {
        return {
            username : {value:props.apply.username},
            phone : {value:props.apply.phone},
            certno : {value:props.apply.certno},
            addr : {value:props.apply.addr},
            region : {value:[props.apply.cityid,props.apply.streetid]},
            type : {value:props.apply.prodid},
            qx : {value:props.apply.qxid},
            money : {value:props.apply.money},
            contract : {value:props.apply.contract},
            guarantee : {value:props.apply.guarantee},
            cust_no : {value:props.apply.cust_no},
        };
    },
})(ApplyUpdateForm);