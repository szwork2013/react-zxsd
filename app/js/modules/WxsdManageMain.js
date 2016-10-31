/**
 * Created by 1 on 2016/9/28.
 */
import React from 'react';
import ReactDom from 'react-dom';
import { connect } from 'react-redux';
import {Spin} from 'antd';
import NavContainer from 'component/NavContainer';
import SlideContainer from 'component/SlideContainer';
import SdslContainer from 'component/SdslContainer';


class WxsdManageMain extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <Spin spinning={this.props.loading}>
                <div className="main-module">
                    <div className="main-module-wrapper">
                        <NavContainer></NavContainer>
                        <SlideContainer history={this.props.history}></SlideContainer>
                        <div className="content-container">
                            {this.props.children}
                        </div>
                    </div>
                </div>
            </Spin>

        );
    }
}
function mapStateToProps( state ) {
    return {
        loading : state.MainReducer.loading,
    }
}
module.exports = connect(mapStateToProps)(WxsdManageMain);
