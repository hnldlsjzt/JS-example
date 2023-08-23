/**
 * 洋葱模型
 */

const context = {
    count: 0
}

async function middleware1(ctx, next) {
    console.log('take1', ctx.count);
    ctx.count++
    await next?.()
    console.log('take === 1');
}

async function middleware2(ctx, next) {
    console.log('take2', ctx.count);
    ctx.count++
    await next?.()
    console.log('take ===2', ctx.count);
}

async function middleware3(ctx, next) {
    console.log('take3', ctx.count);
    ctx.count++
    await next?.()
    console.log('take === 3', ctx.count);
}

Promise.resolve(middleware1(context, () => {
    return middleware2(context, () => {
        return middleware3(context, () => {
            return Promise.resolve()
        })
    })
})).then(() => {
    console.log('执行结束');
})