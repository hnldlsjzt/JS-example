void function () {


    // 变与不变

    function add1(num) {
        return num + 1
    }

    function mult3(num) {
        return num * 3
    }


    function divide2(num) {
        return num / 2
    }

    function arrCompute(arr, fun) {
        const res = []
        for (let index = 0; index < arr.length; index++) {
            // 执行回调函数
            res.push(fun(arr[index]))
        }
        return res
    }
    const arr = [1, 2, 3]
    console.log(arrCompute(arr, add1))
    console.log(arrCompute(arr, mult3))
    console.log(arrCompute(arr, divide2))
}()
