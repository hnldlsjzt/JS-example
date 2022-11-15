/*
 * @Author: hnldlsjzt
 * @Date: 2022-06-23 14:36:21
 * @LastEditTime: 2022-06-24 13:10:08
 * @LastEditors: hnldlsjzt
 * @Description: 
 * @FilePath: /coding/JS-example/TS/ts-course/summary.ts
 * 可以输入预定的版权声明、个性签名、空行等
 */

import { Jay, zt } from "./types/test"


// 知识回顾
void function () {
    {
        // 大写原始类型与小写原始类型的区别
        /**
         * Number String Boolean Symbol 对象类型,是相应原始类型的包裹类型
         * number string boolean symbol
         */
        {
            let num: number = 1
            let Num: Number = 1
            Num = num // ok,可以把原始类型赋值给包装器对象
            num = Num // 不能将类型“Number”分配给类型“number”。
            // “number”是基元，但“Number”是包装器对象。如可能首选使用“number”
        }

        {
            // object 和 Object 、{}
            /**
             * object: 小 object，代表非原始类型，不能把 string number 等赋值给他
             * Object: 大 Object，代表原始类型和非原始类型，在严格模式下，不能把 null 和 undefined 赋值给它
             * {}: 空对象，跟大 Object 一样
             * 结论：{} 和 大 Object 是比小 object 更宽泛的乐行，{} 和 大 Object 可以相互代替，用来代替原始类型和非原始类型（null和unidefined 除外），而小 object 则表示非原始类型
             */

            {
                let o: object
                o = 1
                o = '1'
                o = false
                o = null
                o = undefined
                o = []
                o = () => void 0
                o = {} // ok
            }
            {
                let O: Object
                let o: object = {}
                O = 1
                O = '1'
                O = false
                O = null // 2322
                O = undefined // 2322
                O = {}
                O = o
            }
            {
                let obj = {}
                obj = 1
                obj = '1'
                obj = true
                obj = null
                obj = undefined
                obj = Object
                obj = {}
                type isObj = {} extends object ? true : false // true
                type isObj1 = {} extends Object ? true : false // true
                type isObj2 = object extends {} ? true : false // true
                type isObj3 = Object extends {} ? true : false // true
            }
        }
        {
            // 类型增强
            /**
             * 在 ts 中，如果文件包含顶层的 export 或 import，则会被当成 module，在 module 中定义的，没有显示 export 的变量、函数，类对外都不可见
             * 相反，如果文件不包含顶层的 export 或 import，则会被当成 script，script 里的内容（类型声明和变量声明）都是全局可见
             * 
             * 这就是为什么使用同样的语法进行人工补齐类型声明时，有的类型声明在其他模块、文件中无需显示 import 就可以直接使用，而有的类型需 import 才能使用
             * 需要注意的事：因为 script 中的内容是全局可见的，我们需要避免全局污染，另外需要使用足够特性化的唯一表示来命名全局类型，从而避免类型污染
             */

            type MyName = MyNameSpaceExample.name
            let name: MyName = ''
            type TS = TSCourseUserInfoName
            type goods = myGoods
            type UserId = GlobalUserId
            type UserId1 = window['map']

            let getInfo: Jay.Eee.Api = {
                getInfo: () => {
                    return {
                        name: 'zt',
                        age: 18
                    }
                }
            }
            let getInfo1: Jay.Info = {
                name: 'zt',
                age: 18
            }
            let getAge = Jay.getAge

            type gt = zt.Api
            type gt1 = globalType
            type zt1 = ZT1
            type zt2 = ZT2
            type zt3 = Window['map']

        }
    }
}()
