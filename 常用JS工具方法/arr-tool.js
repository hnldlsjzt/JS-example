/*
 *@Description: 数组方法
 * @Author: zhangt
 * @Date: 2020-07-01 17:52:18
 * @Last Modified by: zhangt
 * @Last Modified time: 2020-07-03 18:03:45
 *
 *  */

/**
 * 截取数组
 * slice(start,end,type);
 * start可以是负数，从后面开始截取
 * start、end都是下标，截取字段不包含end下标
 * 返回截取的字段，不会改变原数组
 * 复制全部:array.slice()
 * 截取前一段：array.slice(0,4)；0,1,2,3
 */
void function () {
    let array = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    // let arr = array.slice(0, 4)
    //  console.log(array, arr, array.slice(-2));

    console.log(`截取前4位:`, array.slice(0, 4));// [ 0, 1, 2, 3 ]
    console.log(`截取后1位:`, array.slice(-1));// [ 9 ]
    console.log(`截取后2位:`, array.slice(-2));// [ 8, 9 ]
    console.log(`从下标2开始截取:`, array.slice(2));//  [        2, 3, 4, 5,        6, 7, 8, 9      ]
    console.log(`复制全部:`, array.slice());// 
}()




