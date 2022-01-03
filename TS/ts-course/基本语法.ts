
void function () {
    let num = 1;
    let num1: number = 1

    // bigint 在 tsconfig.json 中的 target 必需大于 ES2020
    let big: bigint = 100n

    // 不能将类型“number”分配给类型“bigint”。ts(2322)
    // big = num

    // TS 还包含 String、Number、Boolean、Symbol等类型 （注意大小写）
    // 大写和小写的类型不等价，注意区分

    let sym: symbol = Symbol('a')
    let sym2: Symbol = Symbol('b')
    /**
     * 不能将类型“Symbol”分配给类型“symbol”。
       “symbol”是基元，但“Symbol”是包装器对象。如可能首选使用“symbol”。ts(2322)
     */
    sym = sym2 // fail
    sym2 = sym // ok

    let str: string = 'a'
    let str2: String = new String('a')
    /**
     * 不能将类型“String”分配给类型“string”。
        “string”是基元，但“String”是包装器对象。如可能首选使用“string”。ts(2322)
     */
    str = str2 // fail
    str2 = str // ok
}()
