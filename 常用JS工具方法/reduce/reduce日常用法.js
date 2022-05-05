void function () {
    console.log("实现累加");
    let count = [1, 2, 3, 4].reduce((acc, item, index, arr) => {
        // console.log(acc, item, index, arr);
        return acc + item
    }, 0)
    console.log(count);
}()

void function () {
    console.log("reduce实现map");
    // map返回一个数量不变的全新数组
    Array.prototype.reduceMap = (function (callback) {
        // this指向当前调用的数组
        return this.reduce(function (acc, item, index, arr) {
            acc.push(callback(item, index, arr))
            return acc
        }, [])// 必需返回一个数组
    })
    let count = [1, 2, 3, 4].reduceMap(function (item, index) {
        return item * 2
    })
    console.log(count);
}()

void function () {
    console.log("reduce实现filter");
    // filter返回一个过滤后的的全新数组
    Array.prototype.reduceFilter = (function (callback) {
        // this指向当前调用的数组
        return this.reduce(function (acc, item, index, arr) {
            if (callback(item, index, arr)) {
                acc.push(item)
            }
            return acc;
        }, [])// 必需返回一个数组
    })
    let count = [1, 2, 3, 4].reduceFilter(item => item % 2 === 0)
    console.log(count);
}()
