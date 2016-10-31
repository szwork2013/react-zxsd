/**
 * Created by 1 on 2016/10/25.
 */
import React from 'react';
import ReactDom from 'react-dom';;
import { Select, Modal, Button, message } from 'antd';
const Option = Select.Option;

class ReasonSelectComponent extends React.Component{
    constructor(props){
        super(props);
        this.reasonid = "";
        this.state = {
            reason : "",
            visible : false,
        }
    }
    showModal() {
        this.setState({
            visible: true,
        });
    }
    handleCancel(){
        this.setState({
            visible : false,
        })
    }
    handleOk(){
        if(!this.state.reason){
            message.error('请选择拒绝原因',2);
        }else{
            this.props.handleJJConfirm(this.state.reason);
        }
    }
    handleChange(value){
        this.setState({
            reason : value,
        })
    }
    render(){
        let reasonOption = [];
        this.props.reasonList.map((reason,index) => {
           reasonOption.push(<Option value={reason.id} key={reason.id}>{reason.content}</Option>)
        });
        return(
            <Modal title={this.props.title}
                   visible={this.state.visible}
                   onOk={this.handleOk.bind(this)}
                   confirmLoading={this.state.confirmLoading}
                   onCancel={this.handleCancel.bind(this)}
            >
                <Select
                    style={{width:300}}
                    placeholder="选择一个拒绝受理原因"
                    onChange = {this.handleChange.bind(this)}
                >
                    {reasonOption}
                </Select>
            </Modal>
        );
    }
}

module .exports = ReasonSelectComponent;