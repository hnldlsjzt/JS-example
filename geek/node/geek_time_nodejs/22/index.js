// const http = require('http')
const fs = require('fs')
const koa = require("koa")
const mount = require('koa-mount')
const game = require('./game')

let playerWon = 0;
let gameCount = 0
let playerLastAction = null;// 记录上一次行为

const app = new koa();


app.use(mount('/favicon.ico', function (ctx) {
    ctx.status(200)
}))

const gameKoa = new koa()
app.use(mount('/game', gameKoa))

gameKoa.use(async function (ctx, next) {
    console.log('req:=== ', ctx);
    // express自动帮我们把query处理好挂在request上
    console.log('playerWon: ', playerWon);
    if (playerWon >= 3 || gameCount === 9) {
        ctx.status = 500
        ctx.body = "不玩了"
        return
    }
    // 使用 await，等待中间件的异步执行完才回来
    await next();
    // 等执行完 next 后，才会指定到后面来
    // 后面如果有要传递的变量，可以挂载到 res 里
    if (ctx.playerWon) {
        playerWon++
    }
})

gameKoa.use(async function (ctx, next) {
    // express自动帮我们把query处理好挂在request上
    const { query } = ctx
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
        ctx.status = 400
        ctx.body = '你作弊'
        return
    }
    playerLastAction = playerAction;
    ctx.playerAction = playerAction
    await next()

})

gameKoa.use(function (ctx, next) {
    // 执行游戏逻辑
    const gameResult = game(ctx.playerAction);
    console.log('gameResult: ', gameResult);


    const resultEnum = {
        0: '平局',
        1: '你赢了',
        '-1': '你输了',
    }
    if (gameResult === 1) {
        // playerWon++
        ctx.playerWon = true;
    }
    ctx.status = 200
    ctx.body = resultEnum[gameResult] || resultEnum[0]
})

app.use(mount('/', function (ctx) {
    console.log('ctx === / ');
    // fs.createReadStream(__dirname + '/index.html').pipe(res)
    ctx.body = fs.readFileSync(__dirname + '/index.html', 'utf-8')
}))


app.listen(3000)