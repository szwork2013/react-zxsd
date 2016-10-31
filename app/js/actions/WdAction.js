/**
 * Created by 1 on 2016/10/20.
 */

import { message } from 'antd';
import { HEADURL,GET_WD_LIST,GET_WD_OTPION, UPDATE_WD } from 'core/Const';
import { checkHttpStatus,parseJSON } from 'core/Util';
import { logoutAction } from 'actions/UserAction';

/*
* Action
* */
export const getWdListAction = (json) => {
    return {
        type : GET_WD_LIST,
        wdList : json.wdList,
        zhiList : json.zhiList,
    }
}

export const getWdListByZhAction = (json)=>{
    return {
        type : GET_WD_OTPION,
        zhwdList : json.zhwdList,
    }
}

/**
 *  model:获取网点列表请求
 *  auhtor:jcx
 *  date:2016-10-20
 *  prarmName:{wd_zid, wd_nid}
 *  paramData:{"858010","858010"}
 *  paramInfo:{支行行号，网点机构号}
 *  */
export const getWdListRequest = (_formData) => {
    return (dispatch) => {
        return fetch(
            HEADURL+"Wxhsz.php?m=WxHSZ&c=ZxsdAPI&a=getWdList",{
                method : "post",
                mode   : "cors",
                body    :  _formData
            })
            .then(checkHttpStatus)
            .then(parseJSON)
            .then(data => {
                dispatch(getWdListAction(data))
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
 *  model:通过支行获取网点列表请求
 *  auhtor:jcx
 *  date:2016-10-20
 *  prarmName:{wd_zid}
 *  paramData:{"858010",}
 *  paramInfo:{支行行号}
 *  */
export const getZhWdListRequest = (_formData) => {
    return (dispatch) => {
        return fetch(
            HEADURL+"Wxhsz.php?m=WxHSZ&c=ZxsdAPI&a=getWdListByZh",{
                method : "post",
                mode   : "cors",
                body    :  _formData
            })
            .then(checkHttpStatus)
            .then(parseJSON)
            .then(data => {
                dispatch(getWdListByZhAction(data))
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
 *  model:新增网点请求
 *  auhtor:jcx
 *  date:2016-10-21
 *  prarmName:{wd_nid,label,wd_zid,wd_zhihang}
 *  paramData:{"858010","营业部",,"858010","营业部"}
 *  paramInfo:{网点机构号，网点名称,支行机构号,支行名称}
 *  */
export const addWdRequest = (_formData,condition) => {
    return (dispatch) => {
        return fetch(
            HEADURL+"Wxhsz.php?m=WxHSZ&c=ZxsdAPI&a=addWdInfo",{
                method : "post",
                mode   : "cors",
                body    :  _formData
            })
            .then(checkHttpStatus)
            .then(parseJSON)
            .then(data => {

                if(data.status === '2002'){
                    message.success(data.msg);
                    let _formData = new FormData();
                    _formData.append('token',data.token);
                    for(let key in condition){
                        _formData.append(key,condition[key]);
                    }
                    dispatch(getWdListRequest(_formData));
                }else{
                    message.success(data.status);
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
 *  model:更新网点请求
 *  auhtor:jcx
 *  date:2016-10-21
 *  prarmName:{wd_nid,label}
 *  paramData:{"858010","营业部"}
 *  paramInfo:{网点机构号，网点名称}
 *  */
export const updateWdRequest = (_formData,condition) => {
    return (dispatch) => {
        return fetch(
            HEADURL+"Wxhsz.php?m=WxHSZ&c=ZxsdAPI&a=updateWdInfo",{
                method : "post",
                mode   : "cors",
                body    :  _formData
            })
            .then(checkHttpStatus)
            .then(parseJSON)
            .then(data => {
                console.log(data);
                if(data.status === '2002'){
                    message.success(data.msg);
                    let _formData = new FormData();
                    _formData.append('token',data.token);
                    for(let key in condition){
                        _formData.append(key,condition[key]);
                    }
                    dispatch(getWdListRequest(_formData));
                }else{
                    message.success(data.msg);
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