
/**
 * @name 接口类型和类型别名
 */

// TS 对对象的类型检测遵循一种“鸭子类型”或者“结构化类型”准则。只要两个对象的结构一致，属性和方法一致，则他们的类型一致

{
    interface Language {
        name: string,
        age: () => number
    }
    function Study(language: Language) {
        console.log(`${language.name}===${language.age()}`);
    }
    // ok
    Study({
        name: 'study',
        age: () => new Date().valueOf()
    })

    // fail--- 缺少 age 属性
    Study({
        name: 'ts'
    })

    // fail --- 多了 id 属性
    Study({
        name: 'ts',
        age: () => new Date().getDay(),
        id: 2

    })

    // 有意思的是，上面的示例只要先把他赋值给一个变量，就可以绕过。这是 ts 有意为之，为了区分字面量和变量
    const ts = {
        id: 1,
        age: () => new Date().getDate(),
        name: "ts"
    }
    Study(ts)
}
{
    // TS 内联接口和 JS 解构很类似, 内联接口类型不可复用，更多的应该使用 interface 关键字来抽离可复用的类型

    /* 纯 JS 解构 */
    function StudyJavaScript({ name, age }) {
        console.log(name, age);
    }

    /* TS 里解构与内联类型混用 */
    function StudyTypeScript({ name, age }: { name: string, age: number }) {
        console.log(name, age)
    }

    /* 纯 JS 解构语法与别名 */
    function StudyJavaScript1({ name: aliasName }) {
        console.log(aliasName)
    }

    /* TS */
    function StudyTypeScript1(language: { name: string }) {
        console.log(language.name)
    }

}
/*  TS 中使用接口语法 */
{
    /* 接口关键字 接口名称 */
    /* 格式：
        interface 名称 {
        } 
    */
    interface ProgramLanguage {
        name: string
        age: () => number
    }
    function NewStudy(param: ProgramLanguage) {

    }

    /* 复用接口类型来约束其他逻辑 */
    let TypeScript: ProgramLanguage
    TypeScript = {
        name: 'ts',
        age: () => new Date().getFullYear()
        // age() {
        //     return new Date().getFullYear()
        // }
    }

    /* interface 定义函数类型 */
    {
        interface StudyLanguage {
            (language: ProgramLanguage): void
        }
        // let StudyInterface: StudyLanguage = language1 => console.log(`${language1.name}--${language1.age()}`)
        let StudyInterface: StudyLanguage = language1 => {
            console.log(`${language1.name}--${language1.age()}`)
        }
        let param = {
            name: 'zt',
            age: () => new Date().getTime(),
            id: 1
        }
        StudyInterface({
            name: 'zt',
            age: () => new Date().getTime(),
        })
    }
    /* 
    * @name 索引签名 
    *  在实际工作中，使用接口类型较多的地方是对象，比如 React 组件的 props&state,HTMLElement 的 Prsop
    */

    {
        interface LanguageRankMap {
            1: 'typescript',
            2: 'javascript'
        }
        let LanguageMap = {
            TypeScript: 2012,
            JavaScript: 1995
        }

    }
    {
        interface LanguageRank {
            [rank: number]: string
        }
        interface LanguageYear {
            [name: string]: number
        }
        {
            let LanguageRankMap: LanguageRank = {
                1: 'js',
                2: 'ts',
                // '11': 1// 不能将类型“number”分配给类型“string”。ts(2322)
            }
            let languageYear: LanguageYear = {
                TypeScript: 1,
                JavaScript: 2,
                1: 1// 1 和 '1' 作为索引时，兼容数字和str类型
            }
        }
    }
    /*
     *属性和索引签名的混用 
     * 虽然他们能混用，但是属性的类型必需是索引签名的子集
    */
    {
        interface StringMap {
            [prop: string]: number
            age: number
            name: string// 类型“string”的属性“name”不能赋给“string”索引类型“number”。和 prop 冲突
        }
        interface NumberMap {
            [rank: number]: string
            1: string
            2: number// 不是索引签名类型的子集
        }
        {
            interface LanguageRankInterface {
                name: number; // ok
                // 0: number; // ok
                [rank: string]: number;
                // [name: string]: number;
            }
        }
        interface LanguageRankInterface {
            name: string
            0: number
            [rank: number]: string
            [name: string]: number
        }
        {
            interface LanguageRankInterface {
                /* 同时使用也不行，因为是不同类型 */
                [name: string]: number
                [rank: number]: string
            }
        }
        // 那如果确实需要 age 是 number 类型，其他属性是 string 的对象数据结构，要如何处理呢？

    }
    /* 
    *接口与继承

    */
    {
        interface ProgramLanguage {
            name: string
            age: () => number
        }

        interface DynameicLanguage extends ProgramLanguage {
            rank: number// 定义新属性
        }
        interface TypeScript extends ProgramLanguage {
            typeCheck: string;// 定义新属性
        }
        /* 继承多个 */
        interface TypeScriptLanguage extends DynameicLanguage, TypeScript {
            name: 'typeScript'// 用原属性类型的兼容的类型重新定义属性
            // name : 1 //  不能将类型“number”分配给类型“string”。ts(2430)
        }
        // 在继承时，如果要覆盖继承属性，属性类型必需一致
        interface WrongTypeLanguage extends ProgramLanguage {
            name: number //   不能将类型“number”分配给类型“string”。ts(2430)
        }

        /* 类实现接口 */
        {
            class LanguageClass implements ProgramLanguage {
                name: string = '';
                age = () => new Date().getFullYear()
            }
        }

    }

}
/* 可缺省属性 */
{
    interface OptionalProgramLanguage {
        /* 语言名称 */
        name: string
        age?: () => number
    }
    let OptionalTypeScript: OptionalProgramLanguage = {
        name: 'zt'// ok
    }
    // 对于值可能为 undefined 的情况要使用类型守卫或可选链
    if (typeof OptionalTypeScript.age === 'function') {
        OptionalTypeScript.age()
    }
    OptionalTypeScript?.age?.()

}
/* 只读属性 */
{
    interface ReadOnlyProgramLanguage {
        readonly name: string// 只读属性
        readonly age: (() => number) | undefined
    }
    let ReadOnlyTypeScript: ReadOnlyProgramLanguage = {
        name: 'zt',
        age: () => new Date().getDay()
    }
    ReadOnlyTypeScript.name = 'duoduo' // 无法分配到 "name" ，因为它是只读属性。

}



{
    interface A {
        a: string
        b: number
    }
    interface B {
        a: string
        b: number
        c: boolean
    }

    type C = (a: number, b: string) => void
    type D = (a: number, b: string, c: boolean) => void
    let a: A
    let b: B
    let c: C
    let d: D
    a = b
    b = a

    c = d
    d = c
    c(1, 'b', '1')


}

/*
* 类型别名 --- type
* 接口类型的一个作用是将内联类型抽离出来，从而实现类型复用。还可以使用类型别名来实现复用
* 类型别名 --- 顾名思义，即我们仅仅是给类型取了一个新名字，而不是创建了一个新的类型
  */

{
    type LanguageType = {
        /* 以下是接口属性 */
        name: string
        age: () => number
    }
    /* 针对接口无法覆盖的场景，比如组合类型、交叉类型,只能使用类型别名来接收 */
    {
        interface ProgramLanguage {
            name: string
            age: () => number
        }

        /* 联合 -- 满足任意一个类型 */
        type MixedTYPE = string | number;
        /* 交叉 --- 类型中所有属性都要有 */
        type IntersectionType = { id: number; name: string } & {
            age: number; name: string
        }
        /* 提取接口属性类型 */
        type AgeType = ProgramLanguage['age']

        const intersection: IntersectionType = {
            name: '1',
            id: 1,
            age: 1
        }

        const age: AgeType = () => new Date().getDate()
    }
    /* 
    * interface 和 type 的区别
    * 他们在大部分情况下都等价，在一些特殊场景，还是有很大差异
     */
    /* 
    * interface 
    *1.
     */
    /**
     * @name interface
     * 1.可以声明多个同名接口 --- 接口可重叠，重叠时属性会叠加。能很好的扩展
     * 2.可以继承 
     * 3.大部分时候都是什么对象
     * @name type
     * 1.可以使用联合类型、交叉类型、元祖、原始类型
     */
    {
        /* interface 重叠 --- ok */
        interface Language {
            id: number
        }
        interface Language {
            name: string
        }
        let lang: Language = {
            id: 1,
            name: 'ts'
        }
    }
    {
        /* type 重叠 ---- fail */
        type Language = {
            id: number
        }
        type Language = {
            name: string
        }

    }

}
