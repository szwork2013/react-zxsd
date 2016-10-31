import React from 'react';
import {connect} from 'react-redux';
import {push} from 'react-router-redux';
import { Spin } from 'antd';
import { loginLocalRequest } from 'actions/UserAction';

export function requireAuthentication(Component) {

    class AuthenticatedComponent extends React.Component {

        componentWillMount () {
            let _token = sessionStorage.getItem('token');
            console.log(typeof _token);
            console.log(_token);
            if(_token != undefined && _token != null & _token != 'null'){
                this.props.dispatch(loginLocalRequest(_token));
            }else{
                this.checkAuth(this.props.isAuthenticated);
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
                })
            }
        }

        render () {
            return (
                <div>
                    {this.props.isAuthenticated === true && this.props.authList.length > 0
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
    });

    return connect(mapStateToProps)(AuthenticatedComponent);

}
