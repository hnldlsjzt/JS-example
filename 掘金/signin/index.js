const { requestCurl } = require('./utils')

const ladder = require('./ladder');// 梯子签到领流量
const geek = require('./geek');// 极客时间签到
const juejin = require('./juejin');// 极客时间签到
const schedule = require('./schedule');// 极客时间签到

schedule(() => {
    console.log('定时执行 start' + new Date())
    ladder();
    geek();
    juejin()
}, '0 1 7 ? * *')
