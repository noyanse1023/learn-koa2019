const Koa = require('koa')
const bodyparser = require('koa-bodyparser')

const router = require('./routes')

const app = new Koa()

app.use(bodyparser()) // 解析post请求

router(app)

app.listen(3000, () => {
    console.log('your server is listening at port 3000')
}) 