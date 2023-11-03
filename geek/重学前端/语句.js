void function () {
    // for of 语句，遍历对象
    const o = {
        [Symbol.iterator]: () => ({
            _value: 0,
            // 不能写成 next:()=>{},不然 this 就一直指向外部 this，而不是对象调用 next 时的对象
            next() {
                if (this._value === 10) {
                    return {
                        done: true
                    }
                } else {
                    console.log('this._value: ', this, this._value);
                    return {
                        value: this._value++,
                        done: false
                    }
                }
            }
        })
    }

    let a = {
        [Symbol.iterator]: function () {
            return {
                _value: 0,
                next() {
                    if (this._value === 10) {
                        return {
                            done: true
                        }
                    } else {
                        this._value++
                        return {
                            value: this._value,
                            done: false
                        }
                    }
                }
            }
        }
    }
    for (const v of a) {
        console.log('v: ', v);
    }

    void function () {
        // generator 函数配合 for of 使用
        function* foo() {
            yield 1
            yield 2
            yield 3
        }
        for (const iterator of foo()) {
            console.log('iterator: ', iterator);
        }
    }()
    void function () {
        // async + generator函数 搭配异步 for of 
        function sleep(duration) {
            return new Promise(function (resolve) {
                setTimeout(resolve, duration)
            })
        }

        async function* foo() {
            i = 0;
            while (true) {
                await sleep(1000);
                yield i++
            }
        }
        for await (const iterator of foo()) {
            console.log('iterator: ', iterator);
        }
    }()
    const myIterable = {
        data: [1, 2, 3, 4],
        [Symbol.iterator]:
            function () {
                let index = 0;
                const data = this.data;
                return {
                    next: function () {
                        if (index < data.length) { return { value: data[index++], done: false }; }
                        else {
                            return {
                                done: true
                            };
                        }
                    }
                };
            }
    };
    for (let value of myIterable) {
        console.log(value); // 依次打印 1, 2, 3, 4 
    }

    void function () {
        let o = { a: 1, b: 2 }
        with (o) {
            console.log(a, b);
        }
    }()



    try {
        const nums = [1, 2, 3, 4]
        nums.forEach(element => {
            console.log(element.abc())
        });
        // for (let index = 0; index < nums.length; index++) {
        //     const element = nums[index];
        //     console.log(element.abc.a)

        // }
    } catch (error) {
        console.log('error---: ', error);

    }


    void function () {
        // 装箱
        let objectSymbol = Object(Symbol('a'))
        // let objectSymbol = Symbol('a')

        console.log(typeof objectSymbol); // object
        console.log(objectSymbol instanceof Symbol);// true
        console.log(objectSymbol.constructor === Symbol);// true
    }()


    void function () {
        // 通过 Symbol.toPrimitive 来覆盖原有装箱的行为
        const o = {
            valueOf: () => {
                console.log('valueOf');
                return {}
            },
            toString: () => {
                console.log('toString');
                return {}
            }
        }
        o[Symbol.toPrimitive] = () => {
            console.log('Symbol.toPrimitive');
            return 'hello - 我的装箱被显示的转换了'
        }
        console.log(o + '');
    }()

    void function () {
        // 使用 while 强制耗时一秒，来测试 promise（微任务） 比 setTimeout（宏任务）快
        function sleep(time) {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve(time)
                }, time)
            })
        }

        let start = Date.now()
        // 开启第二轮宏任务
        // sleep(0)
        setTimeout(() => console.log("d"), 0)
        while (Date.now() - start >= 1000);
        console.log('promise 耗时：', Date.now() - start, 'c1');
        new Promise((resolve, reject) => {
            resolve()
        }).then(() => {
            console.log('c2 -- 微任务');
        })

    }()

    void async function () {
        function sleep(time) {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve(time)
                }, time)
            })
        }
        function *foo(params) {
            yield 1
            yield 2
            yield 3
        }
        for (const iterator of foo()) {
            console.log('绿灯');
            await sleep(3000)
            console.log('黄灯');
            await sleep(1000)
            console.log('红灯');
            await sleep(2000)
        }
    }()


}()
