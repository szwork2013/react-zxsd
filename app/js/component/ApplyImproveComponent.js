/**
 * Created by 1 on 2016/10/27.
 */
import React from 'react';
import ReactDom from 'react-dom';
import { Modal, Button, } from 'antd';
import ApplyUpdateForm from 'component/ApplyUpdateForm';
import ApplyLogComponent from 'component/ApplyLogComponent';

class ApplyImproveComponent extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            visible : false,
        }
    }
    showModal(apply,param) {
        this.setState({
            visible: true,
            apply : apply,
            param : param,
        });
    }
    handleCancel(){
        this.setState({
            visible : false,
        })
    }
    handleOk(){
        this.refs.ApplyUpdateForm.validateFieldsAndScroll((errors, values) => {
            console.log(values);
            if (errors) {
                console.log(errors);
                return;
            }
            if(this.state.param){
                let apply  = Object.assign({},values,{
                    id : this.state.apply.id,
                });
                this.props.handleWSConfirm(apply);
            }else{
                handleCancel();
            }
        });
    }
    render(){
        return(
            <Modal
                wrapClassName="applyModal"
                width = {1000}
                title={this.props.title}
                visible={this.state.visible}
                onOk={this.state.param ? this.handleOk.bind(this) : this.handleCancel.bind(this)}
                confirmLoading={this.state.confirmLoading}
                onCancel={this.handleCancel.bind(this)}
            >
                        <ApplyUpdateForm
                            apply={this.state.apply}
                            ref="ApplyUpdateForm"
                            optype={!this.state.param}
                            prodList = {this.props.prodList}
                            qxList = {this.props.qxList}
                            regionList = {this.props.regionList}>
                        </ApplyUpdateForm>

                        <ApplyLogComponent apply = {this.state.apply}></ApplyLogComponent>

            </Modal>
        );
    }
}

module.exports = ApplyImproveComponent;

