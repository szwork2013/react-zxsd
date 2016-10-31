/**
 * Created by 1 on 2016/10/14.
 * 初始化reducer
 */
import {LOADING, LOADED} from 'core/Const';

export const MainReducer  = function(state = {
    loading:false,
},action){
    switch (action.type){
        case LOADING:
            return Object.assign({},state,{
               loading:true,
            })
        case LOADED:
            return Object.assign({},state,{
                loading:false,
            })
        default:
            return state;
    }
}