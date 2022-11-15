var count = 0;

function test1() {
  return count;
}
function test2(count) {
  count = 1;
  return count;
}

function test3() {
  return test2();
}

console.log(test3()); // 1
console.log(test2()); // 1
console.log(test1()); // 0,上面2个改变的是局部作用域的值
