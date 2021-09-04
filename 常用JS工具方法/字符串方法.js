/*
 * @Author       : 张涛
 * @Date         : 2020-07-10 16:13:19
 * @LastEditTime : 2020-07-20 10:44:11
 * @Description  : 字符串方法集合
 * @FilePath     : /常用JS工具方法/字符串方法.js
 */ 



void function () {
    /**
     * @name 确定一个字符串是否被包含在另一个字符串中
     * includes;检查字符串中是否包含改字符串
     * startsWith;检查字符串的首尾是否是该值，
     * endsWith;检查字符串的尾部是否是该值
     * 共性：都返回boolean，且都支持第二位参数,表示开始搜索的位置
     * 异同：endsWith第二位参数表示针对前多少个字符
     */
    const str = 'hello world!'
    console.log('检查是否包含');
    console.log(str.includes('hell'));
    console.log(str.startsWith('hell'), str.startsWith('h'));
    console.log(str.endsWith('!'), str.endsWith('world!'));
    console.log('~~~~~~~~~~~~~~~`');
    console.log(str.includes('hello', 1));// false
    console.log(str.startsWith('hello', 1));// false 这2个表示从索引1开始，找不到hello
    console.log(str.endsWith('hello', 5), str.endsWith('hello', 4));// true，false


}()

void function () {
    /**
     * @name repeat()
     * @desc 返回新的字符串，表示将字符串重复N次
     * 
     */
    console.log('牛逼'.repeat(3));// 牛逼牛逼牛逼
    // console.log('牛逼'.repeat(-3));//error 不能是负数 或 Infinity
    console.log('牛逼1'.repeat(0), '牛逼1'.repeat(-0.1), '牛逼1'.repeat(NaN));// 这几种都是空，0 ~ -1之间的数会变成0


}()

void function () {
    /**
     * @name padStart(),padEnd()
     * @desc 字符串补全
     */
    let s = 'qwe'
    console.log(s.padStart(8, '123'))// 12312qwe
    console.log(s.padEnd(8, '123')) // qwe12312
    // 如果原字符串长度等于或超过了最大长度，补全字符串不生效
    // 如果原字符串长度等于或超过了最大长度，则会截去超出的补全字符串
    console.log('abc'.padStart(2, 'ab'), 'abc'.padEnd(5, '0123456'));// abc,abc01
    // 第二位没传，就用空格代替
    console.log('abc'.padStart(8));//      abc

    // 常见用途
    // 1.为数值补全指定位数
    console.log('1'.padStart(10, '0'), '12'.padStart(10, '0'));// 0000000001 0000000012
    console.log('12345'.padStart(10, '0'));// 0000012345
    // 2.补全字符串格式
    console.log('12'.padStart(10, 'YYYY-MM-DD'));//YYYY-MM-12
    console.log('09-12'.padStart(10, 'YYYY-MM-DD'));//YYYY-09-12
}()

void function () {
    /**
     * @name trimStart(),trimEnd()
     * @desc 消除头部和尾部的空格
     */
    const s = ' ab c '
    console.log(s.trim(), 1);
    console.log(s.trimStart(), s.trimEnd());
    console.log(s.replace(/ /g, ''));


}()
void function () {
    /**
     * @name 字符串有4中方法可以使用正则表达式，replace(),match(),search(),split()
     */
    console.log('不会打印0');

    return
    console.log('不会打印');
}()





