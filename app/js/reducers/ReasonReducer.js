/**
 * Created by 1 on 2016/10/24.
 */

import { GET_REASON_LIST } from 'core/Const';
export const ReasonReducer = function(state = {
    reasonList : [],
    reasonTableLoading : true,
},action){
    switch (action.type){
        case GET_REASON_LIST :
            return Object.assign({},state,{
                reasonList : action. reasonList,
                reasonTableLoading : false,
            });
        default:
            return state;
    }
}