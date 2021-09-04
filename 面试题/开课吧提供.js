void function () {
    //  暂时性死区是运行时
    function sayHi() {
        console.log(name);// undefined
        console.log(age); // 暂时性死区
        var name = 'zt'
        let age = 18
    }

}()

void function () {
    const name = 'zt'
    const age = 18
    console.log(Number.isNaN(name));// Number.isNaN会先判断是否是数字，不是数字直接false
    console.log(Number.isNaN(age));// false

    console.log(isNaN(name));// true
    console.log(isNaN(age));// false
    // Number.isNaN 和 isNaN的区别：
    // Number.isNaN会先判断是否是数字，不是数字直接false
    // isNaN会尝试转换成数字，在判断是否为NaN
}()

void function () {
    function sidEffecting(arr) {
        arr[0] = arr[2]
    }
    function bar(a, b, c) {
        c = 10;
        sidEffecting(arguments)
        return a + b + c
    }
    console.log(bar(1, 1, 1))// 21,arguments是一个具有length属性的对象，改变形参会响应的改变arguments的值
}()

void function () {
    var a = []
    if (a) {
        console.log([0]);
        console.log(a === true)
    } else {
        console.log('wut')
    }
}()

void function () {
    // let arr = Array(3)
    // let arr = [,,,] // 3个空属性
    let arr = [undefined, undefined]
    console.log(arr);
    arr[0] = 2
    arr.map(() => '1')
    console.log(arr);// [2,empty,empty]// map属性只有初始化属性不为empty的才会触发（null和undefined不算empty）
}()

void function () {
    console.log('```````````');
    let obj1 = {
        name: 'obj1',
        parent: function () {
            return () => console.log(this.name)
            // return function () { console.log(this), console.log(this.name) }
        }
    }
    let obj2 = {
        name: 'obj2'
    }
    obj1.parent()();
}()

void function () {
    [1, 2, 3, 4].reduce((x, y) => console.log(x, y),0)
}()
