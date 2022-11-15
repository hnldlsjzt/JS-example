void function () {
    function unique(arr) {
        return arr.filter((item, index, array) => {
            console.log(item, array.indexOf(item), index);
            //  取当前数组中item的第一项来判定去重
            return array.indexOf(item) === index
        })
    }
    let arr = [6, 5, 1, 1, 1, 2, 3, 4, 1, 2, 3, 4, 6]
    console.log('indexOf去重：', unique(arr));
    console.log('new Set去重：', [...new Set(arr)]);
}()


void function () {
    console.log('扁平化数组');
    function flatDeep(arr) {
        let res = [];
        // 拷贝数组
        let stack = [...arr]

        while (stack.length) {
            const val = stack.pop();// 尾部删除在for循环中更稳定
            if (Array.isArray(val)) {
                stack.push(...val);// 重新添加stack
            } else {
                res.push(val)
            }
        }
        return res.sort();
    }
    var test = ["a", ["b", "c"],'h', ["d", ["e", ["f"]], "g"]]
    console.log(flatDeep(test));

}()
