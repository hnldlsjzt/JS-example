
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
  // sym = sym2 // fail
  sym2 = sym // ok

  let str: string = 'a'
  let str2: String = new String('a')
  /**
   * 不能将类型“String”分配给类型“string”。
      “string”是基元，但“String”是包装器对象。如可能首选使用“string”。ts(2322)
   */
  // str = str2 // fail
  str2 = str // ok

  {
    /**
     * 数组：
     * 1.直接使用 [] 来定义一组类型
     * 2.使用 Array 泛型
     * 两种并没有本质区别，但更推荐使用 [] 来定义类型注解。1.避免 JSX 方面的语法冲突；2.减少代码量
     */
    {
      // 子元素是数字类型的数组
      let arrayOfNumber: number[] = [1, 2, 3]
      // arrayOfNumber[3] = 'a' // ts(2322)
      // arrayOfNumber.push('b') // ts(2322)

      // 子元素是字符串类型的数组
      let arrayOfString: string[] = ['a', 'b', 'c']
      // arrayOfString[3] = 1
      // arrayOfString.push(4) // ts(2345)
    }

    {
      // 泛型
      let arrayOfNumber: Array<number> = [1, 2, 3]
      let arrayOfString: Array<string> = ['a', 'b', 'c']
    }

  }
  {
    /**
     * any
     */
    {
      let anything: any = {}
      // 不会提示错误
      anything.doAnything()
      anything = 1
      anything = 'a'
      let num: number = anything
      let str: string = anything
    }
    {
      /**
       * unknown
       * TS 3.0 添加的类型，用于描述类型并不确定的变量
       * 与 any 不同的是，unknown 在类型上更安全。我们可以将任意类型赋值给 unknown,但 unknown 只能赋值给 unknown 和 any
       */
      let result: unknown
      // 伪代码
      // if (x) {
      //   result = x()
      // } else if (y) {
      //   result = y()
      // }

      // fail,不能将类型“unknown”分配给类型“number”。ts(2322)
      let num: number = result
      // ok
      let anything: any = result

      {
        let result: unknown
        // 类型缩小手段对 unknown 都有效
        if (typeof result === 'number') {
          // 此时 result 类型是 hover
          result.toFixed()
        }
      }
    }
    {
      /**
       * void,undefined,null 三种类型
       */

      // void 适用于表示没有返回值的函数。在 strict 模式下，声明一个 void 类型的变量几乎没有任何实际用处
      // 因为我们不能把 void 类型的变量值再赋值给 any 和 unknown 之外的任何变量

      let v: void

      // ts(2322)
      let num: number = v
      let str: string = v

      // ok
      let a: any = v
      let u: unknown = v

      const userInfo: {
        id?: number,
        name?: null | string
      } = {
        id: 1,
        name: 'cap'
      }
      let un: undefined = undefined
      let unusable: void = undefined
      // ok
      unusable = un
      // fail,不能将类型“void”分配给类型“undefined”。ts(2322)
      un = unusable

      if (userInfo?.id !== undefined) {
        userInfo.id.toFixed(2)
        // or
        userInfo?.id?.toFixed(2)
      }

    }
  }
  {
    // never

    // 场景1--抛出错误
    function ThrowError(msg: string): never {
      throw Error(msg)
    }
    // 场景2--死循环
    function InfiniteLoop(): never {
      while (true) {

      }
    }

    // 
    let Unreachable: never;
    Unreachable = 'string' // ts 2322
    Unreachable = 1 // ts 2322
    let a: any
    Unreachable = a // ts 2322
    let num: number = Unreachable // ok
    let str: string = Unreachable // ok
    let bool: boolean = Unreachable// ok


    {
      //   恒等为 false 的情况，变量的类型会缩小为 never。相当于死代码，会报错
      const str: string = 'str'
      if (typeof str === 'number') {
        str.toLowerCase() // 类型“never”上不存在属性“toLowerCase”。ts(2339)
      }

    }
    {
      // 在接口中使用 never 来实现可读效果
      const props: {
        id?: number
        name?: never // 实际上是 name?: undefined
      } = {
        id: 1
      }
      props.name = null
      props.name = 'strting'
      props.name = 1
      props.name = undefined
    }
    {
      // 5. object
      function create(o: object | null): any {

      }
      create({}) // ok
      create(() => null)// ok
      create(2) // ts(2345)
      create('string')// ts(2345)
    }
  }

  {
    // 类型断言
    const arrayNumber: number[] = [1, 2, 3]
    const greaterThan2: number = arrayNumber.find(num => num > 2);// 提示 2322，不能把 undefined | number复制给number
    // 在 ts 看来，上一条语句中，返回的值可能存在 undefined 的情况，所以给你返回一个错误
    // 但开发者能肯定的返回的值必定是 3，这时候就可以用到类型断言了
    const greaterThan3: number = arrayNumber.find(num => num > 2) as number; // ok
    const greaterThan4: number = <number>arrayNumber.find(num => num > 2); // ok，但不推荐使用尖括号，和 jsx 冲突

  }
  {
    // 非空断言 在属性或变量后面使用 ! 断言操作符，它可以用来排除值为 null 和 undefiend 的情况
    let mayNullOrUndefinedOrString: null | undefined | string
    mayNullOrUndefinedOrString.toString()// 对象可能为 "null" 或“未定义”。ts(2533)
    mayNullOrUndefinedOrString!.toString()
    {
      let mayNullOrUndefinedOrString: null | undefined | string
      if (typeof mayNullOrUndefinedOrString === 'string') {
        mayNullOrUndefinedOrString.toString()
      }

    }
  }
}()
