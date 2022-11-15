const Koa = require('koa')
const bodyParser = require('koa-bodyparser')// 引入解析post请求参数轮子
const app = new Koa
app.use(bodyParser())

app.use(async (ctx) => {
    let { url, method, request } = ctx
    console.log('method', method);
    if (url === '/' && method === 'GET') {
        let html = `
            <h1>koa</h1>
            <form method="POST" action='/'>
                <p>username</p>
                <input name="username"/>
                <p>password</p>
                <input name="password"/>
                <button type="submit">提交</button>
            </form>
        `
        ctx.body = html// body不能用解构，只能使用ctx.body
    } else if (url === '/' && method === 'POST') {
        let postData = request.body;
        const { header, body } = request
        let params = {
            header, body
        }
        ctx.body = params
    } else {
        ctx.body = '<h1>404</h1>'
    }
})

app.listen(3000, () => {
    console.log('demo start');
})