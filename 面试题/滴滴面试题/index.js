// 问题：编写函数获得对象中的值1，必须使用到 str = 'a.b.c';

void (function () {
  const obj = {
    a: {
      b: {
        c: 666,
      },
    },
  };

  function getDate(obj, str) {
    // 解法一
    // str.split(".").forEach((item) => {
    //   console.log(obj, item);
    //   obj = obj[item];
    // });
    // return obj;
    // 解法二
   return str.split(".").reduce((pre, item) => {
    //   console.log(pre[item], item);
      return pre[item];
    }, obj);
  }
  console.log(getDate(obj, "a.b.c"));
})();
