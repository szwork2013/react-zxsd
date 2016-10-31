/**
 * Created by 1 on 2016/8/15.
 * 申贷受理reducer
 */

import { GET_DKAPPLY_LIST, DO_TRANSFER, DO_STATE_CHANGE} from 'core/Const';
export const SdslReducer  = function(state = {
    dkApplyList:[],
    wdList:[],
    reasonList:[],
    qxList:[],
    prodList:[],
    regionList:[],
    applyTableLoading:true,
},action){
    switch (action.type){
        case GET_DKAPPLY_LIST:
            return Object.assign({},state,{
                dkApplyList  : action.dkApplyList,
                wdList : action.wdList,
                reasonList : action.reasonList,
                applyTableLoading : false,
                prodList : action.prodList,
                qxList : action.qxList,
                regionList : action.regionList,
            })
        default:
            return state;
    }
}
