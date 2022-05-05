/*
 * @Author: hnldlsjzt
 * @Date: 2021-09-08 19:41:00
 * @LastEditTime: 2021-09-08 19:49:53
 * @LastEditors: hnldlsjzt
 * @Description:
 * @FilePath: \JS-example\面试题\手写题\4.斐波拉契.js
 * 可以输入预定的版权声明、个性签名、空行等
 */
void (function () {
  // 斐波拉契函数
  function foo(num) {
    if (num < 3) {
      return 1;
    }
    return foo(num - 1) + foo(num - 2);
  }
  console.time();
  console.log(foo(40)); // 746.55712890625 ms
  console.timeEnd();
})();

void (function () {
  let cache = {}; // 缓存计算结果
  // 斐波拉契函数
  function foo(num) {
    if (num < 3) {
      return 1;
    }
    if (!cache[num]) {
      cache[num] = foo(num - 1) + foo(num - 2);
    }
    return cache[num];
  }
  console.time();
  console.log(foo(40)); // 0.14990234375 ms
  console.timeEnd();
})();
