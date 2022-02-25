/*
 * @Author: hnldlsjzt
 * @Date: 2021-09-16 11:13:10
 * @LastEditTime: 2021-09-16 19:09:55
 * @LastEditors: hnldlsjzt
 * @Description:
 * @FilePath: \JS-example\面试题\手写题\6.节流.js
 * 可以输入预定的版权声明、个性签名、空行等
 */
/**
 * 节流：
 * 1.持续触发事件时，在一定时间内，只会执行一次
 * 有两种方式去做，时间戳和定时器
 */

void (function () {
  // 时间戳版本
  // 当前触发的时间戳减去之前的时间戳（初始值为0），如果大于设定的时间周期，就执行函数，然后更新时间戳为当前的时间戳
  //   const throttle = function (func, time) {
  //     let context, args;
  //     let prev = 0;
  //     return function () {
  //       let now = +new Date();
  //       context = this;
  //       args = arguments;
  //       if (now - prev > time) {
  //         prev = now;
  //         func.apply(context, args);
  //       }
  //     };
  //   };
  //   function throttle(func, time) {
  //     let prev = 0;
  //     return function () {
  //       const context = this;
  //       const args = arguments;
  //       const now = +new Date();
  //       if (now - prev > time) {
  //         prev = now;
  //         func.apply(context, args);
  //       }
  //     };
  //   }
  // 定时器版本
  // 原理，还是闭包，当前有定时器存在时，跳过。到了设置的时间就执行函数并把定时器状态清空，方便下次运行
  //   const throttle = function (func, time) {
  //     let timeout;
  //     let prev = 0;
  //     return function () {
  //       const context = this;
  //       const args = arguments;
  //       if (!timeout) {
  //         timeout = setTimeout(() => {
  //           func.apply(context, args);
  //           timeout = null;
  //         }, time);
  //       }
  //     };
  //   };

  /**
   * 比较两种方法
   * 时间戳方法第一次会立马执行，定时器版本会在事件到了后才执行
   */
  /**双剑合璧，来一个立马执行和停止触发的时候还能执行一次*/
  //   function throttle(func, wait) {
  //     let timeout, context, args;
  //     let prev = 0;
  //     const later = function () {
  //       prrv = +new Date();
  //       timeout = null;
  //       func.apply(context, args);
  //     };
  //     const throttled = function () {
  //       let now = +new Date();
  //       //下次触发func的时间
  //       let remaining = wait - (now - prev);
  //       context = this;
  //       args = arguments;
  //       console.log(remaining, prev);
  //       // 如果没有剩余时间
  //       if (remaining <= 0 || remaining > wait) {
  //         if (timeout) {
  //           clearTimeout(timeout);
  //           timeout = null;
  //         }
  //         prev = now;
  //         func.apply(context, args);
  //       } else if (!timeout) {
  //         console.log("timeout", timeout);

  //         timeout = setTimeout(later, remaining);
  //       }
  //     };
  //     return throttled;
  //   }
  // 第三版
  function throttle(func, wait) {
    let timeout, context, args, result;
    let previous = 0;

    let later = function () {
      previous = +new Date();
      timeout = null;
      func.apply(context, args);
    };

    let throttled = function () {
      let now = +new Date();
      //下次触发 func 剩余的时间
      let remaining = wait - (now - previous);
      context = this;
      args = arguments;
      console.log(remaining, wait);
      // 如果没有剩余的时间了或者你改了系统时间
      if (remaining <= 0 || remaining > wait) {
        if (timeout) {
          clearTimeout(timeout);
          timeout = null;
        }
        previous = now;
        func.apply(context, args);
      } else if (!timeout) {
        console.log("timeout", timeout);
        timeout = setTimeout(later, remaining);
      }
    };
    return throttled;
  }

  //   setInterval(
  //     throttle(() => {
  //       console.log(1);
  //     }, 1000),
  //     1
  //   );
  let count = 1;
  let container = document.getElementById("container");
  console.log("container", container);
  function getUserAction(e) {
    console.log(this, e);
    container.innerText = count++;
  }
  console.log();
  container.onmousemove = throttle(getUserAction, 500, true);
})();
