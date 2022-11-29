/**
 * 拦截器切面 demo
 */
const Serve = require('./lib/server')

const app = new Serve()
app.listen({
    port: 9999,
    // host: '0.0.0.0'
})

app.use(async ({ res }, next) => {
    res.setHeader('Content-Type', 'text/html')
    res.body = '<h1>hello world</h1>'
    console.log('res: ');
    await next()
})