// const http = require('http')
const fs = require('fs')
const express = require("express")
const game = require('./game')

let playerWon = 0;
let gameCount = 0
let playerLastAction = null;// 记录上一次行为

const app = new express();

app.get('/', function (req, res) {
    fs.createReadStream(__dirname + '/index.html').pipe(res)
})

app.get('/favicon.ico', function (req, res) {
    res.status(200);
    return
})

app.get('/game',
    function (req, res, next) {
        console.log('req: ', req);
        // express自动帮我们把query处理好挂在request上
        console.log('playerWon: ', playerWon);
        if (playerWon >= 3 || gameCount === 9) {
            res.status(500)
            res.send("不玩了")
            return
        }
        next();
        // 等执行完 next 后，才会指定到后面来
        // 后面如果有要传递的变量，可以挂载到 res 里
        if (res.playerWon) {
            playerWon++
        }
    },
    function (req, res, next) {
        console.log('req: ', req);
        // express自动帮我们把query处理好挂在request上
        const { query } = req
        const playerAction = query.action;

        // 当玩家操作与上次相同，则连续相同操作统计次数+1，否则统计清零
        // 当玩家操作连续三次相同，则视为玩家作弊，把sameCount置为9代表有过作弊行为
        if (playerLastAction && playerLastAction === playerAction) {
            gameCount++
        } else {
            gameCount = 0;
        }

        if (gameCount >= 3) {
            gameCount = 9;
            res.status(400)
            res.send('你作弊')
            return
        }
        playerLastAction = playerAction
        res.playerAction = playerAction
        next()

    }, function (req, res, next) {
        // 执行游戏逻辑
        const gameResult = game(res.playerAction);
        console.log('gameResult: ', gameResult);

        const resultEnum = {
            0: '平局',
            1: '你赢了',
            '-1': '你输了',
        }
        if (gameResult === 1) {
            // playerWon++
            res.playerWon = true;
        }
        res.status(200)
        res.send(resultEnum[gameResult] || resultEnum[0])
    })


app.listen(3000)