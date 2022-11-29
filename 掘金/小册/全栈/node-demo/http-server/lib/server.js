/**
 * 拦截器切面 demo
 */
const http = require('http')
const Interceptor = require('./interceptor')
module.exports = class {
    constructor() {
        const interceptor = new Interceptor()

        this.server = http.createServer(async (req, res) => {
            console.log('interceptor: ', interceptor);
            await interceptor.run({ req, res })// 执行注册的拦截函数
            if (!res.writableFinished) {
                let body = res.body || '200 ok'
                console.log('body: ', body, body.pipe);
                if (body.pipe) {
                    body.pipe(res)
                } else {
                    if (typeof body !== 'string' && req.headers['Content-Type'] === 'application/json') {
                        body = JSON.stringify(body)
                    }
                    res.end(body)
                }
            }
        })
        this.server.on('clientError', (err, socket) => {
            socket.end('HTTP/1.1 400 Bad Request\r\n')
        })
        this.interceptor = interceptor
    }
    listen(opts, cb = () => { }) {
        if (typeof opts === 'number') opts = { port: opts };
        opts.host = opts.host || '0.0.0.0'
        console.log(`http-server http://${opts.host}:${opts.port}`);
        this.server.listen(opts, () => cb(this.server))
    }
    use(aspect) {
        // 添加切面
        return this.interceptor.use(aspect)
    }
}



