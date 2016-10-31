/**
 * Created by 1 on 2016/10/24.
 */
import { GET_STREET_LIST } from 'core/Const';
export const StreetReducer = function(state = {
    streetList : [],
    streetTableLoading : true,
},action){
    switch (action.type){
        case GET_STREET_LIST :
            return Object.assign({},state,{
               streetList : action. streetList,
                streetTableLoading : false,
            });
        default:
            return state;
    }
}
