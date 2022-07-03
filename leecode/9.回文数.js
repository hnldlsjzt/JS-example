/**
 * @param {number} x
 * @return {boolean}
 */
var isPalindrome = function (x) {
  // 特殊情况处理
  if (x < 0) return false;
  if (x === 0) return true;
  // 直接把原值和后面的值翻转
  return String(x) === String(x)?.split("")?.reverse()?.join("");
};
var isPalindrome = function (x) {
  if (x === 0) return true;
  if (x < 0) return false;
  x = x.toString();
  console.log(typeof x);
  const index = x.length / 2;
  const isDot = index?.toString()?.includes(".");
  const prev = x.substring(0, index);
  const next = x
    .substring(isDot ? index + 1 : index)
    .split("")
    ?.reverse()
    ?.join("");
  console.log(prev, next, x, index);
  return prev === next;
};

// 另外一种解法

var isPalindrome = function (x) {
  // 特殊情况：
  // 如上所述，当 x < 0 时，x 不是回文数。
  // 同样地，如果数字的最后一位是 0，为了使该数字为回文，
  // 则其第一位数字也应该是 0
  // 只有 0 满足这一属性
  if (x < 0 || (x % 10 === 0 && x !== 0)) {
    return false;
  }

  let revertedNumber = 0;
  while (x > revertedNumber) {
    revertedNumber = revertedNumber * 10 + (x % 10);
    x = Math.floor(x / 10);
  }

  // 当数字长度为奇数时，我们可以通过 revertedNumber/10 去除处于中位的数字。
  // 例如，当输入为 12321 时，在 while 循环的末尾我们可以得到 x = 12，revertedNumber = 123，
  // 由于处于中位的数字不影响回文（它总是与自己相等），所以我们可以简单地将其去除。
  return x === revertedNumber || x === Math.floor(revertedNumber / 10);
};

var isPalindrome = function (x) {
  /**
   * 特殊情况：
   * 0 是回文
   * 为负数的不可能是回文
   * 如最后一位是 0 ，那整个数应该就不是 0
   *
   */
  if (x === 0) return true;
  if (x < 0 || (x % 10 === 0 && x !== 0)) return false;

  let reverseNum = 0;
  while (x > reverseNum) {
    // 获取最后一个尾数
    reverseNum = reverseNum * 10 + (x % 10);
    // 去掉最后一个尾数
    x = Math.floor(x / 10);
    console.log("reverseNum: ", reverseNum, x);
  }
  return x === reverseNum || x === Math.floor(reverseNum / 10);
};
isPalindrome(1221);
