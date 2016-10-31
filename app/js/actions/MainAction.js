/**
 * Created by 1 on 2016/10/27.
 */

import { message } from 'antd';
import { LOADING, LOADED, } from 'core/Const';

/*
 * Action
 * */
export const loadingAction = (json) => {
    return {
        type : LOADING
    }
}
export const loadedAction = () => {
    return {
        type : LOADED
    }
}