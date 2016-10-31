/**
 * Created by 1 on 2016/9/28.
 */

import React from 'react';
import ReactDom from 'react-dom';
import WhiteContainer from 'component/WhiteContainer';

class LoginContainer extends React.Component{
    constructor(props){
        super(props);
    }
    handlerSubmit(){
        let _user = {
            cust_no : this.refs.cust_no.value,
            password : this.refs.password.value,
        }
        this.props.submit(_user);
    }
    render(){
        return(
            <form className="login-form">
                <WhiteContainer height="35"></WhiteContainer>
                <div className="login-form-input-wrapper" >
                    <input className="login-form-input" placeholder="柜员号" ref="cust_no"/>
                </div>
                <WhiteContainer height="15"></WhiteContainer>
                <div className="login-form-input-wrapper">
                    <input  className="login-form-input" placeholder="密码(至少6位)" type="password" ref="password"/>
                </div>
                <WhiteContainer height="35"></WhiteContainer>
                <div className="login-form-submit">
                    <botton className="login-form-submitbotton btn-submit btn" onClick={this.handlerSubmit.bind(this)}>登录</botton>
                </div>
            </form>
        )
    }
}

module.exports = LoginContainer;
