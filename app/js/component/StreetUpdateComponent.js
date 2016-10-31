/**
 * Created by 1 on 2016/10/24.
 */
import React from 'react';
import ReactDom from 'react-dom';
import { Modal, Button} from 'antd';
import StreetUpdateForm from 'component/StreetUpdateForm';

class StreetUpdateComponent extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            visible : false,
            street : {
                value : "",
                label : "",
            }
        }
    }
    showModal(street,param) {
        this.setState({
            visible: true,
            street : street,
            param : param,
        });
    }
    handleCancel(){
        this.setState({
            visible : false,
        })
    }
    handleOk(){
        this.refs.StreetUpdateForm.validateFieldsAndScroll((errors, values) => {
            if (errors) {
                return;
            }
            if(this.state.param){
                let street  = Object.assign({},values,{
                    id : this.state.street.id,
                });
                this.props.handleUpdate(street);
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
                <StreetUpdateForm street={this.state.street} ref="StreetUpdateForm" optype={this.state.param}></StreetUpdateForm>
            </Modal>
        );
    }
}
module .exports = StreetUpdateComponent;