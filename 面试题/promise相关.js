void (function () {
  // 红灯3秒亮一次，绿灯1秒亮一次，黄灯2秒亮一次；如何使用Promise让三个灯不断交替重复亮灯？
  console.log("红绿灯start");
  function red() {
    console.log("red");
  }
  function green() {
    console.log("green");
  }
  function yellow() {
    console.log("yellow");
  }
  const light = (timer, cb) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        cb();
        resolve();
      }, timer);
    });
  };
  const step = () => {
    Promise.resolve()
      .then((resolve) => {
        return light(3000, red);
      })
      .then(() => {
        return light(1000, green);
      })
      .then(() => {
        return light(2000, yellow);
      })
      .then(() => {
        step();
      });
  };
  // step()
})();

void (function () {
  console.log("异步封装图片start---------------");
})();

void (function () {
  const fn = function (resolve) {
    setTimeout(() => {
      resolve(123);
    }, 3000);
  };
  const p1 = new Promise(fn);
  const p2 = Promise.resolve(p1);
  console.log(p1);
  console.log(p1);
})();


void (function () {

  // 注意，如果作为参数的 Promise 实例，自己定义了 catch 方法，那么它一旦被 rejected ，并不会触发 Promise.all() 的 catch 方法

  const p1 = new Promise((resolve, reject) => {
    resolve('hello');
  })
    .then(result => result)
    .catch(e => {
      console.log('我有catch1', e);
    });
  const p2 = new Promise((resolve, reject) => {
    throw new Error(' ');
  })
    .then(result => result)
    .catch(e => {
      console.log('我有catch2', e);
    });
  Promise.all([p1, p2])
    .then(result => console.log(result))
    .catch(e => {
      console.log('Promise.all的catch', e)
    });
  // ["hello", Error: ]
})()