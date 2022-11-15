/**
 * 静态服务器 -- 增加缓存版本
 */

const http = require('http')
const fs = require('fs')
const url = require('url')
const mime = require('mime')
const path = require('path')
const checksum = require('checksum')

const server = http.createServer((req, res) => {
    /**
     * 1.先用 path.join() 把 www 和 query 拼接成相对路径
     * 2.再用 path.resolve 把第一步相对路径和决定路径拼接起来
     */
    // let filepath = path.resolve(__dirname, path.join('www', url.fileURLToPath(`file://${req.url}`)))
    // console.log('filepath: ', filepath, path.join('www', url.fileURLToPath(`file://${req.url}`)));
    // console.log('fs.existsSync(filepath): ', fs.existsSync(filepath));
    const srvUrl = url.parse(`http://${req.url}`);
    let queryPath = srvUrl.path;
    if (queryPath === '/') queryPath = '/index.html';
    
    const resPath = path.resolve(__dirname, path.join('resource', queryPath));
    console.log('path: ', srvUrl, filePath, queryPath, resPath, !fs.existsSync(resPath));
    // 判断该路径是否有目录或文件存在
    if (!fs.existsSync(resPath)) {
        // 不存在就是 404
        res.writeHead(404, { "Content-Type": 'text/html' })
        return res.end('404')
    }
    checksum.file(resPath, (err, sum) => {
        if (err !== null) {
            res.writeHead(404, { "Content-Type": 'text/html' })
            return res.end('404')
        }
        console.log('err: ', err, sum);
        const resStream = fs.createReadStream(resPath)
        sum = `"${sum}"`; // etag 要加双引号
        console.log('resultStream: ', sum);
        const file = path.parse(resPath)
        console.log('path: ', file);
        if (req.headers['if-none-match'] === sum) {
            res.writeHead(304, {
                'Content-Type': `${mime.getType(file.ext)}`,
                etag: sum,
            });
            res.end();
        } else {
            res.writeHead(200, {
                'Content-Type': `${mime.getType(file.ext)}`,
                etag: sum,
            });
            resStream.pipe(res);
        }

    })
})
server.on('clientError', (err, scoket) => {

})

server.listen(9999, () => {
    console.log('open', server.address);
})