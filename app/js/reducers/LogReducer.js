/**
 * Created by 1 on 2016/10/28.
 */
import {GET_DKAPPLYLOG_LIST} from 'core/Const';

export const LogReducer  = function(state = {
    logList:[],
},action){
    switch (action.type){
        case GET_DKAPPLYLOG_LIST:
            return Object.assign({},state,{
                logList : action.logList,
            })
        default:
            return state;
    }
}
