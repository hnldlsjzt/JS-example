const http = require('http')
const fs = require('fs')

http.createServer((req, res) => {
    console.log('req: ', req.url);
    if (req.url === '/favicon.ico') {
        res.writeHead(200)
        res.end();
        return
    }
    res.writeHead(200)
    // 直接把文件返回的形式
    // const html = fs.readFileSync(__dirname + '/index.html');
    // res.end(html)
    // console.log('html: ', html);

    // 流的方式 - 更加推荐
    fs.createReadStream(__dirname + '/index.html').pipe(res)
  
}).listen(3000)