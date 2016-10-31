/**
 * Created by 1 on 2016/6/27.
 */
import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';
import { SdslReducer } from 'reducers/SdslReducer';
import { UserReducer } from 'reducers/UserReducer';
import { WdReducer } from 'reducers/WdReducer';
import { StreetReducer } from 'reducers/StreetReducer';
import { ReasonReducer } from 'reducers/ReasonReducer';
import { MainReducer } from 'reducers/MainReducer';
import { LogReducer } from 'reducers/LogReducer';
import { StatistReducer } from 'reducers/StatistReducer';

export const ZxsdReducer  = combineReducers({
    StatistReducer,
    LogReducer,
    MainReducer,
    ReasonReducer,
    StreetReducer,
    WdReducer,
    UserReducer,
    SdslReducer,
    routing:routerReducer,
});
