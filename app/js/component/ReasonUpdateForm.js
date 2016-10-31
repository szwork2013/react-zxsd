/**
 * Created by 1 on 2016/10/24.
 */

import React from 'react';
import ReactDom from 'react-dom';;
import { Form, Input,Checkbox } from 'antd';
const FormItem = Form.Item;
const createForm = Form.create;

class ReasonUpdateForm extends React.Component{
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
                    id="content"
                    label="内容"
                    {...formItemLayout}
                >
                    {getFieldDecorator('content',{
                        rules: [
                            { required: true, message: '请填写内容' },
                        ],
                    })(
                        <Input id="value" placeholder="请填写内容" type="textarea" />
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
            content : {value: props.reason.content},
            status : {value:props.reason.status === '1' ? true : false}
        };
    },
})(ReasonUpdateForm);