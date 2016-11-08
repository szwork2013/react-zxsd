/**
 * Created by 1 on 2016/9/28.
 */
import React from 'react';
import ReactDom from 'react-dom';
import { connect } from 'react-redux';
import { Breadcrumb, Icon,Button } from 'antd';
import { logoutRequest } from 'actions/UserAction';

class NavContainer extends React.Component{
    constructor(props){
        super(props);
    }
    logout(){
        this.props.dispatch(logoutRequest());
    }

    render(){
        const content = (
            <div>
                <p>Content</p>
                <p>Content</p>
            </div>
        );
        return(
            <header className="nav-container">
                <div className="nav-container-wrapper">
                    <section className="login-wrapper">
                        <Button
                            className="sidebar-toggle-botton"
                        >
                            <Icon type="liebiao" />
                        </Button>
                        <h1 className="login-area">
                            <a href="/" target="_blank">在线申贷</a>
                        </h1>
                    </section>
                    <section className="breadcrumb-wrapper">
                        <Breadcrumb>
                            <Breadcrumb.Item >
                                <Icon type="home" />
                            </Breadcrumb.Item>
                            <Breadcrumb.Item>
                                {this.props.routerName ? this.props.routerName : "申贷受理"}
                            </Breadcrumb.Item>
                        </Breadcrumb>
                    </section>
                    <section className="userpanel-wrapper">
                        <Button
                            className="user-profile-toggle-botton"
                        >
                            <span className="text">{this.props.name}</span>
                        </Button>
                        <Button
                            className="user-profile-toggle-botton"
                            onClick={this.logout.bind(this)}
                        >
                            <span className="text">退出</span>
                            <Icon type="tuichu" className="arrow-down"></Icon>
                        </Button>
                    </section>
                </div>
            </header>
        );
    }
}

function mapStateToProps(state) {
    return {
        routerName:state.routing.locationBeforeTransitions.state,
        name:state.UserReducer.name,
    }
}
module .exports = connect(mapStateToProps)(NavContainer);