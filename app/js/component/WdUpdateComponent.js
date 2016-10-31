/**
 * Created by 1 on 2016/10/20.
 */
import React from 'react';
import ReactDom from 'react-dom';
import { Modal, Button } from 'antd';
import WdUpdateForm from 'component/WdUpdateForm';

class WdUpdateComponent extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            visible : false,
            wd : {
                label : "",
                wd_nid : "",
            }
        }
    }
    showModal(wd,param) {
        this.setState({
            visible: true,
            wd : wd,
            param : param,
        });
    }
    handleCancel(){
        this.setState({
            visible : false,
        })
    }
    handleOk(){
        this.refs.WdUpdateForm.validateFieldsAndScroll((errors, values) => {
            if (errors) {
                return;
            }
            if(this.state.param){
                let wd = Object.assign({},values,{
                    value : this.state.wd.value
                })
                this.props.handleUpdate(wd);
            }else{
                console.log(this.props.zhihang);
                let wd = Object.assign({},values,{

                })
                this.props.handleAdd(wd);
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
                <WdUpdateForm wd={this.state.wd} ref="WdUpdateForm" optype={this.state.param} zhihang = {this.props.zhihang}></WdUpdateForm>
            </Modal>
        )
    }
}
module .exports = WdUpdateComponent;

