const koa = require('koa')
const Router = require('koa-router')
const fs = require('fs')

const app = new koa

/**
 * 多页面，不同路由层级定义
 * 1.定义home
 * 2.定义info
 * 然后在new router弄一个总入口，封装所有的子路由
 */
const home = new Router
home.get('/index', (ctx) => {
    ctx.body = 'home index'
}).get('/todo', ctx => {
    ctx.body = 'home todo'
})

const info = new Router
info.get('/index', ctx => {
    ctx.body = 'info index'
}).get('/todo', ctx => {
    ctx.body = 'info todo'
})

// 封装子路由
const router = new Router
router.use('/home', home.routes(), home.allowedMethods())
router.use('/info', info.routes(), info.allowedMethods())

app.use(router.routes(), router.allowedMethods())
app.listen(3000, () => {
    console.log('多个路由启动');
})