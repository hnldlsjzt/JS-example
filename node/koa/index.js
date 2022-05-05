// const Koa = require('koa')
// const app = new Koa

// app.use(async (ctx)=>{
//     ctx.body = 'hello koa'
// })


// app.listen(3000)
// console.log('koa demo');

const Koa = require('koa')
const app = new Koa

app.use(async (ctx) => {
    const { url, request, query, querystring, req, method } = ctx;
    console.log(ctx);
    // console.log(req);
    // req:原生http信息，不直观，但适合深度编程
    // request:请求行和请求头相关,经过koa封装，看起来简单直观
    // ctx.body = {
    //     url,
    //     request,// 请求行和请求头相关,经过koa封装，看起来简单直观
    //     query,// 格式化好后的对象
    //     querystring,// url后面的query参数
    //     method,
    //     ctx,
    // }
    if (url === '/' && method === 'GET') {
        const html = `
            <h1>koa form 表单</h1>
            <form method='POST' action='/'>
            <p>userName</p>
            <input name="userName" /> <br/>
            <p>age</p>
            <input name="age" /> <br/>
            <p>webSite</p>
            <input name='webSite' /><br/>
            <button type="submit">submit</button>
            </form>
        `
        ctx.body = html
    } else if (url === '/' && method === 'POST') {
        // ctx.body = '收到POST请求'
        let parseData = await parsePostData(ctx)
        console.log('post返回',parseData);
        ctx.body = parseData
    } else {
        ctx.body = '404'
    }
})

// 监听post请求
function parsePostData(ctx) {
    return new Promise((res, rej) => {
        try {
            let postData = ''
            ctx.req.on('data', (data) => {
                postData += data
            })
            ctx.req.on('end', () => {
                let parseData = parseQueryStr(postData)
                res(parseData)
            })
        } catch (error) {
            rej(error)
        }
    })
}

// 解析参数
function parseQueryStr(queryStr) {
    let queryData = {}
    let queryStrList = queryStr.split('&')// 以&切割字符串
    console.log(queryStrList);
    for (let [index, queryStr] of queryStrList.entries()) {
        let itemList = queryStr.split('=')
        console.log(itemList);
        queryData[itemList[0]] = decodeURIComponent(itemList[1])
    }
    return queryData
}
app.listen('3000', () => {
    console.log('demo');
})