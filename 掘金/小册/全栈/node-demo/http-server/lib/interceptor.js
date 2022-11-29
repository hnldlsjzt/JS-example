/**
 * 洋葱模型的拦截器
 */

class Interceptor {
    constructor() {
        this.aspects = [] // 存储拦截位面
    }

    use(functor) { // 注册拦截页面
        this.aspects.push(functor)
        return this
    }

    async run(context) { // 执行拦截页面
        const aspects = this.aspects
        console.log('aspects: ', aspects);

        // 将注册的拦截切面装成洋葱模型，从里到外执行
        const porc = aspects.reduceRight((a, b) => {
            return async () => {
                await b(context, a)
            }
        }, () => Promise.resolve())

        try {
            //              * porc 的形态
            //              * task0(ctx,task1(ctx,task2(ctx,task3(ctx,task4(ctx,Promise.resolve())))))
            //              * 最终 Promise.resolve() 微任务结尾。看成栈，先进后出
            //              */
            await porc()
        } catch (error) {
            console.error(error.message);
        }
        return context
    }
}

module.exports = Interceptor