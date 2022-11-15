const koa = require('koa')
const fs = require('fs')
const Router = require('koa-router')

const app = new koa
const router = new Router

const routerConfig = {
    '/': 'index.html',
    '/index': 'index.html',
    '/todo': 'todo.html',
    '/404': '404.html'
}
// const page = router[url] ? router[url] : router['/404']
const renderPage = (page) => {
    return new Promise((res, rej) => {
        let url = `./${page}`
        console.log(url);
        fs.readFile(url, 'binary', (err, data) => {
            if (err) {
                rej(err)
            }
            res(data)
        })
    })
}
const getRoter = async (url) => {
    const current = routerConfig[url]
    const page = current ? current : routerConfig['/404']
    const html = await renderPage(page)
    return html
}
// 单个路由，只需要get('路径')，多个路径使用链式调用.get('路径即可')
router.get('/', async (ctx, next) => {
    ctx.body = await getRoter(ctx.url)// 需要加上生成器，不然会直接把promise的pending状态返回
}).get('/todo', async (ctx) => {
    ctx.body = await getRoter(ctx.url)
})

app.use(router.routes()).use(router.allowedMethods());

app.listen(3000, () => {
    console.log('koa-router start');
})



// function render(page) {
//     return new Promise((res, rej) => {
//         let url = `./${page}`

//         fs.readFile(url, 'binary', (err, data) => {
//             console.log(url, 'binary');
//             if (err) {
//                 rej(err)
//             }
//             res(data)
//         })
//     })
// }

// async function router(url) {
//     const router = {
//         '/': 'index.html',
//         '/index': 'index.html',
//         '/todo': 'todo.html',
//         '/404': '404.html'
//     }
//     const page = router[url] ? router[url] : router['/404']
//     const html = await render(page)

//     return html;
// }
// app.use(async (ctx) => {
//     const { url } = ctx.request
//     const html = await router(url)
//     ctx.body = html
// })

// app.listen(3000, () => console.log('demo start'))