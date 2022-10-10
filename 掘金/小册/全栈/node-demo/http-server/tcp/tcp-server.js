/**
 * 使用 TCP 服务来处理 HTTP
 * 使用内置的 net 模块来搭建和处理 TCP
 */

const net = require('net')
function responseDate(str, status = 200, desc = 'OK') {
    // 注意正文前面需要有空行 
    // HTTP 协议规定：HTTP 响应头要带上Content-Type和Content-Length。其中，Content-Type指定了响应的类型。这里设置为text/html，告诉浏览器这个返回内容是一段 HTML，要去解析其中的 HTML 标签。Content-Length指定了响应内容中HTTP Body的字符数。
    // 浏览器读到Content-Length指定的字符数后，就会认为响应的内容已经传输完成。
    /**
     * Connection：keep-alive 保持 TCP 连接
     * Date 服务器的时间，通常对时间有依赖的场景有用，比如秒杀场景
     */
    return `HTTP/1.1 ${status} ${desc}
    Connection: keep-alive
    Date: ${new Date()}
    Content-Type: text/html
    Content-Length: ${str.length}

    ${str}`
}
const server = net.createServer((socket) => {
    // console.log('socket: ', socket);
    // 通过回调的 scoket 套接字，能拿到 HTTP 的头字段，请求行请求头等信息
    socket.on('data', function (data) {
        // 目前浏览器一直在等待，要让他停止等待就需要给浏览器返回内容。 通过 socket.write
        console.log(`data:\n\n${data.toString('utf-8')} `);
        console.log('data', /^GET \/ HTTP/.test(data));
        const matched = data.toString('utf-8').match(/^GET ([/\w]+) HTTP/)
        console.log('matched: ', matched);
        if (matched) {
            if (matched[1] === '/') {
                const res = responseDate('<h1>hello world123</h1>');
                console.log('res: ', res);
                socket.write(res)
            } else {
                socket.write(responseDate('<h1>not found</h1>', 404, 'not found'))

            }
        }
        // if (/^GET \/ HTTP/.test(data)) {
        //     // 内容要用 HTML 标签包裹一下，直接返回字符串解析不了
        //     // const res = responseDate('<div>good</div>');
        //     // const res = responseDate('good1');
        //     const res = responseDate('<h1>hello world123</h1>');
        //     console.log('res: ', res);
        //     socket.write(res)
        // }
    }).on('close', function (params) {
        // 当我们关闭页面或停止请求后，会打印关闭的信息
        console.log('关闭 tcp', params);
    })
}).on('error', function (err) {
    throw err
})


server.listen({
    host: '0.0.0.0',
    port: '9999'
}, () => {
    console.log('连接', server.address());
})