void (function () {
  /**
   * min 和 max 的使用
   * 能很方便的在一组数中获取最小值 或 最大值
   */
  let max = Math.max(3, 54, 45, 23);
  console.log("max", max);
  let min = Math.min(3, 54, 45, 23);
  console.log("min", min);
  let values = [1, 2, 3, 4, 5, 6, 7, 8];
  console.log("max", Math.max(...values), "min:", Math.min(...values)); // 8 ,1

  console.log("math.random 的使用");

  /**
   * title:生成一个 1 ~ 10(含10) 的随机数
   * index:1
   * 关键词：Math.floor 、 Math.random
   *  Math.random 会返回一个 0 ~ 1，包含 0，不含 1 的随机小数
   *  Math.floor 直接对数字向下取整，哪怕你是 4.99, 都会被取整为 4
   *  利用 Math.random * 可选总数，得到 0 ~ 可选整数之间的数，在加 1，去掉 0. 在向下取整
   *  公式：Math.floor(Math.random() * total_number_of_choices + first_possible_value)
   *  公式备注：向下取整（ 0~1随机数 * 可选总数（有多少个数） + 第一个数（最小值））
   */
  for (let i = 0; i < 10; i++) {
    //   可选总数是 10
    console.log(Math.floor(Math.random() * 10 + 1));
  }
  // 生成一个 2 ~ 10 的随机数
  for (let i = 0; i < 100; i++) {
    //   2 ~ 10，只有 9 个数，且最小数是 2
    console.log(Math.floor(Math.random() * 9 + 2));
  }

  // 接收两个参数，最小值和最大值
  function selectFrom(lowerNumber, upperNumber) {
    let choices = upperNumber - lowerNumber + 1; // 通过两个值相减在加1，可得到可选总数，
    return Math.floor(Math.random() * choices + lowerNumber);
  }
  //   for (let i = 0; i < 10; i++) {
  //     console.log(selectFrom(2, 10));
  //   }
  //   从一个数组中随机取一个数
  const colors = [
    "red",
    "green",
    "blue",
    "yellow",
    "pink",
    "black",
    "white",
    "glod",
    "orange",
    "brown",
  ];
  console.log(colors[selectFrom(0, colors.length - 1)]);
})();
