
/**
 * 
 * * 05|函数类型：返回值类型和参数类型如何定义？
 * */

/**
 * 在 TS 中，我们可以使用 function 字面量和箭头函数的形式来定义函数
 * */

{
    {
        function add() { }
    }
    {
        const add = () => { }
    }
    // 显示的指定函数参数类型和返回值类型
    {
        const add = (a: number, b: number): number => {
            return a + b
        }
    }

    /** 
     * @name 返回值类型
     * 在 js 中，函数没有显示 return，那返回的就是 undefined
    */
    {


        {
            function fn() { } // fn(): void
        }

        {
            // 但是在 TS 中，不能显示的指定函数类型返回值为 undefined，应该使用 void
            function fn1(): undefined { }// 其声明类型不为 "void" 或 "any" 的函数必须返回值。ts(2355)

            // ok
            function fn2(): void {

            }
        }

    }
    /**
     * @name 使用类型箭头函数的语法来表示函数类型的参数与返回值，=>类型仅仅是用来定义函数类型而不是实现这个函数
     * TS 中的箭头函数和 JS 中的箭头函数不一样。TS 中 => 用来表示函数的定义，左边是类型，右边是返回值。
     * JS 的 ES6 则是函数的实现
     */
    {
        type Adder = (a: number, b: number) => number
        const add: Adder = (a, b) => a + b

    }
    // 对象的写法，除了使用这种声明语法，还可以使用对象属性简写语法来声明函数类型
    {
        interface Entity {
            add: (a: number, b: number) => number
            del(a: number, b: number): number
        }
        const entity: Entity = {
            add: (a, b) => a + b,
            del(a, b) {
                return a + b
            }
        }
    }
    /**
     * @name 可缺省和可推断的返回值类型
     * 返回值在 TS 中可以被推断出来，即可缺省
     * 函数内是一个相对独立的上下文环境，根据入参，计算出返回值。从类型层面看，我们也可以通过类型推断加工计算出返回值
     * 重点：函数返回值的类型推断结合泛型可以实现特别复杂的类型计算（本质上还是类型推断），比如 Effect、Reducer
     */
    {
        function computeTypes(one: string, two: number) {
            const nums = [two]
            const strs = [one]
            return {
                nums, // number[]
                strs // string[]
            }
        }
    }
    // 一般来说，函数返回值都是可以缺省的，但也有特例。比如 Generator 函数的返回值，需要显示返回
    {
        type AnyType = boolean
        type AnyReturnType = string
        type AnyNextType = number
        function* gen(): Generator<AnyType, AnyReturnType, AnyNextType> {
            const nextValue = yield true // nextValue 类型是number，yidle 后必需是 boolean
            return `${nextValue}`// 必需返回 string 类型
        }
    }

    /**
     * @name 参数类型
     * 可选参数和默认参数
     */
    // 可选参数的使用方式
    {
        function log(x?: string) {// log(x?: string | undefined): string | undefined
            return x
        }
        log()// undefined
        log('hello') // hello
    }
    {
        // 缺省后类型可能为 undefined,那是不是意味着缺省类型和undefined类型等价呢？
        // 答案当然是不等价，缺省可以不填，但你显示指定了 undefined，那就必需要传入一个参数才行
        function log1(x?: string) {
            console.log(x);

        }
        function log2(x: string | undefined) {
            console.log(x)
        }
        log1()
        log1(undefined)
        // log2()// 应有 1 个参数，但获得 0 个。ts(2554)
        log2(undefined)

    }
    // 参数默认值的使用方式
    {
        function log3(x = 'hello') {
            console.log(x);
        }
        log3()// hello
        log3('hi')// hi
        // log3(1)// 类型“1”的参数不能赋给类型“string | undefined”的参数

        // 参数默认值必需是参数类型的子类型
        function log4(x: number | string = 'hello') {
            // 下面这个语法错误，联合类型默认值只能放到后面，不能同时有
            // function log4(x: number = 1 | string = 'hello') {}
            console.log(x);

        }
        log4()
        log4(undefined)
        log4(1)
    }
    // 剩余参数
    {
        function sum(...nums: number[]) {
            const count = nums.reduce((a, b) => a + b, 0)
            console.log(count)
            return count
        }
        sum(1, 2)
        sum(2, 3)
        sum(1, "1")// 型“string”的参数不能赋给类型“number”的参数
    }
    void function () {
        function sum(...nums: (number | string)[]) {
            return nums.reduce<number>((a, b) => a + Number(b), 0)
        }
        console.log(sum(1, '2', '1a'))
    }()

    // this
    void function () {
        function say() {
            console.log(this.name);//"this" 隐式具有类型 "any"，因为它没有类型注释

        }
    }()
    void function () {
        function say(this: Window, name: string) {
            console.log(this.name);//"this" 隐式具有类型 "any"，因为它没有类型注释

        }
        window.say = say
        window.say('hi')
        const obj = {
            say
        }
        obj.say('hi')
    }()



    // 函数重载
    {
        function convert(x: string | number | null): string | number | -1 {
            if (typeof x === 'string') {
                return Number(x)
            }
            if (typeof x === 'number') {
                return String(x)
            }
            return -1
        }
        const x1 = convert('a')// => string | number
        const x2 = convert(1)// => string | number
        const x3 = convert(null)// => string | number

        // function convert(x: string | number | null): string | number | -1 {
        //     if (typeof x === 'string') {
        //         return Number(x)
        //     }
        //     if (typeof x === 'number') {
        //         return String(x)
        //     }
        //     return -1
        // }
        // // 现在3个调用都是 string | number，那有没有一种更精确的描述参数与返回值类型的函数类型呢
        // const x1 = convert('a')
        // const x2 = convert(1)
        // const x3 = convert(null)
        // console.log(x1, x2, x3);

    }
    // 更精确的描述参数与返回值的关系
    void function () {
        function convert(x: string): number
        function convert(x: number): string
        function convert(x: null): -1
        function convert(x: string | number | null): string | number | -1 {
            if (typeof x === 'string') {
                return Number(x)
            }
            if (typeof x === 'number') {
                return String(x)
            }
            return -1
        }
        const x1 = convert('a')// number
        const x2 = convert(1)// string
        const x3 = convert(null)// -1
        console.log(x1, x2, x3);// NaN 1 -1
    }()

    void function () {
        // 以下3个函数必需是第4个函数的子集，且 convert 在被调用时，是按函数定义的顺序来找。优先匹配第一个，以此类推
        function convert(x: string): number
        function convert(x: number): string
        function convert(x: null): -1

        // --------- 分割线------------
        function convert(x: string | number | null): string | number | -1 {
            if (typeof x === 'string') {
                return Number(x)
            }
            if (typeof x === 'number') {
                return String(x)
            }
            return -1
        }
        const x1 = convert('1') // number
        const x2 = convert(1) // string
        const x3 = convert(null) // -1
        void function () {
            interface P1 {
                name: string
            }
            interface P2 extends P1 {
                age: number
            }
            function convert(x: P1): number
            function convert(x: P2): string
            function convert(x: P1 | P2): any {

            }
            const x1 = convert({ name: '' } as P1)
            const x2 = convert({ name: '', age: 18 } as P2)

        }()

    }()

    /**
     * @name 类型谓词 参数名 is 类型
     * 函数的一种特殊类型描述,告诉引擎，守卫返回为true时，把守卫的类型缩小到 is 指定的更明确的类型
     */
    void function () {
        function isString(x: unknown): x is string {
            return typeof x === 'string'
        }
        function isNumber(x: number) {
            return typeof x === 'number'
        }
        function operator(x: unknown) {
            if (isString(x)) {

            }
            if (isNumber(x)) { // ts(2345) unknown 不能赋值给 number

            }
        }
    }()

    void function () {
        function isString(s: unknown): s is string { // 类型谓词
            return typeof s === 'string'
        }
        function isNumber(n): n is number {
            return typeof n === 'number'
        }
        function operator(x: unknown) {
            if (isString(x)) {

            }
            // x 改为 any 可以，但是非常不推荐
            if (isNumber(x)) {

            }
        }
    }()




}



