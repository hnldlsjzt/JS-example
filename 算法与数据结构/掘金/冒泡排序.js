void (function () {
  function BubbleSort(arr) {
    const len = arr.length;
    for (let i = 0; i < len; i++) {
      for (let j = 0; j < len - 1 - i; j++) {
        if (arr[j] > arr[j + 1]) {
          // const temp = arr[j + 1];
          // arr[j + 1] = arr[j];
          // arr[j] = temp;
          [[arr[j], arr[j + 1]]] = [[arr[j + 1], arr[j]]];
          console.log(arr);
        }
      }
    }
    return arr;
  }
  const result = BubbleSort([6, 21, 2, 5, 2, 6, 2]);
  console.log("result: ", result);
})();
