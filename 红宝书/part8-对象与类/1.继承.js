// void (function () {
//   console.log("-----组合继承-----");
//   function SuperType(name) {
//     this.name = name;
//     this.colors = ["red", "green", "blue"];
//   }
//   SuperType.prototype.sayName = function () {
//     console.log("name", this.name);
//   };

//   function SubType(name, age) {
//     //  继承属性
//     SuperType.call(this, name);

//     // (function SuperType(name) {
//     //   console.log(this);// this 指向 window 了
//     //   this.name = name;
//     //   this.colors = ["red", "green", "blue"];
//     // })(name);
//     this.age = age;
//     console.log(this);
//   }
//   //   继承方法
//   SubType.prototype = new SuperType();
//   SubType.prototype.sayAge = function () {
//     console.log("age", this.age);
//   };

//   let instance1 = new SubType("多多1", 1);
//   instance1.colors.push("yellow");
//   console.log(instance1.colors);
//   instance1.sayName();
//   instance1.sayAge();

//   let instance2 = new SubType("多多2", 2);
//   instance2.colors.push("black");
//   console.log(instance2.colors);
//   instance2.sayName();
//   instance2.sayAge();
// })();
void (function () {
  console.log("经典继承");
  /**
   * 优点：
   *    1.解决原型包含引用值导致的问题；
   *    2.可以在子类构造函数中向父类构造函数传参
   * 主要使用方式: 在子类构造函数中，使用硬绑定（apply,call）来调用父类构造函数。这样父类构造就在子类总调用并把this指向子类了
   */
  function SuperType(name) {
    this.name = name;
    this.colors = ["red", "green", "blue"];
  }
  function SubType(name, age) {
    SuperType.call(this, name);
    this.age = age;
  }
  let instance1 = new SubType("多多1", 1);
  instance1.colors.push("black");
  console.log(instance1);
  let instance2 = new SubType("多多2", 2);
  instance2.colors.push("white");
  console.log(instance2);
})();

void (function () {
  console.log("组合继承");
  /**
   * 优点：
   *  1.综合了经典继承和原型链，将两者的有点结合到了一起。
   * 基本思路：使用原型链继承原型上的属性和方法，而通过盗用构造函数继承实例属性。这样既可以把方法定义在原型上实现重用，又能让每个实例都有自己的属性
   *
   */
  function SuperType(name) {
    this.name = name;
    this.colors = ["red", "green", "blue"];
  }
  SuperType.prototype.sayName = function () {
    console.log("name", this.name);
  };
  function SubType(name, age) {
    //   继承属性
    SuperType.call(this, name);
    this.age = age;
  }

  SubType.prototype = new SuperType();
  SubType.prototype.sayAge = function () {
    console.log("age", this.age);
  };

  let instance1 = new SubType("多多", 1);
  instance1.colors.push("white");
  console.log(instance1.colors);
  instance1.sayName();
  instance1.sayAge();
  console.log(SubType.prototype);
  let instance2 = new SubType("多多", 2);
  instance2.colors.push("black");
  console.log(instance2.colors);
  instance2.sayName();
  instance2.sayAge();
})();
