// import { name } from './../myAugmention';
/*
 * @Author: hnldlsjzt
 * @Date: 2022-06-24 09:28:10
 * @LastEditTime: 2022-06-24 13:08:52
 * @LastEditors: hnldlsjzt
 * @Description: 
 * @FilePath: /coding/JS-example/TS/ts-course/types/test.d.ts
 * 可以输入预定的版权声明、个性签名、空行等
 */
/**
 * 全局声明类型
 */

declare namespace Jay {
    interface Info {
        name: string
        age: number
    }
    function getAge(): number
}

// namespace 支持声明合并，在外部可以通过 Jay 方位 Info 、Eee
declare namespace Jay.Eee {
    interface Api {
        getInfo(): Info
    }
}

namespace zt {
    interface Api {
        getInfo(): Info
    }
}

declare const ZT1: string
declare global {
    type ZT2 = string
    interface Window {
        map: string
    }
}
type globalType = string
export { }