

// 测试 node 里 setTimeout 返回值。返回的是一个 timeout 实例对象，而不是跟浏览器一样，返回的是整数 id


// const timer = setTimeout(() => {
//     console.log('setTimeout')
// }, 0)
// console.log('timer: ', timer);

const timer1 = setTimeout(() => {
    console.log(1);
    const timer3 = setTimeout(() => {
      console.log(3);
    }, 10);
    console.log(timer3);
  }, 20);
  console.log(timer1)
  const now = Date.now();
  while (Date.now() - now < 200) {
    //
  }
  const timer2 = setTimeout(() => {
    console.log(2);
  }, 10);
  console.log(timer2);