const koa = require('koa');
const mount = require('koa-mount')
const static = require('koa-static')
const fs = require('fs')

const app = new koa()

/**
 * 为什么这么设置？
 * 这里设置的应该是静态服务的根路径，source 有个 static 文件，要使用的地方，直接使用 ./static 或 static 就行
 * 例子：域名/static/*\/.png
 */
app.use(
    static(__dirname + '/source/')
)

app.use(
    mount('/', async (ctx) => {
        const body = fs.readFileSync(__dirname + '/source/index.htm', 'utf-8')
        // const body = fs.createReadStream(__dirname + '/source/index.htm', 'utf-8')
        // 如果要返回流，必需设置 type 为 html。不然就是个 stream 了
        ctx.response.type = 'html'
        ctx.body = body
    }))

app.listen(4000)