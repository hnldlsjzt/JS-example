const axios = require('axios');
const fs = require('fs');
let count = 0;
let ref = 0;
function timeout(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms)
    })
}
async function sendRequest() {
    const requestData = {
        propUuid: '5bc5346e12d542b391f02ca3f80ade85',
    };
    const session = ''
    // 在这里编写发起请求的代码，例如使用Fetch或XMLHttpRequest
    const { data: res } = await axios.post('http://yulongdaoju.imlc.cc/api/sendProp/regular/sendProp', requestData, {
        headers: {
            'accept': 'application/json, text/plain, */*',
            'accept-language': 'zh-CN,zh;q=0.9',
            'content-type': 'application/json;charset=UTF-8',
            'm-session':session,
            'proxy-connection': 'keep-alive',
        },
        // 如果需要跨域请求，可以使用以下配置
        // withCredentials: true,
    })

    const { code } = res
    if (code === 200) {
        count++
        getTime()
        console.log('发送结果', res)
        const ws1 = fs.createWriteStream('./log.txt', {
            flags: 'a'
        })

        ws1.write(`发送结果: ${JSON.stringify(res)} \n`)
        ws1.write(`发送日期: ${getTime()} \n`)
        ws1.write(`======================== \n`)
        ws1.end()
    } else if (code === 401) {
        console.log('需要重新登录', res)
        const ws1 = fs.createWriteStream('./error.txt', {
            flags: 'a'
        })

        ws1.write(`需要重新登录: ${JSON.stringify(res)} \n`)
        ws1.write(`发送日期: ${getTime()} \n`)
        ws1.write(`======================== \n`)
        ws1.end()

    } else if (ref < 2) {
        await timeout(2000)
        sendRequest()
        ref++
        console.log('重新发送', res)
        const ws1 = fs.createWriteStream('./error.txt', {
            flags: 'a'
        })

        ws1.write(`重新发送: ${JSON.stringify(res)} \n`)
        ws1.write(`发送日期: ${getTime()} \n`)
        ws1.write(`======================== \n`)
        ws1.end()
    }

}

// 每30分30秒（30 * 60 * 1000 + 30 * 1000毫秒）发起一次请求
const interval = 30 * 60 * 1000 + 30 * 1000;
sendRequest();
// 设置定时器，定时执行sendRequest函数
setInterval(sendRequest, interval);

function getTime() {
    // 创建一个Date对象，它将包含当前的日期和时间信息
    const currentDate = new Date();

    // 使用Date对象的方法来获取各种时间信息
    const year = currentDate.getFullYear();
    // 获取年份
    const month = currentDate.getMonth() + 1;
    // 获取月份（注意月份从0开始，所以需要加1）
    const day = currentDate.getDate();
    // 获取日期
    const hours = currentDate.getHours();
    // 获取小时
    const minutes = currentDate.getMinutes();
    // 获取分钟
    const seconds = currentDate.getSeconds();
    // 获取秒数

    // 打印当前时间信息
    console.log(`当前时间：${year}-${month}-${day} ${hours}:${minutes}:${seconds},次数：${count}`);
    return `当前时间：${year}-${month}-${day} ${hours}:${minutes}:${seconds},次数：${count}`
}
