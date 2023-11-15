import React from 'react';

function Name(params) {
    return <p>hello,react jsx</p>
}

function index(params) {
    return <div>
        <span>模拟 bable 处理 jsx 流程</span>
        <Name></Name>
    </div>
}

export default index;