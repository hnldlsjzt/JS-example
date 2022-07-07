/**
 * @param {number} x
 * @return {number}
 */
var reverse = function (x) {
  let res = 0;
  // 最大数值
  let MAX = Math.pow(2, 31);
  while (x !== 0) {
    // 取尾数
    let pop = x % 10;
    // console.log("pop: ", pop, x);
    res = res * 10 + pop;
    // 去掉尾数
    x = parseInt(x / 10);
  }
  if ((res > MAX) | (res < -MAX)) {
    return 0;
  }
  return res;
};
console.log(reverse(1534236469));
