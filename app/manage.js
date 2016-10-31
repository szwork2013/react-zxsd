/**
 * Created by 1 on 2016/9/23.
 */

import React from 'react';
import ReactDOM from 'react-dom';
import ReactADD from 'react-addons';
import { createStore ,applyMiddleware} from 'redux'
import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger'
import { Provider } from 'react-redux'
import { syncHistoryWithStore,routerMiddleware  } from 'react-router-redux';
import {Router,Route,Link,hashHistory,browserHistory,IndexRoute,IndexRedirect} from 'react-router';
import {requireAuthentication} from 'component/AuthenticatedComponent';
import {getBrowerType} from 'core/Util';
require('es6-promise').polyfill();
import fetch from 'whatwg-fetch';
import injectTapEventPlugin from 'react-tap-event-plugin';
import {ZxsdReducer} from 'reducers/ZxsdReducer';
import App from 'modules/App';
import WxsdManageLogin from 'modules/WxsdManageLogin';
import WxsdManageMain from 'modules/WxsdManageMain';
import SdslContainer from 'component/SdslContainer';
import DhslContainer from 'component/DhslContainer';
import WdContainer from 'component/WdContainer';
import StreetContainer from 'component/StreetContainer';
import ReasonContainer from 'component/ReasonContainer';
import UserContainer from 'component/UserContainer';
import PasswordContainer from 'component/PasswordContainer';

require('css/base.css');
require('css/iconfont.css');
require('css/app.less');

injectTapEventPlugin()

console.log(getBrowerType());
// Apply the middleware to the store
const middleware = routerMiddleware(hashHistory);
/*创建store*/
const store = createStore(
    ZxsdReducer,
    applyMiddleware(middleware,thunkMiddleware,createLogger())
);

const history = syncHistoryWithStore(hashHistory,store);


ReactDOM.render(
    <Provider store={store}>
        <Router history={history}>
            <Route path="/" component={App}>
                <IndexRedirect to="/WxsdManageMain" />
                <Route path="/login" component={WxsdManageLogin} ></Route>
                <Route path="/WxsdManageMain" component={requireAuthentication(WxsdManageMain)}>
                    <IndexRoute component={SdslContainer}/>
                    <Route path="SDSL" component={SdslContainer}></Route>
                    <Route path="DHSL" component={DhslContainer}></Route>
                    <Route path="WD" component={WdContainer}></Route>
                    <Route path="STREET" component={StreetContainer}></Route>
                    <Route path="REASON" component={ReasonContainer}></Route>
                    <Route path="CUSTOM" component={UserContainer}></Route>
                    <Route path="PASSWORD" component={PasswordContainer}></Route>
                </Route>
            </Route>
        </Router>
    </Provider>
    ,document.getElementById('app'));