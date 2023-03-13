const http = require('http')
const fs = require('fs')
const game = require('./game')

let playerWon = 0;
let gameCount = 0
let playerLastAction = null;// 记录上一次行为

http.createServer(function (req, res) {
    console.log('req: ', req.url);
    const parsedUrl = new URL(req.url, 'https://www.baidu.com');
    const { pathname, searchParams } = parsedUrl
    // console.log('parsedUrl: ', parsedUrl);
    if (pathname == '/favicon.ico') {
        // 如果请求url是浏览器icon，比如 http://localhost:3000/favicon.ico的情况
        // 就返回一个200就好了
        res.writeHead(200);
        res.end();
        return;
    }
    if (pathname === '/game') {


        const playerAction = searchParams.get('action')
        if (playerWon >= 3 || gameCount === 9) {
            res.writeHead(500)
            res.end("不玩了")
            return
        }
        // 当玩家操作与上次相同，则连续相同操作统计次数+1，否则统计清零
        // 当玩家操作连续三次相同，则视为玩家作弊，把sameCount置为9代表有过作弊行为
        if (playerLastAction && playerLastAction === playerAction) {
            gameCount++
        } else {
            gameCount = 0;
        }

        if (gameCount >= 3) {
            gameCount = 9;
            res.writeHead(400)
            res.end('你作弊')
            return
        }

        // 执行游戏逻辑
        const gameResult = game(playerAction);
        console.log('gameResult: ', gameResult);
        res.writeHead(200)
        const resultEnum = {
            0: '平局',
            1: '你赢了',
            '-1': '你输了',
        }
        if (gameResult === 1) {
            playerWon++
        }
        res.end(resultEnum[gameResult] || resultEnum[0])


    }
    if (pathname === '/') {
        fs.createReadStream(__dirname + '/index.html').pipe(res)
    }

}).listen(3000)