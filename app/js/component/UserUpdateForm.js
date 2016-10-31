/**
 * Created by 1 on 2016/10/26.
 */
import React from 'react';
import ReactDom from 'react-dom';
import { Form, Input,Select,Radio, Cascader, Checkbox } from 'antd';
const FormItem = Form.Item;
const createForm = Form.create;
const Option = Select.Option;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

class UserUpdateForm extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        const { getFieldDecorator,setFieldsValue,getFieldsValue } = this.props.form;

        const formItemLayout = {
            labelCol: { span: 7 },
            wrapperCol: { span: 12 },
        };
        return(
            <Form horizontal >
                <FormItem
                    id="cust_no"
                    label="柜员号"
                    {...formItemLayout}
                >
                    {getFieldDecorator('cust_no',{
                        rules: [
                            { required: true,type:'string',len:7,message: '请输入柜员号(7位数)' },
                        ],
                    })(
                        <Input id="cust_no" placeholder="请填写柜员号" disabled={this.props.optype} />
                    )}
                </FormItem>
                <FormItem
                    id="name"
                    label="柜员姓名"
                    {...formItemLayout}
                >
                    {getFieldDecorator('name',{
                        rules: [
                            { required: true,message: '请填写柜员姓名' },
                        ],
                    })(
                        <Input id="name" placeholder="请填写柜员姓名"/>
                    )}
                </FormItem>
                <FormItem
                    id="w_id"
                    label="所属网点"
                    {...formItemLayout}
                >
                    {getFieldDecorator('w_id',{
                        rules: [
                            { required: true, type:'array',message: '请选择所属网点' },
                        ],
                    })(
                        <Cascader options={this.props.wdList} placeholder="请选择所属网点" />
                    )}
                </FormItem>
                <FormItem
                    id="name"
                    label="分配角色"
                    {...formItemLayout}
                >
                    {getFieldDecorator('role',{
                        rules: [
                            { required: true, message: '请选择角色' },
                        ],
                    })(
                        <RadioGroup >
                            <RadioButton value="AD">管理员</RadioButton>
                            <RadioButton value="NR">普通用户</RadioButton>
                        </RadioGroup>
                    )}
                </FormItem>
                <FormItem
                    id="name"
                    label="密码"
                    {...formItemLayout}
                >
                    {getFieldDecorator('password',{
                        rules: [
                            { required: true, len:6,message: '请填写密码并且大于6位' },
                        ],
                    })(
                        <Input id="password" placeholder="请填写密码"  />
                    )}
                </FormItem>
                <FormItem
                    id="status"
                    label="是否启用"
                    {...formItemLayout}
                >
                    {getFieldDecorator('status',{
                        valuePropName : 'checked'
                    })(
                        <Checkbox></Checkbox>
                    )}
                </FormItem>
            </Form>
        )
    }
}
module.exports = createForm({
    mapPropsToFields(props) {
        let w_id = "";
        if(props.user.z_id && props.user.w_id){
            w_id = [props.user.z_id+"0",props.user.w_id];
        }
        return {
            name : {value: props.user.name},
            cust_no : {value : props.user.cust_no},
            role : {value : props.user.roleid},
            w_id : {value :w_id},
            status : {value:props.user.status === '1' ? true : false},
            password : {value:props.user.password}
        };
    },
})(UserUpdateForm);