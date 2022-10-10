/**
 * 静态服务器
 */

const http = require('http')
const path = require('path')
const fs = require('fs')
const url = require('url')
const mime = require('mime')


const server = http.createServer((req, res) => {
    console.log('req.url', req.url);
    // let filePath = path.resolve(__dirname, path.join('www', url.fileURLToPath(`file:///${req.url}`))); // 解析请求的路径
    /**
     * 1.先用 path.join() 把 www 和 query 拼接成相对路径
     * 2.再用 path.resolve 把第一步相对路径和决定路径拼接起来
     */
    let filepath = path.resolve(__dirname, path.join('www', url.fileURLToPath(`file://${req.url}`)))
    console.log('filepath: ', filepath, path.join('www', url.fileURLToPath(`file://${req.url}`)));
    console.log('fs.existsSync(filepath): ', fs.existsSync(filepath));
    // 判断该路径是否有目录或文件存在
    if (fs.existsSync(filepath)) {
        // 获取当前路径的信息，会返回一个 stat 对象
        const stat = fs.statSync(filepath);
        // 判断返回的对象是否是一个目录
        const isDir = stat.isDirectory()
        console.log('stat: ', stat);
        console.log('isDir: ', isDir);
        if (isDir) {
            // 是目录，重新拼接 index.html
            filepath = path.join(filepath, 'index.html')
        }
        // // 重新检测拼接后的路径
        // if (!isDir || fs.existsSync(filepath)) {
        //     // 读取文件(同步的方式)
        //     //  fs.readFileSync 来读取文件，又是通过 res.end 发送给客户端的，这种方式需要等待文件全部读取结束后，才发送给客户端。所以，这种方式只适用与小文件，如果处理大文件，比如大的图片或者音频视频文件等，这么操作会有两类问题。其一是会需要很长时间的读文件操作，造成 I/O 瓶颈，使得客户端需要等待良久才能得到响应。其二是要把大量数据读入内存，然后返回，也造成很大的内存开销。这显然是不合适的。
        //     const content = fs.readFileSync(filepath)
        //     // 获取这个路径文件的信息
        //     const file = path.parse(filepath)
        //     console.log('file: ', file);
        //     res.writeHead(200, { "Content-Type": `${mime.getType(file.ext)}` })
        //     res.end(content)
        // }

        // 重新检测拼接后的路径 -- 采用流的方式
        if (!isDir || fs.existsSync(filepath)) {         
            // 获取这个路径文件的信息
            const file = path.parse(filepath)
            console.log('file: ', file);
            res.writeHead(200, { "Content-Type": `${mime.getType(file.ext)}` })
            // 以流的形式读取文件
            const fileStream = fs.createReadStream(filepath)
            // 通过管道的方式传递给 res。pipe 方法可以将两个流连接起来，这样数据就会从上游流向下游
            fileStream.pipe(res)
        }
    } else {
        // 不存在就是 404
        res.writeHead(404, { "Content-Type": 'text/html' })
        res.end('404')
    }
})
server.on('clientError', (err, scoket) => {

})

server.listen(9999, () => {
    console.log('open', server.address);
})