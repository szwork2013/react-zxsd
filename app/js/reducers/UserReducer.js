/**
 * Created by 1 on 2016/10/17.
 * 用户Reducer
 */

import jwtDecode from 'jwt-decode';
import { INITIAL_USER ,LOGIN_SUCCESS, LOGOUT, GET_USER_LIST } from 'core/Const';

export const UserReducer  = function(state = {
    isAuthenticated:false,
    token:"",
    authList:[],
    userList:[],
    zhList:[],
    wdList:[],
    userTableLoading:true,
},action){
    switch (action.type){
        case INITIAL_USER:
            return Object.assign({},state,{
                wdid : action.wdid,
                rname : action.rname,
                authList : action.authList,
            })
        case LOGIN_SUCCESS:
            return Object.assign({},state,{
                isAuthenticated : true,
                token : action.token,
                name : jwtDecode(action.token).data.name,
            })
        case LOGOUT:
            return Object.assign({},state,{
                isAuthenticated : false,
                token :null,
                name : null,
                wdid : null,
            })
        case GET_USER_LIST:
            return Object.assign({},state,{
                userList : action.userList,
                zhList : action.zhList,
                wdList : action.wdList,
                userTableLoading : false,
            })
        default:
            return state;
    }
}