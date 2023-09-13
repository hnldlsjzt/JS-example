

/**
 *  curry 函数内部可以结合入参的情况，自动判断套娃要套几层呢？
 * 1.自动获取函数参数数量  -- fun.length
 * 2.自动分层嵌套函数:有多少数量，嵌套多少层 -- 递归
 * 3.在最后一层，调用传入的函数，传入所有参数
 */


function curry(func) {
    return function curryid(...args) {
        // 判断传入的参数与函数形参
        if (args?.length >= func?.length) {
            return func.apply(this, args)
        } else {
            // 后续调用的函数
            return function (...args2) {
                // 递归调用
                return curryid.apply(this, [...args, ...args2])
                // return curryid.apply(this, args.concat(args2))
            }
        }
    }

}
function sum(a, b, c) {
    return a + b + c;
}

let curriedSum = curry(sum);
console.log('curriedSum: ', curriedSum(1));

console.log(curriedSum(1, 2, 3)); // 6，仍然可以被正常调用
console.log(curriedSum(1)(2, 3)); // 6，对第一个参数的柯里化
console.log(curriedSum(1)(2)(3)); // 6，全柯里化