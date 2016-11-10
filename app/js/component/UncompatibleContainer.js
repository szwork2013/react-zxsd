/**
 * Created by 1 on 2016/11/8.
 */
import React from 'react';
import ReactDom from 'react-dom';
import { Icon } from 'antd';
class UncompatibleContainer extends React.Component{
    constructor(props){
        super(props);
    }
    render() {
        return(
            <div className="uncompatible-wrapper">
                <div >
                    <Icon type="logo" style={{fontSize:"72px"}}></Icon>
                </div>
                <h1 style={{lineHeight:"64px",fontWeight:"normal"}}>您当前使用的浏览器版本过低, 请使用现代浏览器打开该网站</h1>
                <p>推介的浏览器: Google Chrome | Apple Safari | FireFox | 360安全浏览器 | 360极速浏览器 | UC浏览器 </p>
                <p>360安全浏览器请切换成闪电模式（地址栏右边的E） </p>
            </div>
        )
    }
}

module.exports = UncompatibleContainer;
