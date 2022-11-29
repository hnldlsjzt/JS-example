const schedule = require('node-schedule');

const scheduleCronstyle = (callback, time = '* 10 * * * *') => {
  //每分钟的第30秒定时执行一次:
  schedule.scheduleJob(time, (fireDate) => {
    callback?.()
    console.log('fireDate:' + fireDate, 'scheduleCronstyle:' + new Date());
  });
}

module.exports = scheduleCronstyle