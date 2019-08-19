const Koa = require('koa')
const bodyparser = require('koa-bodyparser')
const mongoose = require('mongoose')
const { dbUrl } = require('./config')

mongoose.connect(dbUrl, () => {
    console.log('数据库连接成功')
})
mongoose.connection.on('error', '数据库连接失败')

const router = require('./routes')

const app = new Koa()

app.use(bodyparser()) // 解析post请求

router(app)

app.listen(3000, () => {
    console.log('your server is listening at port 3000')
}) 