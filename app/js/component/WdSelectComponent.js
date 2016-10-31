/**
 * Created by 1 on 2016/10/13.
 * 网点移交操作界面
 */

import React from 'react';
import ReactDom from 'react-dom';;
import { Cascader, Modal, Button, message } from 'antd';


class WdSelectComponent extends React.Component{
    constructor(props){
        super(props);
        this.wd = "";
        this.state = {
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
    handleChange(value) {
        this.wd = value;
    }
    handleOk(){;
        if(!this.wd){
            message.error('请选择移交的网点！',2);
        }else{
            this.props.handleYJConfirm(this.wd);
        }
    }
    render(){
        return(
            <Modal title={this.props.title}
                   visible={this.state.visible}
                   onOk={this.handleOk.bind(this)}
                   confirmLoading={this.state.confirmLoading}
                   onCancel={this.handleCancel.bind(this)}
            >
                <Cascader
                    placeholder="请选择移交的网点"
                    options={this.props.wdList}
                    onChange = {this.handleChange.bind(this)}
                />
            </Modal>
        );
    }
}

module.exports = WdSelectComponent;
