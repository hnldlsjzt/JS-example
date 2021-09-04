void (function () {
  // 'a' > 1
  console.log('a' > 1, 'a' < 1, 'a' >= 1, 'a' <= 1) // 都是false
  console.log('a' >= 'a', 'a' < 1, 'a' >= 1, 'a' <= 1) // 都是false
  true > false,false > true
  console.log(  true > false,false > true);
})()

void (function () {
  console.log('测试 for in 语句中遍历 null 和 undefined 时，会不会不执行循环体')

  const obj = {
      null: '我是null',
      a: '我是a',
      b: '我是b',
      undefined: '我是undefined'
    },
    a = undefined,
    b = null,
    str = 'str', // 字符串有值才会遍历，没值不执行循环体
    bool = true,
    arr = [],
    num = 1123

  // 要循环的变量是 null 或 undefined 时，不会执行循环体；start ----------------
  for (const key in a) {
    console.log('a  = undefined', key)
  }
  for (const key in b) {
    console.log('b = null', key)
  }

  for (const key in bool) {
    console.log('bool', key) // 不执行
  }

  for (const key in arr) {
    console.log('arr', key) // 空数组也不执行
  }

  for (const key in num) {
    console.log('num', key) // 数字也不执行
  }

  // 要循环的变量是 null 或 undefined 时，不会执行循环体；end ----------------

  for (const key in str) {
    console.log('str = str:', key, str[key]) // 打印 索引
  }

  for (const key in obj) {
    if (Object.hasOwnProperty.call(obj, key)) {
      const element = obj[key]
      console.log('element', element)
    }
  }
})()

void (function () {
  console.log('switch 语句')
  const num = 25
  switch (true) {
    case num < 10:
      console.log('小于10')
      break
    case num > 10 && num < 20:
      console.log('大于10但小于20')
      break
    case num > 20 && num < 30:
      console.log('大于20但小于30')
      break
    default:
      console.log('超出范围了', num)
  }
})()
