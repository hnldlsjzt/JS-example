

/**
 * 通俗来讲，它是这个意思： 柯里化是把 1 个 n 元函数改造为 n 个相互嵌套的一元函数的过程。

 * 再具体一点，就是说柯里化是一个把 fn(a, b, c)转化为fn(a)(b)(c)的过程。

偏函数和柯里化是一脉相承，它们解决的其实是同一类问题。

也就是说函数组合链的参数对不齐问题，用柯里化也是可以解决的，并且柯里化也能够协助我们更好地复用函数逻辑。
 */

void function () {
    function add(a, b, c) {
        return a + b + c
    }
    // 正常调用是 add(1,2,3) 改造成 add(1)(2)(3)

    // 第一个函数，传入 a
    function curryAdd(a) {
        // 第二个函数，传入 b
        return function (b) {
            // 第三个函数，传入c,且使用闭包，记住了 a,b
            return function (c) {
                return a + b + c
            }
        }
    }
    // 输出 6，符合预期
    console.log(curryAdd(1)(2)(3));
    // 但这样违反了设计模式的开放封闭原则，所以现在写个高阶函数来解决下
}()
void function () {
    function add(a, b, c) {
        return a + b + c
    }
    function curryWrap(addFun) {
        console.log('addFun: ', addFun.length);
        return function (a) {
            return function (b) {
                return function (c) {
                    return addFun(a, b, c)
                }
            }
        }
    }
    const curryAdd = curryWrap(add) // 返回原始的柯里化
    // 输出 6，符合预期
    console.log(curryAdd(1)(2)(3));
}()

/**
 * 偏函数（partial application）又叫部分应用
 * 指通过固定函数的一部分参数，然后生成一个参数数量更少的函数的过程
 *  */
void function () {
    // 本来是一个四元函数
    function add(a, b, c, d) {

    }
    // 固定第一个参数，使其缩减为一个三元函数
    function add1(b, c, d) {

    }

    // 或者，固定前面 2 个参数，使其缩减为一个两元函数
    function add2(c, d) {

    }
    //总之，只要它的元比之前小，就满足了偏函数的要求。
}()


// 使用偏函数来解决多个参数的问题
void function () {
    function multiply(x, y) {
        return x * y
    }
    function wrapFunc(func, fixedValue) {
        return function (input) {
            return func(input, fixedValue)
        }
    }
    const multiply3 = wrapFunc(multiply, 3)
    console.log(multiply3(2))
}()

void function () {
    function generateOrderData(type, area, settlement) {
        // 省略数十行难以理解的业务逻辑......
    }

    // 文件 a
    const res = generateOrderData('food', 'hunan', normalSettlement)

    // 文件 b
    const UIData = generateOrderData('food', 'hunan', orderSettlement)

    // 文件 c  
    const result = generateOrderData('food', 'hunan', couponSettlement)


    // 不同的调用，重复的传参，重复的 food + hunan。
    // 而偏函数恰恰就可以把 food 和 hunan “记忆”下来，帮助我们避免这些重复。

    // 实际上，通用函数为了确保其自身的灵活性，往往都具备“多元参数”的特征。但在一些特定的业务场景下，真正需要动态变化的只是其中的一部分的参数。这时候函数的一部分灵活性对我们来说是多余的，我们反而希望它的功能具体一点。

}()


