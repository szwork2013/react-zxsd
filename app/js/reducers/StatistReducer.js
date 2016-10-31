/**
 * Created by 1 on 2016/10/31.
 */
import { GET_STATIST_LIST } from 'core/Const';
export const StatistReducer = function(state = {
    statistList : [],
    statistTableLoading : true,
    zhList:[],
},action){
    switch (action.type){
        case GET_STATIST_LIST :
            return Object.assign({},state,{
                statistList : action. statistList,
                statistTableLoading : false,
                zhList : action.zhList,
            });
        default:
            return state;
    }
}

