/*
 * @Author: zhangt
 * @Date: 2020-07-13 11:42:38
 * @LastEditTime: 2020-07-17 10:43:49
 * @LastEditors: your name
 * @Description: 
 * @FilePath: \JS-example\常用JS工具方法\函数方法.js
 * @可以输入预定的版权声明、个性签名、空行等
 */ 



 /**
 * 返回 x 的 n 次幂的值。
 *
 * @param {number} x 要改变的值。
 * @param {number} n 幂数，必须是一个自然数。
 * @return {number} x 的 n 次幂的值。
 */



void function () {
    // 默认值
    void function () {
        //  这个的区别
        function m1({ x = 0, y = 0 } = {}) {
            return [x, y]
        }
        function m2({ x, y } = { x: 0, y: 0 }) {
            return [x, y]
        }
        console.log(m1(), m1({}));// [0,0],[0,0]
        console.log(m2(), m2({}));// [0,0],[undefined,undefined]

    }()

    //  ES6默认参数声明会产生作用域
    // 一旦设置了参数的默认值，函数进行声明初始化时，参数会形成一个单独的作用域。
    // 等到初始化结束，这个作用域会消失；PS：这种语法，在不设置参数默认值时，是不会出现的
    void function () {
        var x = 1
        function f(x, y = x) {
            console.log(y);//2
        }
        f(2)
    }()

    void function () {
        var foo = 'outer'
        function f(func = () => foo) {
            let foo = 'inner'
            console.log(foo);
            console.log(func());


        }
        f()
    }()

    void function () {
        var x = 1
        function f(x, y = () => { x: 2 }) {
            var x = 3;
            console.log(y());
            console.log(x);
        }
        f()// 3
        console.log(x);// 1

    }()

    void function () {
        console.log('~~~~~~~~~~~~~~~~~~~~~~');
        var x = 1
        function f(x, y = function () { x = 2 }) {
            x = 3;// 此时的x变量是形参作用域中的x
            y();// x为形参作用域中变量， 重置为2

            console.log(x);
        }
        f()// 2
        console.log(x);// 1

        // var x = 1;
        // function foo(x, y = function () { x = 2; }) {
        //     x = 3;
        //     y();
        //     console.log(x);
        // }

        // foo() // 2
        // console.log(x);


    }()

    void function () {
        //  箭头函数结合rest做工具函数

        // 多个数字变数组
        const numbers = (...num) => num;
        console.log(numbers(1, 2, 3, 4, 5));// [ 1, 2, 3, 4, 5 ]

        // 返回一个二维数组
        const headAndTail = (head, ...tail) => [head, tail]
        console.log(headAndTail(1, 2, 3, 4, 5));// [ 1, [ 2, 3, 4, 5 ] ]

    }()
    void function () {
        //  构造函数在new之后如何改变内部的值
        function Timer() {
            this.s1 = 0
            this.s2 = 0
            setInterval(() => this.s1++, 1000)
            setInterval(function () { this.s2++ }, 1000)
        }
        let time = new Timer
        setTimeout(() => {
            console.log('time', time.s1, time.s2)// 2 0
            let t = new Timer
            console.log('newT', t.s1);// 0
        }, 2000);
        // setTimeout(() => { console.log('time', time.s1, time.s2) }, 10000);// 9 0

        // call apply bind是否能改变箭头函数的this
        const obj = {
            name: 'zhang',
            sayHi: () => {
                console.log('sayHi箭头函数:', this, this.name);
            },
            getName() {
                console.log('getName缩写', this.name);
            }
        }
        obj.sayHi();
        obj.getName();
        obj.sayHi.call({ name: '1' });
        obj.getName.call({ name: '1' });
        // Object.call({})

        function foo() {
            return () => {
                return () => {
                    return () => {
                        console.log('id:', this.id);
                    };
                };
            };
        }

        var f = foo.call({ id: 1 });

        var t1 = f.call({ id: 2 })()(); // id: 1
        var t2 = f().call({ id: 3 })(); // id: 1
        var t3 = f()().call({ id: 4 }); // id: 1
    }()



}()

