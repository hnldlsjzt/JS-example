void (function () {
  // 动态添加值

  let a = '我是string'
  a.age = 18
  console.log('a', a)
  let obj = {}
  obj.age = 18
  console.log('obj', obj)
  let name2 = new String('name2')
  name2.age = 18
  console.log('name2', name2, typeof name2)
})()

void (function () {
  // ECMAScript 函数参数都是按值传递的,函数参数都是局部变量
  // 只不过传递的是引用类型时，他们都是指向同一个指针（堆内存中），所以在函数内部改了，外部也会改

  function add (num) {
    return (num += 10)
  }
  const count = 20
  const result = add(count)
  console.log('count', count) // 20
  console.log('result', result) // 30

  // 现在传一个引用类型
  function setName (obj) {
    obj.name = '多多'
    obj = new Object() // 重新对 obj 定义了引用，但不会影响到外部的作用域
    obj.name = '灰灰'
  }
  let person = {}
  setName(person)
  console.log('person', person) // 多多
})()

void (function () {
  let obj = {},
    arr = [],
    pattern = RegExp()
  console.log('obj', obj instanceof Object)
  console.log('arr', arr instanceof Array)
  console.log('pattern', pattern instanceof RegExp)
})()
