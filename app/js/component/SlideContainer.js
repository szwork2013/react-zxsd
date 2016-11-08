/**
 * Created by 1 on 2016/10/6.
 * 主页面侧边栏
 */

import React from 'react';
import ReactDom from 'react-dom';
import { connect } from 'react-redux';
import { Menu , Icon } from 'antd';
import { logoutRequest } from 'actions/UserAction';
const SubMenu = Menu.SubMenu;

class SlideContainer extends React.Component{
    constructor(props){
        super(props);
        //console.log(this.props.authList[0].code+"|"+this.props.authList[0].name);
        this.state = {
            current : "0" ,
            openKeys : [],
        }
    }
    handleClick(e){
        console.log('click',e);
        let arraykey = e.key.split("|");
        if(arraykey[0] === 'LOGOUT'){
            this.props.dispatch(logoutRequest());
            return ;
        }
        this.setState({ current : e.key});
        this.props.history.push({
            pathname:"WxsdManageMain/"+arraykey[0],
            state:arraykey[1],
        })
    }
    render(){
         let menus = [];
         this.props.authList.map(( _value,index ) => {
            if(_value.children === null){
                menus.push(
                    <Menu.Item key={_value.code+"|"+_value.name}>
                        <Icon type={_value.icon} />{_value.name}
                    </Menu.Item>
                );
            }else{
                let subs = [];
                _value.children.map(( _sub,index ) => {
                    subs.push(<Menu.Item key={_sub.code+"|"+_sub.name}>{_sub.name}</Menu.Item>);
                })
                menus.push(
                    <SubMenu key={_value.code+"|"+_value.name} title={<span><Icon type={_value.icon}/><span>{_value.name}</span></span>}>
                        {subs}
                    </SubMenu>
                );
            }
        })
        return(

            <div className="sidebar-container">
                <div className="inner-wrapper">
                    <Menu
                        mode="inline"
                        selectedKeys={[this.state.current]}
                        onClick={this.handleClick.bind(this)}
                    >
                        {menus}
                    </Menu>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        authList : state.UserReducer.authList,//权限列表
    }
}
module.exports = connect(mapStateToProps)(SlideContainer);
