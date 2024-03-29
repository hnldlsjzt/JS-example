/*
 * @Author: hnldlsjzt
 * @Date: 2021-09-06 17:58:42
 * @LastEditTime: 2021-09-07 11:00:17
 * @LastEditors: hnldlsjzt
 * @Description:
 * @FilePath: \JS-example\面试题\手写题\1.new.js
 * 可以输入预定的版权声明、个性签名、空行等
 */
/**
 * new 操作符做了哪些事情
 * 总共做了 4 件事
 * 1.创建一个新的对象
 * 2.把新对象的原型属性执行构建函数的原型
 * 3.把 this 指向新对象
 * 4.返回对象，如果手动 return 了复杂类型，就返回手动声明的，如不是返回新创建的对象
 *
 * 现在模拟实现 new 操作符，由于它是个关键字，所以要用其他来代替了
 *
 */

// 模拟 new
function MyNew() {
  // 1.创建新对象
  let obj = new Object();
  // 获取传入的参数,第一个为构造函数
  Constructor = [].shift.call(arguments);
  // 2.新对象的原型赋值
  obj.__proto__ = Constructor.prototype;
  // 3. this 指向新对象
  Constructor.apply(obj, arguments);
  // 4. 返回对象
  return obj;
}

// new 之后的沟站函数
function Otaku(name, age) {
  this.name = name;
  this.age = age;
  // new 操作符下返回一个 对象
  //   return {
  //     obj: "Object",
  //   };
  //new 操作符下返回一个 数组,只要是引用类型，直接返回
  //   return [1, 2];

  // new 返回一个基本类型,无视它
  //   return 123;
}

Otaku.prototype.sex = "max";
Otaku.prototype.sayYouName = function () {
  console.log("I am" + this.name);
};

let person = MyNew(Otaku, "zt", 26);
console.log("person", person);
person.sayYouName();
void (function () {
  const person = new Otaku("new", 20);
  console.log("person", person);
})();

// 第二版
void (function () {
  function MyNew() {
    // 1.创建新对象
    let obj = new Object();
    // 由于是函数调用，第一个值是构造函数的值
    let Constructor = [].shift.call(arguments);
    // 2.新对象原型指向构造函数
    obj.__proto__ = Constructor.prototype;
    // 3.调用构造函数，并把函数中的 this 指向新对象
    const res = Constructor.apply(obj, arguments);
    console.log("res", res);
    // 4.返回
    // return typeof res === "object" ? res || obj : obj;
    return res instanceof Object ? res : obj;
  }
  // 定义需要的构造函数
  function Otaku(name, age) {
    this.name = name;
    this.age = age;
    // 手动 return
    // return {
    //   type: "object",
    // };
    return "123";
  }
  // 定义原型上的属性和方法
  Otaku.prototype.sax = "man";
  Otaku.prototype.sayYouName = function () {
    console.log("my name is " + this.name);
  };
  const person = MyNew(Otaku, "zt", 18);
  console.log("person", person);
  person.sayYouName();
})();


void function () {
  function Foo() {
    // 覆盖外部的 getName
    getName = function () { alert(1); }
    // 这里的 this 指向 window
    return this;
  }
  Foo.getName = function () { alert(2); }
  Foo.prototype.getName = function () { alert(3); }
  var getName = function () { alert(4); }
  function getName() { alert(5); }


  Foo.getName(); //2
  getName(); //4
  Foo().getName(); //1
  getName(); // 1
  new Foo.getName();//2
  new Foo().getName(); //3
  console.log(new new Foo().getName()); //3

  /**
   * 
   * 
   *  
   * 
   * 
   关于上述 new Foo.getName()先执行 Foo.getName()，而6中 new Foo().getName() 先执行 new Foo()，是因为：

  new Foo() 属于new（带参数列表）
  new Foo属于new（无参数列表）
  无参数列表的优先级为18，而成员访问的优先级为19，高于无参数列表。因此new Foo.getName()先执行Foo.getName()

  带参数列表的优先级为19，而成员访问的优先级也为19，按照运算符规则（同一优先级，按照从左向右的执行顺序），new Foo().getName()先执行new Foo()，再对new之后的实例进行成员访问.getName()操作。
  这是js运算符的优先级链接，可查看每个运算符的优先级
   */

}()


