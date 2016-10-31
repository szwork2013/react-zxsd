/**
 * Created by 1 on 2016/10/24.
 */
import { message } from 'antd';
import { HEADURL,GET_STREET_LIST } from 'core/Const';
import { checkHttpStatus,parseJSON } from 'core/Util';
import { logoutAction } from 'actions/UserAction';

/*action*/
export const getStreetListAction = (json) => {
    return {
        type : GET_STREET_LIST,
        streetList : json.streetList,
    }
}
/*request*/
export const getStreetListRequest = (_formData) => {
    return (dispatch) => {
        return fetch(
            HEADURL+"Wxhsz.php?m=WxHSZ&c=ZxsdAPI&a=getStreetList",{
                method : "post",
                mode   : "cors",
                body    :  _formData
            })
            .then(checkHttpStatus)
            .then(parseJSON)
            .then(data => {
                if(data.status === '2002'){
                    dispatch(getStreetListAction(data));
                }else{
                    message.error(data.msg);
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
export const updateStreetRequest = (_formData) => {
    return (dispatch) => {
        return fetch(
            HEADURL+"Wxhsz.php?m=WxHSZ&c=ZxsdAPI&a=updateStreet",{
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
                    dispatch(getStreetListRequest(_formData));
                }else{
                    message.error(data.msg);
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
/*新增街道*/
export const addStreetRequest = (_formData) => {
    return (dispatch) => {
        return fetch(
            HEADURL+"Wxhsz.php?m=WxHSZ&c=ZxsdAPI&a=addStreet",{
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
                    dispatch(getStreetListRequest(_formData));
                }else{
                    message.error(data.msg);
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

