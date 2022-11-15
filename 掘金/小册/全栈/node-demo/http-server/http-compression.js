/**
 * http 文件压缩
 */


/**
 * 静态服务器 -- 增加缓存版本
 */

const http = require('http')
const path = require('path')
const fs = require('fs')
const url = require('url')
const mime = require('mime')
const zlib = require('zlib')

const getEncoding = (encodings = '') => {
    if (!encodings) {
        return false
    }
    const compress = ['gzip', 'deflate', 'br']
    let encoding = ''
    encodings.split(',').some(item => {
        if (compress.includes(item)) {
            encoding = item
            return true
        }
        return false
    })
    return encoding;
}
const server = http.createServer((req, res) => {
    /**
      * 1.先用 path.join() 把 www 和 query 拼接成相对路径
      * 2.再用 path.resolve 把第一步相对路径和决定路径拼接起来
      */
    let filepath = path.resolve(__dirname, path.join('www', url.fileURLToPath(`file://${req.url}`)))
    console.log('filepath: ', filepath, path.join('www', url.fileURLToPath(`file://${req.url}`)));
    console.log('fs.existsSync(filepath): ', fs.existsSync(filepath));
    // 判断该路径是否有目录或文件存在
    if (fs.existsSync(filepath)) {
        // 获取当前路径的信息，会返回一个 stat 对象 - 修改、创建时间、大小，权限
        const stat = fs.statSync(filepath);
        // 判断返回的对象是否是一个目录 -- 对应的还有 stat.isFile()，判断是否为文件
        const isDir = stat.isDirectory()
        console.log('stat: ', stat);
        console.log('isDir: ', isDir);
        if (isDir) {
            // 是目录，重新拼接 index.html
            filepath = path.join(filepath, 'index.html')
        }
        // !isDir 是文件
        // fs.existsSync(filepath) 重新检测拼接后的路径是否存在 -- 采用流的方式 
        if (!isDir || fs.existsSync(filepath)) {
            const timeStamp = req.headers['if-modified-since']
            // 获取这个路径文件的信息 - 路径，名称，扩展名
            const file = path.parse(filepath)
            const { ext } = file
            console.log('file: ', filepath, file);
            let status = 200;
            // 时间一致，就返回 304，不会返回 body
            // mtimeMs 表示修改时间
            if (timeStamp && Number(timeStamp) === stat.mtimeMs) {
                status = 304
            }
            const mimeType = mime.getType(ext);
            const responseHeaders = {
                "Content-Type": `${mimeType}`,
                "Cache-Control": 'max-age=86400',// 缓存 24 小时
                "Last-modified": stat.mtimeMs,// 协商缓存
            }
            console.log('压缩头', req.headers['accept-encoding'])
            // 区分不同的文件类型，通常我们只对 HTML/JS/CSS 压缩，而图片、音视频等媒体文件已经压缩过，不再使用继续压缩，可能会适得其反
            const compress = /^(text|application)/.test(mimeType)
            const encodingType = getEncoding(req.headers['accept-encoding'])
            if (compress && encodingType) {
                responseHeaders['Content-encoding'] = encodingType;
            }
            res.writeHead(status, responseHeaders)

            if (status !== 304) {
                // 以流的形式读取文件
                const fileStream = fs.createReadStream(filepath)
                // 通过管道的方式传递给 res。pipe 方法可以将两个流连接起来，这样数据就会从上游流向下游
                if (compress && encodingType) {
                    // 对应的压缩响应头，需要对应的压缩方式
                    const comp = {
                        gzip: zlib.createGzip(),
                        deflate: zlib.createDeflate(),
                        br: zlib.createBrotliCompress(),
                    }
                    fileStream.pipe(comp[encodingType]).pipe(res)
                } else {
                    fileStream.pipe(res)
                }
            } else {
                res.end();
            }

        }
    } else {
        // 不存在就是 404
        res.writeHead(404, { "Content-Type": 'text/html' })
        res.end('404')
    }
})
server.on('clientError', (err, scoket) => {

})

server.listen(9991, () => {
    console.log('open', server.address);
})