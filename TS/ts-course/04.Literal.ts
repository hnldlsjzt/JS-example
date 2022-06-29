/**
 * 类型字面量、类型推断、类型拓宽和类型缩小
 */


{

    // -------显示类型声明
    {
        // 显示类型声明
        let str: string = 'this is  string'
        let num: number = 1
        let bool: boolean = true
    }

    {
        // 显示类型声明
        const str: string = 'this is  string'
        const num: number = 1
        const bool: boolean = true
    }

    // ------ 类型推断
    {
        // 和显示声明的类型等价
        // let 和 var 声明的都如此
        let str = 'this is string'
        let num = 1
        let bool = true
    }
    {
        // const 和显示声明的类型不等价

        const str = 'this is string' // 类型字面量是 this is string
        const num = 1 // 类型字面量是 1
        const bool = true // 类型字面是 true
        // 为什么 const 声明类型时，如果缺省会直接把类型定义为类型字面量呢？
        // 因为 const 是一个不可变更常量。在缺省类型注解的情况下，TS 推断它的类型是字面量类型，是一个合理的设计
    }

    {
        let x1 = 42 // 推导出来的类型是 number
        let x2: number = x1 // ok
    }
    {
        // 在 ts 中，具有初始值的变量，有默认值的函数参数、函数的返回类型都可以类型推导出来
        function add1(a: number, b: number) {
            return a + b
        }
        const x1 = add1(1, 1) // 推导出来为 number

        function add2(a: number, b = 1) {
            return a + b
        }
        const x2 = add2(1)
        const x3 = add2(1, '1')// ts(2345)类型“"1"”的参数不能赋给类型“number | undefined”的参数。
    }

    // 上下文推断
    {
        type Adder = (a: number, b: number) => number
        const add: Adder = (a, b) => {
            return a + b
        }
        const x1 = add(1, 2)
        const x2 = add(1, '1')//类型“string”的参数不能赋给类型“number”的参数。ts(2345)
    }
    {
        {
            type Adder = (a: number, b: number) => number
            const add: Adder = (a, b) => a + b
            const x1 = add(1, 1)
            const x2 = add(1, '1')
        }
    }
    // 字面量类型
    // 目前 ts 支持3种字面量类型：字符串字面量、数字字面量、布尔字面量类型
    // 字面量类型是集合类型的子类型，是集合类型的一种更具体的表达。
    {
        let str: 'this is string' = 'this is string' // 类型是 this is string
        let num: 1 = 1 // 类型是 1
        let bool: true = true// 类型是 true

        let str1: string = 'string'
        str1 = str// ok, 'this is string' 是 string 的子类型
        str = str1// 不能将类型“string”分配给类型“"this is string"”。ts(2322)

    }
    {
        type Direction = 'down' | 'up'
        function move(dir: Direction) {

        }
        move('up')
        move('right')
    }

    // 数字字面量及布尔字面量类型
    {
        interface Config {
            size: 'small' | 'big'
            isEnable: true | false
            margin: 2 | 4
        }
    }

    /**
     * 字面量拓宽
     * 所有通过 let 和 var 定义的变量、函数的形参、对象的非只读属性，如果只指定初始值但未显示声明类型注解，
     * 那么他们推断出来的类型就是指定的初始值字面量类型拓宽后的类型，这就是字面量拓宽
     */
    {
        let str = 'str is string';// string
        let strFun = (str = 'str is string') => str //  (str?: string) => string
        strFun()
        const Str = 'this is string' // "this is string"
        let str2 = Str// string
        let strFun2 = (str = Str) => str;//(str?: string) => string

    }
    {
        let str = 'this is string' // str:string
        let strFun = (str = 'this is string') => str // (str?: string) => string
        const specifiedStr = 'this is string' // 类型 this is string
        let str2 = specifiedStr // string
        let strFun2 = (str = specifiedStr) => str // (str?: string) => string

    }

    /**
     * 类型拓宽（type widening)
     * 比如对 null 和 undefined 的类型进行拓宽。通过 let、var 定义的变量如果未满足显示声明注解且被赋予了 null 或 undefined
     * 则推断出来的类型是 any
     */
    {
        let x = null // any
        let y = undefined // any
        // ----------------分割线--------------------
        const z = null // null
        // ----------------分割线--------------------
        let anyFun = (param = null) => param// 形参类型是 null,可以不传或传 undefined 或 null,形参为null或undefined类型时不会拓宽为 any，
        let anyFun2 = (param = undefined) => param// 不传或手动传 undefined
        let anyFun3 = (param = '1') => param// ?string
        let x2 = x // 赋值后还是为 null 不会是 any
        let z2 = z // 赋值后还是为 null 不会是 any
        let y2 = y;// 赋值后还是为 undefined 不会是 any 
        // 上面几个，不会自动拓宽为 any，从安全角度看，是合理的，能让我们更谨慎的对待他们
        anyFun(undefined)
        anyFun2()
        anyFun3()
        
        let narrowing = 'this is string' as const // 类型是this is string
    }

    /**
     * 类型缩小 -- Type Narrowing
     * 可以将一些类型较为宽泛的集合缩小为相对较小、较明确的集合
     * 使用类型守卫将函数参数的类型从 any 缩小为明确的类型
     */
    {
        let func = (anything: any) => {
            if (typeof anything === 'string') {
                return anything // string
            } else if (typeof anything === 'number') {
                return anything // number
            }
            return null

        }
    }
    {
        // 也可以使用联合类型缩小参数到明确的子类型
        {
            let func = (anything: string | number) => {
                if (typeof anything === 'string') {
                    return anything // string
                }
                return anything // number
            }
        }
    }
    {
        // 也可以通过使用字面量等值判断(===),或其它控制流语句（包括但不限于 if 、switch、三目运算符)将联合类型收敛为更具体的类型
        {
            type Goods = 'pen' | 'pencil' | 'ruler'
            const getPenCost = (item: 'pen') => 2
            const getPencilCost = (item: 'pencil') => 4
            const getRulerCost = (item: 'ruler') => 6
            const getCost = (item: Goods) => {
                if (item === 'pen') {
                    return getPenCost(item)
                } else if (item === 'pencil') {
                    return getPencilCost(item)
                } else {
                    return getRulerCost(item)
                }
            }
            console.log(getCost('pen'));


        }
    }
}
type myGoods = 'pen' | 'pencil' | 'ruler'
