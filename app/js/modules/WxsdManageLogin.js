/**
 * Created by 1 on 2016/9/26.
 */

import React from 'react';
import ReactDom from 'react-dom';
import { connect } from 'react-redux'
import {Form, message} from 'antd';
import { loginRequest } from 'actions/UserAction';
import LoginContainer from 'component/LoginContainer';

class WxsdManageLogin extends React.Component{
    constructor(props){
        super(props);

    }
    componentWillUpdate(  nextProps,  nextState){
    }
    handlerLogin(_user){
        let { cust_no, password } = _user;
        if(cust_no === "" || password === ""){
            message.error("用户名或密码不能为空",2);
            return;
        }
        let  _formData = new  FormData;
        _formData.append('cust_no',cust_no);
        _formData.append('password',password);
        this.props.dispatch(loginRequest(_formData));

    }
    render(){

        return(
            <div className="login-module">
                <div className="login-module-feature">
                    <div className="brand-cover">

                    </div>
                    <div className="">

                    </div>
                </div>
                <div className="login-module-container">
                    <header className="login-form-header">
                        <a className="login-tab is-selected">柜员号登录</a>
                        <a className="login-tab" onClick={(e) => {e.preventDefault();alert("正在开发中");}}>其他登录方式</a>
                    </header>
                    <LoginContainer submit={this.handlerLogin.bind(this)}>

                    </LoginContainer>
                </div>
            </div>
        );
    }
}
function mapStateToProps(state){
    return {
        token : state.UserReducer.token,
    }
}
module .exports = connect(mapStateToProps)(WxsdManageLogin);