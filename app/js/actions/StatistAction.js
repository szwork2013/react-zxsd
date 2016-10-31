/**
 * Created by 1 on 2016/10/31.
 */
import JWT from 'jwt-decode';
import { message } from 'antd';
import { HEADURL,GET_STATIST_LIST } from 'core/Const';
import { checkHttpStatus,parseJSON } from 'core/Util';

/*
* Action
* */
export const getStatistListAction = (json) => {
    return {
        type : GET_STATIST_LIST,
        statistList : json.statistList,
        zhList : json.zhList,
    }
}

/*
* Request
* */

export const getStatistListRequest = (_formData) => {
    return (dispatch) => {
        return fetch(
            HEADURL+"Wxhsz.php?m=WxHSZ&c=ZxsdAPI&a=doStatistics",{
                method : "post",
                mode   : "cors",
                body    :  _formData
            })
            .then(checkHttpStatus)
            .then(parseJSON)
            .then( data => {
                console.log(data);
                dispatch(getStatistListAction(data));
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

export const doExcelOutputRequest = (_formData) => {
    return (dispatch) => {
        return fetch(
            HEADURL+"Wxhsz.php?m=WxHSZ&c=ZxsdAPI&a=exportexcel",{
                method : "post",
                mode   : "cors",
                body    :  _formData
            })
            .then(checkHttpStatus)
            .then(parseJSON)
            .then( data => {
                console.log( `${HEADURL}${data.extra}`);
                if(data.status === '2002'){
                    window.location.href = `${HEADURL}${data.extra}`;
                }else{
                    message.error(data.msg,2);
                }
                //dispatch(getStatistListAction(data));
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