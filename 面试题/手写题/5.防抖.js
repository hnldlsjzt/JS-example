/*
 * @Author: hnldlsjzt
 * @Date: 2021-09-16 11:13:04
 * @LastEditTime: 2021-09-16 18:02:18
 * @LastEditors: hnldlsjzt
 * @Description:
 * @FilePath: \JS-example\面试题\手写题\5.防抖.js
 * 可以输入预定的版权声明、个性签名、空行等
 */
/**
 * 概念：在触发事件后，N 秒后才执行回调函数。在这段时间内，重新触发该事件，执行回调时间重新计算
 */

void (function () {
  // 第一版，实现基本功能
  //   const debounce = function (func, time) {
  //     let timeout = null;
  //     return function () {
  //       clearTimeout(timeout);
  //       timeout = setTimeout(func, time);
  //     };
  //   };
  // 第二版，修复this指向与event 对象
  //   const debounce = function (func, time) {
  //     let timeout = null;
  //     return function () {
  //       const context = this; // 此时this还是指向方法调用的对象
  //       const argu = arguments;
  //       clearTimeout(timeout);
  //       timeout = setTimeout(function () {
  //         func.apply(context, argu);
  //       }, time);
  //       // 使用箭头函数在这里不行，因为func是直接调用
  //       //   timeout = setTimeout(() => {
  //       //     func();
  //       //   }, time);
  //     };
  //   };
  // 第三版，立即执行
  //   const debounce = function (func, time, immediate) {
  //     let timeout = null;
  //     return function () {
  //       const context = this; // 此时this还是指向方法调用的对象
  //       const argu = arguments;
  //       if (timeout) {
  //         clearTimeout(timeout);
  //       }
  //       // 是否立即执行
  //       if (immediate) {
  //         // 如果已经执行，不在执行
  //         const callNow = !timeout;
  //         timeout = setTimeout(() => {
  //           timeout = null;
  //         }, time);
  //         if (callNow) {
  //           func.apply(context, argu);
  //         }
  //       } else {
  //         timeout = setTimeout(function () {
  //           func.apply(context, argu);
  //         }, time);
  //       }
  //     };
  //   };
  // 第四版，增加返回值
  const debounce = function (func, time, immediate) {
    let timeout = null,
      result;
    return function () {
      // 保存上下文与参数
      const context = this;
      const argu = arguments; // 主要为了获取event对象
      if (timeout) {
        clearTimeout(timeout);
      }
      // 立即执行
      if (immediate) {
        console.log("立即执行", timeout);
        // 如果已经执行过，不在执行
        const callNow = !timeout;
        timeout = setTimeout(() => {
          timeout = null;
        }, time);
        if (callNow) {
          result = func.apply(context, argu);
        }
      } else {
        console.log("普通防抖");
        // 普通防抖函数
        timeout = setTimeout(() => {
          func.apply(context, argu);
        }, time);
      }
    };
  };
  let count = 1;
  let container = document.getElementById("container");
  console.log("container", container);
  function getUserAction(e) {
    console.log(this, e);
    container.innerText = count++;
  }
  console.log();
  container.onmousemove = debounce(getUserAction, 500, true);
})();
