/*
 * @Author: hnldlsjzt
 * @Date: 2022-06-23 15:48:06
 * @LastEditTime: 2022-06-24 09:48:58
 * @LastEditors: hnldlsjzt
 * @Description: 
 * @FilePath: /coding/JS-example/TS/ts-course/myAugmention.ts
 * 可以输入预定的版权声明、个性签名、空行等
 */

// 前提是没有 export 和 import，有了 export 后，将变成局部声明
// export {}
// import * as M from './04.Literal'

// 定义个全局类型
/**
 * 需要注意的是，要防止其他人在改文件中添加顶层 export 或 import，导致 script 变 module。导致类型全局可见性被破坏，我们可以显示添加描述信息，比如表明是 script 文件，请勿添加 export 或 import
 * 反过来，我们也可以在 script 中添加 export {},显示的把 script 改为 module，避免全局污染
 * 
 */
namespace MyNameSpaceExample {
    export type id = number // 此处非顶层 export
    export type name = string
}
// 这个也能在全局
type TSCourseUserInfoName = string
