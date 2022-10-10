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


void function () {
    // 数组对象根据字段去重
    const uniqueArrayObject = (arr = [], key = 'id') => {
        if (arr.length === 0) return
        let list = []
        const map = {}
        arr.forEach((item) => {
            if (!map[item[key]]) {
                map[item[key]] = item
            }
        })
        list = Object.values(map)
        console.log('list: ', list, map, Object.entries(map));

        return list
    }

    const responseList = [
        { id: 1, name: '树哥' },
        { id: 2, name: '黄老爷' },
        { id: 3, name: '张麻子' },
        { id: 1, name: '黄老爷' },
        { id: 2, name: '张麻子' },
        { id: 3, name: '树哥' },
        { id: 1, name: '树哥' },
        { id: 2, name: '黄老爷' },
        { id: 3, name: '张麻子' },
    ]

    uniqueArrayObject(responseList, 'id')

}()



