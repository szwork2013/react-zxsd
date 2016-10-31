/**
 * Created by 1 on 2016/10/26.
 */


import React from 'react';
import ReactDom from 'react-dom';
import { Modal, Button } from 'antd';
import UserUpdateForm from 'component/UserUpdateForm';
class UserUpdateComponent extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            visible : false,
        }
    }
    showModal(user,param) {
        this.setState({
            visible: true,
            user : user,
            param : param,
        });
    }
    handleCancel(){
        this.setState({
            visible : false,
        })
    }
    handleOk(){
        this.refs.UserUpdateForm.validateFieldsAndScroll((errors, values) => {
            if (errors) {
                return;
            }
            if(this.state.param){
                this.props.handleUpdate(values);
            }else{
                this.props.handleAdd(values);
            }
        });

    }
    render(){
        return(
            <Modal title={this.props.title}
                   visible={this.state.visible}
                   onOk={this.handleOk.bind(this)}
                   confirmLoading={this.state.confirmLoading}
                   onCancel={this.handleCancel.bind(this)}
            >
                <UserUpdateForm user={this.state.user} ref="UserUpdateForm" optype={this.state.param} wdList = {this.props.wdList}></UserUpdateForm>
            </Modal>
        );
    }
}

module .exports = UserUpdateComponent;