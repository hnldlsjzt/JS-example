/*  *@Description: In User Settings Edit * @Author: zhangt  * @Date: 2020-07-01 17:27:40  * @Last Modified by:   zhangt  * @Last Modified time: 2020-07-01 17:27:40  */


/**
 * @name 过滤唯一值
 * @study new Set();返回一个set对象，然后利用扩展运算符变成数组或对象
 * 适用于基础类型
 */
void function () {
    const array = [1, 2, 3, 3, 5, 5, 1];
    const uniqueArray = [...new Set(array)]// new S
    console.log(uniqueArray);

}()

/**
 * @name |0 位或运算符，将浮点数截取为整数
 * 
 */
void function () {
    let num = 1555;
    console.log(num / 10 | 0);// 155
    console.log(num / 100 | 0);// 15
    console.log(num / 1000 | 0);// 1
    console.log(-num / 1000 | 0);// -1


}()

/**
 * @name 格式化json
 */
void function () {
    console.log(JSON.stringify({ alpha: 'A', beta: 'B' }));
    
    console.log(JSON.stringify({ alpha: 'A', beta: 'B' }, null, '\t'));
}()

