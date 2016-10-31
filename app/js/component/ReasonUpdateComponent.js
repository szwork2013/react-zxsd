/**
 * Created by 1 on 2016/10/24.
 */

import React from 'react';
import ReactDom from 'react-dom';
import { Modal, Button} from 'antd';
import ReasonUpdateForm from 'component/ReasonUpdateForm';

class ReasonUpdateComponent extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            visible : false,
            reason : {
                content : "",
                status : 1,
            }
        }
    }
    showModal(reason,param) {
        this.setState({
            visible: true,
            reason : reason,
            param : param,
        });
    }
    handleCancel(){
        this.setState({
            visible : false,
        })
    }
    handleOk(){
        this.refs.ReasonUpdateForm.validateFieldsAndScroll((errors, values) => {
            if (errors) {
                return;
            }
            if(this.state.param){
                let reason  = Object.assign({},values,{
                    id : this.state.reason.id,
                });
                this.props.handleUpdate(reason);
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
                <ReasonUpdateForm reason={this.state.reason} ref="ReasonUpdateForm" optype={this.state.param}></ReasonUpdateForm>
            </Modal>
        );
    }
}

module .exports = ReasonUpdateComponent;