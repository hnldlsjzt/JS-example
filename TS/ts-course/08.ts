/**
 * @name 高级类型：联合类型和交叉类型的含义
 */

{

    void function () {
        {
            function formatPX(size: unknown) {
                if (typeof size === 'number') {
                    return `${size}px`
                }
                if (typeof size === 'string') {
                    return `${parseInt(size) || 0}px`
                }
                throw Error('仅支持 number 或 string')
            }
            formatPX(12)
            formatPX('12')
            formatPX(true)
        }
    }()

    /* 联合类型 */
    {
        function formatPX(size: string | number) {
            if (typeof size === 'string') {
                return `${parseInt(size) || 0}px`
            }
            return `${size}px`
        }
        formatPX(1)
        formatPX('1')
        formatPX(true)// 类型“boolean”的参数不能赋给类型“string | number”的参数。ts(2345)
        formatPX(null)
        formatPX(undefined)
    }
    {
        function formatUnit(size: number | string, unit: 'px' | 'em' | 'rem' | '%') {
            if (typeof size === 'string') {
                return `${parseInt(size) || 0}${unit}`
            }
            return `${size}${unit}`
        }
        formatUnit(1, 'px')
        formatUnit(1, 'bem')
    }
    {
        /* 抽离下类型别名 */
        type ModernUnit = 'vh' | 'vw'
        type Unit = 'px' | 'em' | 'rem'
        type MessageUp = ModernUnit | Unit  // 'vh' | 'vw'|'px' | 'em' | 'rem'
        /** 
         * @name 如果将 string 字面量和 string 类型组合成一个联合类型会是什么效果 
         * 答案是：变成 string 类型
         * */
        {
            function formatUnit1(size: number | string, unit: MessageUp) {
                if (typeof size === 'string') {
                    return `${parseInt(size) || 0}${unit}`
                }
                return `${size}${unit}`
            }
            formatUnit1(1, 'px')
            formatUnit1(1, 'vh')
            formatUnit1(1, 'rem')
        }
    }
    {
        /* 更复杂点的结构 */
        interface Bird {
            fly(): void
            layEggs(): void
        }
        interface Fish {
            swim(): void
            layEggs(): void
        }
        const getPet: () => Bird | Fish = () => {
            return {

            } as Bird | Fish
        }
        const Pet = getPet()
        Pet.layEggs() // 访问都有的成员，是没问题的
        Pet.fly() // 类型“Bird | Fish”上不存在属性“fly”。 类型“Fish”上不存在属性“fly”。t
        // 尝试使用 typeof,还是和上面一样报错
        if (typeof Pet.fly === 'function') {

        }
        // 使用 in 操作符做类型守卫 --- ok
        // in 判断左侧的属性在对象上是否有（含原型链）
        if ('fly' in Pet) {
            Pet.fly()
        }
    }

    /**
     * @name 交叉类型
     *   
     * */
    {
        type Useless = string & number // 既是 string 和 number 类型的，只有 never 了
        type str = string & '1'

    }
    /* 合并接口类型 */
    {
        type Type =
            { id: number, name: string } & { age: number }
        // 需要同时有这3个属性,可理解为求并集
        // 如果两个接口类型中有存在同样的属性，比如name类型一个number、一个string，那 name 就是他们的交叉类型，为 never
        const mixed: Type = {
            id: 1,
            name: 'zt',
            age: 10
        }

        // 同名属性的类型兼容，但一个 number，一个是 number 的字面量类型，合并后，那 name 就是numer字面量
        // 和顺序无关，调整过顺序，还是 number 字面量类型
        type TypeConfig = { id: number, name: number } & { age: number, name: 2 }
        let mixedConfig: TypeConfig = {
            id: 1,
            name: 1,// 不能将类型“1”分配给类型“2”。ts(2322)
            age: 1
        }

        type TypeConfig1 = { id: number, name: number } & { age: number, name: string }
        let mixedConfig1: TypeConfig1 = {
            id: 1,
            name: 2,// 不能将类型“1”分配给 never
            age: 1
        }

        type IType = {
            name: string
            age: number
        } & {
            id: string
        }
        const type1: IType = {
            name: '1',
            age: 1,
            id: '1'
        }
    }
    /* 
    * 合并联合类型 --- 可看成是求交集
    A & B 本质上就是说类型既符合 A 也符合 B，所以如果 A、B 是接口类型，就等于是把他们合并为一个接口类型（类比求并集）；但是如果 A、B 是联合类型，则会得到他们公共成员类型（类比求交集）。
     */
    {
        // 合并联合类型是求交集---所以下面只有 em、rem 生效
        type UnionA = 'px' | 'em' | 'rem' | '%';
        type UnionB = 'vh' | 'em' | 'rem' | 'pt';
        type IntersectionUnion = UnionA & UnionB
        const iA: IntersectionUnion = 'em'
        const iB: IntersectionUnion = 'rem'
        const iC: IntersectionUnion = 'px'// 不能将类型“"px"”分配给类型“"em" | "rem"”。ts(2322)

        // 如果多个合并联合类型中，没有相同的成员，那类型就是 never
        type UnionC = 'em' | 'ren'
        type UnionD = 'px' | 'pt'
        type IntersetionUnionE = UnionC & UnionD
        const IntersectionUnionD: IntersetionUnionE = 'any' as any// 不能将类型“any”分配给类型“never”。
    }
    /**
     * @name 联合、交叉组合 
     * 联合操作符 | 在优先级上比交叉操作符 & 低，这单和 JS 一样。同样，我们可以使用 () 来提升优先级
     * */
    {
        type UnionA = { id: number } & { name: string } | { id: string } & { name: number }
        type UnionB = ('px' | 'em') | ('vh' | 'em') // px|em |vh
        // 使用括号调整优先级
        // name 同时为 stirng 和 number，能满足他们的子类型的只有 never，所以就交叉 后面两者即可 id:string,name:number
        type UnionC = ({ id: number } & { name: string } | { id: string }) & { name: number }
        // 同样，先交叉，后联合。前部分的 name 又是 number 和 string，满足的只有 never。那就满足后一部分即可
        type UnionD = { id: number; } & { name: string; } & { name: number; } | { id: string; } & { name: number; }; // 满足分配率
        // 前面一部分交叉类型和联合类型，满足其一。在用其中一个来跟后面一段来做交叉
        type UnionE = ({ id: string; } | { id: number; } & { name: string; }) & { name: number; }; // 满足交换律
        const iA1: UnionA = {
            id: 1,
            name: '2'
        }
        const iA2: UnionA = {
            id: '',
            name: 1
        }

        const iC1: UnionC = {
            id: '1',
            name: 1
        }
        const iD1: UnionD = {
            id: '1',
            name: 2
        }
        const iE1: UnionE = {
            id: '',
            name: 1
        }

    }
    {
        // 类型缩减 -- 
        // 如果 string 和 字符串字面量在联合类型中使用，会变成什么样
        // 答案是 缩减成 string
        type URStr = string | 'str' // string
        type URNum = number | 1 // number
        type URBol = true | boolean //boolean
        enum UREnum {
            ONE,
            TWO
        }
        type URE = UREnum.ONE | UREnum //UREnu
        // TS 对字符串字面量和枚举成员类型缩减掉，只保留原始类型和枚举父类型，这是合理的优化。但是会大大缩小 IDE 的提示
        // 此时 borderColor 的类型缩减为 string
        type BorderColor = 'red' | 'greey' | 'blue' | string
        // 加个黑魔法，让 IDE 可以提示
        type BorderColor1 = 'red' | 'greey' | 'blue' | string & {}
        let color: BorderColor1 = 'greey'

        // 当联合类型的值是接口类型，且其中一个的属性是另一个的子集属性，那这个属性也会类型缩减
        type UnioInterface = {
            age: '1',
        } | {
            age: '1' | '2',
            [key: string]: string
        }
        let unioI1: UnioInterface = {
            age: '2',
            id: '1'
        }

        type UnioInterface1 = {
            age: number
        } | {
            age: string,
            // [key: string]: string
        }
        const O: UnioInterface1 = {
            age: 1
        }

        type UnionInterce2 =
            | {
                age: number;
            }
            | ({
                age: string;
                [key: string]: string;
            });

        const O2: UnionInterce2 = {
            age: '2',
            string: 'string'
        };
    }

    {
        type IntersectionType = { id: number; name: string; }
        type UnionA = 'px' | 'em' | 'rem' | '%';
        type UnionB = 'vh' | 'em' | 'rem' | 'pt';
        type IntersectionUnion = UnionA
    }

}

type StringOrNumberArray<E> = E extends string | number ? E[] : E;

type StringArray = StringOrNumberArray<string>; // 类型是 string[]

type NumberArray = StringOrNumberArray<number>; // 类型是 number[]

type NeverGot = StringOrNumberArray<boolean>; // 类型是 boolean

type BooleanOrString = string | boolean;

type WhatIsThis = StringOrNumberArray<BooleanOrString>; // boolean | string[]

// 只有泛型 + extends 三元，才会触发分配条件类型
type BooleanOrStringGot = BooleanOrString extends string | number ? BooleanOrString[] : BooleanOrString; //  string | boolean
// {} 和 object 是有区别的，{} 表示所有原始类型和非原始类型的集合，object 表示所有非原始类型的集合