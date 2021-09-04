void (function () {
  // 使用 hasOwnProperty 来检测当前对象是否有改属性
  const obj = {
    a: "a",
  };
  console.log(obj.hasOwnProperty("a"));
  const emptyObj = Object.create(null);
  emptyObj.a = "_a";
  //   console.log(emptyObj);
  console.log("使用 hasOwnProperty 检测 Object.create创建的空对象");
  //  console.log(emptyObj.hasOwnProperty("a"));// 提示 hasOwnProperty is not function, 因为使用Object.create(null) 是没有原型，所以找不到改方法
  // 更稳妥的检测方式
//   console.log(emptyObj.hasOwnProperty("a"));
  console.log(Object.prototype.hasOwnProperty.call(emptyObj, "a"));
})();
