/**
 * Created by 1 on 2016/10/24.
 */

import { message } from 'antd';
import { HEADURL,GET_REASON_LIST } from 'core/Const';
import { checkHttpStatus,parseJSON } from 'core/Util';
import { logoutAction } from 'actions/UserAction';

/*action*/
export const getReasonListAction = (json) => {
    return {
        type : GET_REASON_LIST,
        reasonList : json.reasonList,
    }
}
/*request*/

export const getReasonListRequest = (_formData) => {
    return (dispatch) => {
        return fetch(
            HEADURL+"Wxhsz.php?m=WxHSZ&c=ZxsdAPI&a=getReasonList",{
                method : "post",
                mode   : "cors",
                body    :  _formData
            })
            .then(checkHttpStatus)
            .then(parseJSON)
            .then(data => {
                dispatch(getReasonListAction(data))
            })
            .catch( error => {;
                if(error.response.status === 401){
                    dispatch(logoutAction());
                    message.error('token失效，请重新登录！');
                }
            });
    }
}

export const updateReasonRequest = (_formData) => {
    return (dispatch) => {
        return fetch(
            HEADURL+"Wxhsz.php?m=WxHSZ&c=ZxsdAPI&a=updateReason",{
                method : "post",
                mode   : "cors",
                body    :  _formData
            })
            .then(checkHttpStatus)
            .then(parseJSON)
            .then(data => {
                if(data.status === '2002'){
                    message.success(data.msg,2);
                    let _formData = new FormData();
                    _formData.append('token',data.token);
                    dispatch(getReasonListRequest(_formData));
                }else{
                    msssage.error(data.msg,2);
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
export const addReasonRequest = (_formData) => {
    return (dispatch) => {
        return fetch(
            HEADURL+"Wxhsz.php?m=WxHSZ&c=ZxsdAPI&a=addReason",{
                method : "post",
                mode   : "cors",
                body    :  _formData
            })
            .then(checkHttpStatus)
            .then(parseJSON)
            .then(data => {
                if(data.status === '2002'){

                    message.success(data.msg,2);
                    let _formData = new FormData();
                    _formData.append('token',data.token);
                    dispatch(getReasonListRequest(_formData));
                }else{

                    message.error(data.msg,2);
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