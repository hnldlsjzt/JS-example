
const shell = require('shelljs')
//COOKIE要修改成你的cookie
const COOKIE = `_ga=GA1.2.334489262.1621128817; OUTFOX_SEARCH_USER_ID_NCOO=1282695175.0854368; __tea_cookie_tokens_2608=^%^257B^%^2522web_id^%^2522^%^253A^%^25226998779962447414799^%^2522^%^252C^%^2522ssid^%^2522^%^253A^%^2522f2a5aa2c-e1ef-4c99-9473-c40bacf23dd7^%^2522^%^252C^%^2522user_unique_id^%^2522^%^253A^%^25226998779962447414799^%^2522^%^252C^%^2522timestamp^%^2522^%^253A1629530446389^%^257D; MONITOR_WEB_ID=d9711cf7-644a-4677-bd27-10a23460cf87; _tea_utm_cache_2608=^{^%^22utm_source^%^22:^%^22post_course_pay^%^22^}; passport_csrf_token=8333e41dd4053735b15f746fe477e3d1; passport_csrf_token_default=8333e41dd4053735b15f746fe477e3d1; _gid=GA1.2.132084547.1668521770; n_mh=P8OrmpgrO456QEpIM3hWn8HneCkOXa7F74gi4PqOMMM; uid_tt=c46cf599a5146ece95f721fe445f02f6; uid_tt_ss=c46cf599a5146ece95f721fe445f02f6; sid_tt=e9a58dc21849bb01326a16673d9e384a; sessionid=e9a58dc21849bb01326a16673d9e384a; sessionid_ss=e9a58dc21849bb01326a16673d9e384a; sid_guard=e9a58dc21849bb01326a16673d9e384a^%^7C1668521785^%^7C31535999^%^7CWed^%^2C+15-Nov-2023+14^%^3A16^%^3A24+GMT; sid_ucp_v1=1.0.0-KGFiYWRlMTliYTNhZjA0YTlhZjEwYmNjMTUzNmU3ZTIwY2I4MzAxNGEKFgit7eC__fXZARC5vs6bBhiwFDgIQAsaAmxmIiBlOWE1OGRjMjE4NDliYjAxMzI2YTE2NjczZDllMzg0YQ; ssid_ucp_v1=1.0.0-KGFiYWRlMTliYTNhZjA0YTlhZjEwYmNjMTUzNmU3ZTIwY2I4MzAxNGEKFgit7eC__fXZARC5vs6bBhiwFDgIQAsaAmxmIiBlOWE1OGRjMjE4NDliYjAxMzI2YTE2NjczZDllMzg0YQ`

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