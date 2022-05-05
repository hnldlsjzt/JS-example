void (function () {
  for (var i = 0; i < 5; i++) {
    //   setTimeout 从第3个参数之后，都会当做参数传递给回调参数
    // setTimeout(
    //   (i) => {
    //     console.log(i);
    //   },
    //   i * 1000,
    //   i
    // );
    // 通过IIFE 创建一个作用域来声明i，达到变量遮蔽效应
    void (function (j) {
      setTimeout(() => {
        console.log(j);
      }, i * 1000);
    })(i);
  }
})();
