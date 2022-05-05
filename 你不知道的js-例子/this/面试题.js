void (function () {
  function fn1() {
    console.log(1, this);
  }
  function fn2() {
    console.log(2, this);
  }
  fn1.call(fn2);
  fn1.call.call(fn2);
  fn1.call.call.call(fn2);
})();
