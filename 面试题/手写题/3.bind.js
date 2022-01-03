/*
 * @Author: hnldlsjzt
 * @Date: 2021-09-08 19:40:56
 * @LastEditTime: 2021-09-10 17:49:08
 * @LastEditors: hnldlsjzt
 * @Description:
 * @FilePath: \JS-example\面试题\手写题\3.bind.js
 * 可以输入预定的版权声明、个性签名、空行等
 */

/**
 * 一句话介绍
 * bind 会创建一个新函数。
 * 在新函数被调用时，bind 传入的第一个参数将作为它运行时的 this，
 * 之后的一系列参数会在新函数传递的实参前作为它的参数
 */
void (function () {
  let obj = {
    value: 1,
  };
  function foo() {
    console.log("bind this", this.value);
  }
  const bindFoo = foo.bind(obj);
  bindFoo();
})();

void (function () {
  // 第一版
  Function.prototype.bind1 = function (context) {
    const self = this; // this 是当前调用 bind1 的值
    // 重新返回一个函数出去
    return function () {
      return self.apply(context); // 考虑到 context 有返回值的情况
    };
  };
  // 第二版
  Function.prototype.bind2 = function (context) {
    const self = this;
    // 获取调用 bind 时传参
    const argu = [].slice.call(arguments, 1);
    return function () {
      // 获取调函返回函数的传参
      const bindFunArgu = [].slice.call(arguments);
      // 合并两次传参的参数
      return self.apply(context, argu.concat(bindFunArgu));
    };
  };
  var foo = {
    value: 1,
  };
  function bar(name, age) {
    console.log(this.value);
    console.log(name);
    console.log(age);
  }
  var bindFoo = bar.bind2(foo, "zt");
  console.log(bindFoo);
  bindFoo(18);
})();

void (function () {
  // 第三版,主要解决返回的函数使用 new ，导致 this 指向的问题
  Function.prototype.bind3 = function (context) {
    const self = this; // 把调用方存一下
    // 存一下当前函数传的参数
    const argu = [].slice.call(arguments, 1);
    let FNOP = function () {};
    let FBound = function () {
      const bindFunArgu = [].slice.call(arguments);
      console.log(this instanceof FNOP, this, context);
      // 判断 this 是否是函数。不是构造函数那就是指向 window
      return self.apply(this instanceof FNOP ? this : context, [
        ...argu,
        ...bindFunArgu,
      ]);
    };
    FNOP.prototype = this.prototype; // 解决new函数时，有修改 prototype 的操作
    FBound.prototype = new FNOP();
    return FBound;
    // return function () {
    //   const bindFunArgu = [].slice.apply(arguments);
    //   return self.apply(context, [...argu, ...bindFunArgu]);
    // };
  };
  var value = 2;
  var foo = {
    value: 1,
  };
  function bar(name, age) {
    this.habit = "shop";
    console.log(this.value);
    console.log(name);
    console.log(age);
  }
  bar.prototype.friend = "friend";
  let bindFoo = bar.bind3(foo, "name");
  let obj = new bindFoo("age");
  console.log(obj);
  console.log("-----------分隔符");

  let bindFoo1 = bar.bind3(foo, "bindFoo1-name");
  let obj1 = bindFoo1("bindFoo1---age");
  console.log(obj1);
})();
