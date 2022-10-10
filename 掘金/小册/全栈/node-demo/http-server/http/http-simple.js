/**
 * 使用更简洁的 HTTP 模块来代替 TCP 模块
 */
const http = require('http')
const url = require('url')
const path = require('path')
const responseData = {
    ID: 'zhangsan',
    Name: '张三',
    RegisterDate: '2020年3月1日',
};

function toHTML(data) {
    return `
      <ul>
        <li><span>账号：</span><span>${data.ID}</span></li>
        <li><span>昵称：</span><span>${data.Name}</span></li>
        <li><span>注册时间：</span><span>${data.RegisterDate}</span></li>
      </ul>
    `;
}
// 创建服务
const serve = http.createServer((req, res) => {
    console.log('req: ', req);
    const { method, headers } = req
    console.log('headers: ', headers);
    // 回调函数两个参数，req 表示请求参数，res 表示响应参数，响应的报文可以直接在 res 中书写
    // req.url 包含了整个路径和 query 参数，而这里我们值需要 query
    const { pathname } = url.parse(req.url)
    console.log('req.url: ', req.url);
    console.log('pathname: ', pathname, url.parse(req.url));
    if (pathname === '/') {
        const { accept } = headers
        if (accept.includes('application/json') || method === 'POST') {
            res.writeHead(200, { "Content-Type": "application/json" })
            // 传字符串回去
            res.end(JSON.stringify(responseData))
        } else {
            // 需要设置编码格式 charset=utf-8,不然会乱码
            res.writeHead(200, { "Content-Type": "text/html;charset=utf-8" })
            // 
            res.end(toHTML(responseData))
        }
    } else {
        res.writeHead(404, { "Content-Type": "text/html" })
        // res.end("<h1>404</h1>")
        res.end("404")
    }

})
serve.on('clientError', (err, socket) => {
    console.log('连接错误error: ', error);
    socket.end('HTTP/1.1 400 Bad Request')
})
serve.listen(9999, () => {
    console.log('open serve', serve.address());
    // resolve 相当于 cd 操作
    console.log(path.resolve('foo/bar', '/tmp/file/', '..', 'a/../subfile'));
})
