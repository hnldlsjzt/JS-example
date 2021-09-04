const koa = require('koa')
const fs = require('fs')
const app = new koa

function render(page) {
    return new Promise((res, rej) => {
        let url = `./${page}`

        fs.readFile(url, 'binary', (err, data) => {
            console.log(url, 'binary');
            if (err) {
                rej(err)
            }
            res(data)
        })
    })
}

async function router(url) {
    const router = {
        '/': 'index.html',
        '/index': 'index.html',
        '/todo': 'todo.html',
        '/404': '404.html'
    }
    const page = router[url] ? router[url] : router['/404']
    const html = await render(page)

    return html;
}
app.use(async (ctx) => {
    const { url } = ctx.request
    const html = await router(url)
    ctx.body = html
})

app.listen(3000, () => console.log('demo start'))