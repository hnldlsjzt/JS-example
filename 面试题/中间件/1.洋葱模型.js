const middleware = [];
middleware.push((next) => {
  console.log("1");
  next();
  console.log("6");
});
middleware.push((next) => {
  console.log("2");
  next();
  console.log("5");
});
middleware.push((next) => {
  console.log("3");
  next();
  console.log("4");
});
//  编写 compose，打印出 123456
const compose = (arr) => {
  console.log("arr: ", arr);
  return () => {
    return arr.reverse().reduce(
      (a, b) => () => b(a),
      () => {}
    )();
  };
};

let fn = compose(middleware);
fn();
