/*
 * @Author: hnldlsjzt
 * @Date: 2022-06-20 08:21:52
 * @LastEditTime: 2022-06-23 15:50:15
 * @LastEditors: hnldlsjzt
 * @Description: 官方轮子
 * @FilePath: /coding/JS-example/TS/ts-course/15.ts
 * 可以输入预定的版权声明、个性签名、空行等
 */


void function () {

    {
        // 工具类型的本质就是构造复杂类型的泛型。如果一个工具类型不支持泛型入参，那它跟普通类型别名就没区别了。
        {
            // 每次都实现一个类型 isXX 的类型，来校验类型，太不灵活
            type isXX = 1 extends number ? true : false;

            type isYY = 'string' extends string ? true : false;

        }
        {
            // 使用泛型来优化上面的类型判断,封装成一个可复用的工具泛型
            type isSubstring<Child, Par> = Child extends Par ? true : false
            type isxx1 = isSubstring<1, number> // true
            type isxx2 = isSubstring<'', number> // false
            type isxx3 = isSubstring<true, boolean> // true

        }
        {
            // 条件类型
            // TS 支持使用三元运算符的条件类型，根据 ？ 前面的条件返回不同的类型（跟 js 一样），同时还支持嵌套
            // 在三元运算符中，主要使用  extends 关键字来判断两个类型的子类型关系

            type isSubType<Child, Par> = Child extends Par ? true : Par extends Child ? true : false
            type isX1 = isSubType<1, number> // true
            type isX2 = isSubType<number, 1> // true
            type isX3 = isSubType<'1', number> // false
        }
        {
            // 分配条件类型 --- 在条件类型中，如果入参是联合类型，则会被拆解成一个个独立的类型，然后再进行类型运算

            {
                type BooleanOrString = boolean | string
                type StringOrNumberArray<E> = E extends string | number ? E[] : E
                // 这里是个泛型
                type WhatIsThis = StringOrNumberArray<BooleanOrString>//boolean |  string[] 
                type WhatIsThis1 = StringOrNumberArray<string | number>//number[] |  string[] 

                const strings: WhatIsThis1 = [1]

                // 这里没使用泛型，直接用的联合类型。所以它触发不了分配条件类型，那运算就是false了
                type BooleanOrStringGot = BooleanOrString extends string | number ? BooleanOrString[] : BooleanOrString // boolean | string
                // 除非是被约束的类型，都是符合的
                type BooleanOrStringGot2 = BooleanOrString extends string | boolean | number ? BooleanOrString[] : BooleanOrString // BooleanOrString[]
                type BooleanOrStringGot3 = BooleanOrString extends string | boolean | number ? BooleanOrString[] : BooleanOrString // BooleanOrString[]

                // 使用某些手段，强制类型入参被当成一个整体，也可以接触类型分配
                {
                    type StringOrNumberArray<E> = [E] extends [string | number] ? E[] : E
                    type StringOrNumberArray1<E> = [E] extends string | number ? E[] : E
                    type WhatIsThis = StringOrNumberArray<string | boolean> // string | boolean
                    // 
                    type WhatIsThis1 = StringOrNumberArray<string | number> // (string | boolean)[] 这个类型说明可以是[1,'1']
                    type WhatIsThis2 = StringOrNumberArray1<string | number> // string | number
                    const strings: WhatIsThis1 = ['1', 1]
                    const strings1: WhatIsThis2 = 1

                    type GetNever = StringOrNumberArray<never> // never[]
                }
                {
                    // 包含条件类型的泛型接收 never 作为泛型入参时，存在一定陷阱
                    type GetNums = never extends number ? number[] : never extends string ? string[] : never // number[],因为 never 是所有类型的子类型
                    type GetNever = StringOrNumberArray<never> // never
                }
                // 因为 never 是不能分配的底层类型，如果作为入参以原子形式出现在条件判断 extends 左侧，则实例化得到的类型也是 never
                type GetNever = StringOrNumberArray<never> // never
                {
                    // never 相关的示例
                    type UseFulNever<T> = T extends {} ? T[] : T
                    type UseLessNeverX<T, S> = S extends {} ? S[] : T
                    type UseLessNeverY<T, S> = S extends {} ? T[] : T
                    type UseLessNeverZ<T> = [T] extends {} ? T[] : T

                    type ThisIsNever = UseFulNever<never> // never -- 在泛型中传 never ，且 never 被当成原子类型，那就直接返回 never
                    type ThisIsNeverX = UseLessNeverX<never, string> // string[]
                    type ThsiIsNeverY = UseLessNeverY<never, string> // never[]
                    type ThisIsNeverZ = UseLessNeverZ<never> // never[] // 虽然泛型参数是 never，但在分配时被 [] 包裹,还是能进行条件分配
                }
            }
        }

        {
            // 条件类型中的类型判断 infer
            // 可以使用 infer（类型推断符）来获取类型入参的组成部分。比如获取数组类型入参里的元素
            // 又可以把 infer 看成是占位符，在运行时才获取

            type ElementTypeOfArray<T> = T extends (infer E)[] ? E : never
            type isNumber = ElementTypeOfArray<number[]> // number
            type isNumber1 = ElementTypeOfArray<[1, 2, 3, '4']> // 1 | 2 | 3 | "4"
            type isNumber2 = ElementTypeOfArray<[[], {}, boolean, () => void, bigint]> // bigint | boolean | {} | [] | (() => void)
            // 只要不是数组，就是 never
            type isNever = ElementTypeOfArray<number> // never
            type isNever1 = ElementTypeOfArray<1> // never

            {
                // 通过 infer 创建任意个类型推断参数，以此获取任意的成员类型
                type ElementTypeObject<T> = T extends { name: infer N, id: infer I } ? [N, I] : never
                type isArray = ElementTypeObject<{ name: 'zt', id: '27' }> // ["zt", "27"]
                type isArray1 = ElementTypeObject<{ name: 'zt' }> // never
                type isNever = ElementTypeObject<1> // never
            }


        }
        {
            // 索引访问类型
            // 索引访问类型更像是获取物料的方式，我们可以通过属性名、索引、索引签名按需提取对象（接口类型）任意成员的类型（只能通过【索引名】的语法）
            interface MixedObject {
                animal: {
                    type: 'animal' | 'dog' | 'cat',
                    age: number
                }
                // 索引签名
                [name: number]: {
                    type: string
                    age: number
                    nickname: string
                }
                // 索引签名
                [name: string]: {
                    type: string
                    age: number
                }
            }

            // 接着我们通过【】来提取类型
            type animal = MixedObject['animal']
            // {
            //     type: 'animal' | 'dog' | 'cat';
            //     age: number;
            // }

            // 多级属性查询
            type animalType = MixedObject['animal']['type'] // "animal" | "dog" | "cat"

            type numberIndex = MixedObject[number]
            type numberIndex0 = MixedObject[0]
            type numberIndex1 = MixedObject[0]['type'] // string
            //{
            //     type: string;
            //     age: number;
            //     nickname: string;
            // }
            type stringIndex = MixedObject[string]
            type stringIndex0 = MixedObject['a'] // 只要是string或string的子类型，就是【name:string】
            type stringIndex1 = MixedObject['abc']
            type stringIndex2 = MixedObject['abc']['age']
            // {
            //     type: string;
            //     age: number;
            // }



            {
                // keyof 关键字提取对象属性名、索引名、索引签名的类型
                type MixedObjectKeys = keyof MixedObject
                type animalKey = keyof animal // "type" | "age"
                type numberKey = keyof numberIndex // "type" | "age" | "nickname"
            }

            {
                // typeof
                // 它可以在表达式上下文中使用，也可以在类型上下文中使用
                // 表达式上下文：用来获取表达式值的类型（主要用途）
                // 类型上下文中使用，则是用来获取变量或属性的类型。
                let Stra = 'a'
                const unions = typeof Stra // "string" | "number" | "bigint" | "boolean" | "symbol" | "undefined" | "object" | "function"
                const union1 = typeof 'a' // "string" | "number" | "bigint" | "boolean" | "symbol" | "undefined" | "object" | "function"
                const union2 = typeof 1 // "string" | "number" | "bigint" | "boolean" | "symbol" | "undefined" | "object" | "function"
                const str: typeof Stra = '1' // string
                type DerivedFromStrA = typeof Stra // string

                // 对于任何未显示添加类型注解或值与类型注解一体（函数、类）的变量或属性，我们都可以使用 typeof 提取他们的类型。这是个十分方方便、有用的设计
                {
                    const animal = {
                        id: 1,
                        name: 'animal'
                    }
                    type Animal = typeof animal
                    //{
                    //     id: number;
                    //     name: string;
                    // }

                    const animalFun = () => animal
                    type AnimalFun = typeof animalFun
                    // () => {
                    //     id: number;
                    //     name: string;
                    // }
                }
            }

        }
        {
            // 映射类型 -- 使用索引签名语法和 in 关键字限定对象属性的范围
            // keyof 和 in 只能在类型别名中使用
            type keys = 'id' | 'name'
            type TargetType = {
                [key in keys]: any
            }
            // {id: any;name: any;}
            type TargetGeneric<O extends string | number | symbol> = {
                [key in O]: any
            }
            type TargetInstance = TargetGeneric<keys>
            // {
            //     id: any;
            //     name: any;
            // }

            // 在接口中使用 in，会报错
            // interface ITargetInterface {
            //     [key in keys]: any
            // }

            // 在定义类型时，我们可以组合使用 in 和 keyof，并基于已有的类型创建一个新类型，使得新类型与已有类型保持一直的只读、可选特性。这样的泛型称为映射类型
            {
                interface SourceInterface {
                    readonly id: number
                    name?: string
                }

                type TargetType = {
                    [key in keyof SourceInterface]: SourceInterface[key]
                }// { readonly id: number; name?: string | undefined }

                type TargetGenericType<T> = {
                    [K in keyof T]: T[K]
                }
                type TargetInstance = TargetGenericType<SourceInterface> // { readonly id: number; name?: string | undefined }

                {
                    // 增加 readonly
                    type TargetGenericeTypeReadonly<T> = {
                        readonly [K in keyof T]: T[K]
                    }
                    type readonlyInterface = TargetGenericeTypeReadonly<SourceInterface>   // {readonly id: number;readonly name?: string | undefined;}

                    // 增加可选项
                    type TargetGenericeTypeOptional<S> = {
                        [K in keyof S]?: S[K]
                    }
                    type optionalInterface = TargetGenericeTypeOptional<SourceInterface> // {readonly id?: number | undefined;name?: string | undefined;}


                    // 去掉 readonly
                    type TargetGenericTypeRemoveReadonly<S> = {
                        -readonly [K in keyof S]: S[K]
                    }
                    type RemoveReadonly = TargetGenericTypeRemoveReadonly<readonlyInterface>  // { id: number;name?: string | undefined;}


                    // 去掉 可选项
                    type TargetGenericTypeRemoveOptional<S> = {
                        [K in keyof S]-?: S[K]
                    }
                    type RemoveOptional = TargetGenericTypeRemoveOptional<optionalInterface> // {   readonly id: number;    name: string;}

                    // 嵌套删除，删除 readonly 和 可选项
                    type RemoveOptional1 = TargetGenericTypeRemoveReadonly<TargetGenericTypeRemoveOptional<optionalInterface>>// {id: number;  name: string;}


                    // 使用 as 重新映射 key,过滤掉指定类型
                    {
                        type TargetGenericTypeAssertiony<S> = {
                            // 过滤掉 id
                            [K in keyof S as Exclude<K, 'id'>]: S[K]
                        }
                        type TargetGenericTypeAdd<S> = {
                            // 只选择 id
                            [K in keyof S as Extract<K, 'id'>]: S[K]
                        }
                        type ExcludeKey = TargetGenericTypeAssertiony<SourceInterface> // {name?: string | undefined;}
                        type ExtraceKey = TargetGenericTypeAdd<SourceInterface> // { readonly id: number;}
                    }
                    {
                        type ExcludeSpecifiedNumber = Exclude<1 | 2, '1'>
                        type ExcludeSpecifiedBoolean = Exclude<boolean, true> // false
                        type ExcludeSpecifiedNumber1 = Exclude<number, 1> // number
                    }

                    // MyNameSpaceExample 在全局定义了，没有显示 import
                    type MyName = MyNameSpaceExample.name
                }
            }
        }
    }


}()
