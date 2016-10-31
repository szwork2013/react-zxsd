/*modal对话框*/

import React from 'react';
import ReactDom from 'react-dom';
import { Modal, Button} from 'antd';

const confirm = Modal.confirm;

export let showConfirm = (title,content) =>{
    confirm({
        title: title,
        content: content,
        onOk() {
            alert("1");
        },
        onCancel() {},
    });
}

