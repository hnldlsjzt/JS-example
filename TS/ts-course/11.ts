/*
 * @Author: hnldlsjzt
 * @Date: 2022-06-18 15:35:16
 * @LastEditTime: 2022-06-19 17:17:24
 * @LastEditors: hnldlsjzt
 * @Description: 
 * @FilePath: /coding/JS-example/TS/ts-course/11.ts
 * 可以输入预定的版权声明、个性签名、空行等
 */

/**
 * 
 * 类型守卫
 * 为什么需要类型守卫？
 *  js 是一种动态类型语言，意味着你的值、值可以是多态的（多种类型），为了使用中的安全性，我们需要区别对待每一种类型，以确保使用的合法性。
 * 
 * 
 */

void function () {
    // 一个例子
    {
        const convertToUpperCase = function (strOrArray: string | string[]) {
            // 这里的 2 个 if 条件中对值进行了类型守卫（typeof 和 Array.isArray）,从而让触发了 类型缩小
            if (typeof strOrArray === 'string') {
                return strOrArray.toLocaleUpperCase()
            } else if (Array.isArray(strOrArray)) {
                return strOrArray.map((item: string) => item.toLocaleUpperCase())
            }
        }

    }
    // 如何区分联合类型 --- 常用的类型守卫有 switch/typeof/===/instanceof/in 和 自定义类型守卫，这几种
    {
        {
            //1.switch
            const convert = (c: 'a' | 1) => {
                switch (c) {
                    case 'a':
                        return c.toLocaleUpperCase()
                    case 1:
                        return c.toFixed(2)
                }
            }

            const feat = (c: {
                animal: 'panda',
                name: 'China'
            } | {
                feat: 'video',
                name: 'Japan'
            }) => {
                // 如是个联合对象类型，那他们必读有相同的属性，且 Switch 也只能判断这相同的属性
                switch (c.name) {
                    case 'China': // 这里还会有类型提示
                        return c.animal // 类型缩减后，这里也有提示
                    case 'Japan':
                        return c.feat
                }
            }
        }
        {
            // 2.字面量恒等 -- 和 switch 实现起来很类型。
            function convert(c: 'a' | 1) {
                if (c === 'a') {
                    return c.toLocaleUpperCase()
                } else if (c === 1) {
                    return c.toFixed(2)
                }
            }
            const feat = (c: {
                animal: 'panda',
                name: 'China'
            } | {
                feat: 'video',
                name: 'Japan'
            }) => {
                if (c.name === 'China') {
                    return c.animal
                } else if (c.name === 'Japan') {
                    return c.feat
                }
            }
        }
        // switch 和 ===，都能实现类型守卫和类型缩小。通常可枚举的值越多，我们就倾向于使用 switch，这样能让代码更清晰，反之使用 ===


        {
            // 3.typeof --- 当联合类型的成员不可枚举时，我们需要使用 typeof
            function convert1(c: 'a' | 1) {
                if (typeof c === 'number') {
                    return c.toFixed()
                } else if (typeof c === 'string') {
                    return c.toLocaleUpperCase()
                }
            }

        }

        {
            // 4. intarceof,用于判断是否是它的实例
            class Dog {
                wang = 'wang'
            }
            class Cat {
                miao = 'miao'
            }

            const getName = (animal: Dog | Cat) => {
                if (animal instanceof Dog) {
                    return animal.wang // 类型缩减为 Dog
                } else if (animal instanceof Cat) {
                    return animal.miao // 类型缩减为 Cat
                }
            }
        }

        {
            // 5. in（在 js 中，用来检测对象和该对象原型上是否有该属性）
            // 当联合类型的成员包含接口（对象），并且接口之间的属性不同，那我们不能通过直接打 . 调用的方式，而是需要通过 in
            interface Dog {
                wang: 'wang'
            }
            interface Cat {
                miao: 'miao'
            }
            const getName = (animal: Dog | Cat) => {
                if ('wang' in animal) {
                    return animal.wang// 类型缩减为 dog
                } else if ('miao' in animal) {
                    return animal.miao
                }
            }
            class A {
                public a() { }

                public useA() {
                    return "A";
                }
            }

            class B {
                public b() { }

                public useB() {
                    return "B";
                }
            }
            function useIt(arg: A | B): void {
                if ("a" in arg) {
                    arg.useA();
                } else {
                    arg.useB();
                }
            }


        }

        {
            // 6.自定义守卫 -- 主要是利用函数 + is 来进行自定义守卫
            interface Dog {
                wang: 'wang'
            }
            interface Cat {
                miao: 'miao'
            }
            function isDog(animal: Dog | Cat): animal is Dog {
                return 'wang' in animal
            }

            const getName = (animal: Dog | Cat) => {
                if (isDog(animal)) {
                    // 如果没有类型谓词，对函数返回值做肯定，那下面这行语句会报错
                    return animal.wang
                }
            }

        }
    }

    {
        // 枚举成员
        enum A {
            one,
            two
        }
        enum B {
            one,
            two
        }
        const cpwithNumber = (params: A) => {
            if (params === 1) { // bad,万一把 A.two 的初始值改了，就不会是 1 了
                return params
            }
        }

        const cpWithNumber1 = (params: A) => {
            if (params === B.two as unknown as A.two) {
                // bad
                return params
            }
        }

        const cpWithNumber2 = (params: A) => {
            if (params === A.two) {
                // good
                return params
            }
        }
    }

    {
        // 失效的类型守卫
        // 当我们在泛型函数使用 in 来做类型守卫时，会出现守卫失败的情况
        // interface Dog {
        //     wang: 'wang'
        // }
        // interface Cat {
        //     miao: 'miao'
        // }
        class Dog {
            wang = 'wang'
        }
        class Cat {
            miao = 'miao'
        }

        function getName<T extends Dog | Cat>(animal: T) {
            // 在之前的版本会失效。如失效了，可换成 instanceOf 或 自定义类型守护
            if (animal instanceof Dog) {
                return animal.wang
            }
            return animal.miao
            // if ('wang' in animal) {
            //     return animal.wang
            // }
            // return animal.miao
        }
    }
}()
