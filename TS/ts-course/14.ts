/*
 * @Author: hnldlsjzt
 * @Date: 2022-06-18 18:51:36
 * @LastEditTime: 2022-06-19 17:12:54
 * @LastEditors: hnldlsjzt
 * @Description: 
 * @FilePath: /coding/JS-example/TS/ts-course/14.ts
 * 可以输入预定的版权声明、个性签名、空行等
 */
/**
 * 官方内置的工具类型
 */

void function () {
    // 根据使用范围，我们可以将工具类型划分为操作接口类型、联合类型、函数类型、字符串类型

    // 操作接口类型 -- 以下基本上是映射类型
    interface Person {
        name: string
        age: number
    }

    {


        {
            // partial -- 读音pashow，部分的，可以把一个类型的所有属性改为可选的

            type PartialPerson = Partial<Person>
            // 相当于
            // type PartialPerson = {
            //     name?: string | undefined;
            //     age?: number | undefined;
            // }

            // 自己实现 -- 使用映射类型把传入类型的所有类型，然后设置为可选的
            type MyPartial<T> = {
                [P in keyof T]?: T[P]
            }
            type PartialPerson1 = MyPartial<Person>
        }
        {
            // Required 必填项
            interface Person {
                name?: string
                age?: number
            }
            // 自己实现 --- 使用 -? 来实现必填，表示去掉类型的可选属性
            type MyRequired<T> = {
                [K in keyof T]-?: T[K]
            }
            type RequiredPerson = Required<Person>
            type RequiredPerson1 = MyRequired<Person>


            // 相当于
            // type RequiredPerson = {
            //     name: string;
            //     age: number;
            // }
        }
        {
            // Readonly -- 把所有类型都变成只读
            interface Person {
                name?: string
                age?: number
            }
            // 自己实现 -- 
            type MyReadonly<T> = {
                readonly [K in keyof T]: T[K]
            }

            type ReadonlyPerson = Readonly<Person>
            type ReadonlyPerson1 = MyReadonly<Person>
            // 等价于
            // type ReadonlyPerson = {
            //     readonly name?: string | undefined;
            //     readonly age?: number | undefined;
            // }
        }
        {
            // Pick，选择、选取意思，从指定的类型中，取出指定的类型，返回 1 个新的类型

            // 自己实现 -- 传入 1 个接口类型，然后指定的值必需属于于该接口类型的 key
            type MyPick<T, P extends keyof T> = {
                [K in P]: T[K]
            }

            // 
            type MyPick1<T, P extends keyof T> = {
                [K in P]: T[K]
            }

            // 它接收 2 个参数，Pick<类型，需要选择的联合类型>
            type PickPerson = Pick<Person, 'age'>
            type PickPerson1 = MyPick<Person, 'age'>
            type PickPerson2 = MyPick<Person, 'age' | 'name'>
            type PickPerson3 = MyPick1<Person, 'age'>
            // 等价于
            // type PickPerson = {
            //     age: number;
            // }


        }
        {
            // Omit，和 Pick 相反，是忽略指定键值后返回一个新的类型

            type OmitPerson = Omit<Person, 'age'>
            // 自己实现 -- 
            // 1.接收 2 个参数，<类型，属性（属性只要是 string、number、symbol 就行，不必是对象中的属性）>
            // 2.接着使用 Pick 选取被排除掉后剩余的属性
            type MyOmit<T, P extends keyof any> = Pick<T, Exclude<keyof T, P>>
            type MyOmit1<T, K extends keyof any> = Pick<T, Exclude<keyof T, K>>
            type OmitPerson1 = MyOmit<Person, 'age'>
            // 等价于
            // type OmitPerson = {
            // name: string;
        }

    }

    {
        // 联合类型
        {
            //Exclude 排除联合联合中指定的类型,如果要传入接口类型，则必需使用 keyof

            type T = Exclude<'a' | 'b', 'a'>
            type T1 = Exclude<keyof {
                a: '1',
                b: 2
            }, 'a'>
            // 相当于
            type T2 = Omit<Person, 'name'>
            // 相当于
            type T3 = Pick<Person, Exclude<keyof Person, 'name'>>

            // 自己实现,利用泛型 + 条件判断来返回一个新的值
            // 根据条件判断，当 T 是个联合类型时，分别代入条件类型。然后将每个单项代入得到的结果在联合起来，得到最终结果
            // 所以就解释了下面这条，为什么是 T extends U，而不是常用的 U extends T
            type MyExclude<T, U> = T extends U ? never : T
            type T4 = MyExclude<'a' | 'b' | 'c', 'c'>

            type T5 = 'a' | 'b' | 'c' extends 'c' ? 1 : 'c'
            // 拆解一下 Exclude 内部解析过程
            // extends的条件判断，除了定义条件类型，还能在泛型表达式中用来约束泛型参数
            {
                type A = `Exclude<'key1' | 'key2', 'key2'>`

                // 等价于，拆成原子行，分别代入

                type A = `Exclude<'key1', 'key2'>` | `Exclude<'key2', 'key2'>`

                // =>

                type A = ('key1' extends 'key2' ? never : 'key1') | ('key2' extends 'key2' ? never : 'key2')

                // =>

                // never是所有类型的子类型
                type A = 'key1' | never
            }


        }
        {
            type Human = {
                name: string;
                occupation: string;
            }
            type Duck = {
                name: string;
            }
            type Bool = Human extends Duck ? 'yes' : 'no';
            type A1 = 'x' extends 'x' ? string : number; // string
            type A2 = 'x' | 'y' extends 'x' ? string : number; // number,不是泛型，它触发不了条件类型

            type P<T> = T extends 'x' ? string : number;
            type A3 = P<'x' | 'y'>
        }
        {
            // never是所有类型的子类型
            type A1 = never extends 'x' ? string : number; // string

            type P<T> = T extends 'x' ? string : number;
            type A2 = P<never> // never
            // 上面的示例中，A2和A1的结果竟然不一样，看起来never并不是一个联合类型，所以直接代入条件类型的定义即可，获取的结果应该和A1一直才对啊？

            //实际上，这里还是条件分配类型在起作用。never被认为是空的联合类型，也就是说，没有联合项的联合类型，所以还是满足上面的分配律，然而因为没有联合项可以分配，所以P<T>的表达式其实根本就没有执行，所以A2的定义也就类似于永远没有返回的函数一样，是never类型的。
        }
        {
            // 防止条件判断中的分配
            // 在条件判断类型的定义中，将泛型参数使用[]括起来，即可阻断条件判断类型的分配，此时，传入参数T的类型将被当做一个整体，不再分配。
            type P<T> = [T] extends ['x'] ? string : number;
            type A1 = P<'x' | 'y'> // number
            type A2 = P<never> // string
        }
        {
            // Extract,Extract 正好与 Exclude 相反，它是用来从联合类型中提取指定类型。类似于接口类型中的 Pick
            type Extract1 = Extract<'a' | 'b', 'a' | 'c'>// a
            // 自己实现
            type MyExtract<T, U> = T extends U ? T : never
            type Extract2 = MyExtract<'a' | 'b', 'a' | 'c'>// a

            // 通过上面例子看，Extract 相当于提取两个联合属性中的交集
            {
                // 接下来，基于 extract 实现一个获取接口类型交集的工具类型
                type Intersect<T, U> = {
                    // 分别把 T 和 U 变成联合类型
                    [K in Extract<keyof T, keyof U>]: T[K]
                }
                interface Person {
                    name: string
                    age?: number
                    id: string
                }
                interface Person1 {
                    name: string
                    age: number
                    grade: string
                }
                type MyUnit = Intersect<Person, Person1>
                // 相当于
                type MyUnit1 = {
                    age: number | undefined;
                    name: string;
                }

            }

        }
        {
            // NonNullable,过滤掉泛型中的 null 和 undefined
            type Null1 = NonNullable<string | number | null | undefined>

            // 等价于
            type MyNomNullable<T> = T extends null | undefined ? never : T
            type Null2 = MyNomNullable<string | number | null | undefined>
            // 等价于
            type MyNomNullable1<T> = Exclude<T, null | undefined>
            type Null3 = MyNomNullable1<string | number | null | undefined>


        }
        {
            // Record,支持 2 个参数<联合类型做key，接口（属性值）>，主要生成接口类型
            type MenuKey = 'home' | 'about' | 'more';
            interface Menu {
                label: string
                hidden?: boolean
            }

            const a: Record<MenuKey, Menu> = {
                home: {
                    label: 'home'
                },
                about: {
                    label: 'home'
                },
                more: {
                    label: 'home',
                    hidden: false
                }
            }
            // 自定义实现 
            // 1.keyof any：返回 string、number、symbol，限制 key 的类型（js 中也支持这 3 个做 key）
            // 2.遍历 K ，然后把
            type MyReocrd<K extends keyof any, U> = {
                [P in K]: U
            }
        }
    }
    {
        // 函数类型
        {
            // 获取构造函数参数

            class Person {
                constructor(name: string, age?: number) {

                }
            }
            type T = ConstructorParameters<typeof Person>// [name: string, age?: number | undefined]
        }
        {
            type Parameters<T extends (...args: any) => void> = T extends (...args: infer P) => void ? P : never
            // 获取函数的入参类型，返回个数组
            type T1 = Parameters<() => void> // []
            type T2 = Parameters<(name: string, age: number) => void> // [name: string, age: number]
        }
        {
            type RetureType<T extends (...args: any) => void> = T extends (...args: any) => infer R ? R : never
            // 获取函数返回值类型，不是数组
            function fn(): string {
                return ''
            }
            type T0 = ReturnType<() => string> // string
            type T1 = ReturnType<() => void> // void
            type T2 = ReturnType<typeof fn> // string


        }
    }
    {
        // 字符串类型 -- 涉及到了值的转换。
        /**
         * 常见的有 4 个
         * 1.全部字母大写
         * 2.全部字母小写
         * 3.首字母大写
         * 4.首字母小写
         */

        {
            type T0 = Uppercase<'hello'>
            type T1 = Lowercase<T0>
            type T2 = Capitalize<T1>
            type T3 = Uncapitalize<T2>
        }

    }

}()
