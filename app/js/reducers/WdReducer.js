/**
 * Created by 1 on 2016/10/20.
 */
import { GET_WD_LIST, GET_WD_OTPION } from 'core/Const';
export const WdReducer  = function(state = {
    wdList : [],
    zhiList : [],
    zhwdList : [],
    wdTableLoading : true,
},action){
    switch (action.type){
        case GET_WD_LIST:
            return Object.assign({},state,{
                wdList : action.wdList,
                wdTableLoading : false,
                zhiList : action.zhiList,
            });
        case GET_WD_OTPION:
            return Object.assign({},state,{
                zhwdList :action.zhwdList,
            })
        default:
            return state;
    }
}
