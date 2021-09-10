/*
 * @Author: hnldlsjzt
 * @Date: 2021-09-07 16:38:42
 * @LastEditTime: 2021-09-09 11:08:47
 * @LastEditors: hnldlsjzt
 * @Description:
 * @FilePath: \JS-example\面试题\手写题\2.call.js
 * 可以输入预定的版权声明、个性签名、空行等
 */
/**
 * call 的使用
 * 1.函数调用
 * 2.第一个参数指定 this 指向，为 null 或不传时指向 window
 * 3.可以传多个参数，使用逗号(,)分隔
 */
void (function () {
  Function.prototype.MyCall = function (context) {
    if (typeof this !== "function") {
      console.log(this, typeof this);
      throw new Error("不是一个函数");
    }
    context = context || window;
    context.fn = this;
    console.log("this", this);
    // 过滤第一个值，取后面的参数
    const argu = [...arguments].slice(1);
    // 传参
    const result = context.fn(...argu);
    delete context.fn;
    return result;
  };

  let obj = {
    name: "zt",
  };
  function bar() {
    console.log(this.name);
  }
  //   bar.call(obj);
  bar.MyCall.MyCall(obj);
})();

void (function () {
  /**
   * 1.将函数设置为对象的属性，
   * 2.执行该函数
   * 3.删除删函数
   * 4.第一个参数设置this的指向为null时，会指向window
   * 5.可以传多个参数
   * 6.函数可以有返回值
   */
  //    Function.prototype.call1 = function (context) {
  //     console.log(this,context)
  //     context.fn = this;
  //     context.fn();
  //     delete fn;
  // }
  // 测试一下
  //   var obj = {
  //     value: 1,
  //   };
  //   function bar() {
  //     console.log(this.value);
  //   }
  //   bar.call1(obj);
  Function.prototype.call2 = function (context) {
    // 1.设置 this 指向，为 null 时设置成 window
    context = context || window;
    // 2.把函数挂载到某个对象的方法上去，使用对象打点的方式调用
    context.fn = this;
    // 3.执行这个方法，并把剩余的参数丢进去
    // 3.1 获取剩下的参数
    const rest = [...arguments].slice(1); // slice 返回新的函数，传的值都是索引
    // 3.2 执行函数，并把参数用逗号分隔丢进去，且获取函数的返回值
    console.log("rest", rest);
    const result = context.fn(...rest);
    // 4.删除增加的方法
    delete context.fn;
    // 5.返回返回值
    return result;
  };
  const value = 2;
  const obj = {
    value: 1,
  };
  function bar(name, age) {
    console.log(this.value);
    return {
      value: this.value,
      name: name,
      age: age,
    };
  }
  bar.call2(null);
  console.log(bar.call2(obj, "zt", 26));
})();

void (function () {
  /**
   * apply 的实现
   * 它和 call 的区别在于传给函数的参数是数组
   */
  Function.prototype.apply1 = function (context) {
    // 1.获取context,为 null 时设置为 window
    context = context || window;
    // 2.把 this（调用的函数）设置给要执行的对象，方便使用对象打点的方式调用,核心就是这句，改变this指向
    context.fn = this;
    console.log("this", this);
    // 3.取索引的第一个值且获取返回值,并调用
    let result = "";
    if (arguments[1]) {
      console.log("arguments", arguments, ...arguments[1]);
      result = context.fn(...arguments[1]);
    } else {
      result = context.fn();
    }
    // 4.删除对象上添加声明的函数
    delete context.fn;
    // 5.返回 result
    return result;
  };

  var obj = {
    value: 1,
  };
  function bar(name) {
    // 这里如果想使用 apply 传参，那就要使用 arguments了
    console.log(name, arguments);
    return {
      name: [...arguments],
      value: this.value,
    };
  }
  //   console.log(bar.apply1(null));
  //   console.log(bar.apply1(obj, ["name", "age"]));
//   console.log(bar.apply(null));
  console.log(bar.apply(obj, ["————name", "age"]));
  var list1 = [0, 1, 2];
  var list2 = [3, 4, 5];
  [].push.apply(list1, list2);
})();
