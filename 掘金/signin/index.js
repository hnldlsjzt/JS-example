
const shell = require('shelljs')
//COOKIE要修改成你的cookie
const COOKIE = `xxxx`

// 签到
function signIn() {
    console.log('signIn: ', signIn);
    return `
     curl 'https://api.juejin.cn/growth_api/v1/check_in?_signature=_02B4Z6wo00101ko.H4gAAIDDtHNjubVswAZKOxsAAPOuAAlx6VxXpAuTLBl4IC1eYOBrCQaJL2bxRG2WMew4GQseXw5FTF7DWUseoJnrvSHnaYcWquty-lQ3DaLLkODkvNHe9Msoy7jWBaIz39' \
        -H 'authority: api.juejin.cn' \
        -H 'pragma: no-cache' \
        -H 'cache-control: no-cache' \
        -H 'sec-ch-ua: "Chromium";v="92", " Not A;Brand";v="99", "Google Chrome";v="92"' \
        -H 'sec-ch-ua-mobile: ?0' \
        -H 'user-agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.131 Safari/537.36' \
        -H 'content-type: application/json' \
        -H 'accept: */*' \
        -H 'origin: https://juejin.cn' \
        -H 'sec-fetch-site: same-site' \
        -H 'sec-fetch-mode: cors' \
        -H 'sec-fetch-dest: empty' \
        -H 'referer: https://juejin.cn/' \
        -H 'accept-language: zh-CN,zh;q=0.9,en;q=0.8,zh-TW;q=0.7' \
        -H 'cookie:${COOKIE} ' \
        --data '{}' \   
        --compressed
  `
}
// 抽奖
function luckyDraw() {
    return `
    curl 'https://api.juejin.cn/growth_api/v1/lottery/draw' \
        -H 'authority: api.juejin.cn' \
        -H 'pragma: no-cache' \
        -H 'cache-control: no-cache' \
        -H 'sec-ch-ua: "Chromium";v="92", " Not A;Brand";v="99", "Google Chrome";v="92"' \
        -H 'sec-ch-ua-mobile: ?0' \
        -H 'user-agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.131 Safari/537.36' \
        -H 'content-type: application/json' \
        -H 'accept: */*' \
        -H 'origin: https://juejin.cn' \
        -H 'sec-fetch-site: same-site' \
        -H 'sec-fetch-mode: cors' \
        -H 'sec-fetch-dest: empty' \
        -H 'referer: https://juejin.cn/' \
        -H 'accept-language: zh-CN,zh;q=0.9,en;q=0.8,zh-TW;q=0.7' \
        -H 'cookie: ${COOKIE}' \
        --data '{}' \
        --compressed
    `
}


function logic() {
    try {
        const res = shell.exec(signIn(), { silent: true })
        console.log('res: ', res);
        // err_no为0表示签到成功 err_no为15001为重复签到
        if (res.err_no == 0) {
            // 签到成功，执行一次自动抽奖，因为签到成功之后有一次免费的自动抽奖
            shell.exec(luckyDraw(), { silent: true })
        }
    } catch (error) {
        console.log('error: ', error);
        // 如果自动签到失败，发送一封邮件通知自己
    }

}
//执行代码逻辑
; (function () {
    logic()
}())
