import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';

export function checkHttpStatus(response) {
    if (response.status >= 200 && response.status < 300) {
        return response
    } else {
        var error = new Error(response.statusText)
        error.response = response
        throw error
    }
}

export function parseJSON(response) {
    return response.json()
}

export function getBrowerType(){
    let ua = navigator.userAgent.toLowerCase();
    let browerInfo = {
        trident: ua.indexOf('trident') > -1, //IE内核
        presto: ua.indexOf('presto') > -1, //opera内核
        webkit: ua.indexOf('applewebkit') > -1 || ua.indexOf('chrome') > -1, //苹果、谷歌内核
        gecko: ua.indexOf('gecko') > -1 && ua.indexOf('khtml') > -1, //火狐内核
        mobile: !!ua.match(/applewebKit.*mobile.*/)||!!ua.match(/applewebKit/), //是否为移动终端
        ios: !!ua.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
        android: ua.indexOf('Android') > -1 || ua.indexOf('Linux') > -1, //android终端或者uc浏览器
        iPhone: ua.indexOf('iphone') > -1 || ua.indexOf('mac') > -1, //是否为iPhone或者安卓QQ浏览器
        iPad: ua.indexOf('iPad') > -1, //是否为iPad
        webApp: ua.indexOf('safari') > -1 ,//是否为web应用程序，没有头部与底部
    };
    return browerInfo;
}


