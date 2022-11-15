/*
 * @Author: hnldlsjzt
 * @Date: 2022-06-23 15:56:43
 * @LastEditTime: 2022-06-29 16:00:36
 * @LastEditors: hnldlsjzt
 * @Description: 
 * @FilePath: /coding/JS-example/TS/ts-course/myGlobalModule.ts
 * 可以输入预定的版权声明、个性签名、空行等
 */



declare global {
    type GlobalUserId = number | 123 | 'a';
    interface window {
        map: string
    }
}
export { }