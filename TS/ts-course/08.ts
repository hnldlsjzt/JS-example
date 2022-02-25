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
        Pet.layEggs()
        Pet.fly() // 类型“Bird | Fish”上不存在属性“fly”。 类型“Fish”上不存在属性“fly”。t
        // 尝试使用 typeof,还是和上面一样报错
        if (typeof Pet.fly === 'function') {

        }
        // 使用 in 操作符做类型守卫 --- ok
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
    }
    /* 
    * 合并联合类型 --- 可看成是求交集
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
        type UnionB = ('px' | 'em') | ('vh' | 'em')
    }


}