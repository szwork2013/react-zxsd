/**
 * Created by 1 on 2016/10/17.
 */
import JWT from 'jwt-decode';
import { message } from 'antd';
import { HEADURL, INITIAL_USER ,LOGIN_SUCCESS, LOGOUT, GET_USER_LIST,GET_WD_OTPION } from 'core/Const';
import { checkHttpStatus,parseJSON } from 'core/Util';
import { push } from 'react-router-redux';
/*
 * Action
 * */
export const initialUserAction = (json) => {
    return {
        type : INITIAL_USER,
        wdid : json.wdid,
        rname : json.rname,
        authList : json.authList,
    }
}
export const loginAction = (token) => {
    sessionStorage.setItem('token',  token);
    return {
        type    :LOGIN_SUCCESS,
        token   : token,
    }
}

export const logoutAction = () => {
    sessionStorage.removeItem('token');
    return {
        type : 'logout',
    }
}

export const getUserListAction = (json) => {
    return {
        type : GET_USER_LIST,
        userList : json.userList,
        zhList : json.zhList,
        wdList : json.wdList,
    }
}
/*
* Request
* */
//用户初始化
export const initialUserRequest = (_formData) => {
    return (dispatch) => {
        return fetch(
            HEADURL+"Wxhsz.php?m=WxHSZ&c=ZxsdAPI&a=initialUser",{
                method : "post",
                mode   : "cors",
                body    :  _formData
            })
            .then(checkHttpStatus)
            .then(parseJSON)
            .then( data => {
                if(data.status === '2002'){
                    dispatch(push('/WxsdManageMain'));
                    message.success("登录成功",2);
                    dispatch(initialUserAction(data));
                }
            })
            .catch( error => {
                console.log(error);
                if(error.response.status === 401){
                    dispatch(logoutAction());
                    message.error('token失效，请重新登录！');
                }
            });
    }
}
/**
 *  model:用户登录请求
 *  auhtor:jcx
 *  date:2016-10-20
 *  prarmName:{cust_no, password}
 *  paramData:{"8580489","123456"}
 *  paramInfo:{账号，密码}
 *  */
export const loginRequest = (_formData) => {
    return (dispatch)=>{
        return fetch(
            HEADURL+"Wxhsz.php?m=WxHSZ&c=ZxsdAPI&a=login",{
                method : "post",
                mode   : "cors",
                body    :  _formData
            })
            .then(checkHttpStatus)
            .then(parseJSON)
            .then( data => {
                    if(data.status === '2002'){
                        dispatch(loginAction(data.token));
                        let _formData = new FormData();
                        _formData.append('token',data.token);
                        dispatch(initialUserRequest(_formData));

                    }else{
                        message.error(data.msg,2);
                    }
            })
            .catch( e => {
                message.error('登录异常',2);
            });
    }
}
//用户缓存登录
export const loginLocalRequest = (token) => {
    return (dispatch)=>{
        dispatch(loginAction(token));
        let _formData = new FormData();
        _formData.append('token',token);
        dispatch(initialUserRequest(_formData));
    }
}
//登出
export const logoutRequest = () => {
    return (dispatch)=>{
        message.success("安全退出！",2);
        dispatch(logoutAction());
    }
}
/**
 *  model:获取用户列表
 *  auhtor:jcx
 *  date:2016-10-25
 *  prarmName:{name, cust_no,w_id,z_id}
 *  paramData:{"金朝祥","8581234","818010","858010"}
 *  paramInfo:{柜员姓名，柜员号,网点机构号，支行机构号}
 *  */
export const getUserRequest = (_formData) => {
    return (dispatch) => {
        return fetch(
            HEADURL+"Wxhsz.php?m=WxHSZ&c=ZxsdAPI&a=getUserList",{
                method : "post",
                mode   : "cors",
                body    :  _formData
            })
            .then(checkHttpStatus)
            .then(parseJSON)
            .then( data => {
                dispatch(getUserListAction(data));
            })
            .catch( error => {
                console.log(error);
                if(error.response.status === 401){
                    dispatch(logoutAction());
                    message.error('token失效，请重新登录！');
                }
            });
    }
}
/**
 *  model:更新用户信息
 *  auhtor:jcx
 *  date:2016-10-26
 *  prarmName:{name,cust_no,w_id,role,status}
 *  paramData:{"金朝祥","8581234",['8580100','858010'],"AD",'1'}
 *  paramInfo:{柜员姓名，柜员号,网点数组，角色code，是否启用}
 *  */
export const updateUserRequest = (_formData,condition) => {
    return (dispatch) => {
        return fetch(
            HEADURL+"Wxhsz.php?m=WxHSZ&c=ZxsdAPI&a=updateUser",{
                method : "post",
                mode   : "cors",
                body    :  _formData
            })
            .then(checkHttpStatus)
            .then(parseJSON)
            .then( data => {
                console.log(data);
                if(data.status === '2002'){
                    message.success(data.msg,2);
                    let _formData = new FormData();
                    _formData.append('token',data.token);
                    for(let key in condition){
                        _formData.append(key,condition[key]);
                    }
                    dispatch(getUserRequest(_formData));
                }else{
                    message.error(data.msg,2);
                }
            })
            .catch( error => {
                console.log(error);
                if(error.response.status === 401){
                    dispatch(logoutAction());
                    message.error('token失效，请重新登录！');
                }
            });
    }
}
/**
 *  model:新增用户信息
 *  auhtor:jcx
 *  date:2016-10-26
 *  prarmName:{name,cust_no,w_id,role,status}
 *  paramData:{"金朝祥","8581234",['8580100','858010'],"AD",'1'}
 *  paramInfo:{柜员姓名，柜员号,网点数组，角色code，是否启用}
 *  */
export const addUserRequest = (_formData,condition) => {
    return (dispatch) => {
        return fetch(
            HEADURL+"Wxhsz.php?m=WxHSZ&c=ZxsdAPI&a=addUser",{
                method : "post",
                mode   : "cors",
                body    :  _formData
            })
            .then(checkHttpStatus)
            .then(parseJSON)
            .then( data => {
                if(data.status === '2002'){
                    message.success(data.msg,2);
                    let _formData = new FormData();
                    _formData.append('token',data.token);
                    for(let key in condition){
                        _formData.append(key,condition[key]);
                    }
                    dispatch(getUserRequest(_formData));
                }else{
                    message.error(data.msg,2);
                }
            })
            .catch( error => {
                console.log(error);
                if(error.response.status === 401){
                    dispatch(logoutAction());
                    message.error('token失效，请重新登录！');
                }
            });
    }
}

/*更新密码*/
export const updatePassword = (_formData) => {
    return (dispatch) => {
        return fetch(
            HEADURL+"Wxhsz.php?m=WxHSZ&c=ZxsdAPI&a=updatePassword",{
                method : "post",
                mode   : "cors",
                body    :  _formData
            })
            .then(checkHttpStatus)
            .then(parseJSON)
            .then( data => {
                console.log(data);
                if(data.status === '2002'){
                    message.success(data.msg,2);
                    dispatch(logoutAction());
                }else{
                    message.error(data.msg,2);
                }
            })
            .catch( error => {
                console.log(error);
                if(error.response.status === 401){
                    dispatch(logoutAction());
                    message.error('token失效，请重新登录！');
                }
            });
    }
}