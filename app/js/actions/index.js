/**
 * Created by 1 on 2016/6/27.
 */

import { message } from 'antd';
import { HEADURL, GET_DKAPPLY_LIST, DO_TRANSFER, DO_STATE_CHANGE } from 'core/Const';
import { checkHttpStatus,parseJSON } from 'core/Util';
import { logoutAction } from 'actions/UserAction';


/*
 * Action
 * */
/*获取贷款请求列表action*/
export const getDkApplyListAction = (json) =>{
    return {
        type : GET_DKAPPLY_LIST,
        dkApplyList : json.dkApplyList,
        wdList : json.wdList,
        reasonList : json.reasonList,
        prodList : json.prodList,
        qxList : json.qxList,
        regionList : json.regionList,
    }
}

/**
 *  model:获取申请单列表请求
 *  auhtor:jcx
 *  date:2016-10-14
 *  prarmName:{prod, state}
 *  paramData:{"园丁贷","处理中"}
 *  paramInfo:{贷款类型，处理状态}
 *  */
export const getDKApplyListRequest = ( _formData ) =>{
    return (dispatch)=>{
        return fetch(
                        HEADURL+"Wxhsz.php?m=WxHSZ&c=ZxsdAPI&a=getApplyList",{
                        method : "post",
                        mode   : "cors",
                        body    :  _formData
                })
                .then(checkHttpStatus)
                .then(parseJSON)
                .then(data => {
                    console.log(data);
                    dispatch(getDkApplyListAction(data))
                })
                .catch( error => {;
                    if(error.response.status === 401){
                        dispatch(logoutAction());
                        message.error('token失效，请重新登录！');
                    }
                });
    }
}
/**
 *  model:贷款件移交网点
 *  auhtor:jcx
 *  date:2016-10-14
 *  prarmName:{wd, ids}
 *  paramData:{"1",["54","55"]}
 *  paramInfo:{移交网点，移交贷款件}
 *  */
export const doTransferRequest = ( _formData,condition ) => {
    return (dispatch) => {
        return fetch(
            HEADURL+"Wxhsz.php?m=WxHSZ&c=ZxsdAPI&a=doTransferRequest",{
                method : "post",
                mode   : "cors",
                body    :  _formData
            })
            .then(checkHttpStatus)
            .then(parseJSON)
            .then( data => {
                    if(data.status === '2002'){
                        let _formData = new FormData();
                        _formData.append('token',data.token);
                        for(let key in condition){
                            _formData.append(key,condition[key]);
                        }
                        message.success(data.msg,2);
                        dispatch(getDKApplyListRequest(_formData));
                    }else{
                        message.error(data.msg,2);
                    }
            })
            .catch( error => {
                if(error.response.status === 401){
                    dispatch(logoutAction());
                    message.error('token失效，请重新登录！');
                }
            });
        }
}
/**
 *  model:贷款件状态改变
 *  auhtor:jcx
 *  date:2016-10-17
 *  prarmName:{state, ids}
 *  paramData:{"2",["54","55"]}
 *  paramInfo:{状态，移交贷款件}
 *  */
export const doStateChangeRequest = ( _formData,condition ) => {
    return ( dispatch ) =>{
        return fetch(
            HEADURL+"Wxhsz.php?m=WxHSZ&c=ZxsdAPI&a=doStateChangeRequest",{
                method : "post",
                mode   : "cors",
                body    :  _formData
            })
            .then(checkHttpStatus)
            .then(parseJSON)
            .then( data => {
                if(data.status === '2002'){
                    let _formData = new FormData();
                    _formData.append('token',data.token);
                    for(let key in condition){
                        _formData.append(key,condition[key]);
                    }
                    message.success(data.msg,2);
                    dispatch(getDKApplyListRequest(_formData));
                }else{
                    message.error("操作失败",2);
                }
            })
            .catch( error => {;
                if(error.response.status === 401){
                    dispatch(logoutAction());
                    message.error('token失效，请重新登录！');
                }
            });
    }
}
/**
 *  model:贷款件受理成功
 *  auhtor:jcx
 *  date:2016-10-28
 *  */
export  const doUpdateApply = ( _formData,condition ) =>{
    return ( dispatch ) =>{
        return fetch(
            HEADURL+"Wxhsz.php?m=WxHSZ&c=ZxsdAPI&a=updateApply",{
                method : "post",
                mode   : "cors",
                body    :  _formData
            })
            .then(checkHttpStatus)
            .then(parseJSON)
            .then( data => {
                console.log(data);
                if(data.status === '2002'){
                    let _formData = new FormData();
                    _formData.append('token',data.token);
                    for(let key in condition){
                        _formData.append(key,condition[key]);
                    }
                    message.success(data.msg,2);
                    dispatch(getDKApplyListRequest(_formData));
                }else{
                    message.error("操作失败",2);
                }
            })
            .catch( error => {;
                if(error.response.status === 401){
                    dispatch(logoutAction());
                    message.error('token失效，请重新登录！');
                }
            });
    }
}






