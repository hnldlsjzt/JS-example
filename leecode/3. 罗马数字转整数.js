/**
 * @param {string} s
 * @return {number}
 */
var romanToInt = function (s) {
  const hash = { I: 1, V: 5, X: 10, L: 50, C: 100, D: 500, M: 1000 };
  let res = 0;
  for (let index = 0; index < s.length; index++) {
    const left = hash[s[index]];
    const right = hash[s[index + 1]];

    console.log("right", left > right);
    res += left < right ? -left : left;
  }
  return res;
};

var romanToInt = function (s) {
  s = s.replace("IV", "a");
  s = s.replace("IX", "b");
  s = s.replace("XL", "c");
  s = s.replace("XC", "d");
  s = s.replace("CD", "e");
  s = s.replace("CM", "f");
  let res = 0;
  for (let index = 0; index < s.length; index++) {
    const item = getValue(s[index]);
    res += item;
  }
  return res;
};

function getValue(value) {
  switch (value) {
    case "I":
      return 1;
    case "V":
      return 5;
    case "X":
      return 10;
    case "L":
      return 50;
    case "C":
      return 100;
    case "D":
      return 500;
    case "M":
      return 1000;
    // 额外处理
    case "a":
      return 4;
    case "b":
      return 9;
    case "c":
      return 40;
    case "d":
      return 90;
    case "e":
      return 400;
    case "f":
      return 900;
    default:
      return 0;
  }
}
console.log(romanToInt("III"));
