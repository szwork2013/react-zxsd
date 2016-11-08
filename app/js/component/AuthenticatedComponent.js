import React from 'react';
import {connect} from 'react-redux';
import {push} from 'react-router-redux';
import { Spin } from 'antd';
import { loginLocalRequest } from 'actions/UserAction';
import {getBrowerType} from 'core/Util';

export function requireAuthentication(Component) {

    class AuthenticatedComponent extends React.Component {

        componentWillMount () {
            if(getBrowerType().webkit){//浏览器兼容判断
                let _token = sessionStorage.getItem('token');
                if(_token !== undefined && _token !== null && _token !== 'null' && !this.props.isAuthenticated){//刷新的時候
                    this.props.dispatch(loginLocalRequest(_token));
                }else{
                    this.checkAuth(this.props.isAuthenticated);
                }
            }else{
                this.uncompatible();
            }

        }

        componentWillReceiveProps (nextProps) {
            this.checkAuth(nextProps.isAuthenticated);
        }

        checkAuth (isAuthenticated) {
            if (!isAuthenticated) {
                let redirectAfterLogin = this.props.location.pathname;
                this.props.history.push({
                    pathname : '/login',
                });
            }
        }
        uncompatible() {
            this.props.history.replace({
                pathname : '/uncompatible',
            });
        }
        render () {
            return (
                <div>
                    {this.props.isAuthenticated === true && this.props.wdid
                        ? <Component {...this.props}/>
                        :<div className="main-load"> <Spin size="large"></Spin><p>加载中</p></div>
                    }
                </div>
            )

        }
    }

    const mapStateToProps = (state) => ({
        token: state.UserReducer.token,
        name: state.UserReducer.name,
        isAuthenticated: state.UserReducer.isAuthenticated,
        authList : state.UserReducer.authList,
        wdid : state.UserReducer.wdid,
    });

    return connect(mapStateToProps)(AuthenticatedComponent);

}
