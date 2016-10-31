/**
 * Created by 1 on 2016/10/29.
 */

import React from 'react';
import ReactDom from 'react-dom';
import { connect } from 'react-redux';
import { Form, Input, Row, Col, Button,message } from 'antd';
import { updatePassword } from 'actions/UserAction';
const FormItem = Form.Item;
const createForm = Form.create;

class PasswordContainer extends React.Component{
    constructor(props){
        super(props);
    }
    handleClick(e){
        e.preventDefault();

        this.props.form.validateFieldsAndScroll((errors, values) => {
            if(values['n_pwd'] !== values['c_pwd']){
                message.error('新密码与确认密码不同',2);
                return;
            }
            if (errors) {
                console.log('Errors in form!!!');
                return;
            }
            let _formData = new FormData();
            _formData.append('token',this.props.token);
            for(let key in values){
                _formData.append(key,values[key]);
            }
            this.props.dispatch(updatePassword(_formData));
        });
    }
    render(){
        const { getFieldDecorator,getFieldsValue } = this.props.form;
        const formItemLayout = {
            labelCol: { span: 2 },
            wrapperCol: { span:6 },
        };

        return(
            <div className="x-box  password-wrapper">
               <Form horizontal>
                   <FormItem
                       id="o_pwd"
                       label="原密码"
                       {...formItemLayout}
                   >
                       {getFieldDecorator('o_pwd',{
                           rules: [
                               { required: true,type:'string',message: '请输入原密码' },
                           ],
                       })(
                           <Input id="o_pwd" placeholder="请填写原密码"/>
                       )}
                   </FormItem>
                   <FormItem
                       id="n_pwd"
                       label="新密码"
                       {...formItemLayout}
                   >
                       {getFieldDecorator('n_pwd',{
                           rules: [
                               { required: true,type:'string',min:6,message: '请输入新密码,并且大于6位数' },
                           ],
                       })(
                           <Input id="o_pwd" placeholder="请填写新密码"/>
                       )}
                   </FormItem>
                   <FormItem
                       id="c_pwd"
                       label="新密码"
                       {...formItemLayout}
                   >
                       {getFieldDecorator('c_pwd',{
                           rules: [
                               { required: true,type:'string',min:6,message: '请输入确认密码,并且大于6位数' },
                           ],
                       })(
                           <Input id="c_pwd" placeholder="请填写确认密码"/>
                       )}
                   </FormItem>
                   <FormItem>
                       <Row>
                           <Col span={2} offset={2}>
                               <Button type="primary" htmlType="submit" size="large" onClick={this.handleClick.bind(this)}>提交</Button>
                           </Col>
                       </Row>
                   </FormItem>
               </Form>
            </div>
        );
    }
}
function mapStateToProps(state){
    return {
        token : state.UserReducer.token,
    }
}
module .exports = connect(mapStateToProps)(createForm()(PasswordContainer));