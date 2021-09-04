

// async和await

/**
 * 本质上是协程(Generator)的语法糖
 * 1.内置执行器
 * 2.更好的语义（async：异步，await：等待的表达式）
 * 3.更广的适用性：await后面可以跟Promise和原型类型的值（string,number等，不过都会被自动转化为resolve的Promise对象）
 * 4.返回值是Promise
 */

/**
 * Promise对象的状态变化
 * async函数返回的Promise对象，必需等到内部所有await命令后面的Promise对象执行完，才会发生改变
 * 除非遇到return或抛出错误
 */

/**
 * 使用注意点：
 * 1.await只能在async函数中使用，普通函数中使用报错
 * 2.await最好使用try...catch包裹，防止Promise出现reject
 * 3.存在多个await时，如不是关联关系，采用await Promise.all
 * 4.能保留运行堆栈
 */

void function () {
    console.log('基本用法');
    function timeout(ms) {
        return new Promise((resolve) => {
            setTimeout(resolve, ms)
        })
    }

    async function asyncPrint(value, ms) {
        {
            await timeout(ms)
        }
        console.log('value', value);
    }
    asyncPrint('hello world', 0)
    console.log('我先执行');

    // 多种形式的async写法
    // 函数声明
    async function foo() { }

    // 函数表达式
    const foo1 = async function () { }

    // 箭头函数
    const foo2 = async () => { }

    // 对象的形式
    const obj = {
        async foo() {

        }
    }
    obj.foo().then(() => { })

    // class
    class Storage {
        constructor() {
            this.cachePromise = caches.open('avatar')
        }
        async getAvatar() {
            const cache = await this.cachePromise;

        }
    }
}

void function () {
    console.log('语法··············');
    /**
     * 1.返回Promise对象
     */
    // 有return，then的值为返回值
    // const f = async () => 'hello promise' 

    // 没return,为undefined
    // const f = async () => {
    //     
    // }

    // 抛错
    const f = async () => {
        throw new Error('oh 出错了')
    }
    f().then((res) => {
        console.log(res);
    }, e => {
        console.log('捕获error', e);
    })
}

void function () {
    console.log('await命令------------------');
    /**
     * await:
     * 1.正常情况下，await后面是一个Promise对象，返回该对象的结果。如果不是Promise对象，就返回该对象结果
     * 2.如果一个对象有then方法，那会把它当做Promise处理
     */
    async function foo() {
        // return await '123' // return 123
        // return await true // return true
        return await { a: 1 } // return { a: 1 }
        return await [1, 2, 3] // return [1,2,3]

    }
    foo().then(res => {
        console.log(res);
    })
    console.log('我是主线程哦');

    class Sleep {
        constructor(timeout) {
            this.timeout = timeout
        }
        then(resolve, reject) {
            const startTime = Date.now()
            console.log(Date.now() - startTime);
            setTimeout(() => resolve(Date.now() - startTime), this.timeout)
        }
    }
    // const sleep = new Sleep(Date.now())
    // console.log(sleep);
    const thenObj = async () => {
        const sleepTime = await new Sleep(1000)
        console.log('sleepTime', sleepTime);// 该对象有then方法，返回Promise对象
    }
    thenObj().then(res => {
        console.log(res);
    })
    void function () {
        console.log('休眠效果-----------');
        function sleep(time) {
            return new Promise(res => {
                setTimeout(res, time)
            })
        }
        // 用法
        async function one() {
            for (let i = 0; i <= 5; i++) {
                console.log(i);
                // await sleep(1000)
                await new Promise(res => {
                    setTimeout(res(), 1000)// 必需调用res才生效哦
                })
            }
        }
        one()
        setTimeout(() => {
            console.log('2000');
        }, 2000)
    }

    console.log('错误捕获：reject和catch使用-----------');
    async function f() {
        // reject阻断,所有的代码阻止
        // 如果希望reject,后面的也执行，有2中方式：try...catch,在reject后catch
        // await Promise.reject('oh sorry')
        await Promise.reject('oh sorry').catch(e => {
            console.log(`catch-e:${e}`);
        })
        return await Promise.resolve('ok')// 最后结果手动return
        // await new Promise(res => {
        //     console.log('reject阻断,所有的await停止');
        // })
    }
    f().then(res => {
        console.log(`res:${res}`);
    }).catch(e => {
        console.log(`error:${e}`);
    })
}

void function () {
    console.log('使用注意点--------------');
    // 1 使用try包裹
    void function () {
        async function foo() {
            try {
                await Promise.reject('哈哈')
            } catch (e) {
                console.log(e);
            }
            console.log('捕获啊');
        }
        foo()
    }()

    // 2 多个一起并发

    // const [foo, bar] = await Promise.all([foo(),bar()])

    // 3 await只能用在async中
    function bar() {
        // await new Promise(() => { }) //await is only valid in async function
    }

    // 4 使用await保留运行栈
    void function () {
        /**
         * b是异步过程，在b执行时，a不会中断，等到b结束后，a可能早就结束了，b的上下文环境不存在了，如果此时b或c报错，那么调用栈不会有a
         */
        // const a = () => {
        //     b().then(() => c())
        // }

        // 改成
        /**
         * b在执行时，a会暂停执行（协程），上下文环境一直保持
         */
        // const a = async () => {
        //     await b()
        //     c()
        // }
    }()

}()



