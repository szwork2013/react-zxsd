/**
 * Created by 1 on 2016/10/28.
 */

import { message } from 'antd';
import { HEADURL, GET_DKAPPLYLOG_LIST, } from 'core/Const';
import { checkHttpStatus,parseJSON } from 'core/Util';
import { logoutAction } from 'actions/UserAction';

/*
* Action
* */
export const getApplyLogListAction = (json) => {
    return {
        type : GET_DKAPPLYLOG_LIST,
        logList : json.logList,
    }
}

export const getApplyLogListRequest = (_formData) => {
    return (dispatch)=>{
        return fetch(
            HEADURL+"Wxhsz.php?m=WxHSZ&c=ZxsdAPI&a=getLogList",{
                method : "post",
                mode   : "cors",
                body    :  _formData
            })
            .then(checkHttpStatus)
            .then(parseJSON)
            .then(data => {
                dispatch(getApplyLogListAction(data))
            })
            .catch( error => {;
                if(error.response.status === 401){
                    dispatch(logoutAction());
                    message.error('token失效，请重新登录！');
                }
            });
    }
}