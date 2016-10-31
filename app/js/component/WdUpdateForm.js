/**
 * Created by 1 on 2016/10/21.
 */

import React from 'react';
import ReactDom from 'react-dom';
import { Form, Input,Select } from 'antd';
const FormItem = Form.Item;
const createForm = Form.create;
const Option = Select.Option;

class WdUpdateForm extends React.Component{
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
                    id="label"
                    label="网点名称"
                    {...formItemLayout}
                >
                    {getFieldDecorator('label',{
                        rules: [
                            { required: true, message: '请填写网点名称' },
                        ],
                    })(
                        <Input id="label" placeholder="请填写网点名称"  />
                    )}
                </FormItem>
                <FormItem
                    id="wd_nid"
                    label="网点机构号"
                    {...formItemLayout}
                >
                    {getFieldDecorator('wd_nid',{
                        rules: [
                            { required: true,type:'string',len:6, message: '请填写网点号(6位数)' },
                        ],
                    })(
                        <Input id="wd_nid" placeholder="请填写网点机构号"/>
                    )}
                </FormItem>
                <FormItem
                    id="wd_zid"
                    label="支行名称"
                    {...formItemLayout}
                >
                    {getFieldDecorator('wd_zid',{
                        rules: [
                            { required: true, message: '请选择支行名称' },
                        ],
                    })(
                        <Select id="wd_zhihang" disabled={this.props.optype}>
                            {this.props.zhihang}
                        </Select>
                    )}
                </FormItem>
            </Form>
        )
    }
}
module.exports = createForm({
    mapPropsToFields(props) {
        return {
            label : {value: props.wd.label},
            wd_nid : {value : props.wd.wd_nid},
            wd_zid : {value : props.wd.wd_zid},
        };
    },
})(WdUpdateForm);

