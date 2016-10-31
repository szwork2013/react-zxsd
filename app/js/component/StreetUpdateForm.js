/**
 * Created by 1 on 2016/10/24.
 */
import React from 'react';
import ReactDom from 'react-dom';;
import { Form, Input, Checkbox } from 'antd';
const FormItem = Form.Item;
const createForm = Form.create;

class StreetUpdateForm extends React.Component{
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
            <Form horizontal>
                <FormItem
                    id="value"
                    label="编码"
                    {...formItemLayout}
                >
                    {getFieldDecorator('value',{
                        rules: [
                            { required: true, message: '请填写街道编码' },
                        ],
                    })(
                        <Input id="value" placeholder="请填写街道编码"  />
                    )}
                </FormItem>
                <FormItem
                    id="label"
                    label="名称"
                    {...formItemLayout}
                >
                    {getFieldDecorator('label',{
                        rules: [
                            { required: true, message: '请填写街道名称' },
                        ],
                    })(
                        <Input id="value" placeholder="请填写街道名称"  />
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
        );
    }
}

module.exports = createForm({
    mapPropsToFields(props) {
        return {
            label : {value: props.street.label},
            value : {value:props.street.value},
            status : {value:props.street.status === '1' ? true : false}
        };
    },
})(StreetUpdateForm);