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

/**
 * fib，从时空复杂度来优化
 */
void function () {
    //  简易版,空间复杂度，会一直进栈出栈
    function fib(num) {
        if (num === 0) return 0;
        if (num === 1) return 1;
        return fib(num - 1) + fib(num - 2)
    }

    // 已知前2位数都是1
    // function fib(n) {
    //     if (n === 0) return 0
    //     if (n === 1) return 1
    //     let notes = [0, 1]// 为什么要从0开始，初始化值数量必需大于2，不然会出现负数
    //     for (let i = 2; i <= n; i++) {
    //         notes[i] = notes[i - 1] + notes[i - 2]
    //     }
    //     console.log(notes);

    //     return notes[n]
    // }

    // 由于我们知道头2位数，且规律就是取它的前2项之和
    function fib(n) {
        if (n === 0 || n === 1) return n;
        let a = 0;
        let b = 1;
        let i = 2;
        while (i <= n) {
            i++;
            let sum = a + b;
            a = b;
            b = sum
        }
        // for (let i = 2; i <= n; i++) {
        //     let sum = a + b;
        //     a = b;
        //     b = sum
        // }
        return b
    }
    console.time('FIB');
    console.log('fib:', fib(7))
    console.timeEnd('FIB');


}()


